﻿(function () {
    Pack.prototype.scanForResources = function (path) {
        this.scanForConfigs(path);
        this.scanForTemplates(path);
    };

    Pack.prototype.scanForConfigs = function (path) {
        var Files = Pack.api.Files;
        var allConfigs = _.union(
            Files.getFilenames(path + this.options.configurationFileFilter, true),
            Files.getFilenames(path + this.options.packFileFilter, true));
        this.loadedConfigs = allConfigs;
        var configs = Files.getFileContents(this.loadedConfigs);
        for (var configPath in configs)
            this.loadConfig(configPath, configs[configPath]);
    };

    Pack.prototype.loadConfig = function (path, source) {
        Pack.api.Log.info("Loading config from " + path);
        Context.configPath = path;
        Pack.utils.eval(source);
        delete Context.configPath;
    };

    Pack.prototype.scanForTemplates = function (path) {
        Pack.api.Log.info("Loading templates from " + path);
        var files = Pack.api.Files.getFilenames(path + '*' + this.options.templateFileExtension, true);
        for (var index in files)
            this.loadTemplate(files[index]);
    };

    Pack.prototype.loadTemplate = function(path) {
        Pack.api.Log.debug("Loaded template " + templateName(path, this.options.templateFileExtension));
        var loadedTemplates = Pack.api.Files.getFileContents([path]);
        this.storeTemplate(path, loadedTemplates[path]);
    };

    Pack.prototype.storeTemplate = function(path, template) {
        this.templates[templateName(path, this.options.templateFileExtension)] = template;
    };

    function templateName(path, fileExtension) {
        var replaceRegex = new RegExp(Path(path).match(fileExtension) + '$');
        return Path(path).filename().toString().replace(replaceRegex, '');
    }

})();
