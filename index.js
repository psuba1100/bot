//
//	Imports
//

const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const calc = require('./commands/calc.js')
const mongoose = require('mongoose')
const benv = require('./enviroment.js')
require('dotenv').config()
var termination = false
function wait(ms) {
	return new Promise((resolve) => {
	  setTimeout(resolve, ms);
	});
  }

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

const support = null
module.exports.support = support

//
//	events
//

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

//
//	on ready
//

client.once('ready', () => {
	console.log('Ready!');
	if(benv.restrictedMode == true){
		client.user.setStatus('invisible')
	}
	else if(benv.maintenanceMode == true){
		client.user.setActivity('my own maintenance', { type: 'WATCHING' })
	}
	else{
		client.user.setActivity('/help')
	}
});

//
//	archivácia
//

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: `Ajajaj niečo sa pokazilo! Nastala neznáma chyba počas používania tohto príkazu. Čo sa stalo: ${error}. Prosím kontaktujte vývojára.`, ephemeral: true });
	}

	const { commandName } = interaction;

	if (commandName === 'ping') {
		client.channels.cache.get('927619353405435914').send(`${interaction.user.tag} in #${interaction.channel.name} in ${interaction.guild.name} triggered an interaction: /ping command.`)
		console.log(`${interaction.user.tag} in #${interaction.channel.name} in ${interaction.guild.name} triggered an interaction: /ping command.`);
	} else if (commandName === 'server') {
		client.channels.cache.get('927619353405435914').send(`${interaction.user.tag} in #${interaction.channel.name} in ${interaction.guild.name} triggered an interaction: /server command.`)
		console.log(`${interaction.user.tag} in #${interaction.channel.name} in ${interaction.guild.name} triggered an interaction: /server command.`);
	} else if (commandName === 'používateľ') {
		client.channels.cache.get('927619353405435914').send(`${interaction.user.tag} in #${interaction.channel.name} in ${interaction.guild.name} triggered an interaction: /user command.`)
		console.log(`${interaction.user.tag} in #${interaction.channel.name} in ${interaction.guild.name} triggered an interaction: /user command.`);
	} else if (commandName == 'calc') {

		if (calc.o == '+') {
			client.channels.cache.get('927619353405435914').send({ content: `in #${interaction.channel.name} in ${interaction.guild.name}`, embeds: [calc.embedp] })
		}
		else if (calc.o == '-') {
			client.channels.cache.get('927619353405435914').send({ content: `in #${interaction.channel.name} in ${interaction.guild.name}`, embeds: [calc.embedm] })
		}
		else if (calc.o == '*') {
			client.channels.cache.get('927619353405435914').send({ content: `in #${interaction.channel.name} in ${interaction.guild.name}`, embeds: [calc.embedn] })
		}
		else if (calc.o == '/') {
			client.channels.cache.get('927619353405435914').send({ content: `in #${interaction.channel.name} in ${interaction.guild.name}`, embeds: [calc.embedd] })
		}
		else {
			return
		}
	}
	else if (commandName == 'suggest') {

		const suggestion = require('./commands/suggest.js')

		client.channels.cache.get('935170276952514640').send({ content: `user: ${suggestion.username}, id: ${suggestion.id} \n \n \n suggested: \n ${suggestion.suggestion}` })

	}
});

//
//	admin messages
//

client.on('messageCreate', async message => {
	try {
		if(message.author.id == "457648467997884428"){
			if (message.content.startsWith('UsDevCom!banAcc')) {
				var command = message.content
				var id = command.slice(16)
				const bannedModel = require('./models/bannedSchema')
				var data2 = await bannedModel.findOne({ userID: id });
				if (!data2) {
					let data = await bannedModel.create({
						userID: id,
						banned: 1
					})
					data.save();
					await message.reply(`user with id: ${id} , was succesfully banned and can't use bot commands any longer!`)
				} else {
					const a = await bannedModel.findOneAndUpdate({
						userID: id
					}, {
						$inc: {
							banned: 1,
						}
					}
					)
					await message.reply(`user with id: ${id} , was succesfully banned and can't use bot commands any longer!`)
				}}
			else if (message.content.startsWith('UsDevCom!unbanAcc')){

				var command = message.content
				var id = command.slice(18)
				const bannedModel = require('./models/bannedSchema')
				var data2 = await bannedModel.findOne({ userID: id });
				if (!data2) {
					await message.reply(`user with id: ${id} is not banned`)
				} else {
					await bannedModel.deleteOne({ _id: data2._id });
					await message.reply(`user with id: ${id} , was succesfully unbanned and can use bot commands again!`)
				}}
			else if(message.content == 'UsDevCom!terminate'){
				termination = true
				const m = await message.reply('Shutting down. Use "UsDevCom!stopTerminationProcess" to stop shut down process')
				await wait(10000)
				if(termination == true){
					const m1 = await message.channel.send('Shutting down > Exiting node process')
					await wait(1000)
					const m2 = await message.channel.send('Shutting down...')
					const m3 = await message.channel.send("cleaning...")
					m.delete(); m1.delete(); m2.delete(); m3.delete(); message.delete()
					await wait(1000)
					console.log('Exit code: 2')
					process.exit()
				}
			}
			else if(message.content == 'UsDevCom!stopTerminationProcess'){
				if(termination == true){
					termination = false
					await message.channel.send('Shut down process terminated')
				}else{
					await message.channel.send('There is no termination process going on')
				}
			}
			else if(message.content == 'usdc!k'){
				await message.react('✅')
				process.exit()
			}

			}}
	catch (error) {
		console.log(error)
	}
})

//
//	db
//

mongoose.connect(process.env.MONGODB_SRV, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	//userFindAndModify: false
}).then(() => {
	console.log('Connected db')
}).catch((err) => {
	console.log(err)
})
module.exports.client = client

client.login(process.env.TOKEN);