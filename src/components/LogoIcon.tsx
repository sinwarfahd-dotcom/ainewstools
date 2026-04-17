export default function LogoIcon() {
  return (
    <svg 
      width="36" 
      height="36" 
      viewBox="0 0 36 36" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="secondary-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <filter id="glow-logo" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Hexagon Outline */}
      <path 
        d="M18 2L32 10V26L18 34L4 26V10L18 2Z" 
        stroke="url(#secondary-grad)" 
        strokeWidth="1.5" 
        strokeLinejoin="round"
        fill="rgba(99, 102, 241, 0.1)"
      />
      
      {/* Inner Glowing Core */}
      <path 
        d="M18 7L26 11.5V20.5L18 25L10 20.5V11.5L18 7Z" 
        fill="url(#primary-grad)" 
        filter="url(#glow-logo)"
      />

      {/* Network Lines */}
      <path 
        d="M18 16V25" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M18 16L10 11.5" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M18 16L26 11.5" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />

      {/* Central Node */}
      <circle cx="18" cy="16" r="2.5" fill="white" />
      <circle cx="10" cy="11.5" r="1.5" fill="white" />
      <circle cx="26" cy="11.5" r="1.5" fill="white" />
      <circle cx="18" cy="25" r="1.5" fill="white" />
    </svg>
  );
}
