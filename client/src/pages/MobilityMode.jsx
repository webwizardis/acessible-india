import { useEffect, useMemo, useState } from 'react';
import { getAccessibilityLocations } from '../services/mobilityService';
import LoadingState from '../components/LoadingState';

function scoreLocation(location) {
  return Number(location.stepFreeEntrance) * 4 + Number(location.ramps) * 2 + Number(location.elevator) * 2 + Number(location.accessibleToilet);
}

export default function MobilityMode({ onBack, text }) {
  const [locations, setLocations] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    getAccessibilityLocations().then((data) => setLocations(data.locations || [])).catch((loadError) => setError(loadError.message)).finally(() => setLoading(false));
  }, []);
  const sorted = useMemo(() => [...locations].sort((a, b) => scoreLocation(b) - scoreLocation(a)), [locations]);
  const selected = locations.find((location) => location.id === selectedId) || sorted[0];

  return (
    <main className="tool-page">
      <button className="back-link" onClick={onBack}>← {text('backHome')}</button>
      <div className="tool-heading">
        <div className="tool-kicker mode-mobility-text"><span className="mini-icon" aria-hidden="true">↗</span> MODE 03</div>
        <h1>{text('mobility')}</h1>
        <p>Compare a small set of curated demo places by the access features that matter to you.</p>
      </div>
      <div className="mobility-layout">
        <section className="destination-panel">
          <div className="display-label">DESTINATION</div>
          <h2>Where are you going?</h2>
          {loading && <LoadingState label="Loading places…" />}
          {error && <p className="inline-error" role="alert">{error}</p>}
          {!loading && <div className="destination-list">{sorted.map((location, index) => <button className={selected?.id === location.id ? 'destination-option selected' : 'destination-option'} key={location.id} onClick={() => setSelectedId(location.id)}><span className="destination-index">0{index + 1}</span><span><strong>{location.name}</strong><small>{location.area}</small></span><span aria-hidden="true">→</span></button>)}</div>}
          <div className="demo-disclaimer"><span aria-hidden="true">i</span><p><strong>Small demo dataset</strong><br />These are curated sample records, not nationwide verified coverage.</p></div>
        </section>
        {selected && <section className="access-result" aria-labelledby="access-heading">
          <div className="result-top"><div><div className="display-label">ACCESSIBILITY SNAPSHOT</div><h2 id="access-heading">{selected.name}</h2><p>{selected.area}</p></div><span className="recommended-badge">RECOMMENDED</span></div>
          <div className="feature-grid">{[['stepFreeEntrance', 'Step-free entrance', '↗'], ['ramps', 'Ramps', '⌁'], ['elevator', 'Elevator', '⇅'], ['accessibleToilet', 'Accessible toilet', '◫']].map(([key, label, icon]) => <div className={selected[key] ? 'feature present' : 'feature'} key={key}><span className="feature-icon" aria-hidden="true">{icon}</span><span><strong>{selected[key] ? 'Available' : 'Not listed'}</strong><small>{label}</small></span></div>)}</div>
          <div className="route-note"><span aria-hidden="true">↗</span><p><strong>Accessibility recommendation</strong><br />This option ranks highly because its step-free entrance, ramp and elevator are all listed in the demo record.</p></div>
        </section>}
      </div>
    </main>
  );
}