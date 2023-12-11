const toxicRegex = /\b(gandu|maderchod|bhosdike|bhosda|lauda|chutiya|maa ki chut|behenchod|behen ki chut|tatto ke saudagar|machar ki jhant|kuta|Randi ka aulad|xxx|boobs|sex|porn|lun|lan|idiot|nigga|fuck|dick|bitch|tits|bastard|asshole)\b/i;

export async function before(m, { isAdmin, isBotAdmin, conn }) {
    try {
        console.log('[Antitoxic] Message Received:', m.text);
        if (m.isBaileys && m.fromMe) {
            console.log('[Antitoxic] Message from Bot:', m);
            return true;
        }
        if (!m.isGroup) {
            console.log('[Antitoxic] Not a Group Message:', m);
            return false;
        }
        
        if (isBotAdmin && m.fromMe) {
            // If the bot is an admin and the message is sent by the bot, do nothing.
            console.log('[Antitoxic] Bot is admin and message is from bot. No action required.');
            return true;
        }

        const isToxicMessage = toxicRegex.test(m.text);

        console.log('[Antitoxic] isToxicMessage:', isToxicMessage);

        if (isToxicMessage) {
            if (isAdmin) {
                // If the sender is an admin, send a warning message.
                console.log(`[Antitoxic] Admin used a toxic word: ${m.sender} in ${m.chat}`);
                await conn.reply(m.chat, `🚫 Hey Admin! Watch your language! 😄*\n\nWe caught you using a naughty word. This message is under surveillance now. 🕵️‍♂️`, m);
            } else {
                // If it's a regular user, notify before removing them and delete the message.
                console.log(`[Antitoxic] User used a toxic word: ${m.sender} in ${m.chat}`);
                await conn.reply(m.chat, `🚫 Oops! Someone just crossed the line with naughty words! 😂\n\n*@${m.sender.split('@')[0]}*, is floating away from this group, thanks to their choice of words. 🚀🌎`, m);
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id } });
            }
        }
    } catch (error) {
        console.error(`[Antitoxic] Error: ${error}`);
    }
    return true;
}
