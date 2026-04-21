"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, ExternalLink, ArrowRight } from 'lucide-react';
import { Tool, Article } from '@/types';

export default function HomeClient({ initialTools, initialNews }: { initialTools: Tool[], initialNews: Article[] }) {
  const tools = initialTools;
  const news = initialNews;
  const cats = [
    {icon:"💬",name:"Chatbots",count:145},
    {icon:"🎨",name:"Image Gen",count:98},
    {icon:"🎬",name:"Video AI",count:67},
    {icon:"💻",name:"Coding",count:112},
    {icon:"✍️",name:"Writing",count:134},
    {icon:"📊",name:"Productivity",count:89},
  ];

  const pricingColors: Record<string, string> = { free: "badge-free", paid: "badge-paid", freemium: "badge-freemium" };

  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);
  const [counter4, setCounter4] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.desc.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const animateCount = (setFn: any, end: number) => {
      let start = 0;
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepIncrement = end / steps;
      const intervalTime = duration / steps;

      const t = setInterval(() => {
        start += stepIncrement;
        if (start >= end) {
          setFn(Math.floor(end));
          clearInterval(t);
        } else {
          setFn(Math.floor(start));
        }
      }, intervalTime);
    };

    const timer = setTimeout(() => {
      animateCount(setCounter1, 1247); // Real count or target
      animateCount(setCounter2, 850);
      animateCount(setCounter3, 46);
      animateCount(setCounter4, 95);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null; // Avoid hydration flash for stats

  return (
    <>
        <div className="hero">
          <div className="hero-badge"><div className="pulse"></div> 1,200+ AI Tools Indexed</div>
          <h1>Discover the Best <br/> AI Tools & News</h1>
          <p className="hero-sub">Your ultimate directory for AI tools, daily news, and everything happening in the world of artificial intelligence.</p>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search AI tools, news, categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              className="search-btn"
              onClick={() => document.getElementById('trending-tools')?.scrollIntoView({ behavior: 'smooth' })}
            >Search</button>
          </div>
          <div className="search-tags">
            {[
              { label: "Image Generation", icon: "🎨" },
              { label: "Chatbots", icon: "💬" },
              { label: "Video AI", icon: "🎬" },
              { label: "Coding", icon: "💻" },
              { label: "Writing", icon: "✍️" },
              { label: "Productivity", icon: "📊" },
              { label: "Audio & Voice", icon: "🎵" },
              { label: "Search", icon: "🔍" },
              { label: "Research", icon: "🧬" },
              { label: "Legal", icon: "⚖️" }
            ].map(tag => (
              <button 
                key={tag.label} 
                className="tag" 
                style={{ cursor: 'pointer', border: 'none', background: 'rgba(99, 102, 241, 0.1)', color: '#a5b4fc', transition: 'all 0.2s' }}
                onClick={() => {
                  setSearchQuery(tag.label);
                  document.getElementById('trending-tools')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {tag.icon} {tag.label}
              </button>
            ))}
          </div>
        </div>

        <div className="stats">
          <div className="stat"><div className="stat-num">{counter1.toLocaleString()}+</div><div className="stat-label">AI Tools</div></div>
          <div className="stat"><div className="stat-num">{counter2.toLocaleString()}+</div><div className="stat-label">News Articles</div></div>
          <div className="stat"><div className="stat-num">{counter3.toLocaleString()}+</div><div className="stat-label">Categories</div></div>
          <div className="stat"><div className="stat-num">{counter4.toLocaleString()}K+</div><div className="stat-label">Monthly Users</div></div>
        </div>

        <div className="section" id="trending-tools">
          <div className="trending-bar">
            {['GPT-4o','Midjourney','Sora','Cursor','Suno','Perplexity','Claude','Gemini'].map((t,i) => (
              <button 
                key={t} 
                className="trend-chip"
                style={{ cursor: 'pointer', border: 'none', background: 'transparent', color: 'inherit' }}
                onClick={() => {
                  setSearchQuery(t);
                  document.getElementById('trending-tools')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                🔥 {t} <span className="trend-num">#{i+1}</span>
              </button>
            ))}
          </div>
          <div className="section-header">
            <div className="section-title">🔥 Trending AI Tools</div>
            <Link href="/tools" className="see-all">See all &rarr;</Link>
          </div>
          
          <div className="tools-grid">
            {filteredTools.map(t => (
              <div key={t.name} className="tool-card">
                <div className="tool-top">
                  <img src={`https://www.google.com/s2/favicons?sz=128&domain_url=${t.url}`} className="tool-icon-img" alt={t.name} onError={(e) => { e.currentTarget.style.display='none'; (e.currentTarget.nextElementSibling as HTMLElement).style.display='flex'; }} />
                  <div className="tool-icon" style={{display: 'none'}}>{t.icon}</div>
                  <div>
                    <div className="tool-name">{t.name}</div>
                    <div className="tool-desc">{t.desc}</div>
                  </div>
                </div>
                <div className="tool-tags">
                  {t.tags.slice(0,3).map((tag: string) => (
                     <span key={tag} className="tool-tag">{tag}</span>
                  ))}
                </div>
                <div className="tool-footer">
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <span className={`badge ${pricingColors[t.pricing]}`}>{t.pricing.charAt(0).toUpperCase() + t.pricing.slice(1)}</span>
                    <span className="stars">★ {t.rating}</span>
                  </div>
                  <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                    <a href={t.url} target="_blank" rel="noopener noreferrer" className="visit-btn" style={{ textDecoration: 'none' }}>Visit &rarr;</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Keeping old news & cats in dark mode */}
        <div className="section" style={{background: '#070d1a', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)'}}>
          <div className="section-header">
            <div className="section-title">📰 Latest AI News</div>
            <Link href="/news" className="see-all">See all &rarr;</Link>
          </div>
          <div className="news-grid">
            {news.slice(0, 3).map((n, i) => (
              <div key={n.title} className="news-card">
                <div className="news-img">
                  {i === 0 && <img src="/news/meta.png" alt="Meta AI" />}
                  {i === 1 && <img src="/news/drones.png" alt="Amazon Drones" />}
                  {i === 2 && <img src="/news/safety.png" alt="AI Safety" />}
                  {! [0,1,2].includes(i) && n.emoji}
                </div>
                <div className="news-body">
                  <div className="news-cat">{n.cat}</div>
                  <div className="news-title">{n.title}</div>
                  <div className="news-meta"><span>{n.source}</span><span>{n.date}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </>
  );
}
