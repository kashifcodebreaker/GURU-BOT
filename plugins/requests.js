let handler = async (m, { conn, args, isAdmin, isBotAdmin }) => {
    if (!isBotAdmin || !isAdmin || !m.isGroup) {
        return;
    }

    const groupId = m.chat;
    const isApproveCommand = args[0]?.toLowerCase() === 'approve';

    if (!isApproveCommand) {
        m.react('🕵️');
        try {
            const responseList = await conn.groupRequestParticipantsList(groupId);

            if (responseList.length === 0) {
                await m.reply('👥 No pending join requests. Your group is already as exclusive as a VIP club!');
            } else {
                const groupInfo = await conn.groupMetadata(groupId);
                const numMembersNow = groupInfo.participants.length;

                await m.reply(`
👥 There are ${responseList.length} pending join requests.
👥 Current members in the group: ${numMembersNow}

❓ To approve join requests, use the complete command:
*requeststojoingroup approve <num>*

Example:
*requeststojoingroup approve 3*
                `);
            }
        } catch (error) {
            console.error('Error fetching join requests:', error);
            m.react('🥺');
            await m.reply('❌ Error fetching join requests. Please try again later.');
        }
        return;
    }

    if (!args[1] || isNaN(args[1])) {
        m.react('🙄');
        await m.reply(`
❓ You forgot to tell me how many members you want to welcome to the party.

Example:
*requeststojoingroup approve 3*
        `);
        return;
    }

    const numToApprove = parseInt(args[1]);

    if (numToApprove <= 0) {
        m.react('🤦‍♀️');
        await m.reply(`
❌ You can't welcome 0 or a negative number of members.

Correct usage example:
*requeststojoingroup approve 3*
        `);
        return;
    }

    try {
        const responseList = await conn.groupRequestParticipantsList(groupId);

        if (numToApprove > responseList.length) {
            m.react('🤦‍♀️');
            await m.reply(`
❌ You can't welcome more members than there are join requests.

Total pending requests: ${responseList.length}
            `);
            return;
        }

        await Promise.all([
            m.react('🚥'),
            conn.groupRequestParticipantsUpdate(groupId, responseList.slice(0, numToApprove).map(req => req.jid), 'approve')
                .then(async (response) => {
                    if (response.status === 200) {
                        const numApproved = responseList.length >= numToApprove ? numToApprove : responseList.length;
                        const numLeft = responseList.length - numApproved;

                        const groupInfo = await conn.groupMetadata(groupId);
                        const numMembersNow = groupInfo.participants.length;

                        m.react('✅');
                        await m.reply(`
*Successfully welcomed ${numApproved} new member(s) to the party!* 🥳
🎊 Members welcomed: ${numApproved}
🚪 Members still waiting outside: ${numLeft}
📊 Total members in the group now: ${numMembersNow}

*Tip: The more, the merrier! Keep the party going! 🎊*
                        `);
                    } else {
                        m.react('😟');
                        await m.reply('❌ Failed to welcome new member(s). Maybe next time!');
                    }
                })
                .catch((error) => {
                    console.error('Error processing join requests:', error);
                    m.react('😢');
                    await m.reply('❌ Error processing join requests. Please try again later.');
                }),
        ]);
    } catch (error) {
        console.error('Error processing join requests:', error);
        m.react('😢');
        await m.reply('❌ Error processing join requests. Please try again later.');
    }
};

handler.help = ['requeststojoingroup', 'requeststojoingroup approve <num>'];
handler.tags = ['group'];
handler.command = ['requeststojoingroup'];
handler.isBotAdmin = true;
handler.isAdmin = true;
handler.isGroup = true;

export default handler;
