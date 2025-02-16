"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { AnimationMixer } from "three"

interface ThreeModelProps {
  modelType?: "Bull" | "hiest" | "craft" | "matrix" | "drone" | "evolution"
  scale?: number
  rotation?: number
  position?: { x: number; y: number; z: number }
  autoRotate?: boolean
  className?: string
  enableEffects?: boolean
}

export function ThreeModel({
  modelType = "Bull",
  scale = 1,
  rotation = 0,
  position = { x: 0, y: 0, z: 0 },
  autoRotate = true,
  className = "",
  enableEffects = true,
}: ThreeModelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const modelRef = useRef<THREE.Group | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mixer, setMixer] = useState<AnimationMixer | null>(null)
  const initialZoomRef = useRef<boolean>(true)
  const targetCameraPositionRef = useRef<THREE.Vector3>(new THREE.Vector3())

  const modelPaths = {
    Bull: '/models/diamond_hands.glb',
    hiest: '/models/vansmoney.glb',
    craft: '/models/the_haunted_altar.glb',
    matrix: '/models/low_poly_mccree.glb',
    drone: '/models/dji_fpv_by_sdc_-__high_performance_drone.glb',
    evolution: '/models/stylized_mushrooms.glb'  // Fixed the filename by removing (1)
  }

  useEffect(() => {
    if (!containerRef.current) return
    setIsLoading(true)
    setError(null)

    console.log('Initializing Three.js scene')
    
    const container = containerRef.current
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 1, 5)
    cameraRef.current = camera

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Basic lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Setup controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // Load model
    const loader = new GLTFLoader()
    const modelPath = modelPaths[modelType]

    console.log('Loading model:', modelPath)

    if (!modelPath) {
      const errorMsg = `Model type "${modelType}" is not valid.`
      console.error(errorMsg)
      setError(errorMsg)
      setIsLoading(false)
      return
    }

    console.log(`Loading model from path: ${modelPath}`)

    loader.load(
      modelPath,
      (gltf) => {
      console.log('Model loaded successfully:', gltf)
      const loadedModel = gltf.scene
      if (!loadedModel) {
        setError('Model loaded but scene is empty')
        setIsLoading(false)
        return
      }
      modelRef.current = loadedModel
        
        // Apply transformations
        loadedModel.scale.set(scale, scale, scale)
        loadedModel.position.set(position.x, position.y, position.z)
        loadedModel.rotation.y = rotation

        // Enable shadows on the model if effects are enabled
        if (enableEffects) {
          loadedModel.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
          })
        }

        // Center model
        const box = new THREE.Box3().setFromObject(loadedModel)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        
        const maxDim = Math.max(size.x, size.y, size.z)
        const fov = camera.fov * (Math.PI / 180)
        const cameraDistance = maxDim / (2 * Math.tan(fov / 2))
        
        // Set initial zoomed in position (closer to the model)
        camera.position.z = cameraDistance * 0.8
        // Store the final camera position for smooth transition
        targetCameraPositionRef.current = new THREE.Vector3(0, 0, cameraDistance * 1.2)
        
        controls.target.copy(center)
        scene.add(loadedModel)
        setIsLoading(false)

        // Set up animation mixer if there are animations
        if (gltf.animations.length > 0) {
          const newMixer = new AnimationMixer(loadedModel)
          gltf.animations.forEach((clip) => {
          newMixer.clipAction(clip).play()
          })
          setMixer(newMixer)
        }

        // Start animation loop after model is loaded
        function animate() {
            requestAnimationFrame(animate)
            
            if (initialZoomRef.current && camera.position.z < targetCameraPositionRef.current.z) {
            // Smooth zoom out
            camera.position.z += (targetCameraPositionRef.current.z - camera.position.z) * 0.015
            if (Math.abs(camera.position.z - targetCameraPositionRef.current.z) < 0.1) {
              initialZoomRef.current = false
            }
            }

            controls.update()
            
            if (mixer) {
            mixer.update(0.016) // Update animations
            }
          
          if (autoRotate && loadedModel) {
          loadedModel.rotation.y += 0.005
          }
          
          renderer.render(scene, camera)
        }
        animate()
        },
        (progress) => {
          const percentage = (progress.loaded / progress.total * 100)
          console.log(`Loading progress: ${percentage.toFixed(2)}%`)
          if (isNaN(percentage)) {
          console.warn('Progress calculation resulted in NaN, possible missing or corrupt file')
          }
        },
        (error: unknown) => {
          const errorMsg = `Error loading model: ${error instanceof Error ? error.message : 'Unknown error'}`
          console.error('Model loading error:', error)
          setError(errorMsg)
          setIsLoading(false)
        }
    )

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return
      
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      console.log('Cleaning up Three.js scene')
      window.removeEventListener('resize', handleResize)
      
      if (modelRef.current) {
        scene.remove(modelRef.current)
        modelRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose()
            if (object.material instanceof THREE.Material) {
              object.material.dispose()
            }
          }
        })
      }

      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [modelType])

  if (error) {
    return (
      <div ref={containerRef} className={className} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red' }}>
        Error: {error}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      {isLoading && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
          Loading...
        </div>
      )}
    </div>
  )
}
