"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

interface ThreeModelProps {
  modelType?: "spaceship" | "robot" | "satellite" | "futuristicCity" | "drone"
  scale?: number
  rotation?: number
  position?: { x: number; y: number; z: number }
  autoRotate?: boolean
  className?: string
  color?: string
  enableEffects?: boolean
}

export function ThreeModel({
  modelType = "spaceship",
  scale = 1,
  rotation = 0,
  position = { x: 0, y: 0, z: 0 },
  autoRotate = true,
  className = "",
  color = "#3366ff",
  enableEffects = true,
}: ThreeModelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scene = new THREE.Scene()
    
    // Add fog for depth
    scene.fog = new THREE.FogExp2(0x000000, 0.05)

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    })

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    // Enhanced Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    // Add point lights for dramatic effect
    const pointLight1 = new THREE.PointLight(0xff0000, 1, 100)
    pointLight1.position.set(10, 10, 10)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x0000ff, 1, 100)
    pointLight2.position.set(-10, -10, -10)
    scene.add(pointLight2)

    camera.position.z = 5

    // Create particle system for background
    const createParticles = () => {
      const particleGeometry = new THREE.BufferGeometry()
      const particleCount = 1000
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100
        positions[i + 1] = (Math.random() - 0.5) * 100
        positions[i + 2] = (Math.random() - 0.5) * 100

        colors[i] = Math.random()
        colors[i + 1] = Math.random()
        colors[i + 2] = Math.random()
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
      })

      return new THREE.Points(particleGeometry, particleMaterial)
    }

    if (enableEffects) {
      const particles = createParticles()
      scene.add(particles)
    }

    // Enhanced model creation with more detail and effects
    const createModel = (type: string) => {
      const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
      })

      switch (type) {
        case "spaceship": {
          const group = new THREE.Group()

          // Enhanced main body with more geometric detail
          const bodyGeometry = new THREE.ConeGeometry(1, 4, 16, 8)
          const body = new THREE.Mesh(bodyGeometry, material)
          body.rotation.x = Math.PI / 2
          body.castShadow = true
          group.add(body)

          // More detailed wings
          const wingShape = new THREE.Shape()
          wingShape.moveTo(0, 0)
          wingShape.lineTo(2, 0)
          wingShape.lineTo(1.5, 1)
          wingShape.lineTo(0, 0.8)
          
          const wingGeometry = new THREE.ExtrudeGeometry(wingShape, {
            depth: 0.1,
            bevelEnabled: true,
            bevelThickness: 0.05,
            bevelSize: 0.05,
            bevelSegments: 3
          })

          const wings = new THREE.Mesh(wingGeometry, material)
          wings.position.set(-2, -1, -0.5)
          wings.castShadow = true
          group.add(wings)

          const wingsRight = wings.clone()
          wingsRight.rotation.y = Math.PI
          wingsRight.position.set(2, -1, -0.5)
          group.add(wingsRight)

          // Enhanced cockpit
          const cockpitGeometry = new THREE.SphereGeometry(0.5, 32, 32)
          const cockpitMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x6633ff,
            metalness: 1.0,
            roughness: 0,
            transmission: 0.9,
            thickness: 0.5,
          })
          const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial)
          cockpit.position.z = 1
          cockpit.castShadow = true
          group.add(cockpit)

          // Add engine effects
          const engineGlow = new THREE.PointLight(0xff3366, 2, 3)
          engineGlow.position.z = -2
          group.add(engineGlow)

          return group
        }
        
        // ... [Similar enhancements for robot and satellite cases]
        
        default:
          return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            material
          )
      }
    }

    const model = createModel(modelType)
    model.scale.set(scale, scale, scale)
    model.position.set(position.x, position.y, position.z)
    model.rotation.y = rotation
    scene.add(model)

    // Enhanced controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = true
    controls.autoRotate = autoRotate
    controls.autoRotateSpeed = isHovered ? 5 : 1

    // Enhanced animation with more dynamic movement
    let frame = 0
    const animate = () => {
      requestAnimationFrame(animate)
      frame += 0.01

      // More complex floating animation
      model.position.y = position.y + Math.sin(frame) * 0.1
      model.rotation.z = Math.sin(frame * 0.5) * 0.05

      // Animate lights
      if (enableEffects) {
        pointLight1.position.x = Math.sin(frame) * 10
        pointLight2.position.x = Math.cos(frame) * 10
      }

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Enhanced resize handler with debounce
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (!container) return
        camera.aspect = container.clientWidth / container.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(container.clientWidth, container.clientHeight)
      }, 100)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      container.removeChild(renderer.domElement)
    }
  }, [modelType, scale, rotation, position, autoRotate, color, enableEffects, isHovered])

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  )
}