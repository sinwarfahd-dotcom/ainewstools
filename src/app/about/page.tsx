"use client";

import { Info, Target, Globe, Shield, Sparkles, TrendingUp } from 'lucide-react';

export default function AboutUs() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html:`
        .about-hero {
          padding: 80px 28px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }
        .about-hero::before {
          content: ''; position: absolute; top: -150px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 600px; background: radial-gradient(ellipse, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .about-icon-wrap {
          width: 80px; height: 80px; margin: 0 auto 24px; border-radius: 24px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.2));
          border: 1px solid rgba(139, 92, 246, 0.3);
          display: flex; align-items: center; justify-content: center; color: #c4b5fd;
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.2);
        }
        .title {
          font-size: 46px; font-weight: 800; margin-bottom: 16px;
          background: linear-gradient(135deg, #fff 40%, #c4b5fd);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          letter-spacing: -1px;
        }
        .subtitle {
          color: var(--text); font-size: 18px; max-width: 650px; margin: 0 auto; line-height: 1.7;
        }

        .about-container {
          max-width: 1100px; margin: 60px auto; padding: 0 28px;
        }

        /* Mission Section - Glassmorphism */
        .mission-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 48px;
          display: flex;
          gap: 40px;
          align-items: center;
          margin-bottom: 60px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.7);
        }
        .mission-card::after {
          content: ''; position: absolute; top: 0; right: 0; width: 300px; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.03));
          pointer-events: none;
        }
        .mission-icon {
          width: 80px; height: 80px; border-radius: 50%;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
          display: flex; align-items: center; justify-content: center;
          color: #818cf8; flex-shrink: 0;
        }
        .mission-content h2 {
          font-size: 28px; font-weight: 700; color: #e2e8f0; margin-bottom: 16px;
        }
        .mission-content p {
          font-size: 16px; color: #cbd5e1; line-height: 1.8;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 60px;
        }
        .stat-card {
          background: var(--card); border: 1px solid var(--border); border-radius: 20px;
          padding: 32px 24px; text-align: center; transition: all 0.3s ease;
        }
        .stat-card:hover {
          border-color: rgba(99, 102, 241, 0.4); transform: translateY(-4px);
          box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.15);
        }
        .stat-val {
          font-size: 36px; font-weight: 800; color: #fff; margin-bottom: 8px;
          background: linear-gradient(135deg, #fff, #818cf8);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .stat-lbl {
          font-size: 13px; color: #94a3b8; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;
        }

        /* Core Values */
        .values-header {
          text-align: center; margin-bottom: 40px;
        }
        .values-header h3 {
          font-size: 24px; font-weight: 700; color: #e2e8f0; margin-bottom: 12px;
        }
        .values-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
        }
        .value-card {
          background: #0a1020; border: 1px solid var(--border); border-radius: 16px;
          padding: 28px;
        }
        .value-icon {
          width: 48px; height: 48px; border-radius: 12px; background: #0f172a;
          border: 1px solid var(--border); display: flex; align-items: center;
          justify-content: center; margin-bottom: 20px; color: #a5b4fc;
        }
        .value-title {
          font-size: 18px; font-weight: 600; color: #e2e8f0; margin-bottom: 10px;
        }
        .value-desc {
          font-size: 14px; color: #64748b; line-height: 1.6;
        }

        @media (max-width: 900px) {
          .mission-card { flex-direction: column; text-align: center; padding: 32px; }
          .stats-grid { grid-template-columns: 1fr; }
          .values-grid { grid-template-columns: 1fr; }
        }
      `}} />

      <div className="about-hero">
        <div className="about-icon-wrap">
          <Info size={40} />
        </div>
        <div className="title">About AI News Tools</div>
        <div className="subtitle">
          Navigating the artificial intelligence revolution shouldn't be overwhelming. We're here to cut through the noise and highlight what actually matters.
        </div>
      </div>

      <div className="about-container">

        {/* Our Mission */}
        <div className="mission-card">
          <div className="mission-icon">
            <Target size={36} />
          </div>
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              Our goal at <strong>AI News Tools</strong> is to help developers, creators, and businesses seamlessly discover and compare the best AI tools on the market. In a landscape that evolves by the minute, we consolidate scattered information into one beautifully designed, centralized ecosystem. Whether you're hunting for the latest LLM, comparing image generators, or tracking breaking AI news, we provide the insights you need to stay ahead.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-val">2,000+</div>
            <div className="stat-lbl">AI Tools Indexed</div>
          </div>
          <div className="stat-card">
            <div className="stat-val">500+</div>
            <div className="stat-lbl">News Articles</div>
          </div>
          <div className="stat-card">
            <div className="stat-val">50k+</div>
            <div className="stat-lbl">Monthly Users</div>
          </div>
        </div>

        {/* Core Values */}
        <div className="values-header">
          <h3>Why We Built This</h3>
          <div className="subtitle" style={{fontSize: '15px'}}>The core values operating behind the scenes.</div>
        </div>
        
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon"><Globe size={24} color="#60a5fa" /></div>
            <div className="value-title">Comprehensive</div>
            <div className="value-desc">From massive enterprise models to niche open-source scripts, we index everything so you never miss a hidden gem.</div>
          </div>
          <div className="value-card">
            <div className="value-icon"><Shield size={24} color="#4ade80" /></div>
            <div className="value-title">Unbiased & Objective</div>
            <div className="value-desc">Our comparisons and reviews prioritize raw facts, feature parity, and real community ratings over sponsorships.</div>
          </div>
          <div className="value-card">
            <div className="value-icon"><Sparkles size={24} color="#f472b6" /></div>
            <div className="value-title">Premium Experience</div>
            <div className="value-desc">Finding software should feel as modern as the software itself. We obsess over dark aesthetics, smooth layouts, and speed.</div>
          </div>
        </div>

      </div>
    </>
  );
}
