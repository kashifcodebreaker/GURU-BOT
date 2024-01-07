//import db from '../lib/database.js'

let handler = async (m, { conn, participants, groupMetadata }) => {
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png';
    const { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, delete: del } = global.db.data.chats[m.chat];
    const groupAdmins = participants.filter(p => p.admin);
    const listAdmin = groupAdmins.map((v, i) => `  ${i + 1}. @${v.id.split('@')[0]}`).join('\n');
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

    let text = `
🌐 *Group Information* 🌐

*🔖 Group Name:*
• ${groupMetadata.subject}

*♻️ Group ID:*
• ${groupMetadata.id}

*👥 Members Count:*
• ${participants.length}

*🤿 Group's Super Admin:*
• @${owner.split('@')[0]}

*🕵️‍♂️ Admins:*
${listAdmin}

🔧 *Group Settings:*
• Banned: ${isBanned ? '✅' : '❎'}
• Welcome: ${welcome ? '✅' : '❎'}
• Detector: ${detect ? '✅' : '❎'}
• Anti Delete: ${del ? '❎' : '✅'}
• Anti Link: ${antiLink ? '✅' : '❎'}

📬 *Message Settings:*
• Welcome: ${sWelcome}
• Farewell: ${sBye}
• Promoted: ${sPromote}
• Demoted: ${sDemote}
`.trim();

    conn.sendFile(m.chat, pp, 'group_info.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] });
};

handler.help = ['groupinfo'];
handler.tags = ['group'];
handler.command = ['groupinfo', 'gpinfo'];
handler.group = true;

export default handler;
