"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

interface ThreeModelProps {
  modelType?: "spaceship" | "robot" | "satellite"
  scale?: number
  rotation?: number
  position?: { x: number; y: number; z: number }
  autoRotate?: boolean
  className?: string
}

export function ThreeModel({
  modelType = "spaceship",
  scale = 1,
  rotation = 0,
  position = { x: 0, y: 0, z: 0 },
  autoRotate = true,
  className = "",
}: ThreeModelProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Camera position
    camera.position.z = 5

    // Create different types of models
    const createModel = (type: string) => {
      switch (type) {
        case "spaceship":
          const group = new THREE.Group()

          // Main body
          const bodyGeometry = new THREE.ConeGeometry(1, 4, 8)
          const bodyMaterial = new THREE.MeshPhongMaterial({
            color: 0x3366ff,
            shininess: 100,
            specular: 0x666666,
          })
          const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
          body.rotation.x = Math.PI / 2
          group.add(body)

          // Wings
          const wingGeometry = new THREE.BoxGeometry(4, 0.1, 1)
          const wingMaterial = new THREE.MeshPhongMaterial({
            color: 0xff3366,
            shininess: 100,
            specular: 0x666666,
          })
          const wings = new THREE.Mesh(wingGeometry, wingMaterial)
          wings.position.z = -1
          group.add(wings)

          // Cockpit
          const cockpitGeometry = new THREE.SphereGeometry(0.5, 16, 16)
          const cockpitMaterial = new THREE.MeshPhongMaterial({
            color: 0x6633ff,
            shininess: 100,
            specular: 0xffffff,
          })
          const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial)
          cockpit.position.z = 1
          group.add(cockpit)

          return group

        case "robot":
          const robotGroup = new THREE.Group()

          // Body
          const robotBody = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1.5, 1),
            new THREE.MeshPhongMaterial({ color: 0x666666 }),
          )
          robotGroup.add(robotBody)

          // Head
          const head = new THREE.Mesh(
            new THREE.SphereGeometry(0.4, 16, 16),
            new THREE.MeshPhongMaterial({ color: 0x333333 }),
          )
          head.position.y = 1.2
          robotGroup.add(head)

          // Eyes
          const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8)
          const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 })

          const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
          leftEye.position.set(-0.2, 1.2, 0.3)
          robotGroup.add(leftEye)

          const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
          rightEye.position.set(0.2, 1.2, 0.3)
          robotGroup.add(rightEye)

          return robotGroup

        case "satellite":
          const satelliteGroup = new THREE.Group()

          // Main dish
          const dish = new THREE.Mesh(
            new THREE.SphereGeometry(1, 32, 32, 0, Math.PI),
            new THREE.MeshPhongMaterial({ color: 0xcccccc, side: THREE.DoubleSide }),
          )
          dish.rotation.x = Math.PI / 2
          satelliteGroup.add(dish)

          // Solar panels
          const panelGeometry = new THREE.BoxGeometry(3, 1, 0.1)
          const panelMaterial = new THREE.MeshPhongMaterial({ color: 0x3366ff })

          const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial)
          leftPanel.position.x = -2
          satelliteGroup.add(leftPanel)

          const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial)
          rightPanel.position.x = 2
          satelliteGroup.add(rightPanel)

          return satelliteGroup

        default:
          // Default to a simple cube if type is not recognized
          return new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({ color: 0x3366ff }))
      }
    }

    const model = createModel(modelType)
    model.scale.set(scale, scale, scale)
    model.position.set(position.x, position.y, position.z)
    model.rotation.y = rotation
    scene.add(model)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = autoRotate
    controls.autoRotateSpeed = 1

    // Animation
    let frame = 0
    const animate = () => {
      requestAnimationFrame(animate)
      frame += 0.01

      // Add some floating animation
      model.position.y += Math.sin(frame) * 0.001

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      container.removeChild(renderer.domElement)
    }
  }, [modelType, scale, rotation, position, autoRotate])

  return <div ref={containerRef} className={className} />
}

