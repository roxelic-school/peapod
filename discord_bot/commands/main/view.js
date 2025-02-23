const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('view_slots')
        .setDescription('View the currently taken slots')
		.addStringOption(option =>
            option.setName('date')
                .setDescription('Enter a date (DD/MM/YYYY)')
                .setRequired(false))
		.addStringOption(option =>
			option.setName('person')
				.setDescription('enter the name of the person you would like to search for')
				.setRequired(false)),

    async execute(interaction) {
        try {
            const response = await fetch(`http://localhost:${process.env.PORT || 3000}/api/v1/view?day=${interaction.options.getString('date') || ""}&person=${interaction.options.getString('person') || ""}`);
            const data = await response.json();

			let formattedSlots = "";

			if (Object.keys(data).length > 5) {
				data = Object.fromEntries(Object.entries(data).slice(0, 5));
				console.log(data);

				formattedSlots = "sorry but your request was to large so it was shortend to the first 5 requests"
			}

			for (const key in data.fullContent){
				let slotdata = `\n---\n## ${key}\n---`;

				data.fullContent[key].forEach((item, index) => {
					let slotslotdata = `\n### slot${index}\n`

					if (item[0] == null){
						slotslotdata += "- null"
					} else {
						slotslotdata += `* ${item[0][0].join(", ")}\n\t- ${item[0][1]}`;
					}

					slotdata += slotslotdata;	
				});
				
				formattedSlots += slotdata;
			};

            const embed = new EmbedBuilder()
                .setTitle("Current Slots")
                .setDescription(formattedSlots)
                .setColor("#e42476")
                .setTimestamp()
                .setFooter({ text: "Slot Viewer", iconURL: interaction.client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error("Error fetching slots:", error);
            await interaction.reply({ content: "There was an error fetching the slots.", ephemeral: true });
        }
    }
};
