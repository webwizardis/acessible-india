import { useEffect, useRef, useState } from 'react';
import { phrases } from '../utils/gestures';
import { useCamera } from '../hooks/useCamera';
import CameraPreview from '../components/CameraPreview';

export default function CommunicationMode({ onBack, text }) {
  const camera = useCamera({ facingMode: 'user' });
  const [phrase, setPhrase] = useState(phrases[0]);
  const [reply, setReply] = useState('');
  const [detectorStatus, setDetectorStatus] = useState('off');
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);

  async function toggleDetection() {
    if (detectorStatus === 'ready') {
      setDetectorStatus('off');
      return;
    }
    if (camera.status !== 'ready') {
      const started = await camera.startCamera();
      if (!started) return;
    }
    setDetectorStatus('loading');
    try {
      const { FilesetResolver, HandLandmarker } = await import('@mediapipe/tasks-vision');
      const vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm');
      landmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task', delegate: 'GPU' },
        runningMode: 'VIDEO',
        numHands: 1,
      });
      setDetectorStatus('ready');
    } catch {
      setDetectorStatus('error');
    }
  }

  useEffect(() => {
    if (detectorStatus !== 'ready' || !landmarkerRef.current || !camera.videoRef.current) return undefined;
    let last = 0;
    const detect = (time) => {
      if (time - last > 220 && camera.videoRef.current?.readyState >= 2) {
        last = time;
        landmarkerRef.current.detectForVideo(camera.videoRef.current, time);
      }
      animationRef.current = requestAnimationFrame(detect);
    };
    animationRef.current = requestAnimationFrame(detect);
    return () => cancelAnimationFrame(animationRef.current);
  }, [camera.videoRef, detectorStatus]);

  useEffect(() => () => {
    cancelAnimationFrame(animationRef.current);
    landmarkerRef.current?.close?.();
  }, []);

  return (
    <main className="tool-page">
      <button className="back-link" onClick={onBack}>← {text('backHome')}</button>
      <div className="tool-heading">
        <div className="tool-kicker mode-communication-text"><span className="mini-icon" aria-hidden="true">✦</span> MODE 02</div>
        <h1>{text('communication')}</h1>
        <p>Choose a phrase to show in large text. You can also try the camera detector for hand presence, but this MVP does not claim full Indian Sign Language translation.</p>
      </div>
      <div className="communication-layout">
        <section className="phrase-display" aria-live="assertive">
          <span className="display-label">YOUR MESSAGE</span>
          <strong>{phrase}</strong>
          <div className="phrase-actions"><button className="primary-button" onClick={() => setPhrase(phrases[0])}>I NEED HELP</button><button className="secondary-button" onClick={() => setPhrase('')}>Clear</button></div>
        </section>
        <section className="phrase-picker" aria-labelledby="phrase-heading">
          <div className="subheading"><span><span className="display-label">MANUAL FALLBACK</span><h2 id="phrase-heading">Choose a phrase</h2></span><span className="phrase-count">{phrases.length} phrases</span></div>
          <div className="phrase-grid">{phrases.map((item) => <button key={item} className={phrase === item ? 'phrase-option selected' : 'phrase-option'} onClick={() => setPhrase(item)}>{item}</button>)}</div>
          <p className="small-note">This is a limited demo vocabulary, not full ISL translation. Manual selection keeps the message reliable.</p>
        </section>
        <section className="response-box" aria-labelledby="reply-heading">
          <div className="subheading"><span><span className="display-label">TWO-WAY TEXT</span><h2 id="reply-heading">Their reply</h2></span><span aria-hidden="true">↔</span></div>
          <textarea value={reply} onChange={(event) => setReply(event.target.value)} placeholder="The other person can type here…" aria-label="The other person's reply" />
          <p className="small-note">Text remains available even when camera or speech features are unavailable.</p>
        </section>
        <section className="gesture-box" aria-labelledby="gesture-heading">
          <div className="subheading"><span><span className="display-label">OPTIONAL CAMERA</span><h2 id="gesture-heading">Hand presence check</h2></span><span className="status-dot" data-status={detectorStatus} /></div>
          <CameraPreview {...camera} onStart={camera.startCamera} onCapture={() => {}} onStop={camera.stopCamera} captureLabel="Use camera" />
          <button className="secondary-button full-button" onClick={toggleDetection}>{detectorStatus === 'ready' ? 'Stop detector' : 'Try hand detection'}</button>
          {detectorStatus === 'error' && <p className="inline-error" role="alert">The hand model could not load. Manual phrase selection is still ready.</p>}
          {detectorStatus === 'loading' && <p className="small-note" role="status">Loading the hand model…</p>}
        </section>
      </div>
    </main>
  );
}