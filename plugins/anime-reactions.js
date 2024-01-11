import fetch from 'node-fetch';
import GIFBufferToVideoBuffer from '../lib/Gifbuffer.js';

const getBuffer = async (url) => {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    console.error("Failed to get buffer", error);
    throw new Error("Failed to get buffer");
  }
}

const getRandomMessage = (action, sender, target) => {
  const messageVariations = {
  bully: [
    `(${sender}) playfully bullied ${target}`,
    `Watch out! (${sender}) just teased ${target}`,
    `(${sender}) threw some friendly banter at ${target}`,
    `(${sender}) pulled a prank on ${target}`,
    `(${sender}) jokingly mocked ${target}`
  ],
  cuddle: [
    `(${sender}) gave a warm hug to ${target}`,
    `Aww! (${sender}) cuddled up with ${target}`,
    `Spread the love! (${sender}) shared a comforting cuddle with ${target}`,
    `(${sender}) wrapped ${target} in a cozy embrace`,
    `Warm fuzzies alert! (${sender}) snuggled with ${target}`
  ],
  cry: [
    `Oh no! (${sender}) made ${target} cry`,
    `(${sender}) shared a tear-jerking moment with ${target}`,
    `Someone get tissues! (${sender}) brought tears to ${target}'s eyes`,
    `(${sender}) played the world's saddest song, making ${target} cry`,
    `(${sender}) recounted a heartbreaking story, leaving ${target} in tears`
  ],
  hug: [
    `(${sender}) gave a warm hug to ${target}`,
    `Aww! (${sender}) hugged ${target} affectionately`,
    `Spread the love! (${sender}) shared a comforting hug with ${target}`,
    `(${sender}) wrapped ${target} in a cozy embrace`,
    `Warm fuzzies alert! (${sender}) snuggled with ${target}`
  ],
  awoo: [
    `(${sender}) let out a cute awoo with ${target}`,
    `Howling buddies! (${sender}) and ${target} awooed together`,
    `(${sender}) went full wolf mode, awooing with ${target}`,
    `Awooo! (${sender}) and ${target} harmonized their awoos`,
    `(${sender}) and ${target} had an awoo-off, and it was adorable`
  ],
  kiss: [
    `(${sender}) planted a sweet kiss on ${target}'s cheek`,
    `Love is in the air! (${sender}) shared a tender kiss with ${target}`,
    `Muah! (${sender}) and ${target} locked lips in a gentle kiss`,
    `(${sender}) couldn't resist, giving ${target} a passionate kiss`,
    `Kissing buddies! (${sender}) and ${target} exchanged affectionate kisses`
  ],
  lick: [
    `(${sender}) playfully licked ${target}`,
    `Tongue twister! (${sender}) gave ${target} a friendly lick`,
    `Lick attack! (${sender}) licked ${target} with joy`,
    `(${sender}) and ${target} engaged in a cute licking moment`,
    `Wet nose alert! (${sender}) couldn't resist licking ${target}`
  ],
  pat: [
    `(${sender}) gave a pat on the back to ${target}`,
    `Good job! (${sender}) patted ${target}'s head affectionately`,
    `(${sender}) showed appreciation with a gentle pat for ${target}`,
    `Pat buddies! (${sender}) and ${target} exchanged friendly pats`,
    `(${sender}) and ${target} shared a heartwarming patting moment`
  ],
  smug: [
    `(${sender}) put on a smug expression, impressing ${target}`,
    `Too cool for school! (${sender}) smirked smugly at ${target}`,
    `Smug level over 9000! (${sender}) flaunted a confident smirk for ${target}`,
    `(${sender}) and ${target} had a smug-off, but ${sender} clearly won`,
    `Impressive! (${sender}) couldn't help but look smug next to ${target}`
  ],
  bonk: [
    `(${sender}) gently bonked ${target} on the head`,
    `Bonk alert! (${sender}) playfully tapped ${target}'s forehead`,
    `(${sender}) and ${target} engaged in a friendly bonking moment`,
    `Watch out! (${sender}) bonked ${target} with a cushion`,
    `Bonking buddies! (${sender}) and ${target} shared a laugh after the bonk`
  ],
  yeet: [
    `(${sender}) yeeted ${target} across the room`,
    `Yeet attack! (${sender}) sent ${target} flying with a mighty yeet`,
    `(${sender}) and ${target} had a yeet-off, and ${target} went the farthest`,
    `Watch out! (${sender}) yeeted ${target} like a pro`,
    `(${sender}) couldn't resist a playful yeet, launching ${target} into laughter`
  ],
  blush: [
    `(${sender}) blushed at the sight of ${target}`,
    `Aww! (${sender}) couldn't help but blush around ${target}`,
    `Heartbeat rising! (${sender}) and ${target} shared a blush-worthy moment`,
    `(${sender}) and ${target} had a blushing contest, and it was adorable`,
    `Blush alert! (${sender}) felt a warm blush creeping in with ${target}`
  ],
  smile: [
    `(${sender}) smiled brightly at ${target}`,
    `Smile buddies! (${sender}) and ${target} exchanged cheerful smiles`,
    `(${sender}) couldn't help but smile around ${target}`,
    `Warm and fuzzy! (${sender}) and ${target} shared a heartwarming smile`,
    `(${sender}) flashed a grin, spreading joy to ${target}`
  ],
  wave: [
    `(${sender}) waved enthusiastically to ${target}`,
    `Hi there! (${sender}) greeted ${target} with a friendly wave`,
    `Wave alert! (${sender}) and ${target} exchanged waves from a distance`,
    `(${sender}) and ${target} had a wave-off, and it was epic`,
    `Waving buddies! (${sender}) and ${target} shared a moment of friendly waves`
  ],
  highfive: [
    `(${sender}) and ${target} high-fived with gusto`,
    `Highfive alert! (${sender}) and ${target} nailed a perfect high-five`,
    `(${sender}) gave ${target} a congratulatory high-five`,
    `Highfive buddies! (${sender}) and ${target} celebrated success with a high-five`,
    `(${sender}) initiated a high-five, and ${target} gladly reciprocated`
  ],
  handhold: [
    `(${sender}) and ${target} held hands with warmth`,
    `Hand-in-hand! (${sender}) shared a moment of handholding with ${target}`,
    `(${sender}) and ${target} enjoyed a heartwarming handholding experience`,
    `Handhold alert! (${sender}) and ${target} embraced the joy of handholding`,
    `(${sender}) reached out, and ${target} gladly accepted the handhold`
  ],
  nom: [
    `(${sender}) playfully nommed on ${target}'s shoulder`,
    `Nom alert! (${sender}) enjoyed a delightful bite with ${target}`,
    `(${sender}) and ${target} engaged in a cute nomming moment`,
    `    (${sender}) couldn't resist a playful nom, taking a nibble on ${target}`,
    `Nom buddies! (${sender}) and ${target} shared a moment of adorable noms`
  ],
  bite: [
    `(${sender}) playfully bit ${target} on the arm`,
    `Bite alert! (${sender}) and ${target} engaged in a friendly biting moment`,
    `(${sender}) couldn't resist a playful bite, taking a nibble on ${target}`,
    `Watch out! (${sender}) playfully sunk their teeth into ${target}`,
    `(${sender}) and ${target} shared a laugh after the playful bite`
  ],
  glomp: [
    `(${sender}) gave ${target} a big, enthusiastic glomp`,
    `Glomp alert! (${sender}) and ${target} shared a heartfelt glomp`,
    `(${sender}) couldn't resist the urge to glomp ${target} with joy`,
    `Watch out! (${sender}) tackled ${target} in a friendly glomp`,
    `(${sender}) and ${target} embraced in a warm and fuzzy glomp`
  ],
  slap: [
    `(${sender}) playfully slapped ${target}'s cheek`,
    `Slap alert! (${sender}) and ${target} engaged in a friendly slapping moment`,
    `(${sender}) couldn't resist a playful slap on ${target}'s back`,
    `Watch out! (${sender}) gave ${target} a gentle slap on the wrist`,
    `(${sender}) and ${target} shared a laugh after the playful slap`
  ],
  kill: [
    `(${sender}) jokingly tried to "kill" ${target}`,
    `Dangerous encounter! (${sender}) and ${target} engaged in a pretend battle`,
    `(${sender}) playfully aimed a pretend attack at ${target}`,
    `Watch out! (${sender}) declared a playful "kill" on ${target}`,
    `(${sender}) and ${target} shared a laugh after the pretend "kill"`
  ],
  happy: [
    `(${sender}) radiated happiness around ${target}`,
    `Happy vibes! (${sender}) and ${target} shared a moment of pure joy`,
    `(${sender}) couldn't help but feel happy around ${target}`,
    `Happy alert! (${sender}) and ${target} exchanged smiles and laughter`,
    `(${sender}) and ${target} celebrated the joyous occasion with happiness`
  ],
  wink: [
    `(${sender}) winked playfully at ${target}`,
    `Wink alert! (${sender}) and ${target} exchanged mischievous winks`,
    `(${sender}) couldn't resist a playful wink directed at ${target}`,
    `Watch out! (${sender}) sent a flirty wink to ${target}`,
    `(${sender}) and ${target} shared a laugh after the playful wink`
  ],
  poke: [
    `(${sender}) poked ${target} in a friendly manner`,
    `Poke alert! (${sender}) and ${target} engaged in a playful poking moment`,
    `(${sender}) couldn't resist a friendly poke on ${target}'s shoulder`,
    `Watch out! (${sender}) playfully poked ${target} with a grin`,
    `(${sender}) and ${target} shared a laugh after the friendly poke`
  ],
  dance: [
    `(${sender}) and ${target} danced together with joy`,
    `Dance alert! (${sender}) and ${target} grooved to the rhythm of happiness`,
    `(${sender}) couldn't resist breaking into a dance with ${target}`,
    `Dance-off! (${sender}) and ${target} showcased their dance moves`,
    `(${sender}) and ${target} celebrated the moment with a joyful dance`
  ],
  cringe: [
    `(${sender}) and ${target} cringed together at something awkward`,
    `Cringe alert! (${sender}) and ${target} shared a moment of shared cringe`,
    `(${sender}) couldn't help but cringe at the awkward situation with ${target}`,
    `Watch out! (${sender}) and ${target} exchanged cringes at the same time`,
    `(${sender}) and ${target} shared a laugh after the cringe-worthy moment`
  ]
};
    
  const variations = messageVariations[action];
  if (!variations || variations.length === 0) {
    return ''; // Return an empty string if the action is not recognized
  }

  const randomIndex = Math.floor(Math.random() * variations.length);
  return variations[randomIndex];
};

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let who;
if (m.isGroup) {
  who = m.mentionedJid[0] || (m.quoted && m.quoted.sender) || false;
} else {
  who = m.chat;
}

if (!who) throw `🤦🏻‍♀️ Mention the user or quote someone's message\n\n📌 Example : ${usedPrefix + command} @tag`;

let name = m.mentionedJid[0] ? conn.getName(m.mentionedJid[0]) : '';
let name2 = conn.getName(m.sender);

  m.react(rwait);

  let reaction = await fetch(`https://api.waifu.pics/sfw/${command}`);
  if (!reaction.ok) throw await reaction.text();
  
  let json = await reaction.json();
  let { url } = json;
  const gifBuffer = await getBuffer(url);
  const gifToVideoBuffer = await GIFBufferToVideoBuffer(gifBuffer);

  const message = getRandomMessage(command, name2, name);

  conn.sendMessage(
    m.chat,
    { video: gifToVideoBuffer, caption: message, gifPlayback: true, gifAttribution: 0 },
    { quoted: m }
  );

  m.react('☺️');
}

handler.tags = ['reaction'];
handler.help = [
  'bully @tag',
  'cuddle @tag',
  'cry @tag',
  'hug @tag',
  'awoo @tag',
  'kiss @tag',
  'lick @tag',
  'pat @tag',
  'smug @tag',
  'bonk @tag',
  'yeet @tag',
  'blush @tag',
  'smile @tag',
  'wave @tag',
  'highfive @tag',
  'handhold @tag',
  'nom @tag',
  'bite @tag',
  'glomp @tag',
  'slap @tag',
  'kill @tag',
  'happy @tag',
  'wink @tag',
  'poke @tag',
  'dance @tag',
  'cringe @tag'
];

handler.command = /^(bully|cuddle|cry|hug|awoo|kiss|lick|pat|smug|bonk|yeet|blush|smile|wave|highfive|handhold|nom|bite|glomp|slap|kill|happy|wink|poke|dance|cringe)$/i;
handler.group = true;

export default handler;
                           
