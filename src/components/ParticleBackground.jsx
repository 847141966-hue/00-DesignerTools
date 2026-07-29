import { useRef, useEffect } from 'react'

// Canvas 粒子系统 — 橙红色火星漂浮
export default function ParticleBackground({ color = '#FF6B35', density = 60 }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // 初始化粒子
    const initParticles = () => {
      const count = Math.min(density, Math.floor((canvas.width * canvas.height) / 25000))
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.1,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        life: Math.random() * 200 + 100,
        maxLife: 300,
      }))
    }
    initParticles()

    const animate = () => {
      ctx.fillStyle = 'rgba(13, 13, 13, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life--

        if (p.life <= 0 || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          p.x = Math.random() * canvas.width
          p.y = canvas.height + 10
          p.vx = (Math.random() - 0.5) * 0.3
          p.vy = -Math.random() * 0.5 - 0.1
          p.size = Math.random() * 2 + 0.5
          p.opacity = Math.random() * 0.5 + 0.2
          p.life = Math.random() * 200 + 100
        }

        const lifeRatio = p.life / p.maxLife
        const alpha = p.opacity * lifeRatio

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
        ctx.fill()

        // 光晕
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = color + Math.floor(alpha * 50).toString(16).padStart(2, '0')
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [color, density])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
