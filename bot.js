const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'ping') {
    	message.reply('pong');
  	}
     if (message.content === 'hai') {
    	message.reply('hai juga kak');
  	}
    if (message.content === 'price') {
		 var coin = content.replace("$price ", "");
		 var value = '';
		 try{
			request('http://api.coinmarketcap.com/v1/ticker/' + coin + '/',
			function(error,res,body) {
			var obj = JSON.parse(body);
			console.log(obj[0]);
			if(obj[0] === undefined)
				{
					message.reply('Wrong id');
				}
			else
				{
					value = coin.toUpperCase() +
				" : Current Price " + obj[0].price_usd +
				" | 24hr Percentage Change " + obj[0].percent_change_24h;
				message.reply(value);
				}
				});
				}
				catch (err) {
				message.reply('Wrong ID, Have a Great Day');
				}
  	}
});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
