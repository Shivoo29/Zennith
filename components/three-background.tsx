"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup with enhanced fog
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0a0a1f, 0.02)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x0a0a1f, 1)
    containerRef.current.appendChild(renderer.domElement)

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x00fff9, 0.1)
    scene.add(ambientLight)

    const mainSpotlight = new THREE.SpotLight(0xff2e88, 1)
    mainSpotlight.position.set(-10, 10, 10)
    mainSpotlight.angle = 0.4
    mainSpotlight.penumbra = 0.3
    mainSpotlight.decay = 1
    scene.add(mainSpotlight)

    const secondaryLight = new THREE.PointLight(0xbd00ff, 0.8)
    secondaryLight.position.set(10, -10, -10)
    scene.add(secondaryLight)

    // Create hexagonal grid
    const gridHelper = new THREE.GridHelper(100, 50, 0x00fff9, 0x00fff9)
    gridHelper.position.y = -5
    gridHelper.material.opacity = 0.1
    gridHelper.material.transparent = true
    scene.add(gridHelper)

    // Create floating particles
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 2000
    const posArray = new Float32Array(particleCount * 3)
    
    for(let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xff2e88,
      transparent: true,
      blending: THREE.AdditiveBlending
    })
    
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // Add floating cyber rings
    const rings: THREE.Mesh[] = []
    const ringGeometry = new THREE.TorusGeometry(5, 0.1, 16, 100)
    const ringMaterial = new THREE.MeshPhongMaterial({
      color: 0x00fff9,
      emissive: 0x00fff9,
      emissiveIntensity: 0.5,
      shininess: 100,
      transparent: true,
      opacity: 0.6
    })

    for(let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      )
      ring.rotation.x = Math.random() * Math.PI
      ring.rotation.y = Math.random() * Math.PI
      rings.push(ring)
      scene.add(ring)
    }

    camera.position.set(0, 2, 20)

    // Enhanced controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Animation
    let frame = 0
    const animate = () => {
      requestAnimationFrame(animate)
      frame += 0.001

      // Animate particles
      particles.rotation.y += 0.0005
      particles.rotation.x += 0.0002

      // Animate rings
      rings.forEach((ring, i) => {
        ring.rotation.x += 0.002 * (i + 1)
        ring.rotation.y += 0.003 * (i + 1)
        ring.position.y += Math.sin(frame + i) * 0.01
      })

      // Animate lights
      mainSpotlight.position.x = Math.sin(frame) * 15
      mainSpotlight.position.z = Math.cos(frame) * 15
      secondaryLight.position.x = Math.cos(frame) * 10
      secondaryLight.position.z = Math.sin(frame) * 10

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none" />
}


