import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { profile } from '../data/content'

// HERO — 开场墨水爆发
export default function Hero({ sounds }) {
  const [loaded, setLoaded] = useState(false)
  const [showInk, setShowInk] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setShowInk(true), 200)
    const timer2 = setTimeout(() => {
      setLoaded(true)
      sounds.intro()
    }, 600)
    return () => { clearTimeout(timer1); clearTimeout(timer2) }
  }, [sounds])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 墨水爆发效果 */}
      {showInk && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0.8, rotate: 0 }}
              animate={{ scale: 4, opacity: 0, rotate: 45 * i }}
              transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeOut' }}
              className="absolute w-32 h-32 rounded-full"
              style={{
                background: i % 2 === 0 ? '#FF6B35' : '#0D0D0D',
                filter: 'blur(20px)',
              }}
            />
          ))}
          {/* 墨水溅射粒子 */}
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * Math.PI * 2
            const dist = 200 + Math.random() * 300
            return (
              <motion.div
                key={`splash-${i}`}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(angle) * dist,
                  y: Math.sin(angle) * dist,
                  opacity: 0,
                  scale: 0.3,
                }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                className="absolute w-2 h-2 rounded-full bg-flame-500"
              />
            )
          })}
        </div>
      )}

      {/* 背景大字 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 0.04 : 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute font-display font-black text-[20vw] leading-none tracking-tighter text-white select-none whitespace-nowrap"
      >
        FIGHT
      </motion.div>

      {/* 主内容 */}
      <div className="relative z-10 text-center px-6">
        {/* 标签线 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-flame-500" />
          <span className="font-display text-sm tracking-[0.3em] text-flame-500 uppercase">
            {profile.titleEn}
          </span>
          <div className="h-px w-12 bg-flame-500" />
        </motion.div>

        {/* 解构姓名 */}
        <h1 className="font-heavy font-black text-6xl md:text-8xl lg:text-9xl leading-none tracking-tight">
          <span className="block overflow-hidden">
            {profile.name.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: '100%', opacity: 0, rotateX: -90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1 + i * 0.08,
                  ease: 'easeOut',
                }}
                className="inline-block"
                style={{ transformOrigin: 'bottom' }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* 英文名 */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{
            opacity: loaded ? 1 : 0,
            letterSpacing: loaded ? '0.15em' : '0.5em',
          }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="font-display text-lg md:text-xl text-white/40 mt-4"
        >
          {profile.nameEn}
        </motion.div>

        {/* 标语 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="text-base md:text-lg text-white/60 mt-8 max-w-md mx-auto"
        >
          {profile.tagline}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 0.4 : 0 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="font-display text-sm text-white/30 mt-2"
        >
          {profile.taglineEn}
        </motion.p>
      </div>

      {/* 滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-display text-xs tracking-[0.3em] text-white/40 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-flame-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}
