import { AlertCircle } from 'lucide-react';
export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div style={{ display:'flex',alignItems:'center',gap:8,padding:'12px 16px',background:'var(--error-bg)',borderRadius:'var(--r-md)',color:'var(--error)',fontSize:14 }}>
      <AlertCircle size={16} />{message}
    </div>
  );
}
