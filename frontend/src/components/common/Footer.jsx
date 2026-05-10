export default function Footer() {
  const footerLinks = ['Privacy','Terms','Sitemap','Destinations','Help Center'];
  return (
    <footer style={{ background:'var(--footer-bg)', padding:'48px 0 40px' }}>
      <div style={{ maxWidth:'var(--max-w)',margin:'0 auto',padding:'0 48px',display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:24 }}>
        <div>
          <div style={{ fontFamily:'Plus Jakarta Sans',fontWeight:700,fontSize:40,color:'var(--footer-brand)',lineHeight:1.1,marginBottom:12 }}>TravelLoop</div>
          <div style={{ color:'var(--footer-muted)',fontSize:13 }}>© 2025 TravelLoop. All rights reserved.</div>
        </div>
        <div style={{ display:'flex',gap:28,flexWrap:'wrap' }}>
          {footerLinks.map(l => (
            <a key={l} href="#" style={{ color:'var(--footer-muted)',fontSize:13,textDecoration:'none' }}
              onMouseEnter={e=>e.target.style.color='var(--footer-text)'}
              onMouseLeave={e=>e.target.style.color='var(--footer-muted)'}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
