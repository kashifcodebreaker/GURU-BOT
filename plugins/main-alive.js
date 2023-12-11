let handler = async (m, { conn }) => {
    let uptime = process.uptime();
    let name = "Silver Fox"; // Change the name here

    let days = Math.floor(uptime / 86400);
    let hours = Math.floor(uptime / 3600) % 24;
    let minutes = Math.floor(uptime / 60) % 60;

    let message = `Hello there! I am ${name}, the Silver Fox. 🦊\nI'm very much alive and ready to assist you. 🤖\n\n🤖 *I've been active for* ${days} days, ${hours} hours, ${minutes} minutes\n\nKeep smiling! 😁`;

    conn.reply(m.chat, message, m);
}

handler.help = ['alive']
handler.tags = ['main']
handler.command = /^(alive)$/i 

export default handler;
