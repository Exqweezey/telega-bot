const TelegramApi = require('node-telegram-bot-api')

const {gameOptions, againOptions} = require('./options')

const token = '5334315426:AAG7ByyVXdWhctYK6WzQp57thFVyD5F-_Nc'

const bot = new TelegramApi(token, {polling: true})



const startGame = async (chatId) => {
	await bot.sendMessage(chatId, `Сейчас я загадаю число от 0 до 9, а ты должен угадать его`)
			const rundomNumber = Math.floor(Math.random() * 10)
			chats[chatId] = rundomNumber;
			await bot.sendMessage(chatId, 'Отгадай число', gameOptions)
}

const chats = {}


const start = () => {
	bot.setMyCommands([
		{command: '/start', description: 'Приветствие'},
		{command: '/info', description: 'Информация о вас'},
		{command: '/game', description: 'Игра - отгадай число'},
		{command: '/max', description: '+7 999 509 0478 - это номер МаксимаSpider2012, набери ему, если хочешь веселья)'}
	])
	
	bot.on('message', async msg => {
		const text = msg.text;
		const chatId = msg.chat.id;
		
		if (text === '/start') {
			await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/1b5/0ab/1b50abf8-8451-40ca-be37-ffd7aa74ec4d/25.webp')
			return bot.sendMessage(chatId, `Добро пожаловать, ${msg.from.first_name}`)
		}
		
		if (text === '/info') {
			return bot.sendMessage(chatId, `Имя: ${msg.from.first_name}; Фамилия: ${msg.from.last_name}`)
		}
		
		if (text === '/game') {
			return startGame(chatId);
		}
		return bot.sendMessage(chatId, 'Я вас не понимаю:(')
	})
	
	bot.on('callback_query', async msg => {
		const data = msg.data;
		const chatId = msg.message.chat.id;

		if (data === '/again') {
			return startGame(chatId);
		}

		if (data == chats[chatId]) {
			return bot.sendMessage(chatId, `Ты угадал цифру ${chats[chatId]}`, againOptions)
		} else {
			return bot.sendMessage(chatId, `Ты не угадал цифру ${chats[chatId]}`, againOptions)
		}
	})
} 

start();
