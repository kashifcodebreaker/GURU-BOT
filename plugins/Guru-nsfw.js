import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command }) => {
  const groupChat = global.db.data.chats[m.chat];
  const userAge = global.db.data.users[m.sender].age;

  if (!groupChat.nsfw) {
    throw `🚫 This group doesn't support NSFW content.\n\nEnable it by using *${usedPrefix}enable* nsfw`;
  }

  if (userAge < 17) {
    throw `❎ You need to be at least 18 years old to access NSFW content.`;
  }

  m.reply(`⌛ Please wait while I find ${command.toLowerCase()} image for you...`);

  try {
    const res = await fetch(`https://fantox-apis.vercel.app/${command}`);
    if (!res.ok) throw await res.text();

    const json = await res.json();
    if (!json.url) throw '❎ Error';

    conn.sendFile(m.chat, json.url, 'img.jpg', `✅ Here's the ${command.toLowerCase()} image for you!`, m);
    m.reply(`🔥 Enjoy!`);
  } catch (error) {
    console.error(error);
    m.reply(`❎ Oops! Something went wrong while fetching the image.`);
  }
};

handler.help = ['genshin', 'swimsuit', 'schoolswimsuit', 'white', 'barefoot', 'touhou', 'gamecg', 'hololive', 'uncensored', 'sunglasses', 'glasses', 'weapon', 'shirtlift', 'chain', 'fingering', 'flatchest', 'torncloth', 'bondage', 'demon', 'wet', 'pantypull', 'headdress', 'headphone', 'tie', 'anusview', 'shorts', 'stokings', 'topless', 'beach', 'bunnygirl', 'bunnyear', 'idol', 'vampire', 'gun', 'maid', 'bra', 'nobra', 'bikini', 'whitehair', 'blonde', 'pinkhair', 'bed', 'ponytail', 'nude', 'dress', 'underwear', 'foxgirl', 'uniform', 'skirt', 'sex', 'sex2', 'sex3', 'breast', 'twintail', 'spreadpussy', 'tears', 'seethrough', 'breasthold', 'drunk', 'fateseries', 'spreadlegs', 'openshirt', 'headband', 'food', 'close', 'tree', 'nipples', 'erectnipples', 'horns', 'greenhair', 'wolfgirl', 'catgirl'];
handler.command = ['genshin', 'swimsuit', 'schoolswimsuit', 'white', 'barefoot', 'touhou', 'gamecg', 'hololive', 'uncensored', 'sunglasses', 'glasses', 'weapon', 'shirtlift', 'chain', 'fingering', 'flatchest', 'torncloth', 'bondage', 'demon', 'wet', 'pantypull', 'headdress', 'headphone', 'tie', 'anusview', 'shorts', 'stokings', 'topless', 'beach', 'bunnygirl', 'bunnyear', 'idol', 'vampire', 'gun', 'maid', 'bra', 'nobra', 'bikini', 'whitehair', 'blonde', 'pinkhair', 'bed', 'ponytail', 'nude', 'dress', 'underwear', 'foxgirl', 'uniform', 'skirt', 'sex', 'sex2', 'sex3', 'breast', 'twintail', 'spreadpussy', 'tears', 'seethrough', 'breasthold', 'drunk', 'fateseries', 'spreadlegs', 'openshirt', 'headband', 'food', 'close', 'tree', 'nipples', 'erectnipples', 'horns', 'greenhair', 'wolfgirl', 'catgirl'];
handler.tags = ['nsfw'];
handler.diamond = true;
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
                }
                   
