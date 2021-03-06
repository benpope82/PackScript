﻿Pack.transforms.zipTo = {
    event: 'finalise',
    apply: function(data, pack) {
        var path = Path(data.output.basePath + data.value).toString();
        var Zip = Pack.api.Zip;
        var Log = Pack.api.Log;

        var files = {};
        _.each(data.target.files.list, function(file) {
            files[file.pathRelativeToInclude.toString()] = file.path.toString();
        });

        Zip.archive(path, files);
        Log.info('Wrote file ' + path);

        // this should be moved to a separate transform - consumed by Output.matches
        data.output.currentPaths = data.target.files && data.target.files.paths();
    }
};

