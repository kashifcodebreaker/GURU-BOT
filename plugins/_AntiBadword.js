const toxicRegex = /\b(gandu|maderchod|bhosdike|bhosda|lauda|chutiya|🍆|maa ki chut|behenchod|bhenchod|behen ki chut|tatto ke saudagar|machar ki jhant|kuta|Randi ka aulad|xxx|boobs|sex|porn|lun|lan|dick|bitch|tits|bastard|asshole)\b/i;

export async function before(m, { isAdmin, isBotAdmin, conn }) {
    try {
        if (!m.isGroup) return false;

        if (!isBotAdmin) return true;

        if (isBotAdmin && m.fromMe) return true;

        const toxicMatch = m.text.match(toxicRegex);

        if (toxicMatch) {
            const toxicWord = toxicMatch[0].toLowerCase();

            if (isAdmin) {
                await conn.reply(m.chat, `🚫 Hey Admin! Watch your language! 😄*\n\nWe caught you using a naughty word (${toxicWord}). This message is under surveillance now. 🕵️‍♂️`, m);
            } else {
                const funnyMessages = [
                    `🚫 Oops! Someone just crossed the line with a naughty word (${toxicWord})! 😂\n\n*@${m.sender.split('@')[0]}*, is floating away from this group, thanks to their choice of words. 🚀🌎`,
                    `🚫 Warning! Naughty word (${toxicWord}) detected in the group. *@${m.sender.split('@')[0]}* is being escorted out for a vocabulary check. 📚👋`,
                    `🚷 Caution! Group purity violated with a naughty word (${toxicWord}) by *@${m.sender.split('@')[0]}*. Removing the linguistic intruder! 🧹🚷`,
                    `🚀 Blastoff! *@${m.sender.split('@')[0]}* used a rocket-fueled naughty word (${toxicWord}). Launching them out of the group! 🚀🚷`,
                    `🚷 Cleanup on aisle group! *@${m.sender.split('@')[0]}* spilled a naughty word (${toxicWord}). Sweeping them out for a cleaner chat! 🧹🚷`,
    `🚫 Oops! Someone just dropped a linguistic bomb (${toxicWord})! 😂\n\n*@${m.sender.split('@')[0]}*, is rocketing away from the group, leaving a trail of words behind. 🚀💣`,
    `⚠️ Alert! Unauthorized vocabulary (${toxicWord}) detected in the group. *@${m.sender.split('@')[0]}* is on a language vacation now. 🏝️🤐`,
    `🚷 Heads up! Group harmony disrupted by a wild word (${toxicWord}) used by *@${m.sender.split('@')[0]}*. The cleanup crew is on the way! 🧹🚷`,
    `🚀 Blastoff! *@${m.sender.split('@')[0]}* just fueled the chat with a sizzling word (${toxicWord}). Prepare for linguistic liftoff! 🚀🔥`,
    `🌪️ Watch out! *@${m.sender.split('@')[0]}* released a word tornado (${toxicWord}) in the group. Evacuate or enjoy the whirlwind! 🚷🌪️`,
    `🚷 Caution! The word police caught *@${m.sender.split('@')[0]}* red-handed using a spicy term (${toxicWord}). Sentence: group exit! 🚨👮`,
    `🚀 Language launch! *@${m.sender.split('@')[0]}* hit the throttle with a sky-high word (${toxicWord}). Destination: outer chatmosphere! 🚀☁️`,
    `🚫 Emergency! *@${m.sender.split('@')[0]}* triggered a wordquake (${toxicWord}) in the group. Evacuate before it shakes the chat! 🚨🌋`,
    `✨ Cleanup on aisle chat! *@${m.sender.split('@')[0]}* left a trail of glittering words (${toxicWord}). Time to sweep them out! ✨🧹🚷`,
    `🚀 Word warp! *@${m.sender.split('@')[0]}* just initiated a warp drive with a cosmic word (${toxicWord}). Adieu, interstellar chatter! 🚀🌌`,
    `🚷 Intruder alert! *@${m.sender.split('@')[0]}* breached the language barrier with a rogue term (${toxicWord}). Time to eject! 🚷🚀`,
    `🚀 Lift-off! *@${m.sender.split('@')[0]}* soared to new heights with an out-of-this-world word (${toxicWord}). Gravity can't hold them! 🚀🌠`,
    `🚷 Code red! *@${m.sender.split('@')[0]}* triggered the language alarm with a colorful word (${toxicWord}). Evacuate for safety! 🚨🚷`,
    `💥 Language meltdown! *@${m.sender.split('@')[0]}* caused a meltdown with a spicy word (${toxicWord}). Emergency exit engaged! 🚨💥`,
    `🚀 Rocket launch! *@${m.sender.split('@')[0]}* fueled up with a fiery word (${toxicWord}). Destination: linguistic galaxy! 🚀🔥`,
    `🚫 Language breach detected! *@${m.sender.split('@')[0]}* crossed the linguistic border with a wild word (${toxicWord}). Ejecting now! 🚷🚨`,
    `🧙‍♂️ Word wizardry! *@${m.sender.split('@')[0]}* enchanted the chat with a magical word (${toxicWord}). Abracadabra, and they're gone! 🧙🚀`,
    `🚷 Cleanup crew alert! *@${m.sender.split('@')[0]}* left a trail of mischief with a mischievous word (${toxicWord}). Time to tidy up! 🧹🚷`,
    `🚀 Warp speed! *@${m.sender.split('@')[0]}* hit warp speed with an intergalactic word (${toxicWord}). Zooming out of the chat! 🚀💨`,
    `🚷 Word spill! *@${m.sender.split('@')[0]}* spilled the chat with a slippery word (${toxicWord}). Mop-up in progress! 🧼🚷`,
    `🚀 Cosmic chatter! *@${m.sender.split('@')[0]}* launched a celestial word (${toxicWord}). Floating in the language cosmos now! 🌌🚀`,
    `🚷 Cleanup mode activated! *@${m.sender.split('@')[0]}* triggered a language cleanup with a tricky word (${toxicWord}). Sweeping out! 🧹🚷`,
    `🚀 Rocket ride! *@${m.sender.split('@')[0]}* hopped on the word rocket with an adventurous term (${toxicWord}). Soaring into the unknown! 🚀🌠`,
    `🚷 Alert! *@${m.sender.split('@')[0]}* left a word trail (${toxicWord}) in the group. Cleanup squad, assemble! 🚨🧹🚷`,
    `🚫 Language violation! *@${m.sender.split('@')[0]}* committed a verbal misdemeanor with an audacious word (${toxicWord}). Sentence: group exit! 👋🚷`,
    `🚷 Tidy chat alert! *@${m.sender.split('@')[0]}* scattered words (${toxicWord}) like confetti. Cleanup crew, ready for action! 🎉🧹🚷`,
    `🚀 Lift-off! *@${m.sender.split('@')[0]}* took off with a rocket-powered word (${toxicWord}). Launching out of the chat! 🚀`,
    `🚫 Oops! We've got a rebel here! *@${m.sender.split('@')[0]}* just dropped a linguistic bomb (${toxicWord}) and is ejected from the group. 🚀🌎`,
    `🚷 Warning! *@${m.sender.split('@')[0]}* disrupted the peace with a word storm (${toxicWord}). Evicting them for a vocabulary check. 📚👋`,
    `🚀 Emergency exit engaged! *@${m.sender.split('@')[0]}* launched a forbidden word (${toxicWord}). Blast-off to the unknown! 🚀🚷`,
    `🚷 Attention! Group hygiene compromised by *@${m.sender.split('@')[0]}*'s choice of words (${toxicWord}). Initiating cleanup for a fresh chat! 🧹🚷`,
    `🛑 Hold it right there! *@${m.sender.split('@')[0]}* triggered the language alarm with a word alert (${toxicWord}). Escorted out for chat safety! 🚨🚷`,
    `🚷 Cleanup on aisle group! *@${m.sender.split('@')[0]}* spilled a word not suitable for all audiences (${toxicWord}). Sweeping them out for a cleaner chat! 🧹🚷`,
    `🚀 Mission abort! *@${m.sender.split('@')[0]}* coded a word launch sequence (${toxicWord}). Ejecting them from the chat cockpit! 🚀🚷`,
    `🧨 Explosive vocabulary detected! *@${m.sender.split('@')[0]}* set off a language mine (${toxicWord}). Evacuating the chat for safety! 💣🚷`,
    `🚫 Halt! *@${m.sender.split('@')[0]}* unleashed a verbal storm (${toxicWord}). Putting them in timeout for a language check! ⛔🚷`,
    `🚷 Code red! Group integrity breached by *@${m.sender.split('@')[0]}*'s verbal intruder (${toxicWord}). Launching them out for a cleaner chat! 🚷🚀`,
    `🚫 Warning: *@${m.sender.split('@')[0]}* contaminated the chat with a forbidden word (${toxicWord}). Initiating quarantine for group health! 🚷🚨`,
    `🚀 Verbal escape detected! *@${m.sender.split('@')[0]}* attempted a chat break with a forbidden word (${toxicWord}). Launching them out of orbit! 🚀🚷`,
    `🚫 Breaking news: *@${m.sender.split('@')[0]}* violated the group dictionary with a red-flagged word (${toxicWord}). Headed towards chat exile! 🚷📰`,
    `🧹 Sweep alert! *@${m.sender.split('@')[0]}* left a word trail (${toxicWord}) in the group. Sweeping them out for a wordless chat! 🚷🧹`,
    `🚀 Emergency evacuation! *@${m.sender.split('@')[0]}* triggered a chat emergency with a risky word (${toxicWord}). Launching them to solo chat mode! 🚷🚀`,
    `🛡️ Shield up! *@${m.sender.split('@')[0]}* attempted a linguistic invasion with a prohibited word (${toxicWord}). Shielding the group, ejecting the invader! 🛡️🚷`,
    `🚷 Code violation! *@${m.sender.split('@')[0]}* committed a language felony with a flagged word (${toxicWord}). Sentenced to a chat-free exile! ⚖️🚷`,
    `🚫 Verbal red alert! *@${m.sender.split('@')[0]}* breached the language barrier with a risky word (${toxicWord}). Evacuating them for a clean chat environment! 🚷🚨`,
    `🚀 Words in flight! *@${m.sender.split('@')[0]}* launched a verbal missile (${toxicWord}) into the group. Activating the anti-word defense system! 🚷🚀`,
    `🚷 Breaking news: *@${m.sender.split('@')[0]}* left the chat with a word trail (${toxicWord}). Cleaning up the verbal mess for a pristine chat! 🚷📰`,
    `🚫 Group disturbance detected! *@${m.sender.split('@')[0]}* introduced a disruptive word (${toxicWord}). Eliminating the disturbance for a serene chat! 🚷🌐`,
    `🚷 Verbal contamination alert! *@${m.sender.split('@')[0]}* injected a risky word (${toxicWord}) into the chat. Quarantining them for a purified conversation! 🚷🧼`,
    `🚀 Chat turbulence detected! *@${m.sender.split('@')[0]}* stirred up the chat atmosphere with a forbidden word (${toxicWord}). Launching them to calmer skies! 🚷🚀`,
    `🚫 Code red: *@${m.sender.split('@')[0]}* coded a language breach with a forbidden word (${toxicWord}). Deploying the language police for enforcement! 🚷🚨`,
    `🚀 Words in orbit! *@${m.sender.split('@')[0]}* launched a verbal satellite (${toxicWord}) into the chat. Redirecting it to outer space for a wordless voyage! 🚷🌌`,
    `🚫 Alert! *@${m.sender.split('@')[0]}* triggered the language alarm with a flagged word (${toxicWord}). Initiating chat security measures! 🚷🚨`,
    `🚷 Word boundary breach! *@${m.sender.split('@')[0]}* crossed the linguistic line with a prohibited word (${toxicWord}). Sending them to the word-free zone! 🚷🌍`,
    `🚀 Chat turbulence alert! *@${m.sender.split('@')[0]}* shook up the conversation with a verbal earthquake (${toxicWord}). Launching them to calmer grounds! 🚷🚀`,
    `🚷 Language disturbance detected! *@${m.sender.split('@')[0]}* caused a verbal earthquake with a flagged word (${toxicWord}). Evacuating for linguistic stability! 🚷🌐`,
    `🚫 Alert: *@${m.sender.split('@')[0]}* set off the word alarm with a high-risk word (${toxicWord}). Initiating chat security for a language-safe zone! 🚷🚨`,
    `🚀 Verbal turbulence alert! *@${m.sender.split('@')[0]}* created a chat storm with a risky word (${toxicWord}). Launching them out for a calm chat atmosphere! 🚷🚀`,
    `🚷 Language quarantine in effect! *@${m.sender.split('@')[0]}* introduced a verbal contagion with a prohibited word (${toxicWord}). Isolating them for chat health! 🚷🧼`,
    `🚀 Verbal liftoff! *@${m.sender.split('@')[0]}* attempted a chat escape with a forbidden word (${toxicWord}). Launching them to solo chat adventures! 🚷🚀`,
    `🚫 Warning alert! *@${m.sender.split('@')[0]}* triggered a language alarm with a flagged word (${toxicWord}). Evacuating them for a safe chat environment! 🚷🚨`,
    `🚷 Code red! Group integrity breached by *@${m.sender.split('@')[0]}*'s verbal intruder (${toxicWord}). Launching them out for a cleaner chat! 🚷🚀`,
    `🚀 Chat turbulence detected! *@${m.sender.split('@')[0]}* stirred up the chat atmosphere with a forbidden word (${toxicWord}). Launching them to calmer skies! 🚷🚀`,
    `🚷 Language quarantine alert! *@${m.sender.split('@')[0]}* set off the chat contagion alarm with a prohibited word (${toxicWord}). Quarantining them for chat health! 🚷🧼`,
    `🚫 Alert: *@${m.sender.split('@')[0]}* disrupted the peace with a flagged word (${toxicWord}). Evacuating them for a serene chat environment! 🚷🚨`,
    `🚀 Emergency exit engaged! *@${m.sender.split('@')[0]}* launched a forbidden word (${toxicWord}). Blast-off to the unknown! 🚀🚷`,
    `🚫 Oops! Someone just crossed the line with a language grenade (${toxicWord})! 😂\n\n*@${m.sender.split('@')[0]}*, is floating away from this group, thanks to their choice of words. 🚀🌎`
];
                
                const randomIndex = Math.floor(Math.random() * funnyMessages.length);
                const randomMessage = funnyMessages[randomIndex];

                await conn.reply(m.chat, randomMessage, m);
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id } });
            }
        }
    } catch (error) {
        console.error(`[Antitoxic] Error: ${error}`);
    }
    return true;
}
