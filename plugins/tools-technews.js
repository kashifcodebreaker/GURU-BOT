import axios from 'axios';

const NEWS_API_KEY = 'bc21704a1207432090852e46c0406920';

let handler = async (m, { conn, args }) => {
    const availableCategories = ['general', 'business', 'technology', 'entertainment', 'science', 'sports'];

    const category = args[0]?.toLowerCase();
    if (!category || !availableCategories.includes(category)) {
        return m.reply(`
❓ What's the buzz? Specify a valid news category:
${availableCategories.map(cat => `*${cat}*`).join(', ')}
Example:
*.news headlines technology*
        `);
    }

    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${NEWS_API_KEY}`);

        if (response.data.status !== 'ok') {
            return m.reply('❌ The newsroom is chaotic! Failed to fetch headlines. Try again later.');
        }

        const headlines = response.data.articles.map(article => `📰 *${article.title}*\n${article.description}\nRead more: ${article.url}`).join('\n\n');

        return m.reply(`
🌐 *${category.charAt(0).toUpperCase() + category.slice(1)} News Headlines:*
${headlines}
        
🔍 *Additional Options:*
- To get more details on a headline, use: *.news details <index>*
- For a random headline, try: *.news random*
        `);
    } catch (error) {
        console.error('Error fetching news headlines:', error);
        return m.reply('❌ Oh no! An error occurred while fetching news headlines. Gremlins are causing chaos. Try again later.');
    }
};

handler.details = async (m, { args }) => {
    const index = parseInt(args[0]);
    if (isNaN(index)) {
        return m.reply('❓ News flash! Provide a valid index for detailed info.');
    }

    const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=general&apiKey=${NEWS_API_KEY}`);

    if (response.data.status !== 'ok' || index < 0 || index >= response.data.articles.length) {
        return m.reply('❌ Hold the presses! Something went wrong fetching details. Gremlins are at play.');
    }

    const article = response.data.articles[index];

    return m.reply(`
📰 *${article.title}*
🗞️ Source: ${article.source.name}
📅 Published At: ${new Date(article.publishedAt).toLocaleString()}
📝 Description: ${article.description}
🔗 URL: ${article.url}
    `);
};

handler.random = async (m) => {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=general&apiKey=${NEWS_API_KEY}`);

    if (response.data.status !== 'ok') {
        return m.reply('❌ Hot off the press! Failed to fetch a random news headline. Gremlins are on a rampage.');
    }

    const randomIndex = Math.floor(Math.random() * response.data.articles.length);
    const randomArticle = response.data.articles[randomIndex];

    return m.reply(`
🎲 *Random News Headline:*
📰 *${randomArticle.title}*
${randomArticle.description}
Read more: ${randomArticle.url}
    `);
};

handler.help = ['headlines <category>', 'news', 'news random'];
handler.tags = ['news'];
handler.command = ['news', 'headlines'];
handler.group = true;

export default handler;
                                   
