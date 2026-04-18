'use client'

import { useState, useEffect } from 'react'
import { X, Save, Loader2 } from 'lucide-react'
import { createTool } from '../actions'

export default function AddToolModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDesc: '',
    url: '',
    pricing: 'FREEMIUM',
    category: '',
    emoji: '🤖',
    rating: '4.5',
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const res = await createTool(formData)
    
    if (res.success) {
      onClose()
      window.location.reload()
    } else {
      alert('Failed to add tool')
    }
    setLoading(false)
  }

  return (
    <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="admin-modal-content">
        {/* Top Glow Accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--admin-emerald), transparent)', opacity: 0.5 }} />

        <div className="admin-modal-header">
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>Add New AI Tool</h2>
            <div style={{ fontSize: '11px', color: 'var(--admin-emerald)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Global Directory Registry</div>
          </div>
          <button onClick={onClose} className="admin-btn-icon">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div className="admin-modal-body custom-scrollbar">
            <div className="admin-form-grid" style={{ marginBottom: '24px' }}>
              <div className="admin-form-group">
                <label className="admin-label">Product Name</label>
                <input
                  required
                  className="admin-input"
                  placeholder="e.g. ChatGPT"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Classification</label>
                <input
                  className="admin-input"
                  value={formData.category}
                  placeholder="e.g.: Chatbot, Video Gen"
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group" style={{ marginBottom: '24px' }}>
              <label className="admin-label">Short Catchphrase</label>
              <input
                className="admin-input"
                value={formData.shortDesc}
                placeholder="The most popular AI chatbot in the galaxy"
                onChange={e => setFormData({ ...formData, shortDesc: e.target.value })}
              />
            </div>

            <div className="admin-form-group" style={{ marginBottom: '24px' }}>
              <label className="admin-label">Product Description</label>
              <textarea
                required
                className="admin-textarea custom-scrollbar"
                placeholder="Detailed breakdown of capabilities..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-label">Product URL (Affiliate)</label>
                <input
                  required
                  type="url"
                  className="admin-input"
                  style={{ fontFamily: 'monospace', fontSize: '12px' }}
                  placeholder="https://openai.com"
                  value={formData.url}
                  onChange={e => setFormData({ ...formData, url: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Monetization Model</label>
                <select
                  className="admin-select"
                  value={formData.pricing}
                  onChange={e => setFormData({ ...formData, pricing: e.target.value })}
                >
                  <option value="FREE">FREE</option>
                  <option value="FREEMIUM">FREEMIUM</option>
                  <option value="PAID">PAID</option>
                </select>
              </div>
            </div>
          </div>

          <div className="admin-modal-footer">
            <button
              type="submit"
              disabled={loading}
              className="admin-btn-emerald"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              <span>Sync to Production</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '12px 24px', background: 'rgba(255, 255, 255, 0.05)', color: '#94a3b8', border: 'none', borderRadius: '14px', fontWeight: 700, cursor: 'pointer' }}
            >
              Discard Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
