'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import AddToolModal from './AddToolModal'

export default function ToolsHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <header className="admin-header" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h1 className="admin-title">Tools Directory</h1>
          <p className="admin-subtitle">
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--admin-emerald)', marginRight: '8px', boxShadow: '0 0 10px var(--admin-emerald)' }}></span>
            Manage and curate your AI ecosystem
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="admin-btn-emerald"
        >
          <Plus size={20} />
          <span>Submit New Tool</span>
        </button>
      </header>

      <AddToolModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}
