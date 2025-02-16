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

    // Set up space background
    scene.fog = new THREE.FogExp2(0x0a001f, 0.0015)
    renderer.setClearColor(0x0a001f, 1)

    // Create stars
    const starCount = 10000
    const starGeometry = new THREE.BufferGeometry()
    const starPositions = new Float32Array(starCount * 3)
    const starSizes = new Float32Array(starCount)
    const starColors = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      // Position stars in a sphere around the camera
      const radius = Math.random() * 100 + 50
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      starPositions[i * 3 + 2] = radius * Math.cos(phi)
      
      // Vary star sizes
      starSizes[i] = Math.random() * 2

      // Create color palette of blue and purple stars
      const colorChoice = Math.random()
      if (colorChoice < 0.4) {
        // Neon blue
        starColors[i * 3] = 0
        starColors[i * 3 + 1] = 0.8
        starColors[i * 3 + 2] = 1
      } else if (colorChoice < 0.7) {
        // Purple
        starColors[i * 3] = 0.5
        starColors[i * 3 + 1] = 0
        starColors[i * 3 + 2] = 1
      } else {
        // White with slight blue tint
        starColors[i * 3] = 0.8
        starColors[i * 3 + 1] = 0.9
        starColors[i * 3 + 2] = 1
      }
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1))
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3))

    // Create shader material for stars
    const starMaterial = new THREE.ShaderMaterial({
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
          
          // Add subtle movement to stars
          pos.x += sin(time * 0.1 + position.z * 0.02) * 0.5;
          pos.y += cos(time * 0.1 + position.x * 0.02) * 0.5;
          
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

    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Create planets
    const createPlanet = (radius: number, color: number, position: THREE.Vector3) => {
      const planetGeometry = new THREE.SphereGeometry(radius)
      const planetMaterial = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.2,
        shininess: 15
      })
      const planet = new THREE.Mesh(planetGeometry, planetMaterial)
      planet.position.copy(position)
      return planet
    }

    // Add some planets
    const planet1 = createPlanet(5, 0x4169e1, new THREE.Vector3(30, 10, -40))
    const planet2 = createPlanet(3, 0x9400d3, new THREE.Vector3(-40, -5, -30))
    const planet3 = createPlanet(4, 0x4b0082, new THREE.Vector3(20, -15, -50))
    
    scene.add(planet1, planet2, planet3)

    // Add ambient light for basic illumination
    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)

    // Add point lights for planet glow
    const light1 = new THREE.PointLight(0x4169e1, 2, 50)
    const light2 = new THREE.PointLight(0x9400d3, 2, 50)
    light1.position.set(30, 10, -40)
    light2.position.set(-40, -5, -30)
    scene.add(light1, light2)

    // Set up camera and controls
    camera.position.z = 50
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)
      starMaterial.uniforms.time.value += 0.01
      stars.rotation.y += 0.0002
      planet1.rotation.y += 0.001
      planet2.rotation.y += 0.002
      planet3.rotation.y += 0.0015
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

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