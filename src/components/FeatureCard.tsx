'use client'

import { useState } from 'react'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  delay?: number
}

export default function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="group bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:bg-white/10 hover:scale-105 cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`text-5xl mb-6 transition-transform duration-300 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-purple-300 transition-colors">
        {title}
      </h3>
      <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
        {description}
      </p>
      
      {/* Hover effect overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  )
}