//import db from '../lib/database.js'

let handler = async (m, { text, conn }) => {
    let user = global.db.data.users[m.sender];
    user.afk = +new Date;
    user.afkReason = text;
    m.reply(`
  🌙 *AFK Mode Activated* 🌙

🚪 Greetings, oh noble one! You have gracefully entered the serene realm of AFK.

📅 You shall remain AFK until the cosmic forces deem it fitting for you to return. Fear not, for your absence is duly noted.

👤 *User:* ${conn.getName(m.sender)}
📜 *Reason:* ${text ? text : 'No specific reason provided'}

📢 Remember, your return shall be celebrated with grandeur and fanfare. Until then, may your AFK journey be filled with cosmic wonders!
  `);
}

handler.help = ['afk <reason>'];
handler.tags = ['fun'];
handler.command = ['afk'];
handler.group = true;

export default handler;
