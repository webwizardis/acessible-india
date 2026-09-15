import ModeCard from '../components/ModeCard';

export default function Home({ text, onNavigate }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span /> BUILT FOR EVERYDAY MOMENTS</p>
          <h1>{text('welcome')}<br /><em>{text('dignity')}.</em></h1>
          <p className="hero-intro">{text('intro')}</p>
          <div className="hero-note"><span aria-hidden="true">✦</span> {text('tagline')}</div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="sun-disc" />
          <div className="hero-line line-one" />
          <div className="hero-line line-two" />
          <div className="hero-person"><span className="person-head" /><span className="person-body" /><span className="person-arm" /></div>
          <span className="art-label">01 / 03</span>
        </div>
      </section>
      <section className="mode-section" aria-labelledby="mode-heading">
        <div className="section-heading">
          <div><p className="eyebrow">YOUR ACCESS TOOLKIT</p><h2 id="mode-heading">{text('startHere')}</h2></div>
          <span className="section-count">03 modes</span>
        </div>
        <div className="mode-grid">
          <ModeCard mode="vision" title={text('vision')} description={text('visionShort')} actionLabel={text('openTool')} onOpen={() => onNavigate('vision')} />
          <ModeCard mode="communication" title={text('communication')} description={text('communicationShort')} actionLabel={text('openTool')} onOpen={() => onNavigate('communication')} />
          <ModeCard mode="mobility" title={text('mobility')} description={text('mobilityShort')} actionLabel={text('openTool')} onOpen={() => onNavigate('mobility')} />
        </div>
      </section>
      <section className="trust-strip">
        <div><span className="trust-icon" aria-hidden="true">⌁</span><span><strong>Designed with care</strong><small>Clear steps. Calm language. No guesswork.</small></span></div>
        <div><span className="trust-icon" aria-hidden="true">◌</span><span><strong>Your data stays yours</strong><small>Images are sent only when you choose to analyze.</small></span></div>
        <div><span className="trust-icon" aria-hidden="true">↯</span><span><strong>Always a fallback</strong><small>Every mode has a text-first way to continue.</small></span></div>
      </section>
    </main>
  );
}