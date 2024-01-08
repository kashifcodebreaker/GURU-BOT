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
                return m.reply('👥 No pending join requests. Your group is already as exclusive as a VIP club!');
            }

            const groupInfo = await conn.groupMetadata(groupId);
            const numMembersNow = groupInfo.participants.length;

            return m.reply(`
👥 There are ${responseList.length} pending join requests.
👥 Current members in the group: ${numMembersNow}

❓ To approve join requests, use the complete command:
*requeststojoingroup approve <num>*

Example:
*requeststojoingroup approve 3*
            `);
        } catch (error) {
            console.error('Error fetching join requests:', error);
            m.react('🥺');
            return m.reply('❌ Error fetching join requests. Please try again later.');
        }
    }

    if (!args[1] || isNaN(args[1])) {
        m.react('🙄');
        return m.reply(`
❓ You forgot to tell me how many members you want to welcome to the party.

Example:
*requeststojoingroup approve 3*
        `);
    }

    const numToApprove = parseInt(args[1]);

    if (numToApprove <= 0) {
        m.react('🤦‍♀️');
        return m.reply(`
❌ You can't welcome 0 or a negative number of members.

Correct usage example:
*requeststojoingroup approve 3*
        `);
    }

    try {
        const responseList = await conn.groupRequestParticipantsList(groupId);

        if (numToApprove > responseList.length) {
            m.react('🤦‍♀️');
            return m.reply(`
❌ You can't welcome more members than there are join requests.

Total pending requests: ${responseList.length}
            `);
        }

        m.react('🚥');
        const membersToApprove = responseList.slice(0, numToApprove).map(req => req.jid);

        const responses = await Promise.all(membersToApprove.map(async (member) => {
            return await conn.groupRequestParticipantsUpdate(groupId, [member], 'approve');
        }));

        const successfulResponses = responses.filter(response => response.status === 200);

        if (successfulResponses.length === numToApprove) {
            const numApproved = successfulResponses.length;
            const numLeft = responseList.length - numApproved;

            const groupInfo = await conn.groupMetadata(groupId);
            const numMembersNow = groupInfo.participants.length;

            m.react('✅');
            return m.reply(`
*Successfully welcomed ${numApproved} new member(s) to the party!* 🥳
🎊 Members welcomed: ${numApproved}
🚪 Members still waiting outside: ${numLeft}
📊 Total members in the group now: ${numMembersNow}

*Tip: The more, the merrier! Keep the party going! 🎊*
            `);
        } else {
            m.react('😟');
            return m.reply('❌ Failed to welcome new member(s). Maybe next time!');
        }
    } catch (error) {
        console.error('Error processing join requests:', error);
        m.react('😢');
        return m.reply('❌ Error processing join requests. Please try again later.');
    }
};

handler.help = ['requeststojoingroup', 'requeststojoingroup approve <num>'];
handler.tags = ['group'];
handler.command = ['requeststojoingroup'];
handler.isBotAdmin = true;
handler.isAdmin = true;
handler.isGroup = true;

export default handler;
                
