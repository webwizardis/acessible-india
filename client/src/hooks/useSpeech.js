import { useCallback, useEffect, useState } from 'react';

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const stop = useCallback(() => {
    if (supported) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  const speak = useCallback(
    (text, lang = 'en-IN') => {
      if (!supported || !text) return false;
      stop();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
      return true;
    },
    [stop, supported],
  );

  useEffect(() => stop, [stop]);
  return { speak, stop, speaking, supported };
}