export async function before(m, { conn, isAdmin, isBotAdmin }) {
    const users = global.db.data.users;
    const chats = global.db.data.chats;

    if (!chats[m.chat].antiSpam || m.isBaileys || m.mtype === 'protocolMessage' || m.mtype === 'pollUpdateMessage' || m.mtype === 'reactionMessage') {
        return;
    }

    if (!m.msg || !m.message || m.key.remoteJid !== m.chat || users[m.sender].banned || chats[m.chat].isBanned) {
        return;
    }

    this.spam = this.spam || {};
    this.spam[m.sender] = this.spam[m.sender] || { count: 0, lastspam: 0 };

    const now = performance.now();
    const timeDifference = now - this.spam[m.sender].lastspam;

    console.log(`[Anti-Spam] Time difference: ${timeDifference}`);
    console.log(`[Anti-Spam] Spam count: ${this.spam[m.sender].count}`);

    if (timeDifference < 10000) {
        this.spam[m.sender].count++;

        console.log(`[Anti-Spam] Increased spam count: ${this.spam[m.sender].count}`);

        if (this.spam[m.sender].count >= 5) {
            console.log(`[Anti-Spam] User spam count exceeded. isAdmin: ${isAdmin}`);

            if (isAdmin) {
                // If an admin is spamming, notify but do not remove (same message as before).
                console.log(`[Anti-Spam] Admin is spamming. User not removed.`);
                conn.reply(m.chat, `❗ *@${m.sender.split('@')[0]}* is spamming like there's no tomorrow, but they're an admin! 🚀🙉`, m);
            } else {
                // If a non-admin user is spamming, remove them (similar to antilink removal).
                console.log(`[Anti-Spam] Non-admin user is spamming. Removing...`);

                await conn.reply(
                    m.chat,
                    `🚫 Houston, I've detected a spammer! 👀\n\n*@${m.sender.split('@')[0]}* is floating away from this group. Over and out! 🚀🌎`,
                    m
                );

                await conn.sendMessage(m.chat, { delete: m.key });
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');

                this.spam[m.sender].count = 0;
                return;
            }
        }
    } else {
        this.spam[m.sender].count = 0;
    }

    this.spam[m.sender].lastspam = now;
}
