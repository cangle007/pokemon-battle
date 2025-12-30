require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Readable } = require('node:stream');
const { ElevenLabsClient } = require('@elevenlabs/elevenlabs-js');

const audioCache = new Map();
const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

const PREWARM_TEXTS = [
  '“Alright—Gengar, I choose you.”',
  '“Jolteon, let’s light it up.”',
  '“Snorlax, you’re up.”',
  '“Psyduck… okay. We’re doing this.”',
];

(async () => {
  for (const t of PREWARM_TEXTS) {
    if (!audioCache.has(t)) {
      try {
        // call your own synth function or inline it
        // audioCache.set(t, await synthesizeToBuffer(t));
      } catch (e) {
        console.warn('Prewarm failed for:', t, e);
      }
    }
  }
})();

async function streamToBuffer(nodeStream) {
  const chunks = [];
  for await (const chunk of nodeStream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

app.get('/', (req, res) => res.send('OK'));

app.post('/api/tts', async (req, res) => {
  try {
    const { text } = req.body ?? {};

    if (!text || typeof text !== 'string') {
      return res
        .status(400)
        .json({ error: 'Missing `text` (string) in body.' });
    }

    // 1) cache hit
    const cached = audioCache.get(text);
    if (cached) {
      res.setHeader('Content-Type', 'audio/mpeg');
      return res.send(cached);
    }

    // 2) cache miss: synthesize
    const VOICE_ID = 'Sth0oyItcRdvk3sFrPiq';
    const MODEL_ID = 'eleven_flash_v2_5';
    const OUTPUT_FORMAT = 'mp3_44100_128';

    const audio = await elevenlabs.textToSpeech.convert(VOICE_ID, {
      text,
      modelId: MODEL_ID,
      outputFormat: OUTPUT_FORMAT,
    });

    const nodeStream =
      audio && typeof audio.getReader === 'function'
        ? Readable.fromWeb(audio)
        : audio;

    const buf = await streamToBuffer(nodeStream);
    audioCache.set(text, buf);

    res.setHeader('Content-Type', 'audio/mpeg');
    return res.send(buf);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'TTS failed' });
  }
});

const port = process.env.PORT || 8787;
app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
