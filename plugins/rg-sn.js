import { createHash } from 'crypto'

let handler = async function (m, { conn, text, usedPrefix }) {
let sn = createHash('md5').update(m.sender).digest('hex')
m.reply(`
▢ *seriel number* : ${sn}
`.trim())
}
handler.help = ['serial']
handler.tags = ['Registration']
handler.command = ['serial', 'sn', 'mysn'] 
handler.register = true
export default handler
