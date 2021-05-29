const fs = require('fs')
const { Client } = require('whatsapp-web.js')
const qrCodeRes = require('qrcode-terminal')

const SESSION_FILE_PATH = './session.json'

let sessionData

if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH)
}

// open client with savedSession if exist
const client = new Client({
    session: sessionData
})

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('qr', (qr) => {
    qrCodeRes.generate(qr, { small: true })
})

client.on('ready', () => {
    console.log('ready client')

    let originNumber = '+6282272809075'

    let chatId = originNumber.substring(1) + "@c.us"

    client.sendMessage(chatId, 'tess')
})

client.initialize()


// When message comming
client.on('message', message => {
    console.log(message.body);
});