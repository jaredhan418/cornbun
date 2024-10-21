import { ElevenLabsClient } from 'elevenlabs';
import { createWriteStream } from 'fs';

export async function GET(request: Request) {
  const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY, // Defaults to process.env.ELEVENLABS_API_KEY
  });

  const { searchParams } = new URL(request.url);

  const text = searchParams.get('text') ?? "";

  const audio = await elevenlabs.generate({
    voice: 'Rachel',
    text: text,
    model_id: 'eleven_multilingual_v2',
  });

  const fileName = `${text}.mp3`;
  const fileStream = createWriteStream(fileName);

  audio.pipe(fileStream);
  fileStream.on("finish", () => {
    
  }); // Resolve with the fileName
  fileStream.on("error", (err: Error) => {throw err});

  return new Response("OK")
}