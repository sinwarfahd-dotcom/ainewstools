'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import LogoIcon from './LogoIcon'
import Footer from './Footer'

export default function ClientLayoutWrapper({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  return (
    <>
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
          
          <div className="nav-links" style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'var(--text)' }}>Home</Link>
            <Link href="/tools" style={{ textDecoration: 'none', color: 'var(--text)' }}>Tools</Link>
            <Link href="/news" style={{ textDecoration: 'none', color: 'var(--text)' }}>News</Link>
            <Link href="/compare" style={{ textDecoration: 'none', color: 'var(--text)' }}>Compare Tools</Link>
            <Link href="/about" style={{ textDecoration: 'none', color: 'var(--text)' }}>About Us</Link>
            <Link href="/contact" style={{ textDecoration: 'none', color: 'var(--text)' }}>Contact Us</Link>
          </div>

          <div style={{ flex: 1, display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Link href="/submit" className="nav-btn" style={{ textDecoration: 'none' }}>Submit Tool</Link>
          </div>
        </nav>
      )}

      {children}

      {!isAdmin && <Footer />}
    </>
  )
}
