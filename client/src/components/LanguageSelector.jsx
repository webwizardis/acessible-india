export default function LanguageSelector({ language, onChange }) {
  return (
    <label className="language-selector">
      <span className="sr-only">Interface language</span>
      <span aria-hidden="true">Aa</span>
      <select value={language} onChange={(event) => onChange(event.target.value)} aria-label="Interface language">
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
        <option value="mr">मराठी</option>
      </select>
    </label>
  );
}