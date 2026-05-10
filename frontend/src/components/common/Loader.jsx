export default function Loader({ size = 40 }) {
  return (
    <div style={{ display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh' }}>
      <div style={{ width:size,height:size,border:'3px solid var(--surface-high)',borderTop:'3px solid var(--primary-btn)',borderRadius:'50%',animation:'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
