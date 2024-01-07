let handler = async (m, { conn, participants, usedPrefix, command }) => {
    let kickUsage = `👀 Whoosh! It seems you forgot to tag or quote the user you want to kick.
    `;

    // Check if the command is used with a mentioned user or a quoted message
    if (!m.mentionedJid[0] && !m.quoted) {
        m.reply(kickUsage, m.chat, { mentions: conn.parseMention(kickUsage) });
        m.react('🤔');
        return;
    }

    // Get the user to be kicked (prioritize mentioned user over quoted)
    let user = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null);

    // List of funny messages to be randomly picked
    const funnyMessages = [
        `🚀 Preparing to launch @${user.split('@')[0]} to the digital universe... and voilà, they're gone! 🌌`,
        `🕊️ Sending @${user.split('@')[0]} on a swift journey to the land of kicked users. Bon voyage! 🚀`,
        `👋 Adiós, @${user.split('@')[0]}! Maybe next time read the rules?`,
        `💔 Farewell, @${user.split('@')[0]}! Remember, it's a group, not a circus.`,
        `👢 Kick time for @${user.split('@')[0]}! Common sense wasn't that common, huh?`,
        `🚪 Door's that way, @${user.split('@')[0]}! Rules were right here.`,
        `👋 @${user.split('@')[0]}, our group wasn't ready for your special brand of chaos.`,
        `⚖️ Justice served! @${user.split('@')[0]}, the courtroom of common sense has spoken.`,
        `📚 Class dismissed, @${user.split('@')[0]}! Maybe study the rules next time.`,
        `🚀 Rocketing @${user.split('@')[0]} out! A journey to learn group manners awaits.`,
        `🎬 Cue dramatic exit for @${user.split('@')[0]}! Spoiler: Rules apply.`,
        `🏳️‍🌈 Waving goodbye to @${user.split('@')[0]}! Colors of common sense not included.`,
        `🚮 Trash taken out! Sorry, @${user.split('@')[0]}, you were cluttering the chat.`,
        `🛑 Halt! @${user.split('@')[0]}, for the crime of not following rules, you're out.`,
        `🤯 Brain cells needed! @${user.split('@')[0]}, too much for our rule-abiding group.`,
        `🧹 Sweeping out the chat! @${user.split('@')[0]}, cleanliness is next to groupiness.`,
        `🚽 Flushed away! @${user.split('@')[0]}, along with the trouble you brought.`,
        `🏹 Bullseye on @${user.split('@')[0]}! Kicked for a direct hit on group harmony.`,
        `🚪 Exit stage left, @${user.split('@')[0]}! Your performance needed more adherence to rules.`,
        `💥 Explosion of @${user.split('@')[0]}! Bursting with creativity, lacking in rule-following.`,
        `🪓 Axed! @${user.split('@')[0]}, consider this a chop-chop reminder to mind the rules.`,
        `🚶‍♂️ Walk of shame for @${user.split('@')[0]}! Adieu to rule-breakers.`,
	`🌪️ Hold on tight, @${user.split('@')[0]}! You're about to experience the whirlwind of being kicked! 💨`,
        `🎈 Just popped the balloon of @${user.split('@')[0]}'s presence. Farewell! 🎈`,
        `🚁 @${user.split('@')[0]} has boarded the helicopter of removal. See you on the other side! 🚁`,
	`🔥 Ready, set, delete! @${user.split('@')[0]} has vanished into thin air. Poof! ✨`,
        `🚶‍♂️ Taking a walk down the kicked lane with @${user.split('@')[0]}. Keep up if you can! 🏃‍♂️`,
        `🪂 Parachuting @${user.split('@')[0]} out of the group. Enjoy the soft landing! 🌄`,
        `🎉 And the award for the fastest exit goes to @${user.split('@')[0]}! Zoom, gone! 🚀`,
        `💨 @${user.split('@')[0]} decided to catch the breeze and gracefully leave the scene. Adieu! 🌬️`,
        `🎭 Performing the disappearing act with @${user.split('@')[0]}. Abracadabra, and they're out! 🎩`,
        `🏹 Bullseye! Direct hit on @${user.split('@')[0]} as they get kicked to the curb. Bye-bye! 🎯`,
        `🌊 Surfs up, @${user.split('@')[0]}! Riding the wave out of the group. Cowabunga! 🏄‍♂️`,
        `🎤 Dropping the mic and dropping @${user.split('@')[0]} from the group. Drop the beat! 🎶`,
        `🕰️ Tick-tock, tick-tock. Time's up, @${user.split('@')[0]}! Kicked with precision. ⏰`,
        `🪣 @${user.split('@')[0]} has been scooped out of the group like a scoop of ice cream. Melt away! 🍦`,
        `🪦 Graveyard shift for @${user.split('@')[0]} as they get buried in the list of kicked users. RIP! ☠️`,
        `🚀 Launching @${user.split('@')[0]} to a solo adventure. It's a one-way ticket! 🎫`,
        `🚶‍♀️ Stepping out of the group with style, @${user.split('@')[0]}. Catwalk, and they're gone! 👠`,
        `🎈 Bursting the balloon of @${user.split('@')[0]}'s group presence. Pop! Bye-bye! 🎈`,
        `🎭 Mastering the art of disappearing, @${user.split('@')[0]}. Vanish on, magician! 🧙`,
        `🍃 @${user.split('@')[0]} decided to leaf the group. Autumn vibes, farewell! 🍁`,
        `💣 Explosive exit by @${user.split('@')[0]}. Boom! The group will never be the same! 💥`,
        `🛌 Time for @${user.split('@')[0]} to hit the sack... kicked out of the group! Sweet dreams! 🌙`,
        `🚄 High-speed rail to the land of kicked users for @${user.split('@')[0]}. All aboard! 🚆`,   
        `🚀 Kicked @${user.split('@')[0]} to cyberspace! ✨`,
        `🪂 Parachuted @${user.split('@')[0]} out. Adios! 🌄`,
        `💨 @${user.split('@')[0]} vanished. Zoom, gone! 🚀`,
        `🎭 Abracadabra! @${user.split('@')[0]} disappeared. 🎩`,
        `🌊 Surfed out: @${user.split('@')[0]}. Cowabunga! 🏄‍♂️`,
        `🎤 Mic drop, @${user.split('@')[0]} kicked out. 🎶`,
        `🪦 @${user.split('@')[0]} RIP in group. ☠️`,
        `🚀 Launching @${user.split('@')[0]} solo. 🎫`,
        `🎈 Balloon burst: @${user.split('@')[0]}. Bye! 🎈`,
        `🚶‍♀️ Catwalk exit: @${user.split('@')[0]}. Vanish! 👠`,
        `💣 Explosive exit by @${user.split('@')[0]}. Boom! 💥`,
        `🛌 Sleep tight, @${user.split('@')[0]}. Kicked! 🌙`,
        `🚄 High-speed rail for @${user.split('@')[0]}. All aboard! 🚆`,
        `🚀 Poof! @${user.split('@')[0]} vanished. ✨`,
        `🪦 Graveyard shift: @${user.split('@')[0]} RIP. ☠️`,
        `🚀 Launched @${user.split('@')[0]}. Adios! 🎫`,
        `🎭 Magician's exit: @${user.split('@')[0]}. Vanished! 🧙`,
        `💨 @${user.split('@')[0]} zoomed out. Bye! 🚀`,
        `💥 Explosive kick: @${user.split('@')[0]}. Boom! 💣`,
        `🚄 Speedy exit for @${user.split('@')[0]}. All aboard! 🚆`
						 
 ];

    // Send a random fun message before removing the user
    m.reply(getRandomMessage(funnyMessages));
    m.react('✈️');


    // Add a slight delay before attempting to remove the user
    await sleep(500);
       
    // Remove the user
    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
};

handler.help = ['kick @user'];
handler.tags = ['group'];
handler.command = ['kick', 'expell', 'remove'];
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;

// Function to get a random message from the array
function getRandomMessage(messages) {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

// Function to sleep for a specified duration
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}		
