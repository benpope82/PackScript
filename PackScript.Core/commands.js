﻿Pack.prototype.all = function () {
    this.build(this.outputs);
};

Pack.prototype.build = function (outputs) {
    var self = this;
    
    Pack.utils.executeSingleOrArray(outputs, buildOutput);
    
    var outputPaths = _.isArray(outputs) ? _.pluck(outputs, 'outputPath') : outputs.outputPath;
    var matchingOutputs = this.matchingOutputs(outputPaths);
    if (matchingOutputs.length > 0)
        this.build(matchingOutputs);
    
    function buildOutput(output) {
        return output.build(self.transforms);
    }
};

Pack.prototype.fileChanged = function (path, oldPath, changeType) {
    if (Path(path).match(Pack.options.configurationFileFilter) || Path(path).match(Pack.options.packFileFilter))
        this.handleConfigChange(path, oldPath, changeType);
    else
        this.handleFileChange(path, oldPath, changeType);
};

Pack.prototype.handleFileChange = function (path, oldPath, changeType) {
    var refresh = changeType === 'add';
    var pathToTest = changeType === 'rename' ? oldPath : path;
    this.build(this.matchingOutputs(pathToTest, refresh));
};

Pack.prototype.handleConfigChange = function (path, oldPath, changeType) {
    this.removeConfigOutputs(oldPath);
    this.loadConfig(path, Files.getFileContents([path])[path]);
    this.build(this.configOutputs(path));
};

Pack.prototype.executeTransform = function (name, output) {
    if(this.transforms[name])
        return this.transforms[name].apply(output.transforms[name], output);
};
