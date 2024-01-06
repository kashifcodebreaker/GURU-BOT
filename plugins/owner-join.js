//need fix
import { createHash } from 'crypto';

let handler = async (m, { conn, text, usedPrefix, command, args, isOwner }) => {
  if (!isOwner) {
    return conn.sendMessage(m.chat, {
      text: `
🤖 *Group Join Restricted* 🤖

Hello @${m.sender.split('@')[0]}!

If you'd like to invite me to a group, send the invitation link to me, and I'll process your request.

For inquiries or assistance, please use the following command:
\`${usedPrefix}support [Your Message]\`
      `.trim()
    }, { quoted: m });
  }

  let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;

  let [_, code] = text.match(linkRegex) || [];

  if (!args[0] || !code) {
    throw `
🤖 *Group Join Syntax Error* 🤖

✳️ Send the group link with the command:
*${usedPrefix + command}* <group-link> <days>

📌 Example:
*${usedPrefix + command}* <linkwa> 2

💡 Note: The number represents the days I will stay in the group.
    `;
  }

  if (!args[1] || isNaN(args[1])) {
    throw '✳️ Missing or Invalid Number of Days. Please specify the number of days I will stay in the group.';
  }

  m.reply('😎 Standby, I will join the group in 3 seconds.');

  await new Promise(res => setTimeout(res, 3000));

  try {
    let res = await conn.groupAcceptInvite(code);
    let nDays = 86400000 * args[1];
    let now = new Date() * 1;

    if (now < global.db.data.chats[res].expired) {
      global.db.data.chats[res].expired += nDays;
    } else {
      global.db.data.chats[res].expired = now + nDays;
    }

    await m.reply(`
✅ Successfully joined the group!

≡ Group Info
*Name:* ${await conn.getName(res)}

I'm here by request, but I have a busy schedule. I'll be staying for ${args[1]} days.

🤖 *Don't forget to follow these Rules:*
1. No spamming or flooding the group.
2. Keep the content appropriate.
3. Do not call or message me privately.
4. Be Respectful.

🤖 *Note:*
I may leave if I'm overwhelmed or encounter too much chaos. Don't worry; it's not you, it's me (literally)! 😅

⌛ *Time Remaining:* ${msToDate(global.db.data.chats[res].expired - now)}
    `);
  } catch (e) {
    throw '✳️ Sorry, failed to join the group.';
  }
};

handler.help = ['join <chat.whatsapp.com> <days>'];
handler.tags = ['owner'];
handler.command = ['join'];

export default handler;

function msToDate(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [d, ' *Days*\n', h, ' *Hours*\n', m, ' *Minutes*\n', s, ' *Seconds*'].map(v => v.toString().padStart(2, 0)).join('');
}
	
