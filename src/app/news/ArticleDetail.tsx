'use client'

import Link from 'next/link';
import { getCatClass, getCatGrad } from './newsUtils';

interface ArticleDetailProps {
  article: any;
  relatedArticles: any[];
}

export default function ArticleDetail({ article, relatedArticles }: ArticleDetailProps) {
  if (!article) return null;

  return (
    <div id="articlePage">
      <style dangerouslySetInnerHTML={{
        __html: `
        .article-wrap{max-width:780px;margin:0 auto;padding:40px 28px}
        .back-btn{display:inline-flex;align-items:center;gap:6px;color:var(--text);font-size:13px;cursor:pointer;margin-bottom:28px;transition:color .2s;text-decoration:none}
        .back-btn:hover{color:#a5b4fc}
        .article-header{margin-bottom:28px}
        .article-img{height:320px;background:linear-gradient(135deg,#1e1035,#0c1a2e);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:80px;margin-bottom:28px}
        .article-title{font-size:30px;font-weight:800;color:#e2e8f0;line-height:1.25;margin-bottom:14px}
        .article-meta{display:flex;align-items:center;gap:16px;font-size:13px;color:#475569;margin-bottom:20px;flex-wrap:wrap}
        .article-summary{font-size:16px;color:#a5b4fc;font-weight:500;line-height:1.6;padding:16px 20px;background:#0f172a;border-left:3px solid #6366f1;border-radius:0 10px 10px 0;margin-bottom:28px}
        .article-body{font-size:14px;color:#94a3b8;line-height:1.9}
        .article-body p{margin-bottom:18px}
        .article-body h3{font-size:18px;font-weight:600;color:#e2e8f0;margin:28px 0 12px}
        .article-body blockquote{border-left:3px solid #6366f1;padding:12px 18px;background:#0a1020;border-radius:0 8px 8px 0;margin:20px 0;color:#a5b4fc;font-style:italic}
        .article-tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:28px;padding-top:20px;border-top:1px solid var(--border)}
        .article-tag{padding:4px 12px;border-radius:100px;border:1px solid var(--border);color:var(--text);font-size:12px}
        .share-row{display:flex;gap:8px;margin-top:20px}
        .share-btn{padding:8px 16px;border-radius:8px;border:1px solid var(--border);color:var(--text);font-size:12px;cursor:pointer;background:transparent;transition:all .2s}
        .share-btn:hover{border-color:#6366f1;color:#a5b4fc}
        .related-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px}
        .related-card{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:14px;cursor:pointer;transition:all .2s;text-decoration:none;display:block}
        .related-card:hover{border-color:#6366f140;transform:translateY(-2px)}
        .related-emoji{font-size:24px;margin-bottom:8px}
        .related-title{font-size:12px;font-weight:500;color:#e2e8f0;line-height:1.4}
      `}} />
      <div className="article-wrap">
        <Link href="/news" className="back-btn">← Back to News</Link>
        <div className="article-header">
          {article.imageUrl ? (
            <div style={{ height: '320px', width: '100%', marginBottom: '28px', borderRadius: '16px', overflow: 'hidden' }}>
              <img src={article.imageUrl} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <div className="article-img" style={{ background: `linear-gradient(135deg,${getCatGrad(article.cat)})` }}>{article.emoji}</div>
          )}
          <div className={`news-cat-badge ${getCatClass(article.cat)}`}>{article.cat}</div>
          <div className="article-title">{article.title}</div>
          <div className="article-meta">
            <span>📰 {article.source}</span>
            <span>✍️ {article.author}</span>
            <span>📅 {article.date}</span>
            <span>⏱️ {article.readTime}</span>
          </div>
          <div className="article-summary">{article.summary}</div>
        </div>
        <div className="article-body" dangerouslySetInnerHTML={{ __html: article.body || '<p>Full content not available.</p>' }} />
        <div className="article-tags">
          {article.tags && article.tags.map((t: string) => <span key={t} className="article-tag">{t}</span>)}
        </div>
        <div className="share-row">
          <button className="share-btn">🐦 Twitter</button>
          <button className="share-btn">💼 LinkedIn</button>
          <button className="share-btn" onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }}>🔗 Copy Link</button>
          <button className="share-btn">📧 Email</button>
        </div>
        <div style={{ marginTop: '40px', paddingTop: '28px', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#e2e8f0', marginBottom: '16px' }}>Related Articles</div>
          <div className="related-grid">
            {relatedArticles.map(n => (
              <Link key={n.id} href={`/news/${n.slug}`} className="related-card" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="related-emoji">{n.emoji}</div>
                <div className={`news-cat-badge ${getCatClass(n.cat)}`} style={{ marginBottom: '7px', fontSize: '10px' }}>{n.cat}</div>
                <div className="related-title">{n.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
