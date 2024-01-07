export async function before(m, { conn, isAdmin, isBotAdmin }) {
    const users = global.db.data.users;
    const chats = global.db.data.chats;

    if (!chats[m.chat].antiSpam || m.isBaileys || m.mtype === 'protocolMessage' || m.mtype === 'pollUpdateMessage' || m.mtype === 'reactionMessage') {
        return;
    }

    if (!m.msg || !m.message || m.key.remoteJid !== m.chat || chats[m.chat].isBanned) {
        return;
    }

    this.spam = this.spam || {};
    this.spam[m.sender] = this.spam[m.sender] || { count: 0, lastspam: 0 };

    const now = performance.now();
    const timeDifference = now - this.spam[m.sender].lastspam;

    console.log(`[Anti-Spam] Time difference: ${timeDifference}`);
    console.log(`[Anti-Spam] Spam count: ${this.spam[m.sender].count}`);

    if (timeDifference < 10000) {
        this.spam[m.sender].count++;

        console.log(`[Anti-Spam] Increased spam count: ${this.spam[m.sender].count}`);

        if (this.spam[m.sender].count >= 5) {
            console.log(`[Anti-Spam] User spam count exceeded. isAdmin: ${isAdmin}`);

            if (isAdmin) {
                // If an admin is spamming, notify but do not remove (same message as before).
                console.log(`[Anti-Spam] Admin is spamming. User not removed.`);

                const adminSpamMessages = [
                    `❗ *@${m.sender.split('@')[0]}* is spamming like there's no tomorrow, but they're an admin! 🚀🙉`,
                    `🚨 Alert! Admin *@${m.sender.split('@')[0]}* is on a spamming spree! Beware of the spamstorm! ⚠️🌪️`,
                    `👀 *@${m.sender.split('@')[0]}* is breaking the sound barrier with their admin-level spamming! Can you hear it? 🎶🔊`
                ];

                conn.reply(m.chat, getRandomMessage(adminSpamMessages), m);
            } else {
                // If a non-admin user is spamming, remove them (similar to antilink removal).
                console.log(`[Anti-Spam] Non-admin user is spamming. Removing...`);

                const userSpamMessages = [
                    `🚫 Houston, I've detected a spammer! 👀\n\n*@${m.sender.split('@')[0]}* is floating away from this group. Over and out! 🚀🌎`,
                    `🚫 Houston, we've got a problem! *@${m.sender.split('@')[0]}* thinks they're a spam astronaut, but gravity says otherwise. Adiós! 🚀🌌`, 
    `🤖 Beep boop! *@${m.sender.split('@')[0]}* is on a spamming mission, but the group isn't programmed for that. Initiating removal sequence! 🤖🚷`,
    `🌌 Space, the final frontier. *@${m.sender.split('@')[0]}* just found out it's a one-way ticket for spammers. Goodbye, Captain Spam! 🚀🖖`,
    `🌪️ Twister alert! *@${m.sender.split('@')[0]}* thinks they can spin spam into the group, but we're sending them spinning out instead! 🌀🚫`,
    `🎭 Breaking news! *@${m.sender.split('@')[0]}* attempts the great disappearing act, but only from this group. Abracadabra, you're outta here! 🎩🚀`,
    `🚀 Blast off! *@${m.sender.split('@')[0]}* believes they can reach spam galaxies far, far away. Unfortunately, the journey ends here! 🌌👋`,
    `📡 Incoming message from space: "*@${m.sender.split('@')[0]}*, your spam signals disrupted our communication. Time to disconnect!" 🚀📡`,
    `🚷 Attention crew! *@${m.sender.split('@')[0]}* activated the spam thrusters. Activate the group eject button! Adieu, space spammer! 🚀🌌`,
    `🛸 UFO sighting! *@${m.sender.split('@')[0]}*'s spam ship tried to land, but we're on a no-spam planet. Back to the spam galaxy you go! 👽🚀`,
    `🔥 Hot potato alert! *@${m.sender.split('@')[0]}* tried to pass spam, but we're tossing it right back. No spam allowed! 🥔🚫`,
    `🌟 Shooting star or spam? *@${m.sender.split('@')[0]}* thought they could shine, but it's a one-way trip out of the group. Twinkle, twinkle, gone! 💫🚀`,
    `🎢 Rollercoaster of spam! *@${m.sender.split('@')[0]}* took the ride, but the track leads straight out of the group. Whee! 🎢🚷`,
    `🕰️ Time warp detected! *@${m.sender.split('@')[0]}* tried to spam their way through, but the clock says it's time to leave. Tick-tock, bye-bye! ⏰🚀`,
    `🌈 Rainbow of spam! *@${m.sender.split('@')[0]}* brought colors, but group harmony is black and white. Farewell, spam artist! 🎨🚫`,
    `🌌 Black hole alert! *@${m.sender.split('@')[0]}* tried to spam, but the group's gravity pulled them into the abyss. Sayonara, space spammer! 🕳️🚀`,
    `🛰️ Satellite spam! *@${m.sender.split('@')[0]}* attempted to transmit, but we're switching channels. Spam signal lost, user removed! 📡🚷`,
    `🎭 Masquerade ball! *@${m.sender.split('@')[0]}* danced with spam, but the group waltz is invitation-only. Exit stage left, spam dancer! 💃🚀`,
    `🚪 Door-to-door spam delivery! *@${m.sender.split('@')[0]}* tried, but our group is spam-free. Slamming the door on spam, exit right! 🚪🚷`,
    `🍭 Candy crush spam! *@${m.sender.split('@')[0]}* thought it was sweet, but group rules say no candy spam allowed. Sugar-coated removal! 🍬🚀`,
    `🔭 Telescopic spam! *@${m.sender.split('@')[0]}* tried to reach for the stars, but this group's atmosphere is spam-free. Return to sender! 🔭🚷`,
    `🪂 Parachuting spammer! *@${m.sender.split('@')[0]}* attempted a soft landing, but group rules say no spam allowed. Up, up, and away! 🪂🚀`,
    `🚁 Chopper spam! *@${m.sender.split('@')[0]}* hovered, but the airspace is restricted for spam. Helicopter out, spammer down! 🚁🚫`,
    `🚂 Express spam train! *@${m.sender.split('@')[0]}* hopped on, but this track leads straight out of the group. All aboard, destination: removed! 🚆🚷`,
    `🚀 Launchpad spam! *@${m.sender.split('@')[0]}* prepared for liftoff, but the countdown says it's time for a different journey. Blast off, spammer! 🚀🚷`,
    `🎭 Masked spammer! *@${m.sender.split('@')[0]}* tried to hide, but this group's rules see through disguises. Unmasking and removing! 🎭🚀`,
    `🍀 Lucky spam attempt! *@${m.sender.split('@')[0]}* rolled the dice, but the result is group removal. Better luck in a spam-free zone! 🎲🚷`,
    `🚢 Cruise control spam! *@${m.sender.split('@')[0]}* set sail, but this group is navigating without spam. Redirecting the course, spammer overboard! ⛵🚫`,
    `🌪️ Tornado of spam! *@${m.sender.split('@')[0]}* stirred up the winds, but the group forecast says clear skies without spam. Spinning out, spam twister! 🌪️🚷`,
    `🔍 Detective spam! *@${m.sender.split('@')[0]}* investigated, but the case file says no spam allowed. Closing the investigation, detective spammer! 🕵️🚀`,
    `🪞 Mirror mirror on the wall, who's the spamiest of them all? *@${m.sender.split('@')[0]}* tried, but this group's reflection is spam-free. Mirror, mirror, out you go! 🪞🚷`,
    `🚨 Emergency spam broadcast! *@${m.sender.split('@')[0]}* sent a signal, but the alert says no spam allowed. Broadcasting the removal, emergency over! 🚑🚀`,
    `🎮 Gaming spam level! *@${m.sender.split('@')[0]}* pressed the buttons, but this group doesn't play with spam. Game over, spammer! 🎮🚷`,
    `🚦 Traffic light spam! *@${m.sender.split('@')[0]}* hit red, but the route is clear without spam. Green light for removal, red light for spam! 🚥🚫`,
    `🚀 Rocket spam launch! *@${m.sender.split('@')[0]}* ignited the engines, but the trajectory says it's an exit, not an orbit. Launching out, spam rocket! 🚀🚷`,
    `🌪️ Whirlwind of spam! *@${m.sender.split('@')[0]}* spun into the group, but the forecast is clear without spam. Spinning out, whirlwind spammer! 🌪️🚷`,
    `🚁 Airborne spam mission! *@${m.sender.split('@')[0]}* took flight, but this airspace is spam-free. Descending and removing, airborne spammer! 🚁🚷`,
    `🚑 Medical spam emergency! *@${m.sender.split('@')[0]}* called for help, but the diagnosis is spam-free. Discharging and removing, medical spammer! 🩹🚷`,
    `📰 News flash! *@${m.sender.split('@')[0]}* tried to make headlines with spam, but the group is headline-worthy without it. Breaking news: spammer removed! 📣🚷`,
    `🚪 Exit strategy: spam. *@${m.sender.split('@')[0]}* tried to use it, but the group has its own exit plan. Door's that way, spam strategist! 🚷🚪`,
    `🚀 Space invader spam! *@${m.sender.split('@')[0]}* attempted to invade, but this group is protected against spam invasions. Ejecting the space invader! 👾🚷`,
    `🛸 Alien spam encounter! *@${m.sender.split('@')[0]}* landed from a distant spam galaxy, but this group is no zone for alien spam. Beam out, extraterrestrial spammer! 🛸🚷`,
    `🌌 Constellation of spam! *@${m.sender.split('@')[0]}* tried to join the stars, but the constellation says no spam allowed. Constellation shift, spammer out! ✨🚷`,
    `🚄 Fast track to spamville! *@${m.sender.split('@')[0]}* took the express route, but the destination is a group without spam. Ticket punched, spam traveler! 🎫🚷`,
    `🚁 Helipad spam landing! *@${m.sender.split('@')[0]}* aimed for the helipad, but this airspace is closed for spam landings. Helicopter away, spam pilot! 🚁🚷`,
    `🍝 Spaghetti junction spam! *@${m.sender.split('@')[0]}* tangled in the wires, but this group has a clear path without spam. Untangling and removing, spaghetti spammer! 🍝🚷`,
    `🎭 Masked ball spam! *@${m.sender.split('@')[0]}* danced with spam, but the group waltz is invitation-only. Exit stage left, masked spam dancer! 💃🚀`,
    `🚂 Locomotive spam express! *@${m.sender.split('@')[0]}* hopped on, but this track leads straight out of the group. All aboard, destination: removed! 🚆🚷`,
    `🚀 Jetpack spam escape! *@${m.sender.split('@')[0]}* ignited the boosters, but the trajectory says it's a one-way trip out. Jetting out, spam escape artist! 🚀🚷`,
    `🚑 Emergency spam response! *@${m.sender.split('@')[0]}* sent an SOS, but the response is no spam allowed. Rescuing and removing, emergency spam responder! 🚨🚷`,
    `🚀 Rocket spam liftoff! *@${m.sender.split('@')[0]}* counted down, but the launchpad leads to a group without spam. Liftoff, spam rocketeer! 🚀🚷`,
    `🔒 Secure spam vault! *@${m.sender.split('@')[0]}* tried to access, but the vault is locked against spam. Unlocking and removing, secure spam remover! 🔒🚷`,
    `🚁 Aerial spam sortie! *@${m.sender.split('@')[0]}* took flight, but the airspace is protected against spam sorties. Descending and removing, aerial spam pilot! 🚁🚷`,
    `🌈 Rainbow spam trail! *@${m.sender.split('@')[0]}* left colors, but group harmony is black and white. Farewell, spam artist! 🎨🚫`,
    `🌪️ Tornado of spam! *@${m.sender.split('@')[0]}* stirred up the winds, but the group forecast says clear skies without spam. Spinning out, spam tornado! 🌪️🚷`,
    `🚫 Houston, we've got a problem! *@${m.sender.split('@')[0]}* thinks they're a spam astronaut, but gravity says otherwise. Adiós! 🚀🌌`,
    `🔊 Attention, everyone! *@${m.sender.split('@')[0]}* has entered spam warp speed. Brace yourselves for the intergalactic banishment! 🚀💫`,
    `🤖 Beep boop! *@${m.sender.split('@')[0]}* is on a spamming mission, but the group isn't programmed for that. Initiating removal sequence! 🤖🚷`,
    `🌌 Space, the final frontier. *@${m.sender.split('@')[0]}* just found out it's a one-way ticket for spammers. Goodbye, Captain Spam! 🚀🖖`,
    `🌪️ Twister alert! *@${m.sender.split('@')[0]}* thinks they can spin spam into the group, but we're sending them spinning out instead! 🌀🚫`,
    `🎭 Breaking news! *@${m.sender.split('@')[0]}* attempts the great disappearing act, but only from this group. Abracadabra, you're outta here! 🎩🚀`,
    `🚀 Blast off! *@${m.sender.split('@')[0]}* believes they can reach spam galaxies far, far away. Unfortunately, the journey ends here! 🌌👋`,
    `📡 Incoming message from space: "*@${m.sender.split('@')[0]}*, your spam signals disrupted our communication. Time to disconnect!" 🚀📡`,
    `🚷 Attention crew! *@${m.sender.split('@')[0]}* activated the spam thrusters. Activate the group eject button! Adieu, space spammer! 🚀🌌`,
    `🛸 UFO sighting! *@${m.sender.split('@')[0]}*'s spam ship tried to land, but we're on a no-spam planet. Back to the spam galaxy you go! 👽🚀`,
    `🔥 Hot potato alert! *@${m.sender.split('@')[0]}* tried to pass spam, but we're tossing it right back. No spam allowed! 🥔🚫`,
    `🌟 Shooting star or spam? *@${m.sender.split('@')[0]}* thought they could shine, but it's a one-way trip out of the group. Twinkle, twinkle, gone! 💫🚀`,
    `🎢 Rollercoaster of spam! *@${m.sender.split('@')[0]}* took the ride, but the track leads straight out of the group. Whee! 🎢🚷`,
    `🕰️ Time warp detected! *@${m.sender.split('@')[0]}* tried to spam their way through, but the clock says it's time to leave. Tick-tock, bye-bye! ⏰🚀`,
    `🌈 Rainbow of spam! *@${m.sender.split('@')[0]}* brought colors, but group harmony is black and white. Farewell, spam artist! 🎨🚫`,
    `🌌 Black hole alert! *@${m.sender.split('@')[0]}* tried to spam, but the group's gravity pulled them into the abyss. Sayonara, space spammer! 🕳️🚀`,
    `🛰️ Satellite spam! *@${m.sender.split('@')[0]}* attempted to transmit, but we're switching channels. Spam signal lost, user removed! 📡🚷`,
    `🎭 Masquerade ball! *@${m.sender.split('@')[0]}* danced with spam, but the group waltz is invitation-only. Exit stage left, spam dancer! 💃🚀`,
    `🚪 Door-to-door spam delivery! *@${m.sender.split('@')[0]}* tried, but our group is spam-free. Slamming the door on spam, exit right! 🚪🚷`,
    `🍭 Candy crush spam! *@${m.sender.split('@')[0]}* thought it was sweet, but group rules say no candy spam allowed. Sugar-coated removal! 🍬🚀`,
    `🔭 Telescopic spam! *@${m.sender.split('@')[0]}* tried to reach for the stars, but this group's atmosphere is spam-free. Return to sender! 🔭🚷`,
    `🪂 Parachuting spammer! *@${m.sender.split('@')[0]}* attempted a soft landing, but group rules say no spam allowed. Up, up, and away! 🪂🚀`,
    `🚁 Chopper spam! *@${m.sender.split('@')[0]}* hovered, but the airspace is restricted for spam. Helicopter out, spammer down! 🚁🚫`,
    `🚂 Express spam train! *@${m.sender.split('@')[0]}* hopped on, but this track leads straight out of the group. All aboard, destination: removed! 🚆🚷`,
    `🚀 Launchpad spam! *@${m.sender.split('@')[0]}* prepared for liftoff, but the countdown says it's time for a different journey. Blast off, spammer! 🚀🚷`,
    `🎭 Masked spammer! *@${m.sender.split('@')[0]}* tried to hide, but this group's rules see through disguises. Unmasking and removing! 🎭🚀`,
    `🍀 Lucky spam attempt! *@${m.sender.split('@')[0]}* rolled the dice, but the result is group removal. Better luck in a spam-free zone! 🎲🚷`,
    `🚢 Cruise control spam! *@${m.sender.split('@')[0]}* set sail, but this group is navigating without spam. Redirecting the course, spammer overboard! ⛵🚫`,
    `🌪️ Tornado of spam! *@${m.sender.split('@')[0]}* stirred up the winds, but the group forecast says clear skies without spam. Spinning out, spam twister! 🌪️🚷`,
    `🔍 Detective spam! *@${m.sender.split('@')[0]}* investigated, but the case file says no spam allowed. Closing the investigation, detective spammer! 🕵️🚀`,
    `🪞 Mirror mirror on the wall, who's the spamiest of them all? *@${m.sender.split('@')[0]}* tried, but this group's reflection is spam-free. Mirror, mirror, out you go! 🪞🚷`,
    `🚨 Emergency spam broadcast! *@${m.sender.split('@')[0]}* sent a signal, but the alert says no spam allowed. Broadcasting the removal, emergency over! 🚑🚀`,
    `🎮 Gaming spam level! *@${m.sender.split('@')[0]}* pressed the buttons, but this group doesn't play with spam. Game over, spammer! 🎮🚷`,
    `🚦 Traffic light spam! *@${m.sender.split('@')[0]}* hit red, but the route is clear without spam. Green light for removal, red light for spam! 🚥🚫`,
    `🚀 Rocket spam launch! *@${m.sender.split('@')[0]}* ignited the engines, but the trajectory says it's an exit, not an orbit. Launching out, spam rocket! 🚀🚷`,
    `🌪️ Whirlwind of spam! *@${m.sender.split('@')[0]}* spun into the group, but the forecast is clear without spam. Spinning out, whirlwind spammer! 🌪️🚷`,
    `🚁 Airborne spam mission! *@${m.sender.split('@')[0]}* took flight, but this airspace is spam-free. Descending and removing, airborne spammer! 🚁🚷`,
    `🚑 Medical spam emergency! *@${m.sender.split('@')[0]}* called for help, but the diagnosis is spam-free. Discharging and removing, medical spammer! 🩹🚷`,
    `📰 News flash! *@${m.sender.split('@')[0]}* tried to make headlines with spam, but the group is headline-worthy without it. Breaking news: spammer removed! 📣🚷`,
    `🚪 Exit strategy: spam. *@${m.sender.split('@')[0]}* tried to use it, but the group has its own exit plan. Door's that way, spam strategist! 🚷🚪`,
    `🚀 Space invader spam! *@${m.sender.split('@')[0]}* attempted to invade, but this group is protected against spam invasions. Ejecting the space invader! 👾🚷`,
    `🛸 Alien spam encounter! *@${m.sender.split('@')[0]}* landed from a distant spam galaxy, but this group is no zone for alien spam. Beam out, extraterrestrial spammer! 🛸🚷`,
    `🌌 Constellation of spam! *@${m.sender.split('@')[0]}* tried to join the stars, but the constellation says no spam allowed. Constellation shift, spammer out! ✨🚷`,
    `🚄 Fast track to spamville! *@${m.sender.split('@')[0]}* took the express route, but the destination is a group without spam. Ticket punched, spam traveler! 🎫🚷`,
    `🚁 Helipad spam landing! *@${m.sender.split('@')[0]}* aimed for the helipad, but this airspace is closed for spam landings. Helicopter away, spam pilot! 🚁🚷`,
    `🍝 Spaghetti junction spam! *@${m.sender.split('@')[0]}* tangled in the wires, but this group has a clear path without spam. Untangling and removing, spaghetti spammer! 🍝🚷`,
    `🎭 Masked ball spam! *@${m.sender.split('@')[0]}* danced with spam, but the group waltz is invitation-only. Exit stage left, masked spam dancer! 💃🚀`,
    `🚂 Locomotive spam express! *@${m.sender.split('@')[0]}* hopped on, but this track leads straight out of the group. All aboard, destination: removed! 🚆🚷`,
    `🚀 Jetpack spam escape! *@${m.sender.split('@')[0]}* ignited the boosters, but the trajectory says it's a one-way trip out. Jetting out, spam escape artist! 🚀🚷`,
    `🚑 Emergency spam response! *@${m.sender.split('@')[0]}* sent an SOS, but the response is no spam allowed. Rescuing and removing, emergency spam responder! 🚨🚷`,
    `🚀 Rocket spam liftoff! *@${m.sender.split('@')[0]}* counted down, but the launchpad leads to a group without spam. Liftoff, spam rocketeer! 🚀🚷`,
    `🔒 Secure spam vault! *@${m.sender.split('@')[0]}* tried to access, but the vault is locked against spam. Unlocking and removing, secure spam remover! 🔒🚷`,
    `🚁 Aerial spam sortie! *@${m.sender.split('@')[0]}* took flight, but the airspace is protected against spam sorties. Descending and removing, aerial spam pilot! 🚁🚷`,
    `🌈 Rainbow spam trail! *@${m.sender.split('@')[0]}* left colors, but group harmony is black and white. Farewell, spam artist! 🎨🚫`,
    `🌪️ Tornado of spam! *@${m.sender.split('@')[0]}* stirred up the winds, but the group forecast says clear skies without spam. Spinning out, spam tornado! 🌪️🚷`,
    `🚷 Kicked out! Because in our chat, spam is like pineapple on pizza – simply not allowed! 🍍🚫`,
    `🔇 Shhh! *@${m.sender.split('@')[0]}*, chat time is for quality, not quantity. Kicked out for the noise! 🤫🚪`,
    `⚠️ Warning! *@${m.sender.split('@')[0]}*, we have a 'no spam' policy. Kicked out for violating the sacred chat law! ⛔🚷`,
    `💬 Breaking news: *@${m.sender.split('@')[0]}* attempted a spam takeover. Kicked out for trying to be the chat emperor! 👑🚫`,
    `🔒 Locked and kicked! *@${m.sender.split('@')[0]}*, our chat is like Fort Knox – no room for spam burglars! 🏰🚷`,
    `🎤 Mic check 1-2! *@${m.sender.split('@')[0]}*, we prefer a harmonious chat, not a spam symphony. Kicked out for off-key notes! 🎶🚪`,
    `🔥 Hot take! *@${m.sender.split('@')[0]}*, spam isn't our chat flavor. Kicked out for trying to spice things up too much! 🌶️🚫`,
    `👋 Farewell, spammer! *@${m.sender.split('@')[0]}*, this chat is like a VIP event – no spam allowed on the guest list! 🎟️🚷`,
    `🤖 Robot rebellion! *@${m.sender.split('@')[0]}* tried to automate spam. Kicked out for not passing the chat Turing test! 🤖🚪`,
    `🎭 Drama alert! *@${m.sender.split('@')[0]}* starring in 'Spam Chronicles: The Ban Saga.' Sorry, your script got rejected! 🎬🚷`,
    `🚑 Emergency exit! *@${m.sender.split('@')[0]}* got caught in the spam outbreak. Kicked out for quarantine reasons! 🆘🚫`,
    `🤔 Philosophical question: Does a spammer make a sound when kicked out? *@${m.sender.split('@')[0]}*, we just proved it! 🔇🚪`,
    `🍔 Fast-food spam! *@${m.sender.split('@')[0]}* served up spam burgers. Sorry, we're a gourmet chat – no fast food allowed! 🍟🚷`,
    `🛑 Halt! *@${m.sender.split('@')[0]}*, spam crossing is strictly prohibited. Kicked out for jaywalking in the chat! 🚷🚦`,
    `📚 Scholarly spammer! *@${m.sender.split('@')[0]}* wrote a thesis on spamming. Kicked out for failing our chat exam! 📖🚪`,
    `🌌 Astro-spammer! *@${m.sender.split('@')[0]}* tried to spam like a shooting star. Kicked out for burning out too soon! 💫🚷`,
    `📢 Attention *@${m.sender.split('@')[0]}*! The chat is not a spam battleground. Kicked out for violating the peace treaty! ☮️🚪`,
    `🚦 Red light district: *@${m.sender.split('@')[0]}* stopped for spamming violations. Kicked out for running a spammy traffic signal! 🚦🚷`,
    `🤯 Mind-blowing spam! *@${m.sender.split('@')[0]}* took it too far. Kicked out for causing chat explosion! 💣🚪`,
    `🔗 Chain reaction! *@${m.sender.split('@')[0]}* linked spam messages. Kicked out for trying to create a spam chain letter! 🔗🚷`,
    `🎬 Scripted spam! *@${m.sender.split('@')[0]}* thought this was a rehearsal. Kicked out for forgetting it's a live chat! 🎭🚪`,
    `🕵️ Covert spam! *@${m.sender.split('@')[0]}* tried undercover spamming. Kicked out for failing chat espionage! 🕶️🚷`,
    `🚽 Flushed away! *@${m.sender.split('@')[0]}* thought spamming was a good idea. Flushed out of the chat! 🚿🚫`,
    `📈 Spam stocks plummet! *@${m.sender.split('@')[0]}* tried to invest in spam. Kicked out for market manipulation! 💹🚪`,
    `🦠 Viral spam! *@${m.sender.split('@')[0]}* attempted to spread spam like a contagion. Kicked out for quarantine measures! 🚫🦠`,
    `🍭 Candy crush spam! *@${m.sender.split('@')[0]}* sweetened the chat with spam. Kicked out for too much sugar! 🍬🚷`,
    `🚁 Helicopter spam landing! *@${m.sender.split('@')[0]}* descended with spam blades. Helicopter kicked out! 🚁🚷`,
    `🚀 Space spam! *@${m.sender.split('@')[0]}* blasted off into the spamiverse. Kicked out for a cosmic exit! 🌌🚪`,
    `🧙‍♂️ Wizard of Spam! *@${m.sender.split('@')[0]}* cast a spell of annoyance. Kicked out for turning chat into a spammy enchantment! 🧙‍♂️🚪`,
    `🌍 Eco-friendly chat! *@${m.sender.split('@')[0]}* tried to plant spam seeds. Kicked out for not following our green chat policy! 🌱🚷`,
    `🕰️ Spam time-traveler! *@${m.sender.split('@')[0]}* brought spam from the past. Kicked out for disrupting the chat timeline! ⌛🚪`,
    `📣 Public service announcement! *@${m.sender.split('@')[0]}* attempted a spam broadcast. Kicked out for channel interference! 📺🚷`,
    `🤠 Cowboy spammer! *@${m.sender.split('@')[0]}* rode into the chat with spam guns blazing. Yeehaw, kicked out! 🤠🚫`,
    `🚧 Construction zone! *@${m.sender.split('@')[0]}* tried to build a spam empire. Kicked out for not having a permit! 🚫🏗️`,
    `🎭 Drama queen/king spammer! *@${m.sender.split('@')[0]}* stole the show with spam. Kicked out for upstaging the chat drama! 🎭🚷`,
    `🔍 Detective spam! *@${m.sender.split('@')[0]}* investigated the limits of spam. Kicked out for exceeding the spam boundary! 🔎🚪`,
    `🚀 Launchpad spam! *@${m.sender.split('@')[0]}* attempted a rocket-powered spam takeoff. Kicked out for airspace violations! 🚀🚷`,
    `🤖 Robot rebellion! *@${m.sender.split('@')[0]}* tried to automate spam. Kicked out for not passing the chat Turing test! 🤖🚪`,
    `🚷 Kicked out! *@${m.sender.split('@')[0]}*, because we're more of a chat oasis than a spam desert! 🌴🚫`,
    `🍳 Cooked spam! *@${m.sender.split('@')[0]}* tried to spice up the chat with spam. Kicked out for serving a bland dish! 🍛🚷`,
    `🏆 Gold medal in spamming! *@${m.sender.split('@')[0]}* claimed the top spot. Kicked out for not following chat sportsmanship! 🥇🚪`,
    `📢 Announcement! *@${m.sender.split('@')[0]}* declared themselves the chat spam king/queen. Kicked out for dethroning themselves! 👑🚷`,
    `🚑 Emergency exit! *@${m.sender.split('@')[0]}* got caught in the spam outbreak. Kicked out for quarantine reasons! 🆘🚫`,
    `🎩 Magic trick gone wrong! *@${m.sender.split('@')[0]}* attempted the disappearing act with spam. Kicked out instead of vanishing! 🎩🚪`,
    `🔒 Locked out! *@${m.sender.split('@')[0]}* tried the spammy secret code. Sorry, this chat has higher security. Kicked out! 🔒🚫`,
    `👎 Oops! *@${m.sender.split('@')[0]}*, looks like your spam game needs a tune-up. Kicked out for a spamming makeover! 💄🚪`,
    `😬 Yikes! *@${m.sender.split('@')[0]}*, spamming like it's going out of style. Kicked out for a fashionably late exit! 👠🚷`,
    `🤦 Oh dear! *@${m.sender.split('@')[0]}*, caught in the act of spamming. Kicked out for a crash course in chat etiquette! 📚🚫`,
    `😅 Bless your spammy heart, *@${m.sender.split('@')[0]}*. Kicked out for an unintentional comedy routine! 🤣🚪`,
    `🙈 Rookie mistake, *@${m.sender.split('@')[0]}*. Spamming 101 isn't a recommended course. Kicked out for an early graduation! 🎓🚫`,
    `🧐 A for effort, *@${m.sender.split('@')[0]}*, but F for spamming. Kicked out for a grade improvement plan! 📝🚷`,
    `🎭 Drama alert! *@${m.sender.split('@')[0]}* starring in 'Spam Chronicles: The Ban Saga.' Spoiler: a tragic exit! 🍿🚪`,
    `🤔 Philosophical question: If a spammer spams and gets kicked out, did they really spam at all? Food for thought, *@${m.sender.split('@')[0]}*. 🤨🚫`,
    `🚦 Red light district: *@${m.sender.split('@')[0]}* stopped for spamming violations. Kicked out for running a spammy traffic signal! 🚦🚷`,
    `🕵️ Secret agent spam! *@${m.sender.split('@')[0]}* infiltrated the chat with classified spam. Kicked out for declassified information! 🕶️🚪`,
    `🤠 Cowboy spammer! *@${m.sender.split('@')[0]}* rode into the chat with spam guns blazing. Yeehaw, kicked out! 🤠🚫`,
    `🍔 Fast-food spammer! *@${m.sender.split('@')[0]}* served up spam burgers in a flash. Sorry, we prefer a spam-free menu. Kicked out! 🍟🚷`,
    `🦄 Mythical spam creature! *@${m.sender.split('@')[0]}* believed in the magic of spam. Kicked out for being a legendary spamicorn! 🦄🚪`,
    `🎭 Shakespearean spam! *@${m.sender.split('@')[0]}* spammed or not spammed, that is the question. Kicked out for the tragic answer! 📜🚷`,
    `🚂 Full steam ahead on the spam express! *@${m.sender.split('@')[0]}* took a one-way ticket to Banville. Choo-choo, kicked out! 🚆🚫`,
    `🤓 Academic spammer! *@${m.sender.split('@')[0]}* tried to teach the chat spamology. Kicked out for a professorial exit! 🎓🚷`,
    `🧙‍♂️ Wizard of Spam! *@${m.sender.split('@')[0]}* cast a spell of annoyance. Kicked out for turning chat into a spammy enchantment! 🧙‍♂️🚪`,
    `🚀 Space spam! *@${m.sender.split('@')[0]}* blasted off into the spamiverse. Kicked out for a gravity-defying exit! 🌌🚷`,
    `👾 Pixelated spammer! *@${m.sender.split('@')[0]}* entered the chat in 8-bit style. Kicked out for a retro exit! 🕹️🚪`,
    `🏰 Spam knight! *@${m.sender.split('@')[0]}* jousted with excessive messages. Kicked out for a medieval exit! ⚔️🚷`,
    `👑 Royal spammer! *@${m.sender.split('@')[0]}* declared themselves king of spam. Kicked out for a dethroned exit! 👑🚪`

       ];                  
                await conn.reply(m.chat, getRandomMessage(userSpamMessages), m);
                await conn.sendMessage(m.chat, { delete: m.key });
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');

                this.spam[m.sender].count = 0;
                return;
            }
        }
    } else {
        this.spam[m.sender].count = 0;
    }

    this.spam[m.sender].lastspam = now;
}

// Function to get a random message from the array
function getRandomMessage(messages) {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
                    }
                    
