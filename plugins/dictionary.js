// dictionary.js

import axios from 'axios';

let handler = async (m, { args }) => {
  // Check if a word is provided
  if (!args[0]) {
    m.react('❓');
    return m.reply('❓ Please provide a word to get its definition. Example: `.dictionary hello`');
  }

  const word = args[0].toLowerCase();

  try {
    // Fetch the definition from WordsAPI
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const definition = response.data[0].meanings[0]?.definitions[0]?.definition;

    if (definition) {
      m.react('📖');
      return m.reply(`
📖 *Definition of ${word}:*
${definition}
      `);
    } else {
      m.react('❌');
      return m.reply(`❌ Unable to find the definition for "${word}".`);
    }
  } catch (error) {
    console.error('Error fetching word definition from API:', error);
    m.react('❌');
    return m.reply('❌ Oops! Something went wrong. Unable to fetch the definition at the moment.');
  }
};

handler.help = ['dictionary <word>'];
handler.tags = ['tools'];
handler.command = ['dictionary'];

export default handler;
