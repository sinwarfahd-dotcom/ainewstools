"use client";

import Link from 'next/link';
import LogoIcon from './LogoIcon';

const platformLinks = [
  { label: 'All Tools', href: '/tools' },
  { label: 'AI News', href: '/news' },
  { label: 'Compare Tools', href: '/compare' },
  { label: 'Submit a Tool', href: '/submit' },
  { label: 'About Us', href: '/about' },
];

const categoryLinks = [
  { label: '💬 Chatbots', href: '/tools?c=Chatbot' },
  { label: '🎨 Image Gen', href: '/tools?c=Image Gen' },
  { label: '💻 Coding', href: '/tools?c=Coding' },
  { label: '🎬 Video', href: '/tools?c=Video' },
  { label: '✍️ Writing', href: '/tools?c=Writing' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Contact Us', href: '/contact' },
];

const socials = [
  { label: '𝕏', href: 'https://x.com/ainewstools', title: 'Twitter / X' },
  { label: 'in', href: 'https://linkedin.com/company/ainewstools', title: 'LinkedIn' },
  { label: 'GH', href: 'https://github.com/ainewstools', title: 'GitHub' },
];

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const style: React.CSSProperties = {
    color: '#64748b',
    fontSize: '14px',
    textDecoration: 'none',
    transition: 'color 0.2s ease, transform 0.2s ease',
    display: 'inline-block',
  };

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = '#a5b4fc';
    e.currentTarget.style.transform = 'translateX(3px)';
  };
  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = '#64748b';
    e.currentTarget.style.transform = 'translateX(0)';
  };

  if (external) {
    return (
      <a href={href} style={style} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} style={style} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <>
      <footer style={{
        background: 'linear-gradient(180deg, #060a14 0%, #030712 100%)',
        borderTop: '1px solid #1e293b',
        marginTop: '60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle gradient glow at top */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #6366f140, #06b6d420, transparent)',
        }} />

        {/* Main Footer Content */}
        <div className="footer-grid" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '64px 32px 48px',
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: '48px',
        }}>
          
          {/* Column 1: Brand */}
          <div>
            <Link href="/" style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
            }}>
              <LogoIcon />
              <span style={{
                fontSize: '20px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>AI News Tools</span>
            </Link>
            <p style={{
              color: '#64748b',
              fontSize: '14px',
              lineHeight: '1.75',
              marginBottom: '24px',
              maxWidth: '280px',
            }}>
              The ultimate AI tools directory & news hub. Discover, compare, and stay updated with 1,200+ AI tools across 45+ categories.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  title={s.title}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: '#0f172a',
                    border: '1px solid #1e293b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b',
                    fontSize: '13px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#6366f1';
                    e.currentTarget.style.color = '#a5b4fc';
                    e.currentTarget.style.background = '#1e1035';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#1e293b';
                    e.currentTarget.style.color = '#64748b';
                    e.currentTarget.style.background = '#0f172a';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >{s.label}</a>
              ))}
            </div>
          </div>

          {/* Column 2: Platform */}
          <div>
            <h4 style={{
              color: '#e2e8f0',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{ width: '16px', height: '2px', background: 'linear-gradient(90deg, #6366f1, transparent)', borderRadius: '2px' }} />
              Platform
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {platformLinks.map(link => (
                <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
              ))}
            </div>
          </div>

          {/* Column 3: Popular Categories */}
          <div>
            <h4 style={{
              color: '#e2e8f0',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{ width: '16px', height: '2px', background: 'linear-gradient(90deg, #06b6d4, transparent)', borderRadius: '2px' }} />
              Categories
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {categoryLinks.map(link => (
                <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
              ))}
            </div>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 style={{
              color: '#e2e8f0',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{ width: '16px', height: '2px', background: 'linear-gradient(90deg, #8b5cf6, transparent)', borderRadius: '2px' }} />
              Legal
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {legalLinks.map(link => (
                <FooterLink key={link.label} href={link.href} external>{link.label}</FooterLink>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #1e293b',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ color: '#475569', fontSize: '13px', margin: 0 }}>
            © 2026 AI News Tools ·{' '}
            <a
              href="https://ainewstools.com"
              style={{ color: '#6366f1', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#a5b4fc'}
              onMouseLeave={e => e.currentTarget.style.color = '#6366f1'}
            >ainewstools.com</a>
            . All rights reserved.
          </p>
          <p style={{ color: '#334155', fontSize: '12px', margin: 0 }}>
            Built with ❤️ for the AI community
          </p>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @media(max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
            padding: 40px 20px 32px !important;
          }
        }
        @media(max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </>
  );
}
