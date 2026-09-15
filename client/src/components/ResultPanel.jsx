export default function ResultPanel({ result, onReadAloud, onStopReading, speaking, speechSupported }) {
  if (!result) return null;
  return (
    <section className="result-panel" aria-live="polite" aria-label="Vision description">
      <div className="result-label"><span aria-hidden="true">✦</span> ASSISTIVE DESCRIPTION</div>
      <p>{result}</p>
      <div className="result-footer">
        {speechSupported && (
          <button className="secondary-button" onClick={speaking ? onStopReading : onReadAloud}>
            {speaking ? 'Stop reading' : 'Read aloud'} <span aria-hidden="true">◖</span>
          </button>
        )}
        {!speechSupported && <span className="muted-copy">Audio is not supported in this browser. Text remains available.</span>}
      </div>
    </section>
  );
}