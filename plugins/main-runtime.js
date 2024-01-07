let handler = async (m, { conn, usedPrefix }) => {
  try {
    let _muptime;
    if (process.send) {
      process.send('uptime');
      _muptime = await new Promise(resolve => {
        process.once('message', resolve);
        setTimeout(resolve, 1000);
      }) * 1000;
    }
    let muptime = clockString(_muptime);

    // React with 🚀
    m.react('🚀');

    return m.reply(`
   🕰️ *Silver Fox Active Duration* 🕰️

    🦊 The Silver Fox has been actively assisting you!

    ⌛ *Uptime:* ${muptime}

    🚀 Pro tip: Just like a fox hunting for wisdom in the digital wilderness, I'm on a continuous quest to enhance your experience! 😄
    `);
  } catch (error) {
    console.error('Error fetching runtime:', error);
    m.react('❌'); // React with ❌ in case of an error
    return m.reply('❌ Oops! Something went wrong. Unable to fetch runtime information at the moment.');
  }
};

handler.help = ['runtime'];
handler.tags = ['main'];
handler.command = ['runtime', 'uptime'];
export default handler;

function clockString(ms) {
  let days = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  let hours = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let minutes = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let seconds = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;

  let durationString = '';

  if (days > 0) durationString += `${days}d `;
  if (hours > 0) durationString += `${hours}h `;
  if (minutes > 0) durationString += `${minutes}m `;
  if (seconds > 0) durationString += `${seconds}s `;

  return durationString.trim();
}
