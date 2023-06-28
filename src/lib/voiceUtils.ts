declare const window: any;

const synth = typeof window !== 'undefined' && window.speechSynthesis;

export const populateVoiceList = () => {
  try {
    let voices = synth.getVoices();

    return voices.sort((a: any, b: any) => a.name.localeCompare(b.name));
  } catch (err) {
    console.log(err);
  }
};

export const sayInput = (
  speechValue: string,
  lang: string,
) => {
  const utterance = new SpeechSynthesisUtterance(speechValue);

  // Set the desired language for the utterance
  utterance.lang = lang;

  populateVoiceList().forEach((voice: any) => {
    if (voice.lang.startsWith(lang)) {
      utterance.voice = voice;
      return;
    }
  });

  utterance.pitch = 1;
  utterance.rate = 1;

  window.speechSynthesis.cancel();
  synth.speak(utterance);
};
