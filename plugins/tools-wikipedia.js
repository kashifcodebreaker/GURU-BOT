import axios from 'axios';

let handler = async (m, { args, conn }) => {
  try {
    if (!args.length) {
      return m.reply('❓ Come on! Throw me a bone - provide a search query to get Wikipedia information.');
    }

    // Combine the arguments to form the search query
    const query = args.join(' ');

    // Fetch data from the Wikipedia API
    const response = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        prop: 'extracts|pageimages|revisions|linkshere',
        exintro: true,
        explaintext: true,
        piprop: 'thumbnail',
        pithumbsize: 400,
        rvsection: 0,
        lhnamespace: 0,
        lhshow: '!redirect',
        titles: query,
      },
    });

    // Extract relevant information from the API response
    const pages = response.data.query.pages;
    const pageId = Object.keys(pages)[0];
    const page = pages[pageId];
    const content = page.extract;
    const image = page.thumbnail?.source;

    // Check if the search result is ambiguous (disambiguation)
    const isDisambiguation = content && content.includes('may refer to:');

    // Prepare additional information
    const languageCode = 'en'; // Default language is English
    const timestamp = new Date().toUTCString();
    const url = `https://${languageCode}.wikipedia.org/wiki/${encodeURIComponent(page.title)}`;

    // Prepare related searches
    const relatedSearches = isDisambiguation
      ? '\n\n*Related Searches:* You might also want to check: ' +
        content.split('may refer to:')[1].split('\n')[0].replace(/ *\([^)]*\) */g, '')
      : '';

    // Prepare a humorous touch
    const humor = isDisambiguation
      ? "\n\n🤔 *Feeling adventurous? Wikipedia suggests exploring these related searches!*"
      : '';

    // Prepare a message for not finding the information
    const notFoundMessage = `❌ *Wikipedia Search:* Well, it seems Wikipedia couldn't find what you were looking for. Maybe it's an undiscovered topic!`;

    // Send the rich response with image and text as caption
    await conn.sendFile(m.chat, image, 'image.png', `
🌐 *Language:* ${languageCode}
🕒 *Timestamp:* ${timestamp}
📚 *Title:* ${page.title}
🔗 *Link:* ${url}
${content ? content : `${notFoundMessage}${humor}${relatedSearches}`}
    `, m);

  } catch (error) {
    console.error('Error fetching data from Wikipedia API:', error);
    return m.reply(
      '❌ Oops! Something went wrong. Unable to fetch Wikipedia information at the moment. Maybe try again later?'
    );
  }
};

handler.help = ['wiki <query>'];
handler.tags = ['search', 'tools'];
handler.command = ['wikipedia', 'wiki'];

export default handler;

