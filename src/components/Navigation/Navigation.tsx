import { useState, useEffect } from 'react'
import type { NavItem } from '../../data/types'
import { useStickyNav } from '../../hooks'
import { DropdownMenu } from './DropdownMenu'
import './Navigation.css'

interface NavigationProps {
  items: NavItem[]
  activeSection?: string
}

export function Navigation({ items, activeSection }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const isNavVisible = useStickyNav()

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && isMobile) {
        const nav = document.querySelector('.navbar-menu')
        const toggle = document.querySelector('.navbar-toggle')
        const target = event.target as Node
        
        if (nav && toggle && !nav.contains(target) && !toggle.contains(target)) {
          setIsMobileMenuOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen, isMobile])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobile && isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobile, isMobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      // Calculate offset for sticky navigation
      const navHeight = isMobile ? 60 : 100
      const elementPosition = element.offsetTop - navHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className={`nav-container ${isNavVisible ? 'visible' : 'hidden'}`}>
      <div className="nav-content">
        {/* Mobile menu title */}
        {isMobile && (
          <div className="nav-title">
            <span>英语兔 | 200个黄金语块</span>
          </div>
        )}

        <button
          className={`navbar-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          {isMobile && (
            <div className="mobile-menu-header">
              <h3>导航菜单</h3>
            </div>
          )}
          
          {items.map((item) => (
            <DropdownMenu
              key={item.id}
              item={item}
              isActive={activeSection?.startsWith(item.id) || false}
              onNavClick={handleNavClick}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}
