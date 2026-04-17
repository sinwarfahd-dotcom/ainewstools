'use client'

import { Plus } from 'lucide-react'

export default function NewsHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="admin-header">
      <div>
        <h1 className="admin-title">News Management</h1>
        <p className="admin-subtitle">Monitor and publish the latest breakthroughs in Artificial Intelligence.</p>
      </div>
      
      <button 
        onClick={onAdd}
        className="admin-btn-emerald"
      >
        <Plus size={20} />
        <span>Add New Post</span>
      </button>
    </div>
  )
}
