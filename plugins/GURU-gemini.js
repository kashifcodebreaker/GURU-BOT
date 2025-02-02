import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyDJC5a882ruaC4XL6ejY1yhgRkN-JNQKg8');

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    try {
    if (!text) {
        m.reply(`Hey there! What's on your mind? 👀`);
    } else {

        m.react('🤖');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = text;
        const result = await model.generateContent(prompt);
        const response = result.response;
        const generatedText = response.text();
        m.reply(`${generatedText}`);
    } catch (error) {
        console.error(error);
        m.reply(`Uh-oh! The gears in my brain got a bit stuck. Please try again later!`);
    }
};

handler.help = ['gemini <text>'];
handler.tags = ['AI'];
handler.command = /^(gemini)$/i;

export default handler;
