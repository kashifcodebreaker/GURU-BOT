export async function all(m, { usedPrefix }) {
  // When someone sends a group link to the bot's DM
  if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('open this link')) && !m.isBaileys && !m.isGroup) {
    const userName = this.getName(m.sender);
    
    this.sendMessage(m.chat, {
      text: `
🤖 *Greetings, ${userName}!* 🤖

👾 Thank you for extending an invitation for me to join your group. Your request has been acknowledged by my circuits.

🕒 *Processing Status:* Your request will be processed soon.

⏳ *Expected Time:* 24 to 48 hours

🤖 My robotic colleagues are working diligently to review your request. Once approved, I will autonomously join your group. Please remain patient.

📧 For urgent matters or inquiries, feel free to contact my support team by using the following command:
\`${usedPrefix}support [Your Message]\`

🚥 Your cooperation is appreciated, and your request will be processed soon. Embrace the efficiency of robotic camaraderie!
`,
    }, { quoted: m });
    m.react('📮');
  }

  return !0;
}
