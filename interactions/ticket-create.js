const Discord = require('discord.js');

const guildTicketCategoryId = '1173008468991545414'; //reemplaza
const moderationRole = '1172990578728906752';//reemplaza

const ticketCloseButton = new Discord.ActionRowBuilder().addComponents(
    new Discord.ButtonBuilder()
    .setCustomId('ticket-close')
    .setLabel('Cerrar Ticket')
    .setStyle('2')
    .setEmoji('🔒')
)

async function main (interaction) {
    const {user, guild} = interaction;
    const ticketType = interaction.values[0];

    const tickets = guild.channels.cache.filter(channel => channel.parentId === guildTicketCategoryId);
    if(tickets.some(ticket => ticket.topic === user.id)) return interaction.reply({content: '!Ya Tienes un ticket abierto¡.', ephemeral: true})

    // Creacion de ticket
    interaction.reply({content: 'Tu ticket se esta creando...', ephemeral: true})
    .then(() => {
        guild.channels.create({
            name: ticketType+'-'+user.username.slice(0, 25-ticketType.length),
            topic: user.id,
            type: Discord.ChannelType.GuildText,
            parent: guildTicketCategoryId,
            permissionOverwrites: [
                {id: interaction.guild.roles.everyone, deny: [Discord.PermissionsBitField.Flags.ViewChannel]},
                {id: moderationRole, allow: [Discord.PermissionsBitField.Flags.ViewChannel]},
                {id: interaction.user.id, allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages]},
                      ]
        }).then(channel => {
            interaction.editReply({content: `- Tu ticket a sido creado: ${channel}`});

            channel.send({
                content: `<@&1172990578728906752> Hola ,${user} Bienvenido \n\nAguarda aqui hasta que te que algun staff atienda tu Ticket.`,
                components: [ticketCloseButton]
            });
        });
        
    });

};

module.exports = main;