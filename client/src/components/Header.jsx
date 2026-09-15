import LanguageSelector from './LanguageSelector';

export default function Header({ language, onLanguageChange, onHome, text }) {
  return (
    <header className="site-header">
      <button className="brand" onClick={onHome} aria-label="Accessible India home">
        <span className="brand-mark" aria-hidden="true">AI</span>
        <span>
          <strong>Accessible India</strong>
          <small>equal access, everyday</small>
        </span>
      </button>
      <LanguageSelector language={language} onChange={onLanguageChange} />
    </header>
  );
}