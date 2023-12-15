const toxicRegex = /\b(gandu|maderchod|bhosdike|bhosda|lauda|chutiya|maa ki chut|behenchod|behen ki chut|tatto ke saudagar|machar ki jhant|kuta|Randi ka aulad|xxx|boobs|sex|porn|lun|lan|idiot|nigga|fuck|dick|bitch|tits|bastard|asshole)\b/i;

export async function before(m, { isAdmin, isBotAdmin, conn }) {
    try {
        if (!m.isGroup) return false;

        if (!isBotAdmin) return true;

        if (isBotAdmin && m.fromMe) return true;

        const isToxicMessage = toxicRegex.test(m.text);

        if (isToxicMessage) {
            if (isAdmin) {
                await conn.reply(m.chat, `🚫 Hey Admin! Watch your language! 😄*\n\nWe caught you using a naughty word. This message is under surveillance now. 🕵️‍♂️`, m);
            } else {
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
