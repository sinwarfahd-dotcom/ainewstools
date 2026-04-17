'use client'

import { useState } from 'react'
import NewsHeader from './NewsHeader'
import NewsList from './NewsList'
import ArticleModal from './ArticleModal'

export default function NewsAdminContent({ articles }: { articles: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<any>(null)

  const handleAdd = () => {
    setEditingArticle(null)
    setIsModalOpen(true)
  }

  const handleEdit = (article: any) => {
    setEditingArticle(article)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="animate-admin">
        <NewsHeader onAdd={handleAdd} />

        <div style={{ position: 'relative', zIndex: 10 }}>
          <NewsList 
            initialArticles={articles} 
            onEdit={handleEdit}
          />
        </div>
      </div>

      <ArticleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        article={editingArticle}
      />
    </>
  )
}
