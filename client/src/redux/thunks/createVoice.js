const createVoice = (selectedVoice) => {
  return async () => {
    const resp = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: selectedVoice,
      }),
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.error || `TTS failed (${resp.status})`);
    }

    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);
    audio.onended = () => URL.revokeObjectURL(url);

    try {
      await audio.play();
    } catch (e) {
      // Autoplay policy typically throws NotAllowedError here
      console.error('audio.play() failed:', e);
      URL.revokeObjectURL(url);
      throw e;
    }
  };
};

export default createVoice;
