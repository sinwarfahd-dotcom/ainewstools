import Link from 'next/link';

export default function LegalPage() {
  return (
    <div className="section" style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 20px' }}>
      <h1 className="page-title" style={{ fontSize: '32px', marginBottom: '20px' }}>Legal Information</h1>
      <div style={{ color: 'var(--text)', lineHeight: '1.8' }}>
        <p>This is a placeholder for the legal documentation of Ainewstools.</p>
        <p>In a production environment, this page would contain detailed information about our Privacy Policy, Terms of Service, and Cookie Policy.</p>
        <h2 style={{ color: '#e2e8f0', marginTop: '30px' }}>Privacy Policy</h2>
        <p>We value your privacy and are committed to protecting your personal data.</p>
        <h2 style={{ color: '#e2e8f0', marginTop: '30px' }}>Terms of Service</h2>
        <p>By using our directory, you agree to comply with our community guidelines and terms.</p>
      </div>
      <Link href="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '40px', padding: '12px 24px', textDecoration: 'none' }}>Back to Home</Link>
    </div>
  );
}
