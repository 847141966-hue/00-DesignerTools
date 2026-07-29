import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experiences } from '../data/content'

// 经历 — 战斗编年史
export default function Experience({ sounds }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section
      id="experience"
      ref={ref}
      className="relative min-h-screen py-20 px-6"
    >
      {/* 区块标题 */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3">
          <span className="font-display text-flame-500 text-sm tracking-[0.3em]">03 / RECORD</span>
          <div className="h-px w-16 bg-flame-500/50" />
        </div>
        <h2 className="font-heavy font-black text-4xl md:text-6xl text-white mt-3">
          战斗<span className="text-flame-500">编年史</span>
        </h2>
        <p className="font-display text-white/40 text-sm mt-2 tracking-wider">BATTLE CHRONICLE</p>
      </motion.div>

      {/* 时间线 */}
      <div className="relative max-w-4xl mx-auto">
        {/* 中央能量线 */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-flame-500/0 via-flame-500/50 to-flame-500/0 md:-translate-x-px" />

        {experiences.map((exp, i) => {
          const isLeft = i % 2 === 0
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
              onViewportEnter={() => sounds.section()}
              className={`relative flex items-start gap-6 mb-12 ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* 节点 */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.2, type: 'spring' }}
                  className="w-4 h-4 bg-flame-500 rotate-45 glow-flame"
                />
              </div>

              {/* 内容卡片 */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div
                  onMouseEnter={() => sounds.hover()}
                  className="group bg-ink-dark/60 border border-white/10 hover:border-flame-500/40 transition-colors p-5 md:p-6 clip-slash-r"
                >
                  {/* 回合标号 */}
                  <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
                    <span className="font-display text-flame-500 text-xs tracking-[0.2em]">
                      ROUND {exp.round}
                    </span>
                    <span className="text-white/30 text-xs">{exp.period}</span>
                  </div>

                  {/* 组织 + 职位 */}
                  <h3 className="font-heavy font-bold text-xl text-white">
                    {exp.org}
                  </h3>
                  <p className="text-flame-500 text-sm mt-1">{exp.role}</p>

                  {/* 描述 */}
                  <p className="text-white/60 text-sm leading-relaxed mt-3">
                    {exp.description}
                  </p>

                  {/* 战绩 */}
                  <div className={`flex items-center gap-2 mt-4 ${isLeft ? 'md:justify-end' : ''}`}>
                    <div className="h-px w-6 bg-gold-500" />
                    <span className="font-display text-gold-500 text-xs tracking-wider">
                      {exp.achievement}
                    </span>
                  </div>

                  {/* 连招表标签 */}
                  <div className={`flex flex-wrap gap-1.5 mt-4 ${isLeft ? 'md:justify-end' : ''}`}>
                    {exp.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-xs bg-white/5 text-white/50 border border-white/10 group-hover:border-flame-500/20 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 空白占位 */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
