let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  try {
    if (!text) {
      throw `🚀 To graciously extend an invitation, kindly provide the recipient's dignified phone number.\n\n📌 Example: *${usedPrefix + command}* 923012345678`;
    }

    if (text.includes('+')) {
      throw  `❌ Please enter the number without the *+* symbol. We prefer simplicity.`;
    }

    if (isNaN(text)) {
      throw '❌ Please enter only numbers, no spaces or fancy stuff is required.';
    }

    let group = m.chat;
    let inviteLink = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group);

    await conn.reply(
      text + '@s.whatsapp.net',
      `💌 *GROUP INVITATION* 💌\n\nDear esteemed recipient, you've been extended an invitation to join a group of notable individuals! 🎩✨\n\nShould you wish to partake in this refined gathering, kindly click the link below:\n${inviteLink}\n\nYour presence will be an honor, but please feel no obligation. We believe in voluntary excellence.`,
      m,
      { mentions: [m.sender] }
    );
    m.reply(`🎉 An eloquent invitation has been dispatched to the esteemed recipient!`);
  } catch (error) {
    console.error(error);
    m.reply(`❌ Oh dear! It seems a hiccup occurred. Please check the format and try again with refined precision.`);
  }
};

handler.help = ['invite <917xxx>'];
handler.tags = ['group'];
handler.command = ['invite', 'invitar']; 
handler.group = true;
handler.admin = false;
handler.botAdmin = true;

export default handler;
