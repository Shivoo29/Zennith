"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)

    // Camera position
    camera.position.z = 15
    camera.position.y = 5
    camera.position.x = 5

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Stars
    const starGeometry = new THREE.BufferGeometry()
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
    })

    const starsVertices = []
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = -Math.random() * 2000
      starsVertices.push(x, y, z)
    }

    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starsVertices, 3))
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Create stylized spaceships using basic geometries
    const createStylizedSpaceship = () => {
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
    }

    // Add multiple spaceships
    const spaceships: (THREE.Mesh | THREE.Group)[] = []
    const shipPositions = [
      { x: -10, y: 0, z: -5, rotation: 0.2 },
      { x: 10, y: 2, z: -8, rotation: -0.3 },
      { x: 0, y: -3, z: -12, rotation: 0.1 },
    ]

    shipPositions.forEach((position) => {
      const spaceship = createStylizedSpaceship()
      spaceship.scale.set(0.5, 0.5, 0.5)
      spaceship.position.set(position.x, position.y, position.z)
      spaceship.rotation.y = position.rotation
      scene.add(spaceship)
      spaceships.push(spaceship)
    })

    // Controls
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

      // Animate stars
      stars.rotation.y += 0.0002

      // Animate spaceships
      spaceships.forEach((ship, index) => {
        ship.position.y += Math.sin(frame + index) * 0.01
        ship.rotation.y += 0.001
      })

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none" />
}

