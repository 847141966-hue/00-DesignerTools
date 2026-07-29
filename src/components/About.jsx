import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { profile } from '../data/content'

// 关于我 — 角色档案
export default function About({ sounds }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const [typedText, setTypedText] = useState('')
  const [typingDone, setTypingDone] = useState(false)

  // 打字机效果
  useEffect(() => {
    if (!inView) return
    let i = 0
    const text = profile.bio
    const timer = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
        setTypingDone(true)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [inView])

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 px-6"
    >
      {/* 区块标题 */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="absolute top-24 left-6 md:left-12"
      >
        <div className="flex items-center gap-3">
          <span className="font-display text-flame-500 text-sm tracking-[0.3em]">01 / ABOUT</span>
          <div className="h-px w-16 bg-flame-500/50" />
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-20 max-w-5xl w-full items-center">
        {/* 左侧：角色档案卡 */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          {/* 八角形头像框 */}
          <div className="relative">
            <div className="clip-octagon w-48 h-48 md:w-56 md:h-56 bg-gradient-to-br from-flame-600 to-flame-800 p-1">
              <div className="clip-octagon w-full h-full bg-ink-dark flex items-center justify-center overflow-hidden">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-heavy font-black text-6xl text-flame-500/30">
                    {profile.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>
            {/* 等级标签 */}
            <div className="absolute -bottom-2 -right-2 clip-slash-r bg-gold-500 px-4 py-1">
              <span className="font-display font-bold text-ink-black text-sm">
                LV.{profile.level}
              </span>
            </div>
          </div>

          {/* 角色信息 */}
          <div className="mt-6 text-center">
            <h3 className="font-heavy font-bold text-2xl text-white">{profile.name}</h3>
            <p className="font-display text-flame-500 text-sm tracking-wider mt-1">
              {profile.titleEn}
            </p>
          </div>

          {/* 等级血条 */}
          <div className="mt-4 w-full max-w-xs">
            <div className="flex justify-between text-xs text-white/40 mb-1">
              <span>{profile.levelLabel}</span>
              <span className="font-display">{profile.level} YEARS</span>
            </div>
            <div className="h-2 bg-white/10 rounded-sm overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${profile.level * 10}%` } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-flame-600 to-gold-500"
              />
            </div>
          </div>

          {/* 技能血条 */}
          <div className="mt-6 w-full max-w-xs space-y-3">
            {profile.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              >
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/60">{skill.name}</span>
                  <span className="font-display text-flame-500">{skill.level}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-sm overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                    className="h-full bg-gradient-to-r from-flame-500 to-flame-400"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 右侧：对话框简介 */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative"
        >
          {/* 对话框 */}
          <div className="clip-slash-both bg-ink-dark/80 border border-flame-500/30 p-6 md:p-8 min-h-[280px]">
            {/* 对话框头部 */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-flame-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-gold-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-volt-500" />
              </div>
              <span className="font-display text-xs text-white/40 tracking-wider ml-2">
                CHARACTER PROFILE
              </span>
            </div>

            {/* 打字机内容 */}
            <p className={`text-white/80 leading-relaxed text-sm md:text-base ${!typingDone ? 'typewriter-cursor' : ''}`}>
              {typedText}
            </p>

            {/* 标签 */}
            {typingDone && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap gap-2 mt-6"
              >
                {profile.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    onMouseEnter={() => sounds.hover()}
                    className="clip-slash-r px-3 py-1 text-xs font-medium bg-flame-500/10 text-flame-400 border border-flame-500/30 cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </div>

          {/* 对话框指示器 */}
          <div className="absolute -left-2 top-12 w-4 h-4 bg-ink-dark/80 border-l border-b border-flame-500/30 rotate-45" />
        </motion.div>
      </div>
    </section>
  )
}
