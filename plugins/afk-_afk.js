//import db from '../lib/database.js'

export function before(m) {
  const senderAFK = global.db.data.users[m.sender];

  if (senderAFK.afk > -1) {
    const afkDuration = new Date() - senderAFK.afk;
    m.reply(`
🎉 Hooray, @${m.sender.split('@')[0]}! You're back, and the world can stop pretending it's okay without you!

${senderAFK.afkReason ? `Quick heads-up: You went *AFK* with the reason "${senderAFK.afkReason}" – sounds fancy, huh?` : 'No reason was given for your disappearing act; we\'ll just assume you were off saving the digital universe!'}

You were *MIA* (Missing In Action) for: ${formatDuration(afkDuration)}. hmm... interesting! Isn't?

Guess what? You're no longer *AFK*! Time to celebrate your triumphant return! 🥁
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
    const reason = mentionedUser.afkReason || 'Meditating on the mysteries of the digital realm';

    const formattedDuration = formatDuration(afkDuration);
    let reaction;

    if (afkDuration < 60000) {
      reaction = '👀 Not too long being AFK... a quick break, perhaps?';
    } else if (afkDuration < 1800000) {
      reaction = '⌛ Taking a moment, but not for too long...';
    } else {
      reaction = '⏰ They\'ve been AFK for a while... deep thoughts, maybe?';
    }

    m.reply(`
😴 Ahoy there! The noble soul @${mentionedUser.name.split('@')[0]} you summoned is currently AFK (Away From Keyboard) and lost in contemplation.

${reason !== 'Without reason' ? `📝 *Reason:* ${reason}\n` : `⚠️ Heads up: No reason was provided! We assume they're on a secret quest or perhaps just pondering the meaning of digital life.`}

⏰ *AFK Duration:* ${formattedDuration}. ${reaction}
    `.trim());
  }

  return true;
}

function formatDuration(duration) {
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}, ${minutes % 60} minute${minutes % 60 > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''}`;
  }
}
  
