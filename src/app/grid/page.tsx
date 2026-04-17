"use client";

import React from "react";
import Link from "next/link";
import { Star, ExternalLink, Cpu, Image as ImageIcon, MessageSquare, Code, Video, Music, Sparkles } from "lucide-react";

// The exact tool data provided by the user
const tools = [
  {
    name: "ChatGPT",
    url: "chat.openai.com",
    desc: "The world's most popular AI assistant for writing, analysis, and problem-solving.",
    tags: ["Chat", "Writing", "Analysis"],
    pricing: "Freemium",
    rating: 4.9,
    icon: <MessageSquare size={20} color="#10a37f" />
  },
  {
    name: "Midjourney",
    url: "midjourney.com",
    desc: "Generate stunning art, illustrations, and photorealistic images from text prompts.",
    tags: ["Images", "Art", "Design"],
    pricing: "Paid",
    rating: 4.8,
    icon: <ImageIcon size={20} color="#a5b4fc" />
  },
  {
    name: "Claude",
    url: "anthropic.com",
    desc: "Highly capable AI assistant with an enormous context window and nuanced reasoning.",
    tags: ["Chat", "Research", "Analysis"],
    pricing: "Freemium",
    rating: 4.8,
    icon: <Cpu size={20} color="#d97706" />
  },
  {
    name: "Cursor",
    url: "cursor.sh",
    desc: "The AI-first IDE built to help you write, refactor, and understand code incredibly fast.",
    tags: ["Coding", "IDE", "DevTools"],
    pricing: "Freemium",
    rating: 4.9,
    icon: <Code size={20} color="#3b82f6" />
  },
  {
    name: "Perplexity",
    url: "perplexity.ai",
    desc: "A conversational search engine that provides real-time, cited answers to queries.",
    tags: ["Search", "Research", "Chat"],
    pricing: "Freemium",
    rating: 4.7,
    icon: <Sparkles size={20} color="#14b8a6" />
  },
  {
    name: "ElevenLabs",
    url: "elevenlabs.io",
    desc: "Ultra-realistic AI voice cloning and text-to-speech engine in multiple languages.",
    tags: ["Voice", "Audio", "TTS"],
    pricing: "Freemium",
    rating: 4.8,
    icon: <Music size={20} color="#8b5cf6" />
  },
  {
    name: "Runway",
    url: "runwayml.com",
    desc: "Professional AI video generation and editing tools used by Hollywood creators.",
    tags: ["Video", "Editing", "Creative"],
    pricing: "Freemium",
    rating: 4.6,
    icon: <Video size={20} color="#ec4899" />
  },
  {
    name: "Suno",
    url: "suno.ai",
    desc: "Generate full, radio-ready songs with vocals and instrumentation in seconds.",
    tags: ["Music", "Audio", "Generation"],
    pricing: "Freemium",
    rating: 4.6,
    icon: <Music size={20} color="#f43f5e" />
  },
  {
    name: "Gamma",
    url: "gamma.app",
    desc: "Create beautiful, engaging presentations, webpages, and docs using AI instantly.",
    tags: ["Presentations", "Design", "Docs"],
    pricing: "Freemium",
    rating: 4.7,
    icon: <Sparkles size={20} color="#f59e0b" />
  },
  {
    name: "DALL-E",
    url: "labs.openai.com",
    desc: "OpenAI's powerful image generation model deeply integrated natively into ChatGPT.",
    tags: ["Images", "Art", "OpenAI"],
    pricing: "Paid",
    rating: 4.5,
    icon: <ImageIcon size={20} color="#6366f1" />
  },
  {
    name: "Grok",
    url: "x.ai/grok",
    desc: "An AI assistant by xAI with real-time access to the X platform with a rebellious streak.",
    tags: ["Chat", "Search", "Social"],
    pricing: "Paid",
    rating: 4.3,
    icon: <MessageSquare size={20} color="#e2e8f0" />
  },
  {
    name: "Stability AI",
    url: "stability.ai",
    desc: "Open-source generative modeling company behind the powerful Stable Diffusion.",
    tags: ["Images", "Open Source", "Video"],
    pricing: "Freemium",
    rating: 4.6,
    icon: <ImageIcon size={20} color="#10b981" />
  }
];

export default function AIGrid() {
  return (
    <div className="modern-directory">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --bg: #030712;
          --card-bg: #0f172a;
          --card-border: #1e293b;
          --text-primary: #f8fafc;
          --text-secondary: #94a3b8;
          --accent: linear-gradient(135deg, #6366f1, #8b5cf6);
        }

        .modern-directory {
          min-height: 100vh;
          background-color: var(--bg);
          padding: 60px 24px;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .dir-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .dir-title {
          font-size: 42px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 12px;
          background: linear-gradient(to right, #fff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Essential Grid Structure */
        .responsive-grid {
          display: grid;
          gap: 24px;
          max-width: 1400px;
          margin: 0 auto;
          /* 4 columns on desktop by default */
          grid-template-columns: repeat(4, 1fr);
        }

        /* 2 Columns on Tablet */
        @media (max-width: 1024px) {
          .responsive-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* 1 Column on Mobile */
        @media (max-width: 640px) {
          .responsive-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Card Component Styling */
        .tool-card {
          background-color: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          transition: all 0.2s ease-in-out;
          position: relative;
          overflow: hidden;
        }

        .tool-card:hover {
          transform: translateY(-4px);
          border-color: #3b82f6;
          box-shadow: 0 10px 30px -10px rgba(59, 130, 246, 0.2);
        }

        /* Header section */
        .card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .image-placeholder {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #1e293b;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #334155;
          flex-shrink: 0;
        }

        .tool-name {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          line-height: 1.2;
        }

        /* Body Section */
        .card-body {
          flex: 1;
          margin-bottom: 24px;
        }

        .tool-desc {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 16px;
          /* Force 2 lines using flex/webkit clamp */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 44px; /* Ensure consistent height for 2 lines */
        }

        .tags-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .pill-tag {
          background: rgba(59, 130, 246, 0.1);
          color: #60a5fa;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        /* Footer Section */
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #1e293b;
          padding-top: 20px;
        }

        .footer-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .tier-badge {
          font-size: 12px;
          font-weight: 600;
          color: #e2e8f0;
          display: inline-block;
        }

        .rating-row {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #f59e0b;
          font-size: 13px;
          font-weight: 600;
        }

        .footer-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .visit-btn {
          background: var(--accent);
          color: #ffffff;
          padding: 8px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .visit-btn:hover {
          opacity: 0.9;
        }

        .raw-link {
          font-size: 11px;
          color: #64748b;
          font-family: monospace;
          background: #0f172a;
          max-width: 130px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}} />

      <div className="dir-header">
        <h1 className="dir-title">AI Tools Directory</h1>
        <p style={{ color: "var(--text-secondary)" }}>The most capable AI platforms built for the future.</p>
      </div>

      <div className="responsive-grid">
        {tools.map((tool, index) => (
          <div key={index} className="tool-card">
            
            <div className="card-header">
              <div className="image-placeholder">
                {tool.icon}
              </div>
              <h2 className="tool-name">{tool.name}</h2>
            </div>
            
            <div className="card-body">
              <div className="tool-desc">{tool.desc}</div>
              <div className="tags-row">
                {tool.tags.map(tag => (
                  <span key={tag} className="pill-tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="card-footer">
              <div className="footer-left">
                <span className="tier-badge">{tool.pricing}</span>
                <div className="rating-row">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  {tool.rating} / 5.0
                </div>
              </div>
              <div className="footer-right">
                <Link href={`https://${tool.url}`} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                  <button className="visit-btn">
                    Visit <ExternalLink size={14} />
                  </button>
                </Link>
                <div className="raw-link" title={tool.url}>{tool.url}</div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
