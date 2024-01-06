import fg from 'api-dylux'
import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (m.isGroup) {
        m.reply(`🚫 This command works only in private chats!`)
        return
    }

    if (!args[0]) throw `✳️ Enter what you want to search for\n\n📌 *Example:*\n${usedPrefix + command} homero`

    try {
        let json = await fg.StickerSearch(text)

        if (!json.sticker_url || json.sticker_url.length === 0) throw '❇️ No stickers found, try another search term.'

        m.reply(`
✅ *Result*

▢ *Title:* ${json.title}
▢ *Total stickers:* ${json.sticker_url.length}
▢ *Estimated shipping time:* _*${json.sticker_url.length * 2} seconds*_`)

        for (let i of json.sticker_url) {
            const stickerFile = await sticker(false, i, global.packname, global.author)
            await conn.sendFile(m.chat, stickerFile, 'sticker.webp', '', m)
        }
    } catch (e) {
        m.reply(`❇️ Error: Try another search term.`)
    }
}

handler.help = ['getsticker']
handler.tags = ['sticker']
handler.command = ['getsticker', 'getstick', 'stickersearch', 'sticksearch']
handler.diamond = false

export default handler
