import { useCallback, useEffect, useRef, useState } from 'react';

export function useCamera({ facingMode = 'environment' } = {}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const startCamera = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Camera access is not available in this browser. You can still use the manual options.');
      setStatus('error');
      return false;
    }
    setError('');
    setStatus('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: facingMode }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStatus('ready');
      return true;
    } catch (cameraError) {
      setError(
        cameraError.name === 'NotAllowedError'
          ? 'Camera permission was not granted. Check your browser permissions, or use the manual option below.'
          : 'We could not start the camera. You can still continue with the manual option.',
      );
      setStatus('error');
      return false;
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setStatus('idle');
  }, []);

  const captureFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.readyState < 2 || !video.videoWidth) return null;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.86);
  }, []);

  useEffect(() => stopCamera, [stopCamera]);

  return { videoRef, status, error, startCamera, stopCamera, captureFrame };
}