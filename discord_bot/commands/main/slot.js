const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('book_slot')
        .setDescription('The discord bot command to book a slot, if you need help please do /help book_slot')
        .addStringOption(option =>
            // the date for the slot
            option.setName('date')
                .setDescription('Enter a date (DD/MM/YYYY)')
                .setRequired(true)
                .setMinLength(10)
                .setMaxLength(10))
            // the slot number
        .addIntegerOption(option =>
            option.setName('slot')
                .setDescription('Choose a slot (0-6)')
                .setRequired(true)
                .setMinValue(0)
                .setMaxValue(6))
            // the people who will be in the slot
        .addStringOption(option =>
            option.setName('people')
                .setDescription('Enter names separated by commas')
                .setRequired(true))
            // the reason why the slot is needed
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('the reason why you want to use the pod')
                .setRequired(true)),

    async execute(interaction) {
        // Get user inputs
        const date = interaction.options.getString('date');
        const slot = interaction.options.getInteger('slot');
        const people = (interaction.options.getString('people')).split(",");
        const reason = interaction.options.getString('reason');

        let slots = [0,0,0,0,0,0,0];
        slots[slot] = 1;

        let compressedData = {
            "users": people,
            "slots": slots,
            "reason": reason,
            "date": date
        }

        try {
            const response = await fetch(`http://localhost:${process.env.PORT || 3000}/api/v1/request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text: compressedData })
            });
    
            const result = await response.json();
            let message = ""
            if (result.one == false) message = `${message}\n a user has already requested all of their slots`
            if (result.two == false) message = `${message}\n a requested slot has already been taken`
            
            if (message == "") message = "succefully requested the slots";
            await interaction.reply(message);
        } catch (error) {
            await interaction.reply("An error occurred while sending the request.");
        }
    },
};
