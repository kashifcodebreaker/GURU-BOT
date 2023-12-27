import MessageType from '@whiskeysockets/baileys';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, participants }) => {
    let users = participants.map(u => conn.decodeJid(u.id));
    let q = m.quoted ? m.quoted : m;
    let c = m.quoted ? m.quoted : m.msg;

    // Check if the sender is the bot
    const isBot = conn.user.jid === m.sender;

    // Check if the sender has admin privileges
    const isAdmin = m.isAdmin || m.isSuperAdmin || m.fromMe;

    if (isBot) {
        // Execute the command if the bot is using it
        // Add your logic here for bot-specific behavior
    } else if (isAdmin) {
        // Check if the bot is also an admin before executing the command
        const isBotAdmin = /* logic to check if the bot is admin */;
        if (isBotAdmin) {
            // Execute the command for admin users
            // Add your logic here for admin-specific behavior
        } else {
            m.reply('Bot needs to be an admin to use this command.');
            return; // Stop execution if the bot is not an admin
        }
    } else {
        // Non-admin users cannot execute the command
        m.reply('You need to be an admin to use this command.');
        return; // Stop execution for non-admin users
    }

    // Continue with the rest of your code for handling the command
    const msg = conn.cMod(m.chat,
        generateWAMessageFromContent(m.chat, {
            [c.toJSON ? q.mtype : 'extendedTextMessage']: c.toJSON ? c.toJSON() : {
                text: c || ''
            }
        }, {
            quoted: m,
            userJid: conn.user.id
        }),
        text || q.text, conn.user.jid, { mentions: users }
    );

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.help = ['hidetag'];
handler.tags = ['group'];
handler.command = ['hidetag', 'notify'];
handler.group = true;

export default handler;
                  
