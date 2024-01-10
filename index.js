// Dependencias
const Discord = require('discord.js')

// Cliente

const Client = new Discord.Client({intents: 3276799});


const embed = {
    title: 'Sistema De Tickets de 247 Shop',
    description: 'Abre un ticket para Soporte, Compra, O Postulacion Para Staff.',
    color: 0x000000,
    image: {url: 'https://media.discordapp.net/attachments/1178823344703938580/1194330105200267274/969735acb003ae0d6c21b3ded9e96c24.jpg?ex=65aff596&is=659d8096&hm=112fe73b5baa1c2d817fb84d4f033e274df2289d1a6cc64707a4c3a484c067a0&format=webp&'}
};

const menu = new Discord.ActionRowBuilder().addComponents(
    new Discord.StringSelectMenuBuilder()
         .setPlaceholder('Abrir un ticket')
         .setMaxValues(1)
         .setMinValues(1)
         .setCustomId('ticket-create')
         .setOptions([{
        label: 'Support',
        emoji: '👋',
        description: 'Abrir un ticket de soporte',
        value: 'Soporte'
    }, {
        label: 'Buy',
        emoji: '💸',
        description: 'Abrir un ticket de compra',
        value: 'Compra'
    }, {
        label: 'Postu-Staff',
        emoji: '⚠️',
        description: 'Abrir un ticket de Postulacion',
        value: 'Postulacion'
    }])
);


Client.on('ready', async ( client ) => {
    console.log('Estoy Listo!')

   Client.user.setPresence({
    activities: [{ name: `247 Shop`, type: Discord.ActivityType.Watching }],
    status: 'online',
    });
});

/// Evento Interaction Create

Client.on("interactionCreate", async (interaction) => {
    if(interaction.isChatInputCommand()) return;
    
    try {
        const execute = require(`./interactions/${interaction.customId}`);
        execute(interaction);
    }  catch (error) {
        console.log('error')
    }
});

const prefix = `!`;


const { EmbedBuilder } = require('discord.js');

Client.on("messageCreate", async message => {
        if(message.content == "!metodo"){
    
            const embed = new EmbedBuilder()
            .setTitle("Metodos De Pago :")
            .setDescription("🇪🇸・En algunos Tipos de Medios de pago se puede agregar una comision por envio de dinero.\n\n<:MP:1194505228448436314>・Mercado Pago\n\n<:transferencia:1194505233284477088>・Trasferencia\n\n<:pp:1194505231342501888>・Paypal\n\n--------------------------------------------------------------------\n\n**Payment Methods** :\n\n🇺🇸・In some Types of Payment Methods, a fee may be added for sending money.\n\n<:MP:1194505228448436314> ・Mercado Pago\n\n<:transferencia:1194505233284477088> ・Wire transfer \n\n<:pp:1194505231342501888> ・Paypal\n\nHere are the aliases of each payment method: \n\n```Alias: 2477.shop```")      
            .setColor("000000")
    
            message.channel.send({
                embeds: [embed  ]     
            })
        }

})
// Registro
Client.login("MTEyNzc4ODIyNjYyNzc2NDI2NQ.GC9YND.wY4l_yiJkhG4BIBLoZjd6DW-bVLzaj_u8rM9M0")    