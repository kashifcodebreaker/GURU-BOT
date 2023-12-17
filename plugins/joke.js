// joke.js

import axios from 'axios';

let handler = async (m) => {
  try {
    // Fetch a random joke from the JokeAPI
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
    const jokeData = response.data;

    // Check if the joke is a two-parter
    const jokeText = jokeData.type === 'twopart'
      ? `${jokeData.setup}\n\n${jokeData.delivery}`
      : jokeData.joke;

    // Reply with the fetched joke
    return m.reply(`😄 *Joke:* ${jokeText}`);
  } catch (error) {
    console.error('Error fetching joke from API:', error);
    return m.reply('❌ Oops! Something went wrong. Unable to fetch a joke at the moment.');
  }
};

handler.help = ['joke'];
handler.tags = ['fun'];
handler.command = ['joke'];

export default handler;
