const fs = require('fs');
var rimraf = require("rimraf");
var mkdirp = require('mkdirp');
const { toChecksumAddress, checkAddressChecksum } = require('ethereum-checksum-address')

//var SourcePath = "G:\\Codigos\\Codigos\\ivse\\tokens\\assets\\blockchains\\smartchain\\assets"
var DestPath = "G:\\Codigos\\Codigos\\ivse\\tokens\\newlist"

//delete content for working folder
rimraf.sync(DestPath) //, function () { console.log("Delete content from " + DestPath + " done"); });
mkdirp.sync(DestPath) //, function (){ console.log("Delete content from " + DestPath + " done"); });


function processFolder(SourcePath, DestPath) {
    var res = getDirectories(SourcePath)

    res.forEach(element => {

        fullNewPath = DestPath

        //change directory name to checksum address
        if (!checkAddressChecksum(element)) {
            try {
                var newA = toChecksumAddress(element)
                fullNewPath = fullNewPath + "\\" + newA
            } catch (error) {
                console.log("Error: " + error)
                return
            }
        } else {
            fullNewPath = fullNewPath + "\\" + element
        }

        //create remote dir
        if (!fs.existsSync(fullNewPath)) {
            fs.mkdirSync(fullNewPath);
        }

        //Copy file from origin to new directory
        try {
            fs.copyFileSync(SourcePath + "\\" + element + "\\logo.png", fullNewPath + "\\logo.png", 0)
        } catch (error) {
            rimraf.sync(fullNewPath)
            console.log("error copying file: " + SourcePath + "\\" + element + "\\logo.png")
        }
    });
}

function getDirectories(path) {
    var dirs = new Array()
    fs.readdirSync(path).filter(function (file) {
        if (fs.statSync(path + '/' + file).isDirectory()) {
            dirs.push(file)
        }
    });

    return dirs
}
