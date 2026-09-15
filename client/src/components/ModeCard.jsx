const modeMeta = {
  vision: { icon: '◉', number: '01', className: 'mode-vision' },
  communication: { icon: '✦', number: '02', className: 'mode-communication' },
  mobility: { icon: '↗', number: '03', className: 'mode-mobility' },
};

export default function ModeCard({ mode, title, description, onOpen, actionLabel }) {
  const meta = modeMeta[mode];
  return (
    <article className={`mode-card ${meta.className}`}>
      <div className="mode-card-top">
        <span className="mode-icon" aria-hidden="true">{meta.icon}</span>
        <span className="mode-number">{meta.number}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="text-button" onClick={onOpen}>
        {actionLabel}<span aria-hidden="true"> →</span>
      </button>
    </article>
  );
}