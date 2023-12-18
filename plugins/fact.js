// fact.js

import axios from 'axios';

let handler = async (m) => {
  try {
    // Fetch a random fact from the Numbers API
    const response = await axios.get('http://numbersapi.com/random/trivia');
    const factText = response.data;

    // Reply with the fetched fact
    return m.reply(`🤓 *Fact:* ${factText}`);
  } catch (error) {
    console.error('Error fetching fact from API:', error);
    return m.reply('❌ Oops! Something went wrong. Unable to fetch a fact at the moment.');
  }
};

handler.help = ['fact'];
handler.tags = ['fun'];
handler.command = ['fact'];

export default handler;
