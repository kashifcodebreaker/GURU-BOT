import displayLoadingScreen from '../lib/loading.js';
import fetch from 'node-fetch';
import { delay } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text }) => {
  try {
    if (!text) throw '🤖 Uhm... you forgot to provide a prompt. What do you want me to generate?';

    m.react('🤖');
    conn.sendPresenceUpdate('composing', m.chat); // Typing indication
    // Display loading screen if needed
    // await displayLoadingScreen(conn, m.chat);

    const prompt = encodeURIComponent(text);
    let apiurl = `https://ultimetron.guruapi.tech/gpt4?prompt=${prompt}`;

    const result = await fetch(apiurl);
    const { result: { reply: generatedText } } = await result.json();
    console.log(generatedText);

    await typewriterEffect(conn, m, m.chat, generatedText);
  } catch (error) {
    console.error(error);
    m.reply('🚫 Oops! Something went wrong. My circuits are working hard to fix it. Please try again later.');
  }
};

handler.help = ['gpt4 <prompt>'];
handler.tags = ['AI'];
handler.command = /^(gpt4)$/i;

export default handler;

async function typewriterEffect(conn, quoted, from, text) {
  let { key } = await conn.sendMessage(from, { text: '🧠 Thinking...' }, { quoted: quoted });

  for (let i = 0; i < text.length; i++) {
    const partialText = text.slice(0, i + 1);
    await conn.relayMessage(from, {
      protocolMessage: {
        key: key,
        type: 14,
        // Use an appropriate interval based on the text length
        editedMessage: {
          conversation: partialText,
          ...(i === text.length - 1 && { 'delete': 'false' }), // Remove 'delete' property for the last edit
        },
      },
    }, {});

    await delay(Math.min(100, 30 + text.length * 5)); // Adjust the delay time (in milliseconds) as needed
  }
       }
