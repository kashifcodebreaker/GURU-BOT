import fs from 'fs';

let handler = async (m, { conn }) => {
    const termsAndConditions = `
**Terms and Conditions for Using Our Bot**

By using this bot, you agree to comply with the following terms and conditions:

1. **Respectful Usage:** Users are expected to use the bot in a respectful and considerate manner. Any form of harassment, abuse, or misuse of the bot is strictly prohibited.

2. **Privacy:** We prioritize user privacy. The bot does not store personal information unless explicitly required for functionality. We do not share user data with third parties.

3. **Abuse of Commands:** Any attempt to abuse or exploit commands for malicious purposes is strictly prohibited. Users found violating this rule may be subject to a ban.

4. **Content Responsibility:** Users are solely responsible for the content they generate or share using the bot. Any inappropriate, offensive, or illegal content will not be tolerated.

5. **Bot Availability:** We strive to maintain the availability and reliability of the bot. However, we cannot guarantee uninterrupted service and reserve the right to temporarily or permanently disable the bot without notice.

6. **Updates and Changes:** The bot may undergo updates, modifications, or changes to enhance functionality or address issues. Users are encouraged to stay informed about these updates.

7. **Feedback and Support:** Users are welcome to provide feedback or report issues. Support will be provided as best as possible, but we do not guarantee immediate resolution.

8. **Legal Compliance:** Users must comply with all applicable laws and regulations while using the bot. Any unlawful activity will result in immediate termination of bot access.

9. **Usage Limitations:** Excessive usage that adversely affects server performance or stability is not allowed. We reserve the right to impose usage limitations.

10. **Dispute Resolution:** Any disputes arising from the use of the bot will be resolved through negotiation. If a resolution cannot be reached, legal action may be pursued.

**Rule Violations and Consequences:**
Breaking the rules will result in a ban, and we reserve the right to ban users for the following or any reasons:

• Calling the bot
• Using unlisted commands (commands not listed in the menu) repetitively
• Insulting/ignoring bot staff/administrator warnings
• Spamming in private or in groups
• Copying bot content or any unauthorized use of bot resources

**We reserve the right to ban users at our discretion for any reason.**

**Disclaimer:** We are not responsible for any consequences resulting from the use of this bot, including unauthorized use or copying of bot content.

*Note: These terms and conditions are subject to change. Users are advised to review them periodically.*

---
`;

    const fileName = 'Terms_and_Conditions.txt';

    fs.writeFileSync(fileName, termsAndConditions);

    // Send the file
    conn.sendFile(m.chat, fs.readFileSync(fileName), fileName, 'Terms and Conditions', m);

    fs.unlinkSync(fileName); // Delete the file after sending
};

handler.command = ['terms'];
handler.tags = ['info'];
handler.help = ['terms'];
handler.group = true;

export default handler;
