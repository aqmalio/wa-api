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

    let originNumber = '+6282287917561'

    let chatId = originNumber.substring(1) + "@c.us"

    let message = "Bismillahirrahmanirrahim Assalamu'alaikum warahmatullahi wabarakatuh  Allhamdulilahirabbal alamin dengan rahmat dan ridha Allah SWT, perkenankan kami memberitahukan seraya memohon doa restu rekan-rekan pada acara pernikahan kami:  *Reza Anugrah*                    & *Dinda Simpati Star*    *Akad Nikah*:  🗓 Sabtu, ... Agustus 2021 ⏰ Pukul 06.30 WIB 🏡 Kediaman Mempelai Wanita   Undangan pernikahan dapat dilihat pada tautan: ♾ https://undangpedia.com/premium01/Aqmal+dan+Istri   Merupakan suatu kebahagiaan bagi kami apabila rekan-rekan berkenan mengirimkan ucapan dan doa terbaik di momen spesial kami. 🤲🏻      _Wassalamu'alaikum warahmatullahi wabarakatuh_  Kami yang berbahagia, _*Ecak& Dinda*_"

    client.sendMessage(chatId, message)
})

client.initialize()


// When message comming
client.on('message', message => {
    console.log(message.body);
});