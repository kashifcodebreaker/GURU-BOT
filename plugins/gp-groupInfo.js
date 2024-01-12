let handler = async (m, { conn, participants, groupMetadata }) => {
    m.react('🔍');
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png';
    const { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, delete: del } = global.db.data.chats[m.chat];
    const groupAdmins = participants.filter(p => p.admin);
    const listAdmin = groupAdmins.map((v, i) => `👑 ${i + 1}. @${v.id.split('@')[0]}`).join('\n');
    const superAdmin = groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

    // Calculate the number of remaining slots for participants
    const remainingSlots = 1025 - participants.length;

    // Fun facts based on group size
    let groupSizeFunFact = '';
    if (participants.length > 900) {
        groupSizeFunFact = '🌐 This group is almost at maximum capacity!';
    } else if (participants.length > 800) {
        groupSizeFunFact = '🚀 We have a vibrant and active community here!';
    } else if (participants.length > 700) {
        groupSizeFunFact = '🎉 Wow, this group is thriving with members!';
    } else if (participants.length > 600) {
        groupSizeFunFact = '🤔 A healthy balance between members in this group!';
    } else if (participants.length > 500) {
        groupSizeFunFact = '🌈 Halfway there! Keep the energy up!';
    } else if (participants.length > 400) {
        groupSizeFunFact = '⚡ The group is growing steadily!';
    } else if (participants.length > 300) {
        groupSizeFunFact = '🌱 New members are joining; the community is expanding!';
    } else if (participants.length > 200) {
        groupSizeFunFact = '🎊 Celebrate the diversity of this group!';
    } else if (participants.length > 100) {
        groupSizeFunFact = '🎈 We\'re reaching a significant milestone!';
    } else {
        groupSizeFunFact = '🔍 The journey begins! New members are always welcome!';
    }

    let text = `
🌐 *GROUP INFO* 🚀

🏷️ *Name:* 
• ${groupMetadata.subject}

🔍 *ID:*
• ${groupMetadata.id}

👥 *Members:*
• ${participants.length} members
• 🕰 Remaining Slots: ${remainingSlots}

🤿 *Super Admin:*
• @${superAdmin.split('@')[0]}

👮 *Admins:*
${listAdmin}

🪢 *Group Configuration:*
• ${isBanned ? '✅' : '❎'} Banned
• ${welcome ? '✅' : '❎'} Welcome
• ${detect ? '✅' : '❎'} Detector
• ${del ? '❎' : '✅'} Anti Delete
• ${antiLink ? '✅' : '❎'} Anti Link

📬 *Message Settings:*
• Welcome: ${sWelcome}
• Farewell: ${sBye}
• Promoted: ${sPromote}
• Degraded: ${sDemote}

🌐 *Group Fun Facts:*
${groupSizeFunFact}
`.trim();

    const fileType = pp.endsWith('.gif') ? 'gif' : (pp.endsWith('.png') ? 'png' : 'jpeg');

    conn.sendFile(m.chat, await fetch(pp).then(v => v.arrayBuffer()), 'group_info.' + fileType, text, m, false, { mentions: [...groupAdmins.map(v => v.id), superAdmin] });
};

handler.help = ['groupinfo'];
handler.tags = ['group'];
handler.command = ['groupinfo', 'infogroup'];
handler.group = true;

export default handler;
