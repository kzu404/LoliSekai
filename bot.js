const Discord = require('discord.js')
const client = new Discord.Client()
const request = require('request');

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Antisipasi bot membaca text sendiri
        return
    }
    
    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Menghilangkan Kata Perintah
    let splitCommand = fullCommand.split(" ") // Memotong (split) kata setelah perintah tiap spasi
    let primaryCommand = splitCommand[0] // Mengambil kata pertama setelah !
	let arguments = splitCommand.slice(1) // Mengambil nilai setelah perintah
	
    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments)

    if (primaryCommand == "help") {
        helpCmd(arguments, receivedMessage)
	}else if (primaryCommand == "lv") {
        lvlCmd(arguments, receivedMessage)
    } else if (primaryCommand == "ping") {
        pingCmd(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("Perintah tidak di kenal silahkan ketik !help")
    }
}

function helpCmd(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("Bantuan untuk perintah " + arguments)
    } else {
        receivedMessage.channel.send("Silahkan ketikan perintah !help nama_perintah agar lebih jelas.")
    }
}
function lvlCmd(arguments, receivedMessage) {
	 if (arguments.length > 0) {
		 var coin = arguments;
		 var value = '';
		 try{
			request('http://betech.id/api/lvlapi.php?lvl=' + coin,
			function(error,res,body) {
				var jsonData = JSON.parse(body);
				for (var i = 0; i < jsonData['data'].length; i++) {
				var counter = jsonData['data'][i];
				console.log(counter['monster']);
				value = "Leveling " + coin +
				": MOB Name: " + counter['monster'] + "[" + counter['level'] + "], Map: " + counter['lokasi'];
				receivedMessage.channel.send(value);
			}
				}
				);
				}
				catch (err) {
				 console.log(err);
				}
	 }
}
function pingCmd(arguments, receivedMessage) {

        receivedMessage.channel.send("Tutorial Bot Discord by https://betech.id")
    
}

client.login(process.env.BOT_TOKEN);
