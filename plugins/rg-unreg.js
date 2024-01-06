//import db from '../lib/database.js'

import { createHash } from 'crypto';

const handler = async (m, { conn, args, usedPrefix }) => {
  if (!args[0]) {
    m.reply("🔍 *Psst! Enter your serial number to gracefully exit.*\nCheck your serial number with:\n*{usedPrefix}serial*").then(() => m.react('🤔'));
    m.react('🙄');
    return;
  }

  let user = global.db.data.users[m.sender];
  let sn = createHash('md5').update(m.sender).digest('hex');

  if (args[0] !== sn) {
    m.reply('⚠️ *Oops! Seems like a little mix-up with your serial number. Try again!*').then(() => m.react('👀'));
    return;
  }

  user.registered = false;

  m.reply(`
  🚪 *Unregister Successful!*

  🔓 You've successfully escaped the matrix of registration. Farewell, free spirit! 🎉
  `).then(() => m.react('✔️'));
};

handler.help = ['unregister <Serial Number>'];
handler.tags = ['registration'];

handler.command = ['unregister'];
handler.register = true;

export default handler;
