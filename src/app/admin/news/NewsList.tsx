'use client'

import { Trash2, Edit2, ExternalLink, Calendar } from 'lucide-react'
import { deleteArticle } from '../actions'

export default function NewsList({ 
  initialArticles, 
  onEdit 
}: { 
  initialArticles: any[], 
  onEdit: (article: any) => void 
}) {
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      const res = await deleteArticle(id)
      if (res.success) {
        window.location.reload()
      } else {
        alert('Failed to delete')
      }
    }
  }

  if (initialArticles.length === 0) {
    return (
      <div className="admin-card" style={{ textAlign: 'center', padding: '100px 40px', borderStyle: 'dashed' }}>
        <p style={{ color: '#64748b' }}>No articles found. Start by adding your first post!</p>
      </div>
    )
  }

  return (
    <div className="admin-stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
      {initialArticles.map((article) => (
        <div key={article.id} className="admin-card" style={{ display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
          {/* Header Image or Gradient */}
          {article.imageUrl ? (
            <div style={{ height: '160px', width: '100%', overflow: 'hidden' }}>
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div style={{ height: '8px', background: 'linear-gradient(90deg, var(--admin-emerald), #059669)' }} />
          )}
          
          <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="admin-badge admin-badge-emerald">
                  {article.category || 'General'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => onEdit(article)}
                  className="admin-btn-icon"
                  style={{ color: 'var(--admin-emerald)' }}
                  title="Edit Article"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(article.id)}
                  className="admin-btn-icon"
                  style={{ color: '#f43f5e' }}
                  title="Delete Article"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', lineHeight: 1.4 }}>
              {article.title}
            </h3>

            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
              {article.summary}
            </p>

            <div style={{ borderTop: '1px solid var(--admin-border)', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '12px' }}>
                <Calendar size={12} />
                <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              
              <a 
                href={`/news/${article.slug}`} 
                target="_blank"
                className="admin-btn-icon"
                title="View Live"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
