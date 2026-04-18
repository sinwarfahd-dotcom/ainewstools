"use client"; // Trigger deployment

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getCatClass, getCatGrad } from './newsUtils';

export default function NewsClient({ initialNews }: { initialNews: any[] }) {
  const newsData = initialNews;
  const allCats = ["All", ...Array.from(new Set(newsData.map(n => n.cat)))];

  const [activeCat, setActiveCat] = useState("All");
  const [newsPage, setNewsPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const perPage = 8;

  const filteredNews = useMemo(() => {
    let list = [...newsData].filter(n => {
      const matchCat = activeCat === "All" || n.cat === activeCat;
      const q = searchQuery.toLowerCase();
      const matchQ = !q || n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q) || n.source.toLowerCase().includes(q);
      return matchCat && matchQ;
    });

    if (sortBy === "oldest") list.sort((a, b) => a.date.localeCompare(b.date));
    else if (sortBy === "source") list.sort((a, b) => a.source.localeCompare(b.source));
    return list;
  }, [activeCat, searchQuery, sortBy]);

  const featured = filteredNews.filter(n => n.featured).slice(0, 2);
  const featuredIds = new Set(featured.map(f => f.id));
  const filteredRest = filteredNews.filter(n => !featuredIds.has(n.id));

  const totalPages = Math.ceil(filteredRest.length / perPage);
  const paginated = filteredRest.slice((newsPage - 1) * perPage, newsPage * perPage);

  const gridItems = paginated.slice(0, 4);
  const listItems = paginated.slice(4);

  return (
    <div id="newsPage">
      <style dangerouslySetInnerHTML={{
        __html: `
        .page-hero{padding:48px 28px 36px;background:linear-gradient(180deg,#0a0f1e 0%,#030712 100%);border-bottom:1px solid var(--border);position:relative;overflow:hidden}
        .page-hero::before{content:'';position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:500px;height:300px;background:radial-gradient(ellipse,#6366f118 0%,transparent 70%);pointer-events:none}
        .page-badge{display:inline-flex;align-items:center;gap:6px;background:#0f172a;border:1px solid #6366f140;color:#a5b4fc;font-size:12px;padding:5px 12px;border-radius:100px;margin-bottom:16px}
        .pulse{width:6px;height:6px;background:#ef4444;border-radius:50%;animation:pulse 1.2s infinite}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.4)}}
        .page-title{font-size:36px;font-weight:800;background:linear-gradient(135deg,#fff 40%,#a5b4fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px}
        .page-sub{color:var(--text);font-size:14px;max-width:500px}
        
        .toolbar{display:flex;align-items:center;gap:12px;padding:16px 28px;border-bottom:1px solid var(--border);flex-wrap:wrap;background:#030712}
        .search-wrap{flex:1;min-width:180px;display:flex;align-items:center;gap:8px;background:#0f172a;border:1px solid var(--border);border-radius:9px;padding:9px 14px;transition:border-color .2s}
        .search-wrap:focus-within{border-color:#6366f1}
        .search-wrap input{background:transparent;border:none;color:#e2e8f0;font-size:13px;outline:none;width:100%}
        .search-wrap input::placeholder{color:#475569}
        .sort-sel{background:#0f172a;border:1px solid var(--border);color:#e2e8f0;padding:8px 12px;border-radius:8px;font-size:13px;outline:none;cursor:pointer}
        
        .cat-tabs{display:flex;gap:6px;padding:0 28px 16px;overflow-x:auto;scrollbar-width:none;border-bottom:1px solid var(--border); margin-top: 16px}
        .cat-tabs::-webkit-scrollbar{display:none}
        .tab{padding:6px 16px;border-radius:100px;font-size:12px;font-weight:500;border:1px solid var(--border);color:var(--text);cursor:pointer;white-space:nowrap;transition:all .2s;background:transparent}
        .tab:hover{border-color:#6366f1;color:#a5b4fc}
        .tab.active{background:#6366f1;color:white;border-color:#6366f1}
        
        .main-wrap{display:flex;gap:0;max-width:1200px;margin:0 auto;padding:0 28px}
        .news-col{flex:1;padding:28px 0;min-width:0}
        .sidebar-col{width:280px;min-width:280px;padding:28px 0 28px 28px;border-left:1px solid var(--border)}
        
        .featured-card{background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;cursor:pointer;margin-bottom:20px;transition:all .25s;display:flex;flex-direction:column;text-decoration:none}
        .featured-card:hover{border-color:#6366f140;transform:translateY(-2px)}
        .featured-img{height:220px;display:flex;align-items:center;justify-content:center;font-size:64px;position:relative}
        .featured-img .overlay{position:absolute;inset:0;background:linear-gradient(to top,#0f172a 0%,transparent 60%)}
        .featured-body{padding:20px}
        .news-cat-badge{display:inline-block;padding:3px 10px;border-radius:100px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.4px;margin-bottom:10px}
        .cat-general{background:#1e1035;color:#a78bfa}
        .cat-research{background:#0c2a1a;color:#4ade80}
        .cat-business{background:#1a2535;color:#60a5fa}
        .cat-ethics{background:#2a1a1a;color:#f87171}
        .cat-tools{background:#1a2e1a;color:#86efac}
        .cat-policy{background:#2a1e0a;color:#fbbf24}
        .cat-robotics{background:#0a2a2a;color:#22d3ee}
        .cat-healthcare{background:#1a1a2e;color:#c084fc}
        .featured-title{font-size:20px;font-weight:700;color:#e2e8f0;line-height:1.35;margin-bottom:10px}
        .featured-summary{font-size:13px;color:var(--text);line-height:1.65;margin-bottom:14px}
        .news-meta{display:flex;align-items:center;gap:12px;font-size:12px;color:#475569}
        .source-dot{width:6px;height:6px;border-radius:50%;background:#6366f1;display:inline-block}
        .read-more{color:#6366f1;font-size:12px;font-weight:500;cursor:pointer}
        .read-more:hover{color:#a5b4fc}
        
        .news-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px}
        .news-card{background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden;cursor:pointer;transition:all .22s;text-decoration:none;display:block}
        .news-card:hover{border-color:#6366f140;transform:translateY(-2px)}
        .news-card-img{height:120px;display:flex;align-items:center;justify-content:center;font-size:40px}
        .news-card-body{padding:14px}
        .news-card-title{font-size:13px;font-weight:600;color:#e2e8f0;line-height:1.4;margin-bottom:8px}
        .news-card-meta{display:flex;align-items:center;justify-content:space-between;font-size:11px;color:#475569}
        
        .news-list-item{display:flex;gap:14px;background:var(--card);border:1px solid var(--border);border-radius:10px;padding:14px;cursor:pointer;transition:all .2s;margin-bottom:10px;align-items:flex-start;text-decoration:none}
        .news-list-item:hover{border-color:#6366f140}
        .news-list-emoji{width:48px;height:48px;background:#060e1e;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
        .news-list-info{flex:1;min-width:0}
        .news-list-title{font-size:13px;font-weight:600;color:#e2e8f0;line-height:1.4;margin-bottom:5px}
        .news-list-meta{font-size:11px;color:#475569;display:flex;gap:10px}
        
        .sidebar-widget{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:18px;margin-bottom:18px}
        .widget-title{font-size:12px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:.6px;margin-bottom:14px}
        .trending-item{display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid #0f1a2e;cursor:pointer;text-decoration:none}
        .trending-item:last-child{border-bottom:none}
        .trend-num{font-size:14px;font-weight:700;color:#1e293b;width:20px;flex-shrink:0;line-height:1.4}
        .trend-title{font-size:12px;color:#94a3b8;line-height:1.4}
        .trend-title:hover{color:#a5b4fc}
        .tag-cloud{display:flex;flex-wrap:wrap;gap:6px}
        .topic-tag{padding:4px 10px;border-radius:100px;font-size:11px;border:1px solid var(--border);color:var(--text);cursor:pointer;transition:all .2s}
        .topic-tag:hover{border-color:#6366f1;color:#a5b4fc}
        .source-item{display:flex;align-items:center;gap:10px;padding:6px 0;font-size:13px;color:#94a3b8;cursor:pointer;border-bottom:1px solid #0f1a2e}
        .source-item:last-child{border-bottom:none}
        .source-icon{font-size:18px;width:28px;text-align:center}
        
        .pagination{display:flex;gap:6px;justify-content:center;margin-top:24px;padding-top:20px;border-top:1px solid var(--border)}
        .pg-btn{width:34px;height:34px;border:1px solid var(--border);border-radius:7px;cursor:pointer;font-size:12px;color:var(--text);background:transparent;display:flex;align-items:center;justify-content:center;transition:all .2s}
        .pg-btn:hover{border-color:#6366f1;color:#a5b4fc}
        .pg-btn.active{background:#6366f1;color:white;border-color:#6366f1}
        .results-info{color:var(--text);font-size:13px;margin-bottom:18px}
        .results-info span{color:#a5b4fc;font-weight:500}
        
        .empty-state{text-align:center;padding:60px 20px;color:var(--text)}
        .empty-icon{font-size:48px;margin-bottom:12px}
        @media(max-width:700px){.news-grid{grid-template-columns:1fr}.sidebar-col{display:none}.main-wrap{padding:0 16px}}
      `}} />

      <div className="page-hero">
        <div className="page-badge"><div className="pulse"></div> Live AI News</div>
        <div className="page-title">AI News Hub</div>
        <div className="page-sub">Stay ahead with the latest breakthroughs, tool launches, research, and industry developments in AI.</div>
      </div>

      <div className="toolbar">
        <div className="search-wrap">
          <span style={{ fontSize: '15px' }}>🔍</span>
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setNewsPage(1); }}
          />
        </div>
        <select className="sort-sel" value={sortBy} onChange={(e) => { setSortBy(e.target.value); setNewsPage(1); }}>
          <option value="newest">🕐 Newest First</option>
          <option value="oldest">📅 Oldest First</option>
          <option value="source">📰 By Source</option>
        </select>
      </div>

      <div className="cat-tabs">
        {allCats.map(c => (
          <div
            key={c}
            className={`tab ${activeCat === c ? 'active' : ''}`}
            onClick={() => { setActiveCat(c); setNewsPage(1); }}
          >
            {c} <span style={{ opacity: 0.6 }}>{c === "All" ? newsData.length : newsData.filter(n => n.cat === c).length}</span>
          </div>
        ))}
      </div>

      <div className="main-wrap">
        <div className="news-col">
          <div className="results-info">
            Showing <span>{filteredNews.length}</span> articles{activeCat !== "All" ? " in " + activeCat : ""}
          </div>

          {!filteredNews.length ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <div>No articles found matching your search.</div>
            </div>
          ) : (
            <>
              {newsPage === 1 && featured.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: featured.length > 1 ? '1fr 1fr' : '1fr', gap: '14px', marginBottom: '20px' }}>
                  {featured.map(n => (
                    <Link key={n.id} href={`/news/${n.slug}`} className="featured-card">
                      {n.imageUrl ? (
                        <div style={{ height: '220px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                          <img src={n.imageUrl} alt={n.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div className="overlay"></div>
                        </div>
                      ) : (
                        <div className="featured-img" style={{ background: `linear-gradient(135deg,${getCatGrad(n.cat)})` }}>
                          {n.emoji}<div className="overlay"></div>
                        </div>
                      )}
                      <div className="featured-body">
                        <div className={`news-cat-badge ${getCatClass(n.cat)}`}>{n.cat}</div>
                        <div className="featured-title">{n.title}</div>
                        <div className="featured-summary">{n.summary}</div>
                        <div className="news-meta">
                          <span className="source-dot"></span><span>{n.source}</span><span>·</span><span>{n.date}</span><span>·</span><span>{n.readTime}</span><span className="read-more">Read more →</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {gridItems.length > 0 && (
                <div className="news-grid">
                  {gridItems.map(n => (
                    <Link key={n.id} href={`/news/${n.slug}`} className="news-card">
                      {n.imageUrl ? (
                        <div style={{ height: '120px', width: '100%', overflow: 'hidden' }}>
                          <img src={n.imageUrl} alt={n.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ) : (
                        <div className="news-card-img" style={{ background: `linear-gradient(135deg,${getCatGrad(n.cat)})` }}>{n.emoji}</div>
                      )}
                      <div className="news-card-body">
                        <div className={`news-cat-badge ${getCatClass(n.cat)}`} style={{ marginBottom: '7px' }}>{n.cat}</div>
                        <div className="news-card-title">{n.title}</div>
                        <div className="news-card-meta"><span>{n.source}</span><span>{n.date}</span></div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {listItems.map(n => (
                <Link key={n.id} href={`/news/${n.slug}`} className="news-list-item">
                  {n.imageUrl ? (
                    <div style={{ width: '48px', height: '48px', overflow: 'hidden', borderRadius: '8px', flexShrink: 0 }}>
                      <img src={n.imageUrl} alt={n.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ) : (
                    <div className="news-list-emoji">{n.emoji}</div>
                  )}
                  <div className="news-list-info">
                    <div className={`news-cat-badge ${getCatClass(n.cat)}`} style={{ marginBottom: '5px' }}>{n.cat}</div>
                    <div className="news-list-title">{n.title}</div>
                    <div className="news-list-meta"><span>{n.source}</span><span>·</span><span>{n.date}</span><span>·</span><span>{n.readTime}</span></div>
                  </div>
                </Link>
              ))}
            </>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              {newsPage > 1 && <div className="pg-btn" onClick={() => { setNewsPage(newsPage - 1); window.scrollTo(0, 0); }}>‹</div>}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(i => (
                <div key={i} className={`pg-btn ${i === newsPage ? 'active' : ''}`} onClick={() => { setNewsPage(i); window.scrollTo(0, 0); }}>{i}</div>
              ))}
              {newsPage < totalPages && <div className="pg-btn" onClick={() => { setNewsPage(newsPage + 1); window.scrollTo(0, 0); }}>›</div>}
            </div>
          )}
        </div>

        <div className="sidebar-col">
          <div className="sidebar-widget">
            <div className="widget-title">🔥 Trending Now</div>
            <div>
              {newsData.slice(0, 6).map((n, i) => (
                <Link key={n.id} href={`/news/${n.slug}`} className="trending-item">
                  <span className="trend-num">{i + 1}</span>
                  <span className="trend-title">{n.title}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="sidebar-widget">
            <div className="widget-title">🏷️ Topics</div>
            <div className="tag-cloud">
              {["GPT-5", "Claude 4", "Gemini", "Regulation", "Open Source", "Vision AI", "Agents", "Safety", "Multimodal", "Edge AI", "RAG", "Fine-tuning"].map(t => (
                <span key={t} className="topic-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="sidebar-widget">
            <div className="widget-title">📰 Top Sources</div>
            <div>
              {[{ e: "🤖", n: "OpenAI Blog" }, { e: "🔬", n: "DeepMind" }, { e: "📰", n: "MIT CSAIL" }, { e: "🏛️", n: "Stanford HAI" }, { e: "📊", n: "Reuters" }].map(s => (
                <div key={s.n} className="source-item"><span className="source-icon">{s.e}</span>{s.n}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
