// i would also not copy this one, also i dont need the comments anymore since they where just step by steps from this discord.js website
equire('dotenv').config();

const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const clientId = process.env.DISCORD_CLIENTID;
const token = process.env.DISCORD_TOKEN;

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        commands.forEach(element => {
            element.dm_permission = true;
            element.contexts = [0, 1, 2];
            element.integration_types = [0, 1];
        });

        const data = await rest.put(Routes.applicationCommands(clientId), {
            body: commands,
        }); 

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
})();