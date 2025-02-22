const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('view_slots')
		.setDescription('View the currently taken slots'),
	async execute(interaction) {
		const response = await fetch(`http://localhost:${process.env.PORT || 3000}/api/v1/view`);
		const data = await response.json();

		// i know i need to format it ill do it later
		await interaction.reply(`${JSON.stringify(data)}`)},
};