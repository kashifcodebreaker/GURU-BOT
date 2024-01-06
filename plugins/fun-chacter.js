import fetch from 'node-fetch';

const getTemperamentFromAPI = async () => {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/breeds');
    const data = await response.json();
    const randomBreed = data[Math.floor(Math.random() * data.length)].temperament;
    return randomBreed;
  } catch (error) {
    console.error('Error fetching temperament from API:', error);
    throw new Error('Oops! Something went wrong while analyzing the character. Let me try my psychic powers... 🧙‍♂️');
  }
};

const getRandomDefaultCharacter = () => {
  const defaultCharacters = [
    'Friendly, Easygoing, Sociable',
    'Adventurous, Spontaneous, Enthusiastic',
    'Witty, Charming, Playful',
    'Clever, Curious, Independent', 'Sigma', 'Generous', 'Grumpy', 'Overconfident', 'Obedient', 'Good', 'Simp', 'Kind', 'Patient', 'Pervert', 'Cool', 'Helpful', 'Brilliant', 'Sexy', 'Hot', 'Gorgeous', 'Cute'     
  ];
  return defaultCharacters[Math.floor(Math.random() * defaultCharacters.length)];
};

const handler = async (m, { conn, text }) => {
  let mentionedUser = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : false);
  if (!mentionedUser) {
    m.reply("🔍 Psst! You forgot to mention or quote the user whose character you want to analyze. Try again with a user tag or by quoting a message! 🎭").then(() => m.react('🤔'));
    return m.react('🙄'); // Add this line to react to the user's message
  } 

  // Send "Analyzing..." message with a touch of humor
  m.reply("🔍 Let me put on my character-analysis glasses... Analyzing... 🕵️").then(() => m.react('🤖'));

  try {
    const userTemperament = await getTemperamentFromAPI();
    const response = `🧛‍♂️ The character of @${mentionedUser.split("@")[0]} is described as *${userTemperament}*!`;
    conn.sendMessage(m.chat, { text: response, mentions: [mentionedUser] }, { quoted: m });
    m.react('🎭');
  } catch (error) {
    console.error('Error:', error);
    const defaultCharacter = getRandomDefaultCharacter();
    const response = `🔮 I predict @${mentionedUser.split("@")[0]} has a character like *${defaultCharacter}*!`;
    conn.sendMessage(m.chat, { text: response, mentions: [mentionedUser] }, { quoted: m });
    m.react('😅');
  }
};

handler.help = ["character @tag"];
handler.tags = ['fun'];
handler.command = /^(character)$/i;

export default handler;
