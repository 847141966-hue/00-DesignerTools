import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react'
import { projects } from '../data/content'

// 渐变封面占位图
function CoverImage({ cover, color, title }) {
  const gradients = {
    'gradient-1': 'from-flame-600 via-flame-500 to-gold-500',
    'gradient-2': 'from-volt-600 via-volt-500 to-blue-500',
    'gradient-3': 'from-gold-500 via-flame-500 to-flame-700',
    'gradient-4': 'from-flame-700 via-red-700 to-ink-deep',
    'gradient-5': 'from-volt-500 via-volt-600 to-ink-deep',
    'gradient-6': 'from-gold-400 via-gold-500 to-flame-600',
  }
  const gradient = gradients[cover] || gradients['gradient-1']

  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} relative overflow-hidden`}>
      {/* 装饰线条 */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 40px)`,
      }} />
      {/* 大字标题 */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <span className="font-heavy font-black text-4xl md:text-5xl text-white/20 text-center leading-tight">
          {title}
        </span>
      </div>
      {/* 角标 */}
      <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white/20 rotate-45" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-white/20 rotate-45" />
    </div>
  )
}

export default function Projects({ sounds }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [category, setCategory] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [direction, setDirection] = useState(0)

  const filtered = category === 'all'
    ? projects
    : projects.filter(p => p.category === category)

  const current = filtered[currentIndex] || filtered[0]

  const handleCategoryChange = (cat) => {
    sounds.click()
    setCategory(cat)
    setCurrentIndex(0)
  }

  const navigate = (dir) => {
    sounds.flip()
    setDirection(dir)
    setCurrentIndex(prev => {
      const len = filtered.length
      return (prev + dir + len) % len
    })
  }

  const openProject = (project) => {
    sounds.flip()
    setSelectedProject(project)
  }

  return (
    <section
      id="projects"
      ref={ref}
      className="relative min-h-screen py-20 px-6 overflow-hidden"
    >
      {/* 区块标题 */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <span className="font-display text-flame-500 text-sm tracking-[0.3em]">02 / WORKS</span>
          <div className="h-px w-16 bg-flame-500/50" />
        </div>
        <h2 className="font-heavy font-black text-4xl md:text-6xl text-white mt-3">
          作品<span className="text-flame-500">集</span>
        </h2>
        <p className="font-display text-white/40 text-sm mt-2 tracking-wider">SELECT YOUR FIGHTER</p>
      </motion.div>

      {/* 分类切换 */}
      <div className="flex gap-2 mb-8">
        {[
          { id: 'all', label: '全部', labelEn: 'ALL' },
          { id: 'design', label: '设计', labelEn: 'DESIGN' },
          { id: 'illustration', label: '插画', labelEn: 'ART' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            onMouseEnter={() => sounds.hover()}
            className={`clip-slash-r px-5 py-2 text-sm font-medium transition-all duration-300 ${
              category === cat.id
                ? 'bg-flame-500 text-ink-black'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <span className="font-display tracking-wider">{cat.labelEn}</span>
            <span className="ml-1.5 text-xs">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 主展示区 */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
        {/* 大图展示 */}
        <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden group">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current?.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80, rotateY: direction * 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -direction * 80, rotateY: -direction * 15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => openProject(current)}
            >
              <CoverImage cover={current?.cover} color={current?.color} title={current?.title} />

              {/* 悬停遮罩 */}
              <div className="absolute inset-0 bg-ink-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-display text-flame-500 text-lg tracking-wider mb-2">VIEW DETAIL</div>
                  <div className="text-white/60 text-sm">点击查看详情</div>
                </div>
              </div>

              {/* 年份标 */}
              <div className="absolute top-4 left-4 clip-slash-r bg-ink-black/80 px-3 py-1">
                <span className="font-display text-gold-500 text-sm">{current?.year}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 导航箭头 */}
          <button
            onClick={() => navigate(-1)}
            onMouseEnter={() => sounds.hover()}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-ink-black/60 hover:bg-flame-500 transition-colors flex items-center justify-center z-10"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button
            onClick={() => navigate(1)}
            onMouseEnter={() => sounds.hover()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-ink-black/60 hover:bg-flame-500 transition-colors flex items-center justify-center z-10"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>

        {/* 项目信息 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="font-display text-flame-500 text-sm">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-white/30 text-sm">/</span>
              <span className="font-display text-white/40 text-sm">
                {String(filtered.length).padStart(2, '0')}
              </span>
            </div>

            <h3 className="font-heavy font-bold text-3xl md:text-4xl text-white mb-4">
              {current?.title}
            </h3>

            <p className="text-white/60 leading-relaxed mb-6">
              {current?.description}
            </p>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mb-6">
              {current?.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs bg-white/5 text-white/50 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 查看详情按钮 */}
            <button
              onClick={() => openProject(current)}
              onMouseEnter={() => sounds.hover()}
              className="clip-slash-r self-start px-6 py-3 bg-flame-500 text-ink-black font-medium text-sm hover:bg-flame-400 transition-colors flex items-center gap-2"
            >
              <span className="font-display tracking-wider">VIEW DETAIL</span>
              <ExternalLink size={14} />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 缩略图底栏 — 仿角色选择 */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="font-display text-xs text-white/30 tracking-wider px-2">SELECT FIGHTER</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {filtered.map((project, i) => (
            <button
              key={project.id}
              onClick={() => { sounds.flip(); setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i) }}
              onMouseEnter={() => sounds.hover()}
              className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 overflow-hidden transition-all duration-300 ${
                i === currentIndex
                  ? 'ring-2 ring-flame-500 scale-105'
                  : 'ring-1 ring-white/10 opacity-50 hover:opacity-80'
              }`}
            >
              <CoverImage cover={project.cover} color={project.color} title="" />
              {i === currentIndex && (
                <div className="absolute inset-0 bg-flame-500/20" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 详情弹窗 */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { sounds.click(); setSelectedProject(null) }}
            className="fixed inset-0 z-[60] bg-ink-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.8, rotateY: -15, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.8, rotateY: 15, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
              className="bg-ink-dark border border-flame-500/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* 弹窗头部 */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <CoverImage cover={selectedProject.cover} color={selectedProject.color} title={selectedProject.title} />
                <button
                  onClick={() => { sounds.click(); setSelectedProject(null) }}
                  className="absolute top-4 right-4 w-10 h-10 bg-ink-black/60 hover:bg-flame-500 transition-colors flex items-center justify-center"
                >
                  <X size={20} className="text-white" />
                </button>
                <div className="absolute bottom-4 left-4 clip-slash-r bg-ink-black/80 px-3 py-1">
                  <span className="font-display text-gold-500 text-sm">{selectedProject.year}</span>
                </div>
              </div>

              {/* 弹窗内容 */}
              <div className="p-6 md:p-8">
                <h3 className="font-heavy font-bold text-3xl text-white mb-4">
                  {selectedProject.title}
                </h3>
                <p className="text-white/70 leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {/* 连招表标签 */}
                <div className="mb-6">
                  <div className="font-display text-xs text-flame-500 tracking-wider mb-2">COMBO LIST</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span
                        key={tag}
                        className="clip-slash-r px-3 py-1 text-xs bg-flame-500/10 text-flame-400 border border-flame-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 占位画廊提示 */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="aspect-video bg-white/5 border border-white/10 flex items-center justify-center">
                      <span className="text-white/20 text-xs">图片 {n}</span>
                    </div>
                  ))}
                </div>
                <p className="text-white/30 text-xs mt-3 text-center">替换为真实作品图片</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
