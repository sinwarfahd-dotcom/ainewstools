"use client";

import { useState, useMemo } from 'react';
import { 
  CheckCircle2, XCircle, Star, Zap, DollarSign, Command, 
  ArrowRightLeft, Plus, ChevronDown, Check, Search
} from 'lucide-react';

interface CompareTool {
  id: number;
  name: string;
  icon: string;
  category: string;
  pricing: string;
  rating: number;
  features: string[];
  pros: string[];
  cons: string[];
}

function getPricingLabel(p: string) {
  const m: Record<string, string> = { free: "Free", paid: "Paid", freemium: "Freemium", "open-source": "Open Source" };
  return m[p?.toLowerCase()] || p || "—";
}

export default function CompareClient({ tools }: { tools: CompareTool[] }) {
  const [toolA, setToolA] = useState<CompareTool | null>(tools[0] || null);
  const [toolB, setToolB] = useState<CompareTool | null>(tools[1] || null);
  const [dropdownOpen, setDropdownOpen] = useState<'A' | 'B' | null>(null);
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');

  const filteredToolsA = useMemo(() => {
    if (!searchA) return tools;
    const q = searchA.toLowerCase();
    return tools.filter(t => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
  }, [searchA, tools]);

  const filteredToolsB = useMemo(() => {
    if (!searchB) return tools;
    const q = searchB.toLowerCase();
    return tools.filter(t => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
  }, [searchB, tools]);

  const selectTool = (tool: CompareTool, side: 'A' | 'B') => {
    if (side === 'A') setToolA(tool);
    else setToolB(tool);
    setDropdownOpen(null);
    setSearchA('');
    setSearchB('');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html:`
        .compare-hero {
          padding: 60px 28px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }
        .compare-hero::before {
          content: ''; position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 500px; background: radial-gradient(ellipse, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .compare-icon-wrap {
          width: 72px; height: 72px; margin: 0 auto 24px; border-radius: 20px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(6, 182, 212, 0.2));
          border: 1px solid rgba(99, 102, 241, 0.3);
          display: flex; align-items: center; justify-content: center; color: #a5b4fc;
        }
        .title {
          font-size: 40px; font-weight: 800; margin-bottom: 12px;
          background: linear-gradient(135deg, #fff 30%, #a5b4fc);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .subtitle {
          color: var(--text); font-size: 16px; max-width: 600px; margin: 0 auto; line-height: 1.6;
        }
        .tools-count-badge {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 16px; padding: 6px 16px; border-radius: 100px;
          background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2);
          color: #a5b4fc; font-size: 13px; font-weight: 500;
        }

        .compare-container {
          max-width: 1000px; margin: 40px auto; padding: 0 28px;
        }
        .selector-row {
          display: flex; gap: 24px; margin-bottom: 32px;
        }
        .tool-selector {
          flex: 1; background: var(--card); border: 1px solid var(--border); border-radius: 16px;
          padding: 24px; position: relative; transition: all 0.3s ease;
        }
        .tool-selector:hover {
          border-color: rgba(99, 102, 241, 0.4); transform: translateY(-2px);
          box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.1);
        }
        .vs-badge {
          width: 44px; height: 44px; border-radius: 50%; background: #030712;
          border: 1px solid var(--border); display: flex; align-items: center; justify-content: center;
          font-weight: 700; color: #a5b4fc; font-size: 13px; align-self: center; flex-shrink: 0;
          box-shadow: 0 0 20px rgba(99,102,241,0.1); z-index: 10;
        }
        .dropdown-btn {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          background: #030712; border: 1px solid var(--border); padding: 12px 16px;
          border-radius: 12px; color: #e2e8f0; font-weight: 600; cursor: pointer; transition: all 0.2s;
        }
        .dropdown-btn:hover { border-color: #6366f1; }
        .dropdown-menu {
          position: absolute; top: calc(100% + 8px); left: 24px; right: 24px;
          background: #0f172a; border: 1px solid var(--border); border-radius: 12px;
          padding: 8px; z-index: 50; display: none; box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5);
          max-height: 360px; overflow: hidden; display: none; flex-direction: column;
        }
        .dropdown-menu.open { display: flex; }
        .dropdown-search {
          display: flex; align-items: center; gap: 8px; padding: 8px 12px; margin-bottom: 4px;
          background: #060e1e; border: 1px solid var(--border); border-radius: 8px;
          flex-shrink: 0;
        }
        .dropdown-search input {
          background: transparent; border: none; color: #e2e8f0; font-size: 13px;
          outline: none; width: 100%;
        }
        .dropdown-search input::placeholder { color: #475569; }
        .dropdown-list {
          overflow-y: auto; flex: 1; scrollbar-width: thin; scrollbar-color: #1e293b transparent;
        }
        .dropdown-item {
          padding: 10px 14px; border-radius: 8px; cursor: pointer; display: flex;
          align-items: center; justify-content: space-between; color: #cbd5e1; transition: all 0.2s;
          gap: 8px;
        }
        .dropdown-item:hover { background: #1e293b; color: #fff; }
        .dropdown-item-left {
          display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0;
        }
        .dropdown-item-name {
          font-size: 14px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .dropdown-item-cat {
          font-size: 11px; color: #475569; white-space: nowrap;
        }

        .compare-table {
          width: 100%; border-collapse: separate; border-spacing: 0;
          border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
          background: var(--card); box-shadow: 0 20px 40px -20px rgba(0,0,0,0.5);
        }
        .compare-table th {
          background: #0a0f1e; padding: 20px 24px; text-align: left; font-weight: 600;
          color: #a5b4fc; border-bottom: 1px solid var(--border); text-transform: uppercase;
          font-size: 12px; letter-spacing: 1px;
        }
        .compare-table th:not(:first-child) { border-left: 1px solid var(--border); width: 35%; }
        .compare-table th:first-child { width: 30%; }
        
        .compare-table td {
          padding: 20px 24px; border-bottom: 1px solid rgba(30, 41, 59, 0.5); color: #cbd5e1;
          font-size: 14px; vertical-align: top;
        }
        .compare-table tr:last-child td { border-bottom: none; }
        .compare-table td:not(:first-child) { border-left: 1px solid rgba(30, 41, 59, 0.5); }
        
        .feature-item {
          display: flex; align-items: flex-start; gap: 8px; margin-bottom: 10px;
        }
        .feature-item:last-child { margin-bottom: 0; }
        .feature-icon { color: #4ade80; flex-shrink: 0; margin-top: 2px; }
        .feature-icon.con { color: #f87171; }
        
        .rating-wrap { display: flex; align-items: center; gap: 8px; font-weight: 600; color: #fff; }
        .star-icon { color: #fbbf24; fill: #fbbf24; }
        
        .empty-placeholder {
          color: #475569; font-style: italic; font-size: 13px;
        }
        .no-data { color: #475569; font-size: 13px; font-style: italic; }
        
        @media (max-width: 768px) {
          .selector-row { flex-direction: column; gap: 16px; }
          .vs-badge { margin: -20px auto; }
          .compare-table th, .compare-table td { padding: 16px; }
        }
      `}} />

      <div className="compare-hero">
        <div className="compare-icon-wrap">
          <ArrowRightLeft size={36} />
        </div>
        <div className="title">Compare AI Tools</div>
        <div className="subtitle">
          Make informed decisions. Place two AI platforms side-by-side to compare features, pricing models, and community ratings before subscribing.
        </div>
        <div className="tools-count-badge">
          <Zap size={14} /> {tools.length} tools available to compare
        </div>
      </div>

      <div className="compare-container">
        
        {/* Selectors */}
        <div className="selector-row">
          <div className="tool-selector">
            <div style={{fontSize: '12px', color: '#64748b', marginBottom: '12px', fontWeight: 600, textTransform: 'uppercase'}}>Tool A</div>
            <div className="dropdown-btn" onClick={() => { setDropdownOpen(dropdownOpen === 'A' ? null : 'A'); setSearchA(''); }}>
              <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                {toolA && <span>{toolA.icon}</span>}
                {toolA?.name || "Select Tool A"}
              </span>
              <ChevronDown size={18} />
            </div>
            <div className={`dropdown-menu ${dropdownOpen === 'A' ? 'open' : ''}`}>
              <div className="dropdown-search">
                <Search size={14} color="#475569" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchA}
                  onChange={(e) => setSearchA(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="dropdown-list">
                {filteredToolsA.map(t => (
                  <div key={t.id} className="dropdown-item" onClick={() => selectTool(t, 'A')}>
                    <div className="dropdown-item-left">
                      <span>{t.icon}</span>
                      <span className="dropdown-item-name">{t.name}</span>
                      <span className="dropdown-item-cat">{t.category}</span>
                    </div>
                    {toolA?.id === t.id && <Check size={16} color="#4ade80" />}
                  </div>
                ))}
                {filteredToolsA.length === 0 && (
                  <div style={{padding: '16px', textAlign: 'center', color: '#475569', fontSize: '13px'}}>
                    No tools found
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="vs-badge">VS</div>

          <div className="tool-selector">
            <div style={{fontSize: '12px', color: '#64748b', marginBottom: '12px', fontWeight: 600, textTransform: 'uppercase'}}>Tool B</div>
            <div className="dropdown-btn" onClick={() => { setDropdownOpen(dropdownOpen === 'B' ? null : 'B'); setSearchB(''); }}>
              <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                {toolB && <span>{toolB.icon}</span>}
                {toolB?.name || "Select Tool B"}
              </span>
              <ChevronDown size={18} />
            </div>
            <div className={`dropdown-menu ${dropdownOpen === 'B' ? 'open' : ''}`}>
              <div className="dropdown-search">
                <Search size={14} color="#475569" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchB}
                  onChange={(e) => setSearchB(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="dropdown-list">
                {filteredToolsB.map(t => (
                  <div key={t.id} className="dropdown-item" onClick={() => selectTool(t, 'B')}>
                    <div className="dropdown-item-left">
                      <span>{t.icon}</span>
                      <span className="dropdown-item-name">{t.name}</span>
                      <span className="dropdown-item-cat">{t.category}</span>
                    </div>
                    {toolB?.id === t.id && <Check size={16} color="#4ade80" />}
                  </div>
                ))}
                {filteredToolsB.length === 0 && (
                  <div style={{padding: '16px', textAlign: 'center', color: '#475569', fontSize: '13px'}}>
                    No tools found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <table className="compare-table">
          <thead>
            <tr>
              <th>Criteria</th>
              <th>{toolA?.name || "—"}</th>
              <th>{toolB?.name || "—"}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{fontWeight: 600, color: '#e2e8f0'}}><div style={{display:'flex', alignItems:'center', gap:'8px'}}><Command size={18} color="#8b5cf6" /> Category</div></td>
              <td>{toolA?.category ? <span style={{background: '#1e1b4b', padding: '4px 10px', borderRadius: '100px', fontSize: '12px', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)'}}>{toolA.category}</span> : <span className="empty-placeholder">Not selected</span>}</td>
              <td>{toolB?.category ? <span style={{background: '#1e1b4b', padding: '4px 10px', borderRadius: '100px', fontSize: '12px', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)'}}>{toolB.category}</span> : <span className="empty-placeholder">Not selected</span>}</td>
            </tr>
            <tr>
              <td style={{fontWeight: 600, color: '#e2e8f0'}}><div style={{display:'flex', alignItems:'center', gap:'8px'}}><DollarSign size={18} color="#10b981" /> Pricing</div></td>
              <td>
                <div style={{fontWeight: 600, color: '#fff'}}>{toolA ? getPricingLabel(toolA.pricing) : "—"}</div>
              </td>
              <td>
                <div style={{fontWeight: 600, color: '#fff'}}>{toolB ? getPricingLabel(toolB.pricing) : "—"}</div>
              </td>
            </tr>
            <tr>
              <td style={{fontWeight: 600, color: '#e2e8f0'}}><div style={{display:'flex', alignItems:'center', gap:'8px'}}><Star size={18} color="#fbbf24" /> Rating</div></td>
              <td>
                {toolA ? <div className="rating-wrap"><Star className="star-icon" size={16} /> {toolA.rating} / 5.0</div> : "—"}
              </td>
              <td>
                {toolB ? <div className="rating-wrap"><Star className="star-icon" size={16} /> {toolB.rating} / 5.0</div> : "—"}
              </td>
            </tr>
            <tr>
              <td style={{fontWeight: 600, color: '#e2e8f0'}}><div style={{display:'flex', alignItems:'center', gap:'8px'}}><Zap size={18} color="#06b6d4" /> Key Features</div></td>
              <td>
                {toolA ? (toolA.features.length > 0 ? toolA.features.map(f => (
                  <div key={f} className="feature-item"><CheckCircle2 size={16} className="feature-icon" /> {f}</div>
                )) : <span className="no-data">No features listed</span>) : "—"}
              </td>
              <td>
                {toolB ? (toolB.features.length > 0 ? toolB.features.map(f => (
                  <div key={f} className="feature-item"><CheckCircle2 size={16} className="feature-icon" /> {f}</div>
                )) : <span className="no-data">No features listed</span>) : "—"}
              </td>
            </tr>
            <tr>
              <td style={{fontWeight: 600, color: '#e2e8f0'}}><div style={{display:'flex', alignItems:'center', gap:'8px'}}><Plus size={18} color="#4ade80" /> Pros</div></td>
              <td>
                {toolA ? (toolA.pros.length > 0 ? toolA.pros.map(p => (
                  <div key={p} className="feature-item"><CheckCircle2 size={16} className="feature-icon" /> {p}</div>
                )) : <span className="no-data">No pros listed</span>) : "—"}
              </td>
              <td>
                {toolB ? (toolB.pros.length > 0 ? toolB.pros.map(p => (
                  <div key={p} className="feature-item"><CheckCircle2 size={16} className="feature-icon" /> {p}</div>
                )) : <span className="no-data">No pros listed</span>) : "—"}
              </td>
            </tr>
            <tr>
              <td style={{fontWeight: 600, color: '#e2e8f0'}}><div style={{display:'flex', alignItems:'center', gap:'8px'}}><XCircle size={18} color="#f87171" /> Cons</div></td>
              <td>
                {toolA ? (toolA.cons.length > 0 ? toolA.cons.map(c => (
                  <div key={c} className="feature-item"><XCircle size={16} className="feature-icon con" /> {c}</div>
                )) : <span className="no-data">No cons listed</span>) : "—"}
              </td>
              <td>
                {toolB ? (toolB.cons.length > 0 ? toolB.cons.map(c => (
                  <div key={c} className="feature-item"><XCircle size={16} className="feature-icon con" /> {c}</div>
                )) : <span className="no-data">No cons listed</span>) : "—"}
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </>
  );
}
