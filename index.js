const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] 
});


client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', (message) => handle(message));

function checked(string) {
    const find_checked = /^\-\s\[(x|\s)?]\s(.+$)/;
    const match = string.match(find_checked);
    if (match[1] == 'x') return `✓ ${match[2]}`;
    else return `☐ ${match[2]}`;
}

async function handle(message) {
    console.log('message created');
    if (message.channel.name == 'botspam' && 
        !message.author.bot &&
        message.content.startsWith('markdown\n')) {

        const find_bullet_pts = /^(\*|-)\s+(.+)$/gm;
        const find_headers = /^#\s+(.+)/gm;
        const find_checklist = /^\-\s\[(x|\s)?\]\s(.+)$/gm;
        


        const new_message = message.content
            .replace('markdown\n', '')
            .replaceAll(find_checklist, checked)
            .replaceAll(find_bullet_pts, '• $2')
            .replaceAll(find_headers, '**$1**');
            
        if (message.deletable) {
            message.reply(new_message);
        }
    }
}

client.login(token);
