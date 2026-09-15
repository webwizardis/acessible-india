export default function CameraPreview({ videoRef, status, error, onStart, onCapture, onStop, captureLabel = 'Capture frame' }) {
  return (
    <div className="camera-shell">
      <div className="camera-frame">
        {status === 'ready' ? (
          <video ref={videoRef} playsInline muted aria-label="Live camera preview" />
        ) : (
          <div className="camera-placeholder">
            <span className="camera-placeholder-icon" aria-hidden="true">◎</span>
            <strong>{status === 'requesting' ? 'Requesting camera access…' : 'Camera is off'}</strong>
            <span>We only use a frame when you ask us to analyze it.</span>
          </div>
        )}
        {status === 'ready' && <span className="live-badge"><i /> LIVE</span>}
      </div>
      {error && <p className="inline-error" role="alert">{error}</p>}
      <div className="camera-actions">
        {status !== 'ready' ? (
          <button className="primary-button" onClick={onStart}>Enable camera</button>
        ) : (
          <>
            <button className="primary-button" onClick={onCapture}>{captureLabel}</button>
            <button className="secondary-button" onClick={onStop}>Turn off</button>
          </>
        )}
      </div>
    </div>
  );
}