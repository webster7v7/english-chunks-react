import { useState, useEffect } from 'react'
import './BackToTop.css'

interface BackToTopProps {
  showThreshold?: number
}

export function BackToTop({ showThreshold = 200 }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Always show on mobile, show based on threshold on desktop
      if (isMobile) {
        setIsVisible(true)
      } else {
        setIsVisible(currentScrollY > showThreshold)
      }
    }

    // Set initial state
    checkMobile()
    handleScroll()

    // Add scroll listener with throttling
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    const handleResize = () => {
      checkMobile()
      handleScroll()
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [showThreshold, isMobile])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      className={`back-to-top ${isVisible ? 'show' : 'hide'} ${isMobile ? 'mobile' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      title="返回顶部"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
      </svg>
    </button>
  )
}
