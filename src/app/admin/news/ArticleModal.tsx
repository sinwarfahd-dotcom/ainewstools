'use client'

import { useState, useEffect } from 'react'
import { X, Save, Loader2, Image as ImageIcon, Upload } from 'lucide-react'
import { createArticle, updateArticle } from '../actions'

interface ArticleModalProps {
  isOpen: boolean
  onClose: () => void
  article?: any // The article to edit, if any
}

declare global {
  interface Window {
    cloudinary: any
  }
}

export default function ArticleModal({ isOpen, onClose, article }: ArticleModalProps) {
  const [loading, setLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  // Initialize state with default values
  const defaultFormData = {
    title: '',
    category: 'General',
    summary: '',
    content: '',
    source: '',
    author: 'Admin',
    emoji: '📰',
    imageUrl: '',
    publishedAt: '', 
  }

  const [formData, setFormData] = useState(defaultFormData)
  const [showPreview, setShowPreview] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Ensure client-side only mount for stability
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    if (article) {
      setFormData({
        title: article.title || '',
        category: article.category || 'General',
        summary: article.summary || '',
        content: article.content || '',
        source: article.source || '',
        author: article.author || 'Admin',
        emoji: article.emoji || '📰',
        imageUrl: article.imageUrl || '',
        publishedAt: article.publishedAt 
          ? new Date(article.publishedAt).toISOString().slice(0, 16) 
          : new Date().toISOString().slice(0, 16),
      })
    } else {
      setFormData({
        ...defaultFormData,
        publishedAt: new Date().toISOString().slice(0, 16),
      })
    }
  }, [article, isOpen])

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

  if (!mounted || !isOpen) return null

  const handleUpload = () => {
    if (!window.cloudinary) {
      alert('Cloudinary widget not loaded yet. Please wait a moment.')
      return
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'azzi-studio' 
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'azzi_news'

    setIsUploading(true)
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        multiple: false,
        maxFiles: 1,
        clientAllowedFormats: ["png", "jpeg", "jpg", "webp"],
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          setFormData({ ...formData, imageUrl: result.info.secure_url })
          setIsUploading(false)
        } else if (error) {
          setIsUploading(false)
        } else if (result.event === 'close') {
          setIsUploading(false)
        }
      }
    )
    widget.open()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    let res
    if (article) {
      res = await updateArticle(article.id, formData)
    } else {
      res = await createArticle(formData)
    }
    
    if (res.success) {
      onClose()
      window.location.reload()
    } else {
      alert(article ? 'Failed to update article' : 'Failed to create article')
    }
    setLoading(false)
  }

  return (
    <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="admin-modal-content">
        <div className="admin-modal-header">
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>
              {article ? 'Edit Article' : 'Publish New Article'}
            </h2>
            <div style={{ fontSize: '11px', color: 'var(--admin-emerald)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
              {article ? 'Update Studio' : 'Drafting Studio'}
            </div>
          </div>
          <button onClick={onClose} className="admin-btn-icon">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div className="admin-modal-body custom-scrollbar">
            <div className="admin-form-group" style={{ marginBottom: '24px' }}>
              <label className="admin-label">Article Title</label>
              <div className="admin-input-group">
                <input
                  required
                  className="admin-input"
                  placeholder="The Future of LLMs in 2026..."
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-grid" style={{ marginBottom: '24px' }}>
              <div className="admin-form-group">
                <label className="admin-label">Category</label>
                <select 
                  className="admin-select"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="General">General</option>
                  <option value="Tools">AI Tools</option>
                  <option value="Agents">AI Agents</option>
                  <option value="Generative">Generative AI</option>
                  <option value="Robotics">Robotics</option>
                  <option value="Research">Research</option>
                  <option value="Ethics">Ethics</option>
                  <option value="Security">Cybersecurity</option>
                  <option value="Business">Business</option>
                  <option value="Tutorials">Tutorials</option>
                </select>
              </div>
            </div>

            <div className="admin-form-grid" style={{ marginBottom: '24px' }}>
              <div className="admin-form-group">
                <label className="admin-label">Publish Date (Schedule)</label>
                <input
                  type="datetime-local"
                  className="admin-input"
                  value={formData.publishedAt}
                  onChange={e => setFormData({ ...formData, publishedAt: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Source / Link</label>
                <input
                  className="admin-input"
                  placeholder="https://openai.com/blog/..."
                  value={formData.source}
                  onChange={e => setFormData({ ...formData, source: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group" style={{ marginBottom: '24px' }}>
              <label className="admin-label">Image Configuration</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <input
                    className="admin-input"
                    placeholder="Image URL (Manual)..."
                    value={formData.imageUrl}
                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    style={{ marginBottom: '8px' }}
                  />
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="admin-btn-emerald"
                    style={{ width: '100%', justifyContent: 'center', background: 'rgba(16, 185, 129, 0.1)', border: '1px dashed var(--admin-emerald)', color: 'var(--admin-emerald)' }}
                  >
                    {isUploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                    <span style={{ fontSize: '12px' }}>Upload via Cloudinary</span>
                  </button>
                </div>
                {formData.imageUrl && (
                  <div style={{ width: '100px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--admin-border)', background: '#020617', flexShrink: 0 }}>
                    <img src={formData.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            </div>

            <div className="admin-form-group" style={{ marginBottom: '24px' }}>
              <label className="admin-label">Short Summary</label>
              <textarea
                required
                className="admin-textarea"
                style={{ minHeight: '80px' }}
                placeholder="A brief overview of what this article is about..."
                value={formData.summary}
                onChange={e => setFormData({ ...formData, summary: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="admin-label" style={{ margin: 0 }}>Content (Markdown)</label>
                <button 
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  style={{ background: 'none', border: 'none', color: 'var(--admin-emerald)', fontSize: '11px', fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase' }}
                >
                  {showPreview ? 'Show Editor' : 'Show Preview'}
                </button>
              </div>
              
              {!showPreview ? (
                <textarea
                  required
                  className="admin-textarea"
                  style={{ minHeight: '300px', fontFamily: 'monospace' }}
                  placeholder="Write your article here using Markdown..."
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                />
              ) : (
                <div 
                  className="admin-textarea" 
                  style={{ minHeight: '300px', background: 'rgba(2, 6, 23, 0.4)', color: '#e2e8f0', whiteSpace: 'pre-wrap', overflowY: 'auto', padding: '16px' }}
                >
                  {formData.content || <span style={{ color: '#475569' }}>Nothing to preview...</span>}
                </div>
              )}
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
              <span>{article ? 'Update Article' : 'Publish to Feed'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '12px 24px', background: 'rgba(255, 255, 255, 0.05)', color: '#94a3b8', border: 'none', borderRadius: '14px', fontWeight: 700, cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
