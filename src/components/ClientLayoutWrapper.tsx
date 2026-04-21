'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Plus } from 'lucide-react'
import LogoIcon from './LogoIcon'
import Footer from './Footer'

export default function ClientLayoutWrapper({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .nav-btn-desktop { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        .mobile-menu-btn { 
          display: none; 
          background: transparent; 
          border: 1px solid var(--border); 
          color: white; 
          padding: 8px; 
          border-radius: 10px; 
          cursor: pointer; 
          z-index: 1001;
        }
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: #020617;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          padding: 100px 32px;
          gap: 24px;
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mobile-link {
          font-size: 24px;
          font-weight: 700;
          color: white;
          text-decoration: none;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border);
        }
      `}} />

      {!isAdmin && (
        <nav className="nav">
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span className="logo" style={{ display: 'flex' }}>
                <LogoIcon />
                AI News Tools
              </span>
            </Link>
          </div>
          
          <div className="nav-links" style={{ display: 'flex', gap: '24px', alignItems: 'center', justifyContent: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none', color: pathname === '/' ? '#fff' : 'var(--text)', fontWeight: pathname === '/' ? '600' : '400' }}>Home</Link>
            <Link href="/tools" style={{ textDecoration: 'none', color: pathname === '/tools' ? '#fff' : 'var(--text)', fontWeight: pathname === '/tools' ? '600' : '400' }}>Tools</Link>
            <Link href="/news" style={{ textDecoration: 'none', color: pathname === '/news' ? '#fff' : 'var(--text)', fontWeight: pathname === '/news' ? '600' : '400' }}>News</Link>
            <Link href="/compare" style={{ textDecoration: 'none', color: pathname === '/compare' ? '#fff' : 'var(--text)', fontWeight: pathname === '/compare' ? '600' : '400' }}>Compare</Link>
            <Link href="/contact" style={{ textDecoration: 'none', color: pathname === '/contact' ? '#fff' : 'var(--text)', fontWeight: pathname === '/contact' ? '600' : '400' }}>Contact</Link>
          </div>

          <div style={{ flex: 1, display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Link href="/submit" className="nav-btn nav-btn-desktop" style={{ textDecoration: 'none' }}>Submit Tool</Link>
            <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="mobile-overlay">
              <Link href="/" className="mobile-link">Home</Link>
              <Link href="/tools" className="mobile-link">Explore Tools</Link>
              <Link href="/news" className="mobile-link">AI News</Link>
              <Link href="/compare" className="mobile-link">Comparison Tool</Link>
              <Link href="/contact" className="mobile-link">Contact Us</Link>
              <Link href="/submit" className="nav-btn" style={{ textDecoration: 'none', justifyContent: 'center', fontSize: '18px', padding: '16px' }}>Submit Your Tool</Link>
            </div>
          )}
        </nav>
      )}

      {children}

      {!isAdmin && <Footer />}
    </>
  )
}
