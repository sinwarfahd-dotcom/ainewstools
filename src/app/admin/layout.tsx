'use client'

import React from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { usePathname, useRouter } from 'next/navigation'
import { 
  BarChart3, 
  Wrench, 
  Newspaper, 
  LayoutDashboard,
  LogOut,
  Zap
} from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const navLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Manage Tools', icon: Wrench, href: '/admin/tools' },
    { name: 'Manage News', icon: Newspaper, href: '/admin/news' },
  ]

  return (
    <div className="admin-layout">
      {/* Cloudinary Widget Script */}
      <Script src="https://widget.cloudinary.com/v2.0/global/all.js" strategy="lazyOnload" />

      {/* Background Ambient Glows */}
      <div className="admin-glow-green" style={{ top: '-10%', left: '-10%' }} />
      <div className="admin-glow-green" style={{ bottom: '-10%', right: '-10%', opacity: 0.5 }} />

      {/* Fixed Sidebar */}
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-sidebar-logo">
          <span className="admin-stat-icon" style={{ marginBottom: 0, width: 44, height: 44, display: 'flex' }}>
            <Zap size={24} className="text-white fill-white" />
          </span>
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 800, color: '#fff', fontSize: '18px', letterSpacing: '-0.5px' }}>AI News</span>
            <span style={{ fontSize: '10px', color: 'var(--admin-emerald)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Admin Pro</span>
          </span>
        </Link>

        <nav className="admin-nav">
          <div style={{ fontSize: '10px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '2px', padding: '0 20px', marginBottom: '12px' }}>Navigation</div>
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <link.icon size={20} />
                <span>{link.name}</span>
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: '32px' }}>
          <button 
            onClick={handleLogout}
            className="admin-nav-item"
            style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', justifySelf: 'flex-end', color: '#ef4444' }}
          >
            <LogOut size={18} />
            <span style={{ fontWeight: 700 }}>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <main className="admin-main custom-scrollbar">
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          {children}
        </div>
      </main>
    </div>
  )
}
