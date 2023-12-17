// gettopic.js

import axios from 'axios';

let handler = async (m) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://conversation-starter1.p.rapidapi.com/',
      headers: {
        'X-RapidAPI-Key': '684ef826d8msh3f26c47180d354bp1d1d82jsn81ad8ea6a990',
        'X-RapidAPI-Host': 'conversation-starter1.p.rapidapi.com',
      },
    };

    // Fetch a random conversation topic from the RapidAPI
    const response = await axios.request(options);
    const topic = response.data;

    // Reply with the fetched conversation topic
    return m.reply(`🗣️ *Random Topic:* ${topic}`);
  } catch (error) {
    console.error('Error fetching topic from RapidAPI:', error);
    return m.reply('❌ Oops! Something went wrong. Unable to fetch a topic at the moment.');
  }
};

handler.help = ['gettopic'];
handler.tags = ['fun'];
handler.command = ['gettopic'];

export default handler;
