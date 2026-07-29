import { useState, useEffect, useCallback } from 'react'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import { useSound } from './hooks/useSound'
import { navItems } from './data/content'

export default function App() {
  const { sounds, toggle } = useSound()
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')
  const [prevSection, setPrevSection] = useState('hero')

  const handleToggleSound = useCallback(() => {
    const enabled = toggle()
    setSoundEnabled(enabled)
    if (enabled) sounds.click()
  }, [toggle, sounds])

  // 滚动监听 — 更新当前区块
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (id !== activeSection) {
              setPrevSection(activeSection)
              setActiveSection(id)
              sounds.section()
            }
          }
        })
      },
      { threshold: 0.4 }
    )

    navItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [activeSection, sounds])

  return (
    <div className="relative min-h-screen bg-ink-black text-white">
      {/* 粒子背景 */}
      <ParticleBackground color="#FF6B35" density={50} />

      {/* 噪点纹理 */}
      <div className="noise-overlay" />

      {/* 导航 */}
      <Navbar
        sounds={sounds}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        activeSection={activeSection}
      />

      {/* 主内容 */}
      <main className="relative z-10">
        <Hero sounds={sounds} />
        <About sounds={sounds} />
        <Projects sounds={sounds} />
        <Experience sounds={sounds} />
        <Contact sounds={sounds} />
      </main>
    </div>
  )
}
