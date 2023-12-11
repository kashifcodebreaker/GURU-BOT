const linkRegex = /https?:\/\/(?:chat\.whatsapp\.com\/(?:invite\/)?|[^./?#]+\.[^./?#]+)/i

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true;
    if (!m.isGroup) return false;
    let chat = global.db.data.chats[m.chat];
    let bot = global.db.data.settings[this.user.jid] || {};
    const isGroupLink = linkRegex.exec(m.text);

    if (isGroupLink && !isAdmin && isBotAdmin) {
        const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
        if (!m.text.includes(linkThisGroup)) {
            await conn.reply(
                m.chat,
                `🚫 Oops, you sent a link! 😄\n\nWe're a link-free zone! 👀🚷\n\n*@${m.sender.split('@')[0]}*, your link is now floating in cyberspace, forever alone, just like you! 😂🚀`,
                m,
                { mentions: [m.sender] }
            );
            await conn.sendMessage(m.chat, { delete: m.key });
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            return false;
        }
    }
    return true;
}
