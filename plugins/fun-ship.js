function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

function getUserName(userId, groupMetadata) {
    const participant = groupMetadata.participants.find((p) => p.id === userId);
    return participant ? `@${participant.id.split('@')[0]}` : '';
}

function calculateCompatibility() {
    return Math.floor(Math.random() * 101);
}

function getRandomInterest() {
    const interests = ['music', 'movies', 'books', 'travel', 'food', 'gaming', 'art', 'sports', 'technology', 'dance', 'coding', 'puns'];
    return pickRandom(interests);
}

function getRandomMessages(messagesArray) {
    const shuffledMessages = messagesArray.sort(() => Math.random() - 0.5);
    return shuffledMessages.slice(0, 3).join('\n');
}

function handler(m, { groupMetadata, quoted }) {
    const participants = groupMetadata.participants.map((p) => p.id);
    const userA = m.sender;
    let userB;

    // Check if the command is used by quoting or mentioning a user
    if (quoted) {
        userB = quoted.sender;
    } else {
        do {
            userB = pickRandom(participants);
        } while (userB === userA);
    }

    const userNameA = getUserName(userA, groupMetadata);
    const userNameB = getUserName(userB, groupMetadata);

    const shipPercentage = calculateCompatibility();
    const commonInterests = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, getRandomInterest);

    let resultMessages;
    if (shipPercentage <= 10) {
        resultMessages = [
            'Interesting match! Maybe sparks will fly! 💥',
            'Compatibility level: Curious! 🧐',
            'Love is like a fine wine; let it age! 🍷💖',
            'They might need a love compass! 🌐💘',
            'Their love chart needs decoding! 🔍💔',
            'Love is a puzzle, and they have the first piece! 🧩❤️',
            'Their love story is like a mystery novel—full of twists and turns! 📖❓',
            'Compatibility level: Mysterious! 🕵️‍♀️💓',
            'Their love chart is a treasure map, let the adventure begin! 🗺️❤️',
            'The love-o-meter is hinting at an enigmatic connection! 🔍💖',
        ];
    } else if (shipPercentage <= 30) {
        resultMessages = [
            'Looks like an interesting match! 🌟',
            'Their love percentage is in the air! 💘',
            'The love-o-meter says it\'s a match! 💖',
            'Compatibility level: Beyond awesome! 😍',
            'They are sailing smoothly in the sea of love! 🚢❤️',
            'The love bugs are buzzing around this duo! 🐞💑',
            'They make a dynamic duo—love in action! 💥❤️',
            'Compatibility level: Sparkling! ✨💖',
            'Their love story is unfolding like a blockbuster movie! 🎬🍿',
            'Their love-o-meter hit the sweet spot! 🎯❤️',
        ];
    } else if (shipPercentage <= 50) {
        resultMessages = [
            'They\'ve got the magic touch! ✨🎩💖',
            'It\'s a match made in joyous celebration! 🎉❤️',
            'Love is in full bloom! 🌷💑',
            'Their compatibility is written in the stars! 🌌💞',
            'The love-o-meter is on fire! 🔥❤️',
            'They are the power couple everyone dreams of! 💪❤️',
            'Compatibility level: Legendary! 🌟💖',
            'Their love story is like a fairy tale—happily ever after! 🏰❤️',
            'They are not just a match; they are a love phenomenon! 💖✨',
            'Their love-o-meter is breaking all records! 📈❤️',
        ];
    } else if (shipPercentage <= 70) {
        resultMessages = [
            'They are two peas in a pod! 🥳💖',
            'Compatibility level: Rocking it! 🎸❤️',
            'Their love journey is hitting high notes! 🎶💑',
            'It\'s a symphony of love! 🎻❤️',
            'They are dancing to the rhythm of love! 💃💖',
            'Compatibility level: Harmonious! 🎤💞',
            'Their love story is like a chart-topping hit! 📈🎵',
            'They are creating a masterpiece of love! 🎨❤️',
            'Love is their favorite melody! 🎼💓',
            'Compatibility level: A musical match! 🎹❤️',
        ];
    } else if (shipPercentage <= 90) {
        resultMessages = [
            'They are the definition of couple goals! 🏆💖',
            'Compatibility level: Outstanding! 👏❤️',
            'Their love story is a masterpiece! 🖼️💑',
            'They are the rulers of the love kingdom! 👑❤️',
            'Compatibility level: Unbelievable! 😲💞',
            'Their love saga deserves a standing ovation! 🎭👏',
            'They are writing a love epic! 📜❤️',
            'Compatibility level: Exemplary! 🌟💖',
            'Their love is legendary, like a myth come true! 🌠❤️',
            'Compatibility level: Unmatched! 🌈💓',
        ];
    } else {
        resultMessages = [
            'Their love is the stuff of legends! 🚀💖',
            'Compatibility level: Astronomical! 🌌❤️',
            'Their love is out of this world! 🪐💑',
            'They are on another level of love! 🔝❤️',
            'Compatibility level: Galactic! 🌠💞',
            'Their love is like a shooting star, rare and magical! ✨❤️',
            'They are the constellation of love! ✨💖',
            'Compatibility level: Beyond the universe! 🌌💓',
            'Their love is a cosmic dance! 💫❤️',
            'Compatibility level: Celestial! 🌙💖',
        ];
    }

    const commonInterestMessages = [
        'Common Interests: What a match! They both enjoy ',
        'They found common ground in their shared passion for ',
        'Both enjoy bonding over their love for ',
        'Their connection deepens with common interests like ',
        'No wonder they clicked! Their shared interest in ',
        'Their love story is fueled by their mutual love for ',
        'Common Interests: It\'s destiny! They both cherish ',
        'Bonding over their shared love for ',
        'Their love is strengthened by their common interest in ',
        'It\'s a match made in heaven! They both love ',
    ];

    const randomResultMessage = getRandomMessages(resultMessages);
    const commonInterestsMessage = `${getRandomMessages(commonInterestMessages)}${commonInterests.join(', ')}!`;

    const replyMessage = `
📈 *Heartbeat Harmony Analysis:* 📈
${userNameA} ❤️ ${userNameB}
Compatibility: ${shipPercentage}%
💖 ${randomResultMessage}

🔍 *Insights:*
~ ${commonInterestsMessage}
`;

    m.reply(replyMessage, null, {
        mentions: [userA, userB],
    });
}

handler.help = ['ship'];
handler.tags = ['fun'];
handler.command = ['ship'];
handler.group = true;

export default handler;
