import { createWriteStream, promises as fsPromises } from 'fs';
import { promisify } from 'util';
import { PDFDocument } from 'pdf-lib';

const writeAsync = promisify(createWriteStream);
const unlinkAsync = fsPromises.unlink;

const termsAndConditions = `
# Silver Fox Bot Terms and Conditions

## 1. Introduction

Welcome to Silver Fox bot, your delightful virtual companion! These comprehensive terms and conditions detail the guidelines for engaging with our innovative chatbot, hereafter referred to as "the bot." Please read these terms attentively to ensure a harmonious and enjoyable experience.

## 2. Definitions

- **Bot:** Refers to Silver Fox Bot, an advanced virtual assistant designed to enrich your conversational interactions.
- **User:** Any individual accessing or interacting with the bot.
- **Content:** Encompasses text, images, videos, or any other material transmitted through the bot.

## 3. User Responsibilities

1. **Compliance:** Users are expected to adhere to all applicable laws, regulations, and these terms during their interactions with the bot.
2. **Respectful Conduct:** We encourage users to engage respectfully, refraining from harassment or any form of abusive behavior.
3. **Prohibited Activities:** Users shall not employ the bot for malicious purposes or disseminate harmful content.

## 4. Privacy and Data Handling

1. **Data Privacy:** Silver Fox Bot prioritizes user privacy and employs stringent measures to protect personal information.
2. **User Content:** Users are solely responsible for the content they share during interactions with the bot.
3. **Data Security:** Industry-standard security measures are implemented to safeguard user data.

## 5. Usage Restrictions

1. **Modification:** Users must not attempt to reverse engineer, modify, or tamper with the bot's underlying structure.
2. **Commercial Use:** Unauthorized commercial exploitation of the bot for profit or business purposes is strictly prohibited.
3. **Spam and Disruption:** Users shall refrain from engaging in spamming or any activities that disrupt the bot's functionality.

## 6. Limitation of Liability

1. **Disclaimer:** Silver Fox Bot is provided on an "as is" basis without any warranty.
2. **Damages:** We are not liable for any direct, indirect, or consequential damages arising from the use or inability to use the bot.

## 7. Changes to Terms

We reserve the right to modify, replace, or update these terms at any time. Users are encouraged to periodically review the terms for any changes.

## 8. User Conduct and Interactions

1. **Inappropriate Content:** Users must refrain from sharing explicit, offensive, or violative content.
2. **Interactions with Other Users:** Users are responsible for their interactions with other users facilitated by the bot.

## 9. Termination of Services

We reserve the right to terminate services to users who violate these terms or engage in misuse of the bot.

## 10. Contact Information

For inquiries or concerns regarding these terms, please contact us at support@silverfoxbot.com.

## 11. Acceptance of Terms

By using Silver Fox Bot, you acknowledge that you have read, understood, and agreed to these terms and conditions.

## 12. Governing Law

These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes will be subject to the exclusive jurisdiction of the courts in that jurisdiction.

## 13. NSFW Content Disclaimer

Silver Fox Bot supports NSFW (Not Safe For Work) content, which includes explicit material. To access such content, users must confirm their age and register as 18 years or older. We advise users to exercise caution and discretion.

## 14. Warnings and Disclaimers

Silver Fox Bot provides content for entertainment purposes only. The bot may generate humorous or fictional responses, and users are encouraged to interpret responses within this context.

## 15. Effective Date

These terms were last updated on December 22, 2023. Your continued use of Silver Fox Bot implies acceptance of the most recent version of these terms.

Thank you for choosing Silver Fox Bot! We hope you enjoy the extended experience.
`;

let handler = async (m, { conn }) => {
    try {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();

        // Embed fonts
        const regularFont = await pdfDoc.embedFont(PDFDocument.Font.Helvetica);
        const boldFont = await pdfDoc.embedFont(PDFDocument.Font.HelveticaBold);

        const headings = termsAndConditions.match(/^##\s(.+)$/gm);

        // Add headings and content
        headings.forEach((heading, index) => {
            const content = termsAndConditions.split(headings[index + 1] || '').pop();
            const fontSize = index === 0 ? 18 : 12;

            page.drawText(heading.replace(/^##\s/, ''), {
                font: index === 0 ? boldFont : regularFont,
                fontSize,
                x: 50,
                y: page.getHeight() - (index === 0 ? 50 : (index === 1 ? 100 : 150)),
                lineHeight: 15,
            });

            page.drawText(content.trim(), {
                font: regularFont,
                fontSize: 12,
                x: 70,
                y: page.getHeight() - (index === 0 ? 100 : (index === 1 ? 150 : 200)),
                lineHeight: 12,
            });
        });

        const pdfBytes = await pdfDoc.save();

        // Save the PDF file
        const filePath = 'Terms_and_Conditions.pdf';
        await writeAsync(filePath, pdfBytes);

        // Send the PDF file
        conn.sendFile(m.chat, filePath, 'Terms and Conditions', m, { quoted: m });

        // Delete the file from RAM
        await unlinkAsync(filePath);
    } catch (error) {
        console.error('Error sending Terms and Conditions:', error);
        m.reply('❌ Error sending Terms and Conditions. Please try again later.');
    }
};

handler.help = ['terms'];
handler.tags = ['info'];
handler.command = ['terms'];

export default handler;
