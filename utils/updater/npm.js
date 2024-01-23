const fetch = require('node-fetch')
const consolePrefix = `${'['}${'C'.magenta}${'l'.cyan}${'o'.green}${'u'.red}${'d'.blue}${'u'.yellow}${'x'.magenta}-${'D'.cyan}${'a'.green}${'s'.red}${'h'.blue}${'b'.yellow}${'o'.magenta}${'a'.cyan}${'r'.green}${'d'.red}${']'}`

async function npmDashCheck() {
    await npmThemeCheck();
    let failed = 0
    let failed2 = 0

    try {
        await fetch(`https://registry.npmjs.org/discord-dashboard`)
    } catch (error) {
        failed++
        console.log(`${consolePrefix} ${'Failed to check NPM for updates. (DBD)'.red}`)
    }

    if (failed === 0) {
        let checkArray = await fetch(`https://registry.npmjs.org/discord-dashboard`);

        try {
            checkArray = await checkArray.json()
        } catch (error) {
            failed2++
            console.log(
                `${consolePrefix} ${'Failed to check NPM for updates.'.red} (DBD)`
            )
        }

        if (failed2 === 0) {
            const latestVersion = checkArray['dist-tags'].latest
            const currentVersion = require('discord-dashboard').version
            if (currentVersion === currentVersion) console.log(`${consolePrefix} ${'Your version of:'.grey} ${'discord-dashboard'.magenta} ${'is'.blue} ${'up-to-date'.cyan}${'!'.blue}`);
            else console.log(`${consolePrefix} ${'Your version of:'.grey} ${'discord-dashboard'.magenta} ${'is'.blue} ${'outdated'.red}${'!'.blue}`);
        }
    }
}

async function npmThemeCheck() {
    let failed = 0;
    let failed2 = 0;

    try {
        await fetch(`https://registry.npmjs.org/discord-dashboard`);
    } catch (error) {
        failed++
        console.log(`${consolePrefix} ${'Failed to check NPM for updates. (soft-ui)'.red}`);
    }

    if (failed === 0) {
        let checkArray = await fetch(`https://registry.npmjs.org/dbd-soft-ui`)

        try {
            checkArray = await checkArray.json()
        } catch (error) {
            failed2++
            console.log(`${consolePrefix} ${'Failed to check NPM for updates. (soft-ui)'.red}`);
        }

        if (failed2 === 0) {
            const latestVersion = checkArray['dist-tags'].latest
            const currentVersion = require('dbd-soft-ui').version
            if (currentVersion === currentVersion) console.log(`${consolePrefix} ${'Your version of:'.grey} ${'Zokys DBD'.magenta} ${'is'.blue} ${'up-to-date'.cyan}${'!'.blue}`);
            else console.log(`${consolePrefix} ${'Your version of:'.grey}${'Zokys DBD'.magenta} ${'is'.blue} ${'outdated'.red}${'!'.blue}`);
        }
    }
}

exports.update = async () => {
    await npmDashCheck()
}