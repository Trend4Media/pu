'use client'

import { useEffect, useState } from 'react'

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
}

export default function ParallaxStars() {
  const [stars, setStars] = useState<Star[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const newStars: Star[] = []
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.5 + 0.1
        })
      }
      setStars(newStars)
    }

    generateStars()

    // Mouse move handler for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            left: `${star.x + (mousePosition.x - 50) * star.speed * 0.01}%`,
            top: `${star.y + (mousePosition.y - 50) * star.speed * 0.01}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.id * 0.1}s`,
            animationDuration: `${2 + star.speed}s`
          }}
        />
      ))}
    </div>
  )
}