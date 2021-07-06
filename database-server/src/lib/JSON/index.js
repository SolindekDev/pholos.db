module.exports = class JSON {
    constructor(Options) {
        if (!Options.FilePath) return console.log(TypeError("File path is not defined"))
        this.filePath = Options.FilePath
    }
}