import fetch from 'node-fetch';
import axios from 'axios';

export async function before(m, { conn }) {
  try {
    if (m.isBaileys && m.fromMe) {
      return true;
    }
    
    if (!m.isGroup) {
      return false;
    }

    const users = global.db.data.users;
    const chats = global.db.data.chats;

    const user = global.db.data.users[m.sender];
    const chat = global.db.data.chats[m.chat];
    let name = conn.getName(m.sender);

    if (m.mtype === 'protocolMessage' || m.mtype === 'pollUpdateMessage' || m.mtype === 'reactionMessage' || m.mtype === 'stickerMessage') {
      return;
    }

    if (!m.msg   || !m.message || m.key.remoteJid !== m.chat || users[m.sender].banned || chats[m.chat].isBanned) {
      return;
    }

    if (!m.quoted || !m.quoted.isBaileys) return;

    if (!global.db.data.settings[conn.user.jid].chatbot) {
      return true;
    }
    
    const msg = encodeURIComponent(m.text);
    console.log(msg);
    
    const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDJC5a882ruaC4XL6ejY1yhgRkN-JNQKg8', {
        contents: [{
          parts: [{
            text: msg
          }]
        }]
      });

    const data = response.data;
    if (data.candidates && data.candidates.length > 0) {
      const candidate = data.candidates[0];
      const content = candidate.content;

      let reply = content.parts[0].text; 
      if (reply) {
        reply = reply.replace(/Google/gi, 'Silver Fox Inc, a Robotics Company');
        reply = reply.replace(/a large language model/gi, botname);
    
        m.reply(reply);
      }
    } else {
      m.reply("That's a great question! I'd love to answer it, but I'm currently recharging my batteries. I'll be back at full power soon.");
    }
  } catch (error) {
    console.log(error);
  }
      }
