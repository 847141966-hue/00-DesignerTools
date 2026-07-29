import { useRef, useCallback, useEffect } from 'react'

// 使用 Web Audio API 生成程序化音效，无需外部音频文件
export function useSound() {
  const audioCtxRef = useRef(null)
  const enabledRef = useRef(true)

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx()
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }, [])

  const playTone = useCallback((type, config) => {
    if (!enabledRef.current) return
    const ctx = getCtx()
    if (!ctx) return

    const { freq, freqEnd, duration, volume, waveType } = config
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = waveType || 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    if (freqEnd) {
      osc.frequency.exponentialRampToValueAtTime(freqEnd, ctx.currentTime + duration)
    }

    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(volume || 0.15, ctx.currentTime + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration)
  }, [getCtx])

  const sounds = {
    // 滚动到新区块 — 沉闷冲击
    section: useCallback(() => {
      playTone('section', { freq: 80, freqEnd: 40, duration: 0.3, volume: 0.12, waveType: 'sine' })
      playTone('section2', { freq: 200, freqEnd: 100, duration: 0.15, volume: 0.06, waveType: 'triangle' })
    }, [playTone]),

    // 悬停 — 轻微金属碰撞
    hover: useCallback(() => {
      playTone('hover', { freq: 1200, freqEnd: 800, duration: 0.08, volume: 0.04, waveType: 'square' })
    }, [playTone]),

    // 点击 — 能量充能
    click: useCallback(() => {
      playTone('click', { freq: 400, freqEnd: 600, duration: 0.1, volume: 0.08, waveType: 'sawtooth' })
    }, [playTone]),

    // 翻牌 — 翻转 + 能量
    flip: useCallback(() => {
      playTone('flip1', { freq: 300, freqEnd: 900, duration: 0.2, volume: 0.1, waveType: 'sine' })
      setTimeout(() => {
        playTone('flip2', { freq: 900, freqEnd: 1200, duration: 0.1, volume: 0.06, waveType: 'triangle' })
      }, 100)
    }, [playTone]),

    // 导航切换 — 电子菜单音
    nav: useCallback(() => {
      playTone('nav', { freq: 600, freqEnd: 800, duration: 0.06, volume: 0.05, waveType: 'square' })
    }, [playTone]),

    // 开场墨水爆发
    intro: useCallback(() => {
      playTone('intro1', { freq: 60, freqEnd: 200, duration: 0.8, volume: 0.15, waveType: 'sine' })
      setTimeout(() => playTone('intro2', { freq: 800, freqEnd: 1600, duration: 0.3, volume: 0.08, waveType: 'triangle' }), 400)
    }, [playTone]),

    // K.O. 转场
    ko: useCallback(() => {
      playTone('ko1', { freq: 1000, freqEnd: 100, duration: 0.4, volume: 0.12, waveType: 'sawtooth' })
    }, [playTone]),
  }

  const toggle = useCallback(() => {
    enabledRef.current = !enabledRef.current
    return enabledRef.current
  }, [])

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close()
      }
    }
  }, [])

  return { sounds, toggle, isEnabled: () => enabledRef.current }
}
