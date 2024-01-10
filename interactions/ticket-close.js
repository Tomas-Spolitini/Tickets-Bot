async function main (interaction) {
    const {channel, guild} = interaction;

    const ticket_owner = await guild.members.fetch(channel.topic)
    .catch(err => console.log(err));

    interaction.reply('Cerrando Ticket...')
    .then(() => {
        channel.delete();
        if(ticket_owner) ticket_owner.send('Tu ticket a sido cerrado exitosamente por <@1127788226627764265>' );
    })

};

    module.exports = main;