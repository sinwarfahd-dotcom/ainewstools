"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Grid, List, ChevronDown, Plus, ExternalLink } from 'lucide-react';
import { Tool, PricingPlan } from '@/types';

const pricingOptions = ["All", "Free", "Freemium", "Paid", "Open Source"];
const ratingOptions = [0, 4.5, 4, 3.5];

function getCatIcon(c: string) { const m: any = { All: "🔮", Chatbot: "💬", "Image Gen": "🎨", Coding: "💻", Video: "🎬", Search: "🔍", Music: "🎵", Audio: "🎙️", Productivity: "📊", Writing: "✍️", Design: "🖌️", Research: "🔬", Translation: "🌐", "Data Science": "📈", Cybersecurity: "🛡️", Healthcare: "🏥", Finance: "💰", HR: "👥", "E-commerce": "🛒", Robotics: "🤖", Entertainment: "🎭", "Real Estate": "🏠", Travel: "✈️", Gaming: "🎮", Biotech: "🧬", Hardware: "🔧", Sports: "⚽", Fashion: "👗", Food: "🍳", "Mental Health": "🧠", Insurance: "🛡️", Enterprise: "🏢", Automotive: "🚗", "Pet Tech": "🐾", Weather: "🌦️", "Supply Chain": "📦", Energy: "⚡", Accessibility: "♿", Legal: "⚖️", "Customer Support": "🎧", "3D": "🧊", Marketing: "📢", Sales: "💼", Education: "🎓", Agriculture: "🌾", Construction: "🏗️", "Health & Fitness": "💪" }; return m[c] || "🛠️"; }
function getPricingBadge(p: string) { const m: any = { free: "badge-free", paid: "badge-paid", freemium: "badge-freemium", "open-source": "badge-open" }; return m[p] || "badge-free"; }
function getPricingLabel(p: string) { const m: any = { free: "Free", paid: "Paid", freemium: "Freemium", "open-source": "Open Source" }; return m[p.toLowerCase()] || p; }

export default function ToolsClient({ initialTools }: { initialTools: Tool[] }) {
  const allTools = initialTools;
  const categories = Array.from(new Set(allTools.map((t: Tool) => t.cat)));

  const searchParams = useSearchParams();
  const initialCat = searchParams.get('c') || "All";

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [activePricing, setActivePricing] = useState("all");
  const [activeRating, setActiveRating] = useState(0);
  const [currentView, setCurrentView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const selectedTool = selectedToolId ? allTools.find((x: Tool) => x.id === selectedToolId) : null;

  // Sync category if URL changes (optional but good for UX)
  useEffect(() => {
    const c = searchParams.get('c');
    if (c) setActiveCategory(c);
  }, [searchParams]);

  // Escape key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedToolId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const perPage = 12;

  const filteredTools = useMemo(() => {
    let list = allTools.filter((t: Tool) => {
      const matchCat = activeCategory === "All" || t.cat === activeCategory;
      const matchPrice = activePricing === "all" || t.pricing === activePricing.toLowerCase().replace(" ", "-");
      const matchRating = t.rating >= activeRating;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.tags.some((tag: string) => tag.toLowerCase().includes(q));
      return matchCat && matchPrice && matchRating && matchSearch;
    });

    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "newest") list.sort((a, b) => b.added.localeCompare(a.added));
    else if (sortBy === "popular") list.sort((a, b) => parseFloat(b.visits) - parseFloat(a.visits));

    return list;
  }, [activeCategory, activePricing, activeRating, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredTools.length / perPage);
  const paginatedTools = filteredTools.slice((currentPage - 1) * perPage, currentPage * perPage);

  const clearFilters = () => {
    setActiveCategory("All");
    setActivePricing("all");
    setActiveRating(0);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const getCatCount = (cat: string) => {
    if (cat === "All") return allTools.length;
    return allTools.filter(t => t.cat === cat).length;
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html:`
        .page-header{padding:40px 28px 24px;border-bottom:1px solid var(--border)}
        .page-title{font-size:32px;font-weight:800;background:linear-gradient(135deg,#fff,#a5b4fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px}
        .page-sub{color:var(--text);font-size:14px}
        
        .search-bar{display:flex;gap:12px;padding:20px 28px;border-bottom:1px solid var(--border);align-items:center;flex-wrap:wrap}
        .search-input-wrap{flex:1;min-width:200px;display:flex;align-items:center;gap:10px;background:#0f172a;border:1px solid var(--border);border-radius:10px;padding:10px 16px;transition:border-color .2s}
        .search-input-wrap:focus-within{border-color:#6366f1}
        .search-input-wrap input{background:transparent;border:none;color:#e2e8f0;font-size:14px;outline:none;flex:1;width:100%}
        .search-input-wrap input::placeholder{color:#475569}
        .view-toggle{display:flex;gap:4px;background:#0f172a;border:1px solid var(--border);border-radius:8px;padding:4px}
        .view-btn{padding:6px 12px;border-radius:5px;border:none;background:transparent;color:var(--text);cursor:pointer;font-size:13px;transition:all .2s}
        .view-btn.active{background:#6366f1;color:white}
        .sort-select{background:#0f172a;border:1px solid var(--border);color:#e2e8f0;padding:9px 14px;border-radius:8px;font-size:13px;cursor:pointer;outline:none}
        
        .main-layout{display:flex;gap:0}
        .sidebar{width:260px;min-width:260px;border-right:1px solid var(--border);padding:24px 20px;max-height:calc(100vh - 180px);overflow-y:auto;scrollbar-width:thin;scrollbar-color:#1e293b transparent}
        .sidebar-section{margin-bottom:28px}
        .sidebar-title{font-size:11px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:.8px;margin-bottom:12px}
        .filter-item{display:flex;align-items:center;justify-content:space-between;padding:7px 10px;border-radius:7px;cursor:pointer;transition:all .2s;margin-bottom:2px}
        .filter-item:hover{background:#0f172a}
        .filter-item.active{background:#1e1035;color:#a5b4fc}
        .filter-label{display:flex;align-items:center;gap:8px;font-size:13px;color:#94a3b8}
        .filter-item.active .filter-label{color:#a5b4fc}
        .filter-count{font-size:11px;color:#475569;background:#0f172a;padding:2px 7px;border-radius:100px}
        .filter-item.active .filter-count{background:#6366f120;color:#a5b4fc}
        .pricing-pills{display:flex;flex-wrap:wrap;gap:6px}
        .pricing-pill{padding:5px 12px;border-radius:100px;font-size:12px;border:1px solid var(--border);color:var(--text);cursor:pointer;transition:all .2s;background:transparent}
        .pricing-pill:hover{border-color:#6366f1;color:#a5b4fc}
        .pricing-pill.active{background:#6366f1;color:white;border-color:#6366f1}
        .clear-btn{width:100%;background:transparent;border:1px solid var(--border);color:var(--text);padding:8px;border-radius:8px;font-size:12px;cursor:pointer;transition:all .2s;margin-top:8px}
        .clear-btn:hover{border-color:#6366f1;color:#a5b4fc}
        
        .content{flex:1;padding:24px 28px;overflow:hidden}
        .results-bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:8px}
        .results-count{font-size:13px;color:var(--text)}
        .results-count span{color:#a5b4fc;font-weight:500}
        .active-filters{display:flex;gap:6px;flex-wrap:wrap}
        .active-filter{display:flex;align-items:center;gap:4px;background:#1e1035;border:1px solid #6366f130;color:#a5b4fc;padding:3px 10px;border-radius:100px;font-size:11px}
        .active-filter span{cursor:pointer;color:#6366f1}
        
        .tools-list{display:flex;flex-direction:column;gap:10px}
        .list-card{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:14px 18px;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:16px}
        .list-card:hover{border-color:#6366f140}
        .list-info{flex:1}
        .list-name{font-size:14px;font-weight:600;color:#e2e8f0;margin-bottom:3px}
        .list-desc{font-size:12px;color:var(--text)}
        .list-meta{display:flex;align-items:center;gap:10px;flex-shrink:0}
        
        .modal-overlay{position:fixed;inset:0;background:#00000090;z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px)}
        .modal{background:#0d1526;border:1px solid #1e293b;border-radius:18px;max-width:680px;width:100%;max-height:85vh;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#1e293b transparent}
        .modal-header{padding:24px 24px 0;display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px}
        .modal-close{background:transparent;border:1px solid var(--border);color:var(--text);width:40px;height:40px;border-radius:10px;cursor:pointer;font-size:20px;display:flex;align-items:center;justify-content:center;transition:all .2s;z-index:10}
        .modal-close:hover{background:#1e293b;border-color:#6366f1;color:#a5b4fc}
        .modal-body{padding:0 24px 24px}
        .modal-icon{font-size:48px;margin-bottom:12px}
        .modal-name{font-size:24px;font-weight:700;color:#e2e8f0;margin-bottom:4px}
        .modal-tagline{color:#6366f1;font-size:14px;margin-bottom:16px}
        .modal-desc{color:var(--text);font-size:14px;line-height:1.7;margin-bottom:20px}
        .modal-section{margin-bottom:20px}
        .modal-section-title{font-size:12px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px}
        .pros-cons{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .pro-item{display:flex;align-items:flex-start;gap:6px;font-size:12px;color:#94a3b8;margin-bottom:6px}
        .pro-item::before{content:"✓";color:#4ade80;font-weight:700;flex-shrink:0}
        .con-item{display:flex;align-items:flex-start;gap:6px;font-size:12px;color:#94a3b8;margin-bottom:6px}
        .con-item::before{content:"✗";color:#f87171;font-weight:700;flex-shrink:0}
        .pricing-table{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
        .price-plan{background:#060e1e;border:1px solid var(--border);border-radius:10px;padding:14px;text-align:center}
        .price-plan.popular{border-color:#6366f1}
        .plan-name{font-size:12px;color:var(--text);margin-bottom:6px}
        .plan-price{font-size:22px;font-weight:700;color:#e2e8f0;margin-bottom:4px}
        .plan-note{font-size:11px;color:#475569}
        .modal-actions{display:flex;gap:10px;margin-top:24px}
        .btn-primary{background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;color:white;padding:11px 24px;border-radius:9px;font-size:13px;cursor:pointer;font-weight:500;flex:1;text-align:center}
        .btn-secondary{background:transparent;border:1px solid var(--border);color:var(--text);padding:11px 20px;border-radius:9px;font-size:13px;cursor:pointer;transition:all .2s}
        .btn-secondary:hover{border-color:#6366f1;color:#a5b4fc}
        
        .pagination{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:32px;padding-top:24px;border-top:1px solid var(--border)}
        .page-btn{width:36px;height:36px;display:flex;align-items:center;justify-content:center;border:1px solid var(--border);border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);background:transparent;transition:all .2s}
        .page-btn:hover{border-color:#6366f1;color:#a5b4fc}
        .page-btn.active{background:#6366f1;color:white;border-color:#6366f1}
        
        .empty{text-align:center;padding:60px;color:var(--text)}
        .empty-icon{font-size:48px;margin-bottom:16px}
        @media(max-width:700px){.sidebar{display:none}.main-layout{flex-direction:column}.tools-grid{grid-template-columns:1fr}}
      `}} />

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const ToolSkeleton = () => (
    <div className="tool-card" style={{ opacity: 0.6, cursor: 'default' }}>
      <div className="tool-top">
        <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: '12px' }}></div>
        <div style={{ flex: 1 }}>
          <div className="skeleton" style={{ width: '60%', height: '16px', marginBottom: '8px' }}></div>
          <div className="skeleton" style={{ width: '40%', height: '12px' }}></div>
        </div>
      </div>
      <div className="skeleton" style={{ width: '100%', height: '40px', marginBottom: '16px' }}></div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <div className="skeleton" style={{ width: '60px', height: '20px', borderRadius: '100px' }}></div>
        <div className="skeleton" style={{ width: '60px', height: '20px', borderRadius: '100px' }}></div>
      </div>
      <div className="tool-footer" style={{ marginTop: '20px' }}>
        <div className="skeleton" style={{ width: '80px', height: '24px' }}></div>
        <div className="skeleton" style={{ width: '60px', height: '24px' }}></div>
      </div>
    </div>
  );

  return (
    <>
      <div className="page-header">
        <div className="page-title">AI Tools Directory</div>
        <div className="page-sub">Discover 1,200+ AI tools across every category — filtered, rated, and reviewed.</div>
      </div>

      <div className="search-bar">
        <div className="search-input-wrap">
          <span style={{fontSize: '16px'}}>🔍</span>
          <input 
            type="text" 
            placeholder="Search 1,200+ AI tools..." 
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="rating">★ Top Rated</option>
          <option value="newest">🆕 Newest</option>
          <option value="popular">🔥 Most Popular</option>
          <option value="name">🔤 A-Z</option>
        </select>
        <div className="view-toggle">
          <button className={`view-btn ${currentView === 'grid' ? 'active' : ''}`} onClick={() => setCurrentView('grid')}>⊞ Grid</button>
          <button className={`view-btn ${currentView === 'list' ? 'active' : ''}`} onClick={() => setCurrentView('list')}>☰ List</button>
        </div>
      </div>

      <div className="main-layout">
        <div className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">Categories</div>
            <div>
              {["All", ...categories].map(c => (
                <div key={c} className={`filter-item ${activeCategory === c ? 'active' : ''}`} onClick={() => { setActiveCategory(c); setCurrentPage(1); }}>
                  <span className="filter-label">{getCatIcon(c)} {c}</span>
                  <span className="filter-count">{getCatCount(c)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-title">Pricing</div>
            <div className="pricing-pills">
              {pricingOptions.map(p => (
                <div key={p} className={`pricing-pill ${activePricing === p.toLowerCase().replace(" ", "-") || (p==='All' && activePricing === 'all') ? 'active' : ''}`} onClick={() => { setActivePricing(p.toLowerCase().replace(" ", "-")); setCurrentPage(1); }}>
                  {p}
                </div>
              ))}
            </div>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-title">Min Rating</div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
              <div className={`filter-item ${activeRating === 0 ? 'active' : ''}`} onClick={() => { setActiveRating(0); setCurrentPage(1); }}><span className="filter-label">All ratings</span></div>
              <div className={`filter-item ${activeRating === 4.5 ? 'active' : ''}`} onClick={() => { setActiveRating(4.5); setCurrentPage(1); }}><span className="filter-label">★ 4.5+</span></div>
              <div className={`filter-item ${activeRating === 4.0 ? 'active' : ''}`} onClick={() => { setActiveRating(4.0); setCurrentPage(1); }}><span className="filter-label">★ 4.0+</span></div>
              <div className={`filter-item ${activeRating === 3.5 ? 'active' : ''}`} onClick={() => { setActiveRating(3.5); setCurrentPage(1); }}><span className="filter-label">★ 3.5+</span></div>
            </div>
          </div>
          <button className="clear-btn" onClick={clearFilters}>✕ Clear All Filters</button>
        </div>

        <div className="content">
          <div className="results-bar">
            <div className="results-count">Showing <span>{filteredTools.length}</span> tools</div>
            <div className="active-filters">
              {activeCategory !== "All" && <div className="active-filter">{activeCategory} <span onClick={() => setActiveCategory('All')}>✕</span></div>}
              {activePricing !== "all" && <div className="active-filter">{getPricingLabel(activePricing)} <span onClick={() => setActivePricing('all')}>✕</span></div>}
              {activeRating > 0 && <div className="active-filter">★ {activeRating}+ <span onClick={() => setActiveRating(0)}>✕</span></div>}
              {searchQuery && <div className="active-filter">"{searchQuery}" <span onClick={() => setSearchQuery('')}>✕</span></div>}
            </div>
          </div>

          {!isMounted ? (
            <div className="tools-grid">
              {[...Array(6)].map((_, i) => <ToolSkeleton key={i} />)}
            </div>
          ) : !paginatedTools.length ? (
            <div className="empty">
              <div className="empty-icon">🔍</div>
              <div>No tools found matching your filters.</div>
              <button onClick={clearFilters} style={{marginTop:'16px', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', border:'none', color:'white', padding:'10px 24px', borderRadius:'8px', cursor:'pointer', fontSize:'13px'}}>Clear Filters</button>
            </div>
          ) : currentView === "grid" ? (
            <div className="tools-grid">
              {paginatedTools.map((t, i) => (
                <div key={t.id} style={{height: '100%'}}>
                  <div className={`tool-card ${i < 2 && currentPage === 1 ? 'featured' : ''}`} onClick={() => setSelectedToolId(t.id)} style={{height: '100%'}}>
                    {i < 2 && currentPage === 1 && <div className="featured-badge">Featured</div>}
                    <div className="tool-top">
                      <img src={`https://www.google.com/s2/favicons?sz=128&domain_url=${t.url}`} className="tool-icon-img" alt={t.name} onError={(e) => { e.currentTarget.style.display='none'; (e.currentTarget.nextElementSibling as HTMLElement).style.display='flex'; }} />
                      <div className="tool-icon" style={{display: 'none'}}>{t.icon}</div>
                      <div style={{flex: 1}}>
                        <div className="tool-name">{t.name}</div>
                        <div className="tool-cat">{t.cat}</div>
                      </div>
                    </div>
                    <div className="tool-desc">{t.desc}</div>
                    <div className="tool-tags">{t.tags.slice(0,3).map((tag: string) => <span key={tag} className="tool-tag">{tag}</span>)}</div>
                    <div className="tool-footer" style={{marginTop: 'auto'}}>
                      <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                        <span className={`badge ${getPricingBadge(t.pricing)}`}>{getPricingLabel(t.pricing)}</span>
                        <span className="stars">★ {t.rating}</span>
                      </div>
                      <div className="card-actions" onClick={e => e.stopPropagation()}>
                        <button className="save-btn">♡</button>
                        <a href={t.url} target="_blank" rel="noopener noreferrer" className="visit-btn" style={{textDecoration: 'none'}}>Visit &rarr;</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="tools-list">
              {paginatedTools.map(t => (
                <div key={t.id} className="list-card" onClick={() => setSelectedToolId(t.id)}>
                  <img src={`https://www.google.com/s2/favicons?sz=128&domain_url=${t.url}`} className="tool-icon-img" alt={t.name} onError={(e) => { e.currentTarget.style.display='none'; (e.currentTarget.nextElementSibling as HTMLElement).style.display='flex'; }} />
                  <div className="tool-icon" style={{display: 'none'}}>{t.icon}</div>
                  <div className="list-info">
                    <div className="list-name">{t.name} <span style={{fontSize:'11px', color:'#6366f1', fontWeight:500}}>{t.cat}</span></div>
                    <div className="list-desc">{t.desc}</div>
                  </div>
                  <div className="list-meta">
                    <span className={`badge ${getPricingBadge(t.pricing)}`}>{getPricingLabel(t.pricing)}</span>
                    <span className="stars">★ {t.rating}</span>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                      <a href={t.url} target="_blank" rel="noopener noreferrer" className="visit-btn" onClick={e => e.stopPropagation()}>Visit &rarr;</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              {currentPage > 1 && <div className="page-btn" onClick={() => setCurrentPage(currentPage - 1)}>‹</div>}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(i => {
                if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
                  return <div key={i} className={`page-btn ${i === currentPage ? 'active' : ''}`} onClick={() => setCurrentPage(i)}>{i}</div>
                } else if (Math.abs(i - currentPage) === 2) {
                  return <div key={i} className="page-btn" style={{cursor:'default'}}>…</div>
                }
                return null;
              })}
              {currentPage < totalPages && <div className="page-btn" onClick={() => setCurrentPage(currentPage + 1)}>›</div>}
            </div>
          )}
        </div>
      </div>

      {selectedTool && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSelectedToolId(null); }}>
          <div className="modal">
            <div className="modal-header">
              <div></div>
              <button className="modal-close" onClick={() => setSelectedToolId(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-icon">{selectedTool.icon}</div>
              <div className="modal-name">{selectedTool.name}</div>
              <div className="modal-tagline">{selectedTool.cat} · {getPricingLabel(selectedTool.pricing)} · ★ {selectedTool.rating}</div>
              <div className="modal-desc">{selectedTool.long || selectedTool.desc}</div>
              
              <div className="modal-section">
                <div className="modal-section-title">Tags</div>
                <div style={{display:'flex', gap:'6px', flexWrap:'wrap'}}>
                  {selectedTool.tags.map((tag: string) => <span key={tag} className="tool-tag" style={{fontSize:'12px', padding:'4px 10px'}}>{tag}</span>)}
                </div>
              </div>

              {selectedTool.pros && selectedTool.pros.length > 0 && (
                <div className="modal-section">
                  <div className="modal-section-title">Pros & Cons</div>
                  <div className="pros-cons">
                    <div>{selectedTool.pros.map((p: string) => <div key={p} className="pro-item">{p}</div>)}</div>
                    <div>{selectedTool.cons?.map((c: string) => <div key={c} className="con-item">{c}</div>)}</div>
                  </div>
                </div>
              )}

              {selectedTool.plans && selectedTool.plans.length > 0 && (
                <div className="modal-section">
                  <div className="modal-section-title">Pricing Plans</div>
                  <div className="pricing-table">
                    {selectedTool.plans.map((p: PricingPlan, i: number) => (
                      <div key={p.name} className={`price-plan ${i === 1 ? 'popular' : ''}`}>
                        <div className="plan-name">{p.name}</div>
                        <div className="plan-price">{p.price}</div>
                        <div className="plan-note">{p.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <a 
                  href={selectedTool.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary"
                  style={{ textDecoration: 'none' }}
                >
                  🚀 Visit {selectedTool.name}
                </a>
                <button className="btn-secondary">♡ Save</button>
                <button className="btn-secondary" onClick={() => {
                  navigator.clipboard.writeText(window.location.href + '?id=' + selectedTool.id);
                  alert('Link copied to clipboard!');
                }}>↗ Share</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
