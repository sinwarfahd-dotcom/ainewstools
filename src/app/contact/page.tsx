'use client'

import React, { useState } from 'react'
import { 
  Mail, 
  MessageSquare, 
  X, 
  MapPin, 
  Send, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  if (submitted) {
    return (
      <div className="contact-wrapper" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-form-card" style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
            <div className="contact-icon-box" style={{ width: '80px', height: '80px', borderRadius: '20px' }}>
              <CheckCircle2 size={40} />
            </div>
          </div>
          <h2 className="text-glow-premium" style={{ fontSize: '32px' }}>Message Received!</h2>
          <p style={{ color: '#94a3b8', fontSize: '18px', marginBottom: '32px' }}>
            Thank you for reaching out. Our team will get back to you within 24 hours.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="btn-premium-indigo"
            style={{ width: 'auto', padding: '14px 32px', margin: '0 auto' }}
          >
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-wrapper animate-admin">
      {/* Column 1: Info */}
      <div className="contact-info-section">
        <div style={{ marginBottom: '40px' }}>
          <div className="hero-badge" style={{ marginBottom: '16px' }}>
            <span className="pulse"></span>
            Available for partnerships
          </div>
          <h1 className="text-glow-premium">Let's build the future of AI together</h1>
          <p className="hero-sub" style={{ margin: '0', textAlign: 'left', maxWidth: '100%' }}>
            Have a question about a tool? Want to advertise with us? Or just want to say hi? We're all ears.
          </p>
        </div>

        <div className="contact-info-list">
          <div className="contact-info-item">
            <div className="contact-icon-box">
              <Mail size={24} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px' }}>General Support</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}>hello@ainewstools.com</div>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon-box" style={{ background: 'linear-gradient(135deg, #8b5cf6, #d946ef)' }}>
              <MessageSquare size={24} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '1px' }}>Partnership Inquiries</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}>partners@ainewstools.com</div>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon-box" style={{ background: '#1da1f2' }}>
              <X size={24} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#1da1f2', textTransform: 'uppercase', letterSpacing: '1px' }}>Twitter / X</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}>@AINewsTools_hq</div>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon-box" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <MapPin size={24} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Headquarters</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}>Digital Nomad, Worldwide</div>
            </div>
          </div>
        </div>
      </div>

      {/* Column 2: Form */}
      <div className="contact-form-section">
        <div className="glass-form-card">
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Send us a message</h2>
            <p style={{ color: '#64748b', fontSize: '14px' }}>Fill out the form below and we'll handle the rest.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="admin-form-group">
                <label className="admin-label">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="John Doe" 
                  className="premium-input" 
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Email Address</label>
                <input 
                  required
                  type="email" 
                  placeholder="john@example.com" 
                  className="premium-input" 
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Subject</label>
              <select className="premium-input" style={{ cursor: 'pointer' }}>
                <option value="general">General Inquiry</option>
                <option value="tool">Add a Tool</option>
                <option value="ads">Advertising</option>
                <option value="issue">Report an Issue</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Your Message</label>
              <textarea 
                required
                rows={5} 
                placeholder="Tell us what's on your mind..." 
                className="premium-input"
                style={{ resize: 'none' }}
              />
            </div>

            <div style={{ marginTop: '12px' }}>
              <button 
                type="submit" 
                disabled={loading}
                className="btn-premium-indigo"
              >
                {loading ? (
                  <div className="pulse" style={{ backgroundColor: '#fff' }}></div>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
