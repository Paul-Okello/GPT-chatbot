import { useState } from 'react';

export const useSpeechCapture = () => {
  const [capturedSpeech, setCapturedSpeech] = useState('');
  const [isListening, setIsListening] = useState(false);

  const startSpeechCapture = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setCapturedSpeech(transcript);
      // Do further processing with the captured speech here
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    // Set language to Spanish
    recognition.lang = 'es-ES';

    recognition.start();
  };

  const stopSpeechCapture = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.stop();
    setIsListening(false);
  };

  return { capturedSpeech, isListening, startSpeechCapture, stopSpeechCapture };
};
