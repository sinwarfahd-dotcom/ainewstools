'use client'

import { useState } from 'react'
import { 
  Trash2, 
  Star, 
  ExternalLink, 
  Edit3, 
  Loader2
} from 'lucide-react'
import { deleteTool, toggleFeatured, updateAffiliateUrl } from '../actions'

interface Tool {
  id: string
  name: string
  url: string
  isTrending: boolean
  category: string | null
}

export default function ToolsTable({ initialTools }: { initialTools: Tool[] }) {
  const [tools, setTools] = useState(initialTools)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this tool?')) return
    const res = await deleteTool(id)
    if (res.success) {
      setTools(tools.filter(t => t.id !== id))
    }
  }

  const handleToggle = async (id: string, status: boolean) => {
    setUpdatingId(id)
    const res = await toggleFeatured(id, status)
    if (res.success) {
      setTools(tools.map(t => t.id === id ? { ...t, isTrending: !status } : t))
    }
    setUpdatingId(null)
  }

  const handleUpdateUrl = async (id: string) => {
    const newUrl = prompt('Enter the new URL:', tools.find(t => t.id === id)?.url)
    if (newUrl) {
      const res = await updateAffiliateUrl(id, newUrl)
      if (res.success) {
        setTools(tools.map(t => t.id === id ? { ...t, url: newUrl } : t))
      }
    }
  }

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Tool / Identity</th>
          <th>Classification</th>
          <th style={{ textAlign: 'center' }}>Status</th>
          <th style={{ textAlign: 'center' }}>Reference</th>
          <th style={{ textAlign: 'right' }}>Operations</th>
        </tr>
      </thead>
      <tbody>
        {tools.map((tool) => (
          <tr key={tool.id}>
            <td>
              <div className="admin-tool-info">
                <div style={{ position: 'relative' }}>
                  <img 
                    src={`https://www.google.com/s2/favicons?domain=${new URL(tool.url).hostname}&sz=64`} 
                    alt={tool.name}
                    className="admin-tool-icon"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=10b981&color=fff`
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 700, color: '#fff' }}>{tool.name}</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>{new URL(tool.url).hostname}</span>
                </div>
              </div>
            </td>
            <td>
              <span className="admin-badge admin-badge-emerald">
                {tool.category || 'General AI'}
              </span>
            </td>
            <td style={{ textAlign: 'center' }}>
              <button 
                onClick={() => handleToggle(tool.id, tool.isTrending)}
                disabled={updatingId === tool.id}
                className="admin-btn-icon"
                style={{ margin: '0 auto', color: tool.isTrending ? 'var(--admin-emerald)' : '' }}
              >
                {updatingId === tool.id ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Star size={18} fill={tool.isTrending ? 'currentColor' : 'none'} />
                )}
              </button>
            </td>
            <td style={{ textAlign: 'center' }}>
              <a 
                href={tool.url} 
                target="_blank" 
                className="admin-btn-icon"
                style={{ margin: '0 auto' }}
              >
                <ExternalLink size={18} />
              </a>
            </td>
            <td>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                <button 
                  onClick={() => handleUpdateUrl(tool.id)}
                  className="admin-btn-icon"
                  title="Edit Metadata"
                >
                  <Edit3 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(tool.id)}
                  className="admin-btn-icon"
                  style={{ color: '#ef4444' }}
                  title="Remove Tool"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
