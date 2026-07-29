import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Volume2, VolumeX } from 'lucide-react'
import { navItems } from '../data/content'

export default function Navbar({ sounds, soundEnabled, onToggleSound, activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(Math.min((scrollTop / docHeight) * 100, 100))
      setScrolled(scrollTop > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (id) => {
    sounds.nav()
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* 顶部导航 */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-ink-black/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          {/* Logo */}
          <div
            className="cursor-pointer group"
            onClick={() => handleClick('hero')}
          >
            <span className="font-display text-2xl font-bold tracking-wider text-flame-500 group-hover:text-flame-400 transition-colors">
              FIGHT
            </span>
            <span className="font-display text-2xl font-light tracking-wider text-white/60">
              .PORTFOLIO
            </span>
          </div>

          {/* 桌面菜单 */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                onMouseEnter={() => sounds.hover()}
                className={`clip-slash-r px-5 py-2 text-sm font-medium tracking-wider transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-flame-500 text-ink-black'
                    : 'text-white/70 hover:text-flame-500 hover:bg-white/5'
                }`}
              >
                <span className="font-display">{item.labelEn}</span>
                <span className="ml-1.5 text-xs opacity-60">{item.label}</span>
              </button>
            ))}

            {/* 音效开关 */}
            <button
              onClick={onToggleSound}
              onMouseEnter={() => sounds.hover()}
              className="ml-2 p-2 text-white/60 hover:text-flame-500 transition-colors"
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>

          {/* 移动端汉堡 */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 血条进度条 */}
        <div className="h-1 bg-white/5 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-flame-600 via-flame-500 to-gold-500 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-0 h-full w-1 bg-white/80 blur-sm"
            style={{ left: `${progress}%` }}
          />
        </div>
      </nav>

      {/* 移动端全屏菜单 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-ink-black/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                onClick={() => handleClick(item.id)}
                className="text-center"
              >
                <div className="font-display text-4xl font-bold text-flame-500">
                  {item.labelEn}
                </div>
                <div className="text-sm text-white/50 mt-1">{item.label}</div>
              </motion.button>
            ))}
            <button
              onClick={onToggleSound}
              className="mt-4 p-3 text-white/60"
            >
              {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
