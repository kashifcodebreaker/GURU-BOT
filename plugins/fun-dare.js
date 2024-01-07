import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  try {
    let shizokeys = 'shizo';
    let res = await fetch(`https://shizoapi.onrender.com/api/texts/dare?apikey=${shizokeys}`);

    if (!res.ok) throw await res.text();
    let json = await res.json();

    let guru = `${json.result}`;
    
    // React before sending the dare message
    m.react('🤡');
    conn.sendMessage(m.chat, { text: guru, mentions: [m.sender] }, { quoted: m });
  } catch (error) {
    console.error('Error fetching dare from API:', error);
    m.reply('❌ Oops! Something went wrong. Unable to fetch a dare at the moment.');
  }
};

handler.help = ['dare'];
handler.tags = ['fun'];
handler.command = /^(dare)$/i;

export default handler;
