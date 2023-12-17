// gettopic.js

import axios from 'axios';

let handler = async (m) => {
  try {
    // Fetch a random conversation topic from the API
    const response = await axios.get('https://www.conversationstarters.com/getjson.php');
    const topic = response.data;

    // Reply with the fetched conversation topic
    return m.reply(`🗣️ *Random Topic to Discuss:* ${topic}`);
  } catch (error) {
    console.error('Error fetching topic from API:', error);
    return m.reply('❌ Oops! Something went wrong. Unable to fetch a topic at the moment.');
  }
};

handler.help = ['gettopic'];
handler.tags = ['fun'];
handler.command = ['gettopic'];

export default handler;
