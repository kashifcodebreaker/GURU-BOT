// getadvice.js

import axios from 'axios';

let handler = async (m) => {
  try {
    // Fetch a random advice slip from the API
    const response = await axios.get('https://api.adviceslip.com/advice');
    const advice = response.data.slip.advice;

    // Reply with the fetched advice
    return m.reply(`💡 *Advice for you:* ${advice}`);
  } catch (error) {
    console.error('Error fetching advice from API:', error);
    return m.reply('❌ Oops! Something went wrong. Unable to fetch advice at the moment.');
  }
};

handler.help = ['getadvice'];
handler.tags = ['fun'];
handler.command = ['getadvice'];

export default handler;
