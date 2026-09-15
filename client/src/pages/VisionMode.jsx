import { useState } from 'react';
import CameraPreview from '../components/CameraPreview';
import LoadingState from '../components/LoadingState';
import ResultPanel from '../components/ResultPanel';
import { useCamera } from '../hooks/useCamera';
import { useSpeech } from '../hooks/useSpeech';
import { analyzeImage } from '../services/visionService';
import { speechLocale } from '../services/speechService';

export default function VisionMode({ onBack, language, text }) {
  const camera = useCamera();
  const speech = useSpeech();
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  async function captureAndAnalyze() {
    const image = camera.captureFrame();
    if (!image) {
      setError('The camera is not ready yet. Please wait a moment and try again.');
      return;
    }
    setError('');
    setAnalyzing(true);
    try {
      const response = await analyzeImage(image);
      setResult(response.description);
    } catch (analysisError) {
      setError(analysisError.message);
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <main className="tool-page">
      <button className="back-link" onClick={onBack}>← {text('backHome')}</button>
      <div className="tool-heading">
        <div className="tool-kicker mode-vision-text"><span className="mini-icon" aria-hidden="true">◉</span> MODE 01</div>
        <h1>{text('vision')}</h1>
        <p>Point your camera at a scene. We’ll describe what can be observed, with a focus on useful visual information.</p>
      </div>
      <div className="tool-layout">
        <div>
          <div className="permission-note"><span aria-hidden="true">◎</span><div><strong>Your camera, on your terms</strong><p>We ask for access only when you press “Enable camera”. Nothing is analyzed until you capture a frame.</p></div></div>
          <CameraPreview {...camera} onStart={camera.startCamera} onCapture={captureAndAnalyze} onStop={camera.stopCamera} />
        </div>
        <div>
          {analyzing && <LoadingState label="Reading the scene…" />}
          {error && <div className="callout-error" role="alert"><strong>We couldn’t complete that</strong><span>{error}</span></div>}
          <ResultPanel result={result} speechSupported={speech.supported} speaking={speech.speaking} onStopReading={speech.stop} onReadAloud={() => speech.speak(result, speechLocale[language])} />
          <div className="safety-card"><span aria-hidden="true">!</span><p><strong>Keep a second check</strong><br />{text('safetyNotice')}</p></div>
        </div>
      </div>
    </main>
  );
}