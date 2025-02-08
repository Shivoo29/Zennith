"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

interface PageBackgroundProps {
	type: 'about' | 'events' | 'sponsors' | 'register'
}

export function PageBackground({ type }: PageBackgroundProps) {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!containerRef.current) return

		const container = containerRef.current
		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
		
		const renderer = new THREE.WebGLRenderer({ 
			alpha: true,
			antialias: true,
		})
		
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		container.appendChild(renderer.domElement)

		// Different background setups based on page type
		switch (type) {
			case 'about': {
				// Cyberpunk grid background
				scene.fog = new THREE.FogExp2(0x000000, 0.035)
				const aboutGridHelper = new THREE.GridHelper(200, 50, 0x00fff9, 0x00fff9)
				aboutGridHelper.position.y = -5
				scene.add(aboutGridHelper)
				break
			}

			case 'events': {
				// Particle system background
				const eventsGeometry = new THREE.BufferGeometry()
				const eventsParticleCount = 5000
				const eventsPositions = new Float32Array(eventsParticleCount * 3)
				
				for (let i = 0; i < eventsParticleCount * 3; i++) {
					eventsPositions[i] = (Math.random() - 0.5) * 100
				}
				
				eventsGeometry.setAttribute('position', new THREE.BufferAttribute(eventsPositions, 3))
				const eventsMaterial = new THREE.PointsMaterial({
					color: 0xff2e88,
					size: 0.1,
				})
				const eventsParticles = new THREE.Points(eventsGeometry, eventsMaterial)
				scene.add(eventsParticles)
				break
			}

			case 'sponsors': {
				// Create cyberpunk background
				scene.fog = new THREE.FogExp2(0x0a001f, 0.0015)
				renderer.setClearColor(0x0a001f, 1)

				// Create particle systems for cyber space effect
				const sponsorsParticleCount = 5000
				const sponsorsGeometry = new THREE.BufferGeometry()
				const sponsorsPositions = new Float32Array(sponsorsParticleCount * 3)
				const sponsorsSizes = new Float32Array(sponsorsParticleCount)
				const sponsorsColors = new Float32Array(sponsorsParticleCount * 3)

				for (let i = 0; i < sponsorsParticleCount; i++) {
					// Position
					sponsorsPositions[i * 3] = (Math.random() - 0.5) * 100
					sponsorsPositions[i * 3 + 1] = (Math.random() - 0.5) * 100
					sponsorsPositions[i * 3 + 2] = (Math.random() - 0.5) * 100
					
					// Size
					sponsorsSizes[i] = Math.random() * 2
					
					// Color - Create cyberpunk color palette
					const colorChoice = Math.random()
					if (colorChoice < 0.3) {
						// Neon pink
						sponsorsColors[i * 3] = 1
						sponsorsColors[i * 3 + 1] = 0.2
						sponsorsColors[i * 3 + 2] = 0.5
					} else if (colorChoice < 0.6) {
						// Cyan
						sponsorsColors[i * 3] = 0
						sponsorsColors[i * 3 + 1] = 1
						sponsorsColors[i * 3 + 2] = 0.9
					} else {
						// Purple
						sponsorsColors[i * 3] = 0.5
						sponsorsColors[i * 3 + 1] = 0
						sponsorsColors[i * 3 + 2] = 1
					}
				}

				sponsorsGeometry.setAttribute('position', new THREE.BufferAttribute(sponsorsPositions, 3))
				sponsorsGeometry.setAttribute('size', new THREE.BufferAttribute(sponsorsSizes, 1))
				sponsorsGeometry.setAttribute('color', new THREE.BufferAttribute(sponsorsColors, 3))

				const sponsorsMaterial = new THREE.ShaderMaterial({
					uniforms: {
						time: { value: 0 },
						pixelRatio: { value: renderer.getPixelRatio() }
					},
					vertexShader: `
						attribute float size;
						attribute vec3 color;
						varying vec3 vColor;
						uniform float time;
						
						void main() {
							vColor = color;
							vec3 pos = position;
							pos.y += sin(time * 0.5 + position.x * 0.5) * 0.5;
							pos.x += cos(time * 0.5 + position.y * 0.5) * 0.5;
							
							vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
							gl_Position = projectionMatrix * mvPosition;
							gl_PointSize = size * (300.0 / length(mvPosition.xyz)) * pixelRatio;
						}
					`,
					fragmentShader: `
						varying vec3 vColor;
						
						void main() {
							vec2 xy = gl_PointCoord.xy - vec2(0.5);
							float ll = length(xy);
							if (ll > 0.5) discard;
							
							float alpha = 0.5 - ll;
							gl_FragColor = vec4(vColor, alpha);
						}
					`,
					transparent: true,
					depthWrite: false,
					blending: THREE.AdditiveBlending
				})

				const sponsorsParticles = new THREE.Points(sponsorsGeometry, sponsorsMaterial)
				scene.add(sponsorsParticles)

				// Create grid for cyberpunk effect
				const sponsorsGridHelper = new THREE.GridHelper(200, 50, 0xff1493, 0x00ffff)
				sponsorsGridHelper.position.y = -30
				scene.add(sponsorsGridHelper)

				// Add volumetric light effect
				const spotLight = new THREE.SpotLight(0xff1493, 1)
				spotLight.position.set(-50, 50, -50)
				spotLight.angle = 0.3
				scene.add(spotLight)

				// Setup camera and controls first
				camera.position.z = 15
				const controls = new OrbitControls(camera, renderer.domElement)
				controls.enableDamping = true
				controls.dampingFactor = 0.05
				controls.enableZoom = false
				controls.autoRotate = true

				// Animation function specific to sponsors
				function animateSponsors() {
					sponsorsMaterial.uniforms.time.value += 0.01
					sponsorsParticles.rotation.y += 0.0005
					sponsorsParticles.rotation.x += 0.0002
					spotLight.position.x = Math.sin(sponsorsMaterial.uniforms.time.value * 0.5) * 50
					sponsorsGridHelper.material.opacity = 0.5 + Math.sin(sponsorsMaterial.uniforms.time.value) * 0.2
				}

				// Now define and start animation after controls are initialized
				function animate() {
					requestAnimationFrame(animate)
					animateSponsors()
					controls.update()
					renderer.render(scene, camera)
				}
				animate()
				break
			}

			case 'register':
				// DNA helix background
				const helixGroup = new THREE.Group()
				const sphereGeometry = new THREE.SphereGeometry(0.2)
				const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00fff9 })
				
				for (let i = 0; i < 50; i++) {
					const sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial)
					const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial)
					const t = i * 0.3
					sphere1.position.set(
						Math.cos(t) * 3,
						t - 10,
						Math.sin(t) * 3
					)
					sphere2.position.set(
						Math.cos(t + Math.PI) * 3,
						t - 10,
						Math.sin(t + Math.PI) * 3
					)
					helixGroup.add(sphere1, sphere2)
				}
				scene.add(helixGroup)
				break
		}




		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			renderer.setSize(window.innerWidth, window.innerHeight)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			renderer.dispose()
			container.removeChild(renderer.domElement)
		}
	}, [type])

	return (
		<div
			ref={containerRef}
			className="fixed inset-0 pointer-events-none"
			style={{ zIndex: -1 }}
		/>
	)
}