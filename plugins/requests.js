import sock from '@whiskeysockets/baileys';
const groupRequestParticipantsList = sock.groupRequestParticipantsList;
const groupRequestParticipantsUpdate = sock.groupRequestParticipantsUpdate;

let handler = async (m, { conn, args, isAdmin, isBotAdmin }) => {
    if (!isBotAdmin || !isAdmin || !m.isGroup) {
        // Custom message provided in handler.js for non-admins or non-group context
        return;
    }

    const groupId = m.chat;

    // Check if the command includes 'approve'
    const isApproveCommand = args[0]?.toLowerCase() === 'approve';

    if (!isApproveCommand) {
        // Get the list of join requests
        const responseList = await groupRequestParticipantsList(groupId);

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
    }

    // Check if the number of members to approve is provided
    if (!args[1] || isNaN(args[1])) {
        return m.reply(`
❓ You forgot to tell me how many members you want to welcome to the party.

Example:
*requeststojoingroup approve 3*
        `);
    }

    const numToApprove = parseInt(args[1]);

    // Get the list of join requests
    const responseList = await groupRequestParticipantsList(groupId);

    if (numToApprove > responseList.length) {
        return m.reply(`
❌ You can't welcome more members than there are join requests.

Total pending requests: ${responseList.length}
        `);
    }

    const membersToApprove = responseList.slice(0, numToApprove).map(req => req.jid);

    // Approve the requested members
    const responseUpdate = await groupRequestParticipantsUpdate(groupId, membersToApprove, 'approve');

    if (responseUpdate.status === 200) {
        const numApproved = membersToApprove.length;
        const numLeft = responseList.length - numApproved;

        const groupInfo = await conn.groupMetadata(groupId);
        const numMembersNow = groupInfo.participants.length;

        return m.reply(`
*🎉 Successfully welcomed ${numApproved} new member(s) to the party!* 🥳
👤 Members welcomed: ${numApproved}
👥 Members still waiting outside: ${numLeft}
👥 Total members in the group now: ${numMembersNow}

*Tip: The more, the merrier! Keep the party going! 🎊*
        `);
    } else {
        return m.reply('❌ Failed to welcome new member(s). Maybe next time!');
    }
};

handler.help = ['approve <num>', 'requeststojoingroup'];
handler.tags = ['group'];
handler.command = ['requeststojoingroup'];
handler.isBotAdmin = true;
handler.isAdmin = true;
handler.isGroup = true;

export default handler;

