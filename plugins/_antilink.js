const linkRegex = /https?:\/\/(?:chat\.whatsapp\.com\/(?:invite\/)?|[^./?#]+\.[^./?#]+)/i;

const funnyMessages = [
  "🚫 Oops, *@{username}* sent a link! 😄\n\nWe're a link-free zone! 👀🚷\n\n*@{username}*, your link is now floating in cyberspace, forever alone, just like you! 😂🚀",
  "Roses are red, violets are blue, links are banned, and so are you! 😂🌹",
  "Hold on! 🛑 *@{username}*, did you just try to sneak in a link? Nice try! 😏🚷",
  "Roses are red, violets are blue, links are banned, and so are you! 😂🌹",
  "Breaking News! 📢 *@{username}*, attempting to smuggle a link into the group. Better luck next time! 😄🕵️",
  "🚷 Link detected! *@{username}*, our group is like Fort Knox for links. No entry allowed! 😎🔒",
  "Attention! 🚨 *@{username}*, your link has been intercepted and banished to the link graveyard! 😂👻",
  "Error 404: Link-free zone! 🚷 *@{username}*, your link is lost in the digital abyss. 😅🌐",
  "Nice try, *@{username}*, but our group is a no-link zone! 🚫😄",
  "Whoopsie daisy! *@{username}*, your link just took a one-way trip out of the group. 🎈✈️",
  "A link? Really, *@{username}*? That's so last century! 😂🌐",
  "🔍 Detecting a link from *@{username}*. Initiating link deletion protocol! 🤖🚷",
  "Link alert! 🚨 *@{username}*, your link got evicted. Pack your digital bags! 😜👜",
  "Roses are red, violets are blue, links are banned, and so are you! 😂🌹",
  "*@{username}*, attempting to link? Not on our watch! 🕵️‍♂️🚫",
  "Oh snap! 🤭 *@{username}*, you just triggered the linkinator. Say bye-bye to your link! 🤖🔗",
  "Link detected! 🧐 *@{username}*, we're a link-free VIP club. Your link didn't make the cut! 😎🎟️",
  "Roses are red, violets are blue, links are banned, and so are you! 😂🌹",
  "Warning! ⚠️ *@{username}*, linking is like trying to sneak into a high-security party here. Denied! 🚷🚫",
  "Oopsie! 😅 *@{username}*, links are like unicorns in our group – mythical and nonexistent! 🦄🚫",
  "Roses are red, violets are blue, links are banned, and so are you! 😂🌹",
  "Houston, we have a link! 🚀 But *@{username}*, this isn't a space-friendly zone. Link ejected! 🌌🔗",
  "🚨 Alert! *@{username}* tried to link. Deploying link-busters! 🕵️‍♂️💣",
  "Linking attempt detected from *@{username}*. Quick, someone fetch the link repellent! 🚫🐜",
  "Hold up! *@{username}* thinks this is a link-sharing picnic. Sorry, no picnics here! 🧺🚷",
  "Roses are red, violets are blue, links are banned, and so are you! 😂🌹",
  "📢 Attention all members! *@{username}* just tried to break the no-link record. Spoiler: They failed! 😂🥇",
  "Newsflash! 📡 *@{username}* is on a link-sharing spree. Someone dial the link police! 🚨🔗",
  "Link, who? *@{username}*, doesn't know the meaning of 'link.' Let's keep it that way! 😄🚷",
  "And the award for the most ambitious link sender goes to... *@{username}*! Sorry, it's a no-link Oscars. 🏆🚷",
  "🚀 Launching *@{username}* out of the linkosphere! No links allowed on this cosmic journey! 🌌🚀",
  "Link alert! 🚷 *@{username}*, your link is stuck in traffic on the information superhighway. Gridlock! 🚗🌐",
  "Initiating link extraction! *@{username}*, your link just got the digital surgery it never asked for. 🤖⚔️",
  "*@{username}*, we have a saying here: 'Links left at the door, manners on the floor!' 🚪😄",
  "Roses are red, violets are blue, links are banned, and so are you! 😂🌹",
  "Link detected! But fear not, *@{username}*. Our group is like Hogwarts, and links are Muggles – not allowed! 🧙‍♂️🚷",
  "Hold the link, please! Or actually, don't. *@{username}*, no links allowed! 😄🚷",
  "Link interception successful! *@{username}*, your link just got caught in the group's link-defense web. Better luck next time! 🕸️🚷",
  "Breaking the link chain! *@{username}*, this group is a link-free sanctuary. Links not welcome! 🚷🤣",
  "Link extinction alert! *@{username}*, your link just joined the ranks of extinct links in our group. RIP link! 🦖💔",
  "🌐 Link detected! But sorry, *@{username}*, our group has a 'No Linking Allowed' policy. Nice try! 🚷😂",
  "Didn't you read the rules, *@{username}*? No links allowed in this exclusive linkless club! 😄📜",
  "🚷 Link detected! *@{username}*, you missed the 'No Links Allowed' memo. Better luck next time! 😜📩",
  "Breaking news! *@{username}* attempted a link heist, but the vault is closed! 🏦🚷",
  "Link alert! 🚨 *@{username}*, your link just got the VIP rejection treatment. No entry, no links! 😎🚷",
  "Hold your horses, *@{username}*. Links are like wild stallions here – not welcome! 🐴🚷",
  "Link-in-the-box! *@{username}*, sorry, our group is not your link playhouse. Keep it link-free! 🎁🚷",
  "🚷 Warning! *@{username}* just danced with the link devil. Spoiler: Link got burned! 💃🔥",
  "Link on the loose! But not in our group. *@{username}*, release it into the linkless wilderness! 🌲🚷",
  "Roses are red, violets are blue, links are banned, and so are you! 😂🌹",
  "Incoming link alert! But fear not, *@{username}*, we have a force field against links. Nice try! ⚡🚷",
  "Breaking the link matrix! *@{username}*, your link just encountered a digital glitch. Error 101: No entry! 🕹️🚷",
  "🛑 Stop right there, *@{username}*. Links have a 'Do Not Enter' sign in our group! 😄🚫",
  "Link radar activated! *@{username}*, your link was spotted and promptly escorted out. Stealth mode failed! 🕵️‍♂️🚷",
  "🚫 No entry for links, *@{username}*. We're preserving the link-free harmony in this digital utopia! 😇🚷",
  "Hold the link, please! Or rather, don't. *@{username}*, no links allowed! 😄🚷",
  "Roses are red, violets are blue, links are banned, and so are you! 😂🌹",
  "Link interception successful! *@{username}*, your link just got caught in the group's link-defense web. Better luck next time! 🕸️🚷",
  "Breaking the link chain! *@{username}*, this group is a link-free sanctuary. Links not welcome! 🚷🤣",
  "Link extinction alert! *@{username}*, your link just joined the ranks of extinct links in our group. RIP link! 🦖💔",
  "Roses are red, violets are blue, links are banned, and so are you! 😂🌹",
  "🌐 Link detected! But sorry, *@{username}*, our group has a 'No Linking Allowed' policy. Nice try! 🚷😂",
  "Didn't you read the rules, *@{username}*? No links allowed in this exclusive linkless club! 😄📜",
  "🚷 Link detected! *@{username}*, you missed the 'No Links Allowed' memo. Better luck next time! 😜📩",
  "Breaking news! *@{username}* attempted a link heist, but the vault is closed! 🏦🚷",
  "Link alert! 🚨 *@{username}*, your link just got the VIP rejection treatment. No entry, no links! 😎🚷",
  "Roses are red, violets are blue, links are banned, and so are you! 😂🌹",
  "Hold your horses, *@{username}*. Links are like wild stallions here – not welcome! 🐴🚷",
  "Link-in-the-box! *@{username}*, sorry, our group is not your link playhouse. Keep it link-free! 🎁🚷",
  "🚷 Warning! *@{username}* just danced with the link devil. Spoiler: Link got burned! 💃🔥",
];

export async function before(m, { conn, isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup) return false;

  let chat = global.db.data.chats[m.chat];
  let bot = global.db.data.settings[this.user.jid] || {};
  const isGroupLink = linkRegex.exec(m.text);

  if (isGroupLink && !isAdmin && isBotAdmin) {
    const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
    if (!m.text.includes(linkThisGroup)) {
      const randomMessage = getRandomMessage(funnyMessages, m.sender);
      await conn.reply(m.chat, randomMessage, m, { mentions: [m.sender] });
      await conn.sendMessage(m.chat, { delete: m.key });
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      return false;
    }
  }

  return true;
}

// Function to get a random message from the array
function getRandomMessage(messages, username) {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex].replace('{username}', username.split('@')[0]);
}
