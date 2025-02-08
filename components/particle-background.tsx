"use client"

import { useEffect, useRef } from 'react'
import { createNoise2D } from 'simplex-noise'

export function ParticleBackground() {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const particleCount = 700
		const particlePropCount = 9
		const particlePropsLength = particleCount * particlePropCount
		const rangeY = 100
		const baseTTL = 50
		const rangeTTL = 150
		const baseSpeed = 0.1
		const rangeSpeed = 2
		const baseRadius = 1
		const rangeRadius = 4
		const baseHue = 220
		const rangeHue = 100
		const noiseSteps = 8
		const xOff = 0.00125
		const yOff = 0.00125
		const zOff = 0.0005
		const backgroundColor = 'hsla(260,40%,5%,1)'

		let canvas: { a: HTMLCanvasElement; b: HTMLCanvasElement }
		let ctx: { a: CanvasRenderingContext2D; b: CanvasRenderingContext2D }
		let center: number[]
		let tick: number
		let simplex: ReturnType<typeof createNoise2D>
		let particleProps: Float32Array

		function rand(n: number) {
			return Math.random() * n
		}

		function randRange(n: number) {
			return rand(n) - n / 2
		}

		function fadeInOut(t: number, m: number) {
			let hm = 0.5 * m
			return Math.abs((t + hm) % m - hm) / hm
		}

		function lerp(n1: number, n2: number, speed: number) {
			return (1 - speed) * n1 + speed * n2
		}

		function initParticle(i: number) {
			let x, y, vx, vy, life, ttl, speed, radius, hue

			x = rand(canvas.a.width)
			y = center[1] + randRange(rangeY)
			vx = 0
			vy = 0
			life = 0
			ttl = baseTTL + rand(rangeTTL)
			speed = baseSpeed + rand(rangeSpeed)
			radius = baseRadius + rand(rangeRadius)
			hue = baseHue + rand(rangeHue)

			particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i)
		}

		function drawParticle(x: number, y: number, x2: number, y2: number, life: number, ttl: number, radius: number, hue: number) {
			ctx.a.save()
			ctx.a.lineCap = 'round'
			ctx.a.lineWidth = radius
			ctx.a.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`
			ctx.a.beginPath()
			ctx.a.moveTo(x, y)
			ctx.a.lineTo(x2, y2)
			ctx.a.stroke()
			ctx.a.closePath()
			ctx.a.restore()
		}

		function updateParticle(i: number) {
			let i2=1+i, i3=2+i, i4=3+i, i5=4+i, i6=5+i, i7=6+i, i8=7+i, i9=8+i
			let x, y, vx, vy, life, ttl, speed, radius, hue

			x = particleProps[i]
			y = particleProps[i2]
			vx = particleProps[i3]
			vy = particleProps[i4]
			life = particleProps[i5]
			ttl = particleProps[i6]
			speed = particleProps[i7]
			radius = particleProps[i8]
			hue = particleProps[i9]

			// Calculate new position
			const x2 = x + vx * speed
			const y2 = y + vy * speed

			drawParticle(x, y, x2, y2, life, ttl, radius, hue)

			const newLife = life + 1

			particleProps[i] = x2
			particleProps[i2] = y2
			particleProps[i3] = vx
			particleProps[i4] = vy
			particleProps[i5] = newLife

			if (life > ttl) {
				initParticle(i)
			}
		}

		function initParticles() {
			tick = 0
			simplex = createNoise2D()
			particleProps = new Float32Array(particlePropsLength)

			for (let i = 0; i < particlePropsLength; i += particlePropCount) {
				initParticle(i)
			}
		}

		function drawParticles() {
			for (let i = 0; i < particlePropsLength; i += particlePropCount) {
				updateParticle(i)
			}
		}

		function createCanvas() {
			canvas = {
				a: document.createElement('canvas'),
				b: document.createElement('canvas')
			}
			
			canvas.b.style.position = 'fixed'
			canvas.b.style.top = '0'
			canvas.b.style.left = '0'
			canvas.b.style.width = '100%'
			canvas.b.style.height = '100%'
			
			containerRef.current?.appendChild(canvas.b)
			
			ctx = {
				a: canvas.a.getContext('2d')!,
				b: canvas.b.getContext('2d')!
			}
			center = []
		}

		function resize() {
			const { innerWidth, innerHeight } = window
			
			canvas.a.width = innerWidth
			canvas.a.height = innerHeight

			ctx.a.drawImage(canvas.b, 0, 0)

			canvas.b.width = innerWidth
			canvas.b.height = innerHeight
			
			ctx.b.drawImage(canvas.a, 0, 0)

			center[0] = 0.5 * canvas.a.width
			center[1] = 0.5 * canvas.a.height
		}

		function renderGlow() {
			ctx.b.save()
			ctx.b.filter = 'blur(8px) brightness(200%)'
			ctx.b.globalCompositeOperation = 'lighter'
			ctx.b.drawImage(canvas.a, 0, 0)
			ctx.b.restore()

			ctx.b.save()
			ctx.b.filter = 'blur(4px) brightness(200%)'
			ctx.b.globalCompositeOperation = 'lighter'
			ctx.b.drawImage(canvas.a, 0, 0)
			ctx.b.restore()
		}

		function renderToScreen() {
			ctx.b.save()
			ctx.b.globalCompositeOperation = 'lighter'
			ctx.b.drawImage(canvas.a, 0, 0)
			ctx.b.restore()
		}

		function draw() {
			tick++

			ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height)
			ctx.b.fillStyle = backgroundColor
			ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height)

			drawParticles()
			renderGlow()
			renderToScreen()

			window.requestAnimationFrame(draw)
		}

		function setup() {
			createCanvas()
			resize()
			initParticles()
			draw()
		}

		setup()
		window.addEventListener('resize', resize)

		return () => {
			window.removeEventListener('resize', resize)
			containerRef.current?.removeChild(canvas.b)
		}
	}, [])

	return <div ref={containerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }} />
}