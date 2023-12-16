//import db from '../lib/database.js'

export function before(m) {
  const senderAFK = global.db.data.users[m.sender];

  if (senderAFK.afk > -1) {
    const afkDuration = new Date() - senderAFK.afk;
    m.reply(`
🌟 Huzzah! You've gracefully emerged from the AFK realm.

${senderAFK.afkReason ? `📝 *Reason:* ${senderAFK.afkReason}\n` : ''}
⏰ *AFK Duration:* ${afkDuration / 1000} seconds of serenity have passed!
`.trim());
    senderAFK.afk = -1;
    senderAFK.afkReason = '';
  }

  const mentionedJIDs = [
    ...(m.mentionedJid || []),
    ...(m.quoted ? [m.quoted.sender] : []),
  ];

  for (const mentionedJID of mentionedJIDs) {
    const mentionedUser = global.db.data.users[mentionedJID];

    if (!mentionedUser || mentionedUser.afk < 0) continue;

    const afkDuration = new Date() - mentionedUser.afk;
    const reason = mentionedUser.afkReason || 'Without reason';

    m.reply(`
😴 The noble soul you summoned is currently AFK (Away From Keyboard).

${reason ? `📝 *Reason:* ${reason}\n` : ''}
⏰ *AFK Duration:* ${afkDuration / 1000} seconds of profound introspection and tranquility.
`.trim());
  }

  return true;
}
