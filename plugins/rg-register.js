//import db from '../lib/database.js'

import { createHash } from 'crypto';

const registrationRegex = /\|?(.*)([.|] *?)([0-9]*)([.|] *?)([a-zA-Z]*)$/i;

const handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender];

  if (user.registered === true) {
    m.reply(`🚨 Oops! It seems you've already registered.\n\nTo make an exit, kindly use:\n*${usedPrefix}unregister* <Serial number>`);
    m.react('🤦');
    return;
  }

  if (!registrationRegex.test(text)) {
    m.reply(`⚠️ Let's go through this registration process with style! Follow the format:\n*${usedPrefix + command} name.age.gender*\n📌 Example: *${usedPrefix + command}* John.25.male`);
    m.react('🤔');
    return;
  }

  let [_, name, splitter1, age, splitter2, gender] = text.match(registrationRegex);

  if (!name) {
    m.reply('🚫 Oops! It seems the name field is feeling a bit empty. Please fill it up!');
    m.react('🙄');
    return;
  }

  if (!age) {
    m.reply('🚫 Ageless wonders? Unfortunately, we need an age to make sure you fit the vibe. Please provide your age.');
    m.react('🤷');
    return;
  }

  if (name.length >= 30) {
    m.reply('🚫 Apologies, but we need a more succinct name. Please keep it under 30 characters.');
    m.react('😬');
    return;
  }

  if (!/^[a-zA-Z\s]*$/.test(name)) {
    m.reply('🚫 Whoops! It seems there are some mysterious characters in the name. Please use only letters and spaces.');
    m.react('🤨');
    return;
  }

  age = parseInt(age);

  if (isNaN(age) || age < 13 || age > 40) {
    m.reply('🤔 Hmm, interesting choice of age! Unfortunately, our registration is exclusively for ages 13-40. Please choose an age within this range.');
    m.react('🧐');
    return;
  }

  if (gender) {
    gender = gender.toLowerCase();
    if (!['male', 'female', 'non-binary'].includes(gender)) {
      m.reply('🤔 Unusual choice of gender! We currently support "male", "female", or "non-binary". Please pick one.');
      m.react('😅');
      return;
    }
  }

  user.name = name.trim();
  user.age = age;
  user.gender = gender || 'non-binary';
  user.regTime = +new Date();
  user.registered = true;

  let serialNumber = createHash('md5').update(m.sender).digest('hex');

  m.reply(`
📋 *Registration Successful!*

•👤 Name: ${name}
•🎂 Age: ${age} years
•🚻 Gender: ${gender || 'non-binary'}
•🔑 Serial Number: ${serialNumber}

🚦 You're now officially registered. Ready to explore more? Type *${usedPrefix}menu* to see what I can do.
`.trim());
  m.react('✅');
};

handler.help = ['register'].map((v) => v + ' <name.age.gender>');
handler.tags = ['registration'];
handler.command = ['verify', 'reg', 'register', 'signup'];

export default handler;
  
