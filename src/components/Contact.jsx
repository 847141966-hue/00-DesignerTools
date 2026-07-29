import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MessageCircle, Github, Palette, ArrowUp } from 'lucide-react'
import { contact } from '../data/content'

// 联系方式 — 召唤仪式
export default function Contact({ sounds }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    sounds.click()
    navigator.clipboard.writeText(contact.email).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToTop = () => {
    sounds.ko()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const iconMap = {
    github: Github,
    palette: Palette,
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-6 overflow-hidden"
    >
      {/* 背景大字 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.04 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute font-display font-black text-[18vw] leading-none tracking-tighter text-white select-none whitespace-nowrap"
      >
        CONNECT
      </motion.div>

      {/* 内容 */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 标签 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-flame-500" />
          <span className="font-display text-sm tracking-[0.3em] text-flame-500 uppercase">
            04 / CONNECT
          </span>
          <div className="h-px w-12 bg-flame-500" />
        </motion.div>

        {/* 大标题 */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heavy font-black text-5xl md:text-7xl text-white leading-none"
        >
          建立<span className="text-flame-500">连接</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.5 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-display text-sm md:text-base text-white/50 mt-4 tracking-wider"
        >
          READY TO FIGHT TOGETHER?
        </motion.p>

        {/* 邮箱 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <button
            onClick={handleCopy}
            onMouseEnter={() => sounds.hover()}
            className="group inline-flex items-center gap-3 clip-slash-both bg-ink-dark/80 border border-flame-500/30 hover:border-flame-500/60 px-6 md:px-8 py-4 transition-colors"
          >
            <Mail size={20} className="text-flame-500" />
            <span className="text-white text-sm md:text-base font-medium">
              {contact.email}
            </span>
            <span className="text-xs text-white/40 group-hover:text-flame-500 transition-colors">
              {copied ? '已复制!' : '点击复制'}
            </span>
          </button>
        </motion.div>

        {/* 微信 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-4"
        >
          <div className="inline-flex items-center gap-2 text-white/40 text-sm">
            <MessageCircle size={16} className="text-volt-500" />
            <span>微信: {contact.wechat}</span>
          </div>
        </motion.div>

        {/* 社交链接 — 六角形按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center justify-center gap-4 mt-8"
        >
          {contact.socials.map((social, i) => {
            const Icon = iconMap[social.icon] || Github
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sounds.hover()}
                onClick={() => sounds.click()}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="clip-hexagon w-14 h-14 bg-ink-dark border border-white/10 hover:border-flame-500 hover:bg-flame-500/10 flex items-center justify-center transition-colors"
                title={social.name}
              >
                <Icon size={22} className="text-white/60 group-hover:text-flame-500" />
              </motion.a>
            )
          })}
        </motion.div>
      </div>

      {/* 页脚 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4"
      >
        {/* REMATCH 按钮 */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => sounds.hover()}
          className="clip-slash-r px-6 py-2 bg-flame-500/10 border border-flame-500/40 text-flame-500 hover:bg-flame-500 hover:text-ink-black transition-colors text-sm font-medium"
        >
          <span className="font-display tracking-wider flex items-center gap-2">
            <ArrowUp size={14} />
            REMATCH
          </span>
        </button>

        {/* 版权 */}
        <p className="text-white/20 text-xs font-display tracking-wider">
          © {new Date().getFullYear()} FIGHT.PORTFOLIO — ALL RIGHTS RESERVED
        </p>
      </motion.div>
    </section>
  )
}
