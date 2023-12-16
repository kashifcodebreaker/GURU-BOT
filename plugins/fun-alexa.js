import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const name = conn.getName(m.sender);
  if (!text) {
    throw `Hi *${name}*, do you want to talk with me? Respond with *${usedPrefix + command}* (your message)\n\n📌 Example: *${usedPrefix + command}* Hi bot`;
  }
  
  m.react('🗣️');

  const msg = encodeURIComponent(text);
  
  const res = await fetch(`https://ultimetron.guruapi.tech/gpt3?prompt=${msg}`);

  const json = await res.json();
  
  
    let reply = json.completion;
    m.reply(reply);

};

handler.help = ['bot'];
handler.tags = ['fun'];
handler.command = ['bot', 'silver', 'silver fox', 'fox'];

export default handler;

