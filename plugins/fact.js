// fact.js

import axios from 'axios';

let handler = async (m) => {
  try {
    // Fetch a random fact from the Numbers API
    const response = await axios.get('http://numbersapi.com/random/trivia');
    const factText = response.data;

    // Reply with the fetched fact and add a reaction
    m.reply(`🤓 *Fact:* ${factText}`);
    m.react('🧠'); // Added brain emoji as a reaction
  } catch (error) {
    console.error('Error fetching fact from API:', error);
    m.reply('❌ Oops! Something went wrong. Unable to fetch a fact at the moment.');
  }
};

handler.help = ['fact'];
handler.tags = ['fun'];
handler.command = ['fact'];

export default handler;
