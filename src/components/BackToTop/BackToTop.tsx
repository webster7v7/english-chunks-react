import { useScrollPosition } from '../../hooks'
import './BackToTop.css'

interface BackToTopProps {
  showThreshold?: number
}

export function BackToTop({ showThreshold = 300 }: BackToTopProps) {
  const scrollPosition = useScrollPosition()
  const isVisible = scrollPosition > showThreshold

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      className={`back-to-top ${isVisible ? 'show' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      title="返回顶部"
    >
      ↑
    </button>
  )
}
