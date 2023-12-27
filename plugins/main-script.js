import { createWriteStream, promises as fsPromises } from 'fs';
import { promisify } from 'util';
import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'; // Explicitly import fontkit

const writeAsync = promisify(createWriteStream);
const unlinkAsync = fsPromises.unlink;

PDFDocument.registerFontkit(fontkit); // Register fontkit

const termsAndConditions = `
# Silver Fox Bot Terms and Conditions
...

Thank you for choosing Silver Fox Bot! We hope you enjoy the extended experience.
`;

let handler = async (m, { conn }) => {
    try {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();

        // Use default fonts
        const font = await pdfDoc.embedFont(PDFDocument.Font.Helvetica);

        // Add content
        page.drawText(termsAndConditions, {
            font,
            fontSize: 12,
            x: 50,
            y: page.getHeight() - 50,
            lineHeight: 15,
        });

        // Save and send the PDF file
        const pdfBytes = await pdfDoc.save();
        const filePath = 'Terms_and_Conditions.pdf';
        await writeAsync(filePath, pdfBytes);
        conn.sendFile(m.chat, filePath, 'Terms and Conditions', m, { quoted: m });
        await unlinkAsync(filePath);
    } catch (error) {
        console.error('Error sending Terms and Conditions:', error);
        m.reply('❌ Error sending Terms and Conditions. Please try again later.');
    }
};

handler.help = ['terms'];
handler.tags = ['main'];
handler.command = ['terms'];

export default handler;
