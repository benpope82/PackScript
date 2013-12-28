﻿Pack.transforms.syncTo = {
    event: 'finalise',
    apply: function(data, pack) {
        var Files = Pack.api.Files,
            Log = Pack.api.Log,
            output = data.output;

        var targetFolder = Path(output.basePath + data.value + '/');
        var sourceDirectory = output.transforms.directory;
        
        if (sourceDirectory) {
            // sync an entire folder
            sourceDirectory = Path(output.basePath + sourceDirectory + '/').toString();
            Files.copy(sourceDirectory, targetFolder.toString());
            Log.info('Copied directory ' + sourceDirectory + ' to ' + targetFolder);

            output.getCurrentPaths = function() {
                // match the folder sync when any of the files change
                return Files.getFilenames(sourceDirectory + '/*.*', true);
            };
        } else {
            // copy included files
            var files = data.target.files.list;
            _.each(files, function(file) {
                Files.copy(file.path.toString(), targetFolder + file.pathRelativeToInclude);
            });
            Log.info('Copied ' + files.length + ' files to ' + targetFolder);

            // this is a bit nasty. It is consumed by Output.matches
            output.currentPaths = data.target.files && data.target.files.paths();
        }
    }
};
