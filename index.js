const TelegramApi  = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '1926407510:AAGmWeTvODNUosAYgHI3R20zL_uXmE2eYps'

const bot = new TelegramApi(token, {polling: true})

const chats = {}






const startGame = async (chatId) =>{
    await bot.sendMessage(chatId, `xozirda barcha shirf ishlaydi`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'tanla kirisa', gameOptions)
}


const start = () =>{
    bot.setMyCommands([
        {command: '/start', description: 'start tugmasini bosing'},
        {command: '/info', description: 'informatsiya oling'},
        {command: '/game', description: 'game oling'}
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id

        if (text === '/start') {
            await bot.sendSticker(chatId, `https://tgram.ru/wiki/stickers/img/gabyvk/png/1.png`)
            return bot.sendMessage(chatId, `Assalomu alekum bizdan nima yorda`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Sizning ismingiz,  ${msg.from.first_name}`)
        }
        if(text === '/game'){
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, 'iltimos / ni bosing')
    })

    bot.on(`callback_query`, msg=>{
        const data = msg.data
        const chatId = msg.message.chat.id
        if(data === '/again'){
            return startGame(chatId)
        }
        if(data === chats[chatId]){
            return bot.sendMessage(chatId, `indan keyn ${chats[chatId]}`, againOptions)
        }else {
            bot.sendMessage(chatId, `tugadi ${chats[chatId]}`, againOptions)
        }
    })

}
start()