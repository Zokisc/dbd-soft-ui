const fetch = require('node-fetch')
const fs = require('fs')
const consolePrefix = `${'['}${'C'.magenta}${'l'.cyan}${'o'.green}${'u'.red}${'d'.blue}${'u'.yellow}${'x'.magenta}-${'D'.cyan}${'a'.green}${'s'.red}${'h'.blue}${'b'.yellow}${'o'.magenta}${'a'.cyan}${'r'.green}${'d'.red}${']'}`
const colors = require('colors')

async function update() {
    let failed3 = 0
    let failed4 = 0

    try {
        await fetch(``);
    } catch (error) {
        failed3++
        //console.log(`${consolePrefix} Failed to check live for updates.`)
    }

    if (failed3 === 0) {
        let checkArray = await fetch(``);

        try {
            checkArray = await checkArray.json()
        } catch (error) {
            failed4++
            //console.log(`${consolePrefix} Failed to check live for updates.`)
        }

        if (failed4 === 0) {
            let latestVersions = [];
            let currentVersions = fs.readFileSync(__dirname + '/versions.json');
            currentVersions = JSON.parse(currentVersions);
            let needsUpdating = [];

            for (const latestFile of checkArray) {
                if (latestFile.version > currentVersions[latestFile.name]) {
                    needsUpdating.push({
                        name: latestFile.name,
                        type: latestFile.type
                    })
                    const { name, type } = latestFile
                    if (type === 'partial') {
                        let failedFile = 0
                        let fileRaw = await fetch(``);

                        try {
                            fileRaw = await fileRaw.text()
                        } catch (error) {
                            failedFile++
                            console.log(
                                `${consolePrefix} Failed to update ${colors.red(
                                    name
                                )}.`
                            )
                        }

                        if (failedFile === 0) {
                            await fs.writeFileSync(
                                `${__dirname}/../../views/partials/${name}.ejs`,
                                fileRaw
                            )
                            currentVersions[name] = latestFile.version
                            await fs.writeFileSync(
                                `${__dirname}/versions.json`,
                                JSON.stringify(currentVersions)
                            )
                            console.log(
                                `${consolePrefix} Successfully updated ${colors.green(
                                    name
                                )}`
                            )
                        }
                    }
                }
            }
        }
    }
}

exports.update = async () => {
    await update()
}