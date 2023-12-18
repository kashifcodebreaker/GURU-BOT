import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, text }) => {
    const lang = 'en'; // Default language is English

    const getWikipediaData = async (query, lang) => {
        try {
            const response = await axios.get(`https://${lang}.wikipedia.org/w/api.php`, {
                params: {
                    action: 'query',
                    format: 'json',
                    redirects: 1,
                    titles: query,
                    prop: 'extracts|info|pageimages',
                    inprop: 'url',
                    exintro: 1,
                    explaintext: 1,
                    pithumbsize: 500,
                },
            });

            const pageId = Object.keys(response.data.query.pages)[0];
            const page = response.data.query.pages[pageId];

            if (page.missing !== undefined || page.extract === '') {
                return null; // Page not found
            }

            const result = {
                title: page.title,
                url: page.fullurl,
                timestamp: new Date(page.touched),
                result: page.extract.trim(),
                image: page.thumbnail ? page.thumbnail.source : null,
            };

            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    // Check if a search query is provided
    if (!text) {
        return m.reply('❓ Please provide a search query. Example: `.wiki Artificial Intelligence`');
    }

    const wikiData = await getWikipediaData(text, lang);

    if (wikiData) {
        // Build the response
        let response = `🌐 *Language:* ${lang.toUpperCase()}\n`;
        response += `📚 *Title:* ${wikiData.title}\n`;
        response += `🔗 *Link:* ${wikiData.url}\n`;
        response += `🕒 *Timestamp:* ${wikiData.timestamp}\n`;
        response += `📖 *Result:* ${wikiData.result}`;

        // Check if an image is available
        if (wikiData.image) {
            // Send image with caption
            await conn.sendFile(m.chat, wikiData.image, 'wikipedia.jpg', response, m);
        } else {
            // Send text-only response
            m.reply(response);
        }
    } else {
        m.reply('❌ Sorry, no information found for the provided query.');
    }
};

handler.help = ['.wiki <query>', '.wikipedia <query>'];
handler.tags = ['tools'];
handler.command = ['wiki', 'wikipedia'];

export default handler;
