import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!global.db.data.chats[m.chat].nsfw) 
        throw `🚫 This group doesn't support NSFW content. Enable it with:\n*${usedPrefix}enable* nsfw`;

    let userAge = global.db.data.users[m.sender].age;
    if (userAge < 18) 
        throw m.reply(`❎ You need to be at least 18 years old to access this command. Keep it safe!`);

    if (!text) 
        throw `*This command provides sauce from nhentai: ${usedPrefix + command} [search term]*`;

    try {
        m.reply(global.wait);
        
        // Fetching nhentai search results
        let res = await fetch(`https://api.lolhuman.xyz/api/nhentaisearch?apikey=${lolkeysapi}&query=${text}`);
        let json = await res.json();

        // Extracting relevant information from the results
        let nhentaiId = json.result[0].id;
        let nhentaiTitle = json.result[0].title_native;

        // Fetching nhentai PDF
        let res2 = await fetch(`https://api.lolhuman.xyz/api/nhentaipdf/${nhentaiId}?apikey=${lolkeysapi}`);
        let json2 = await res2.json();
        let nhentaiPDF = json2.result;

        // Sending the nhentai PDF document
        await conn.sendMessage(m.chat, { document: { url: nhentaiPDF }, mimetype: 'application/pdf', fileName: `${nhentaiTitle}.pdf` }, { quoted: m });
    } catch {
        throw `*ERROR: No results found. Try searching with a different query.*`;
    }
};

handler.command = /^(hentai)$/i;
handler.help = ['hentai'];
handler.tags = ['nsfw'];
handler.register = true;

export default handler;
