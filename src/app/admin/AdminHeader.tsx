'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import AddToolModal from './tools/AddToolModal'

export default function AdminHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h1 className="admin-title">Command Center</h1>
        <p className="admin-subtitle">
          <span style={{ color: 'var(--admin-emerald)', fontWeight: 700 }}>Overview</span> — Monitoring platform activity and assets
        </p>
      </div>

      <AddToolModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}
