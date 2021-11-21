const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { color } = require('./lib/color')

require('./NYXRaa.js')
nocache('./NYXRaa.js', module => console.log(`${module} is now updated!`))

const starts = async (Nyxchan = new WAConnection()) => {
    Nyxchan.logger.level = 'warn'
    Nyxchan.version = [2, 2143, 3]
    Nyxchan.browserDescription = [ 'Base By NYXRaa', 'Microsoft Edge', '3.0' ]
    console.log(banner.string)
    Nyxchan.on('qr', () => {
        console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan bang'))
    })

    fs.existsSync('./session.json') && Nyxchan.loadAuthInfo('./session.json')
    Nyxchan.on('connecting', () => {
        start('2', 'Connecting...')
    })
    Nyxchan.on('open', () => {
        success('2', 'Connected')
    })
    await Nyxchan.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./session.json', JSON.stringify(Nyxchan.base64EncodedAuthInfo(), null, '\t'))

    Nyxchan.on('chat-update', async (message) => {
        require('./NYXRaa.js')(Nyxchan, message)
    })
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

starts()
