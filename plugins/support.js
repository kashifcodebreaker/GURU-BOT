let handler = async (m, { conn, text, usedPrefix }) => {
  if (text) {
    // User has provided a message to send to support
    const supportMessage = `
📬 *New Support Message* 📬

*User:* @${m.sender.split('@')[0]}
*Chat ID:* ${m.chat}
*Message:* ${text}
    `;

    // Notify the owner about the support message and quote the user's message
    conn.sendMessage(global.owner[0] + '@s.whatsapp.net', { text: supportMessage, quoted: m });

    // Reply to the user with a confirmation
    m.reply(`
🌐 Your message has been delivered to our support team! 🚀

We've received your input and will work tirelessly to enhance your experience. Feel free to use the support command again for any further assistance. 🌟
    `);
  } else {
    // No message provided, provide instructions to the user with a more realistic example
    m.reply(`
🤖 *Support Center* 🤖

For assistance or inquiries, please use the support command:

📬 *How to contact:*
Send your message to support using:
\`${usedPrefix}support [Your Inquiry/Feedback]\`

*Example:*
\`${usedPrefix}support Encountered an issue when using command [Command Name]\`

We appreciate your input! Our team is on the lookout for any areas of improvement. 🚀
    `);
  }

  // React to the user's message
  m.react('💌');
};

handler.help = ['support [Your Inquiry/Feedback]'];
handler.tags = ['support'];

export default handler;
