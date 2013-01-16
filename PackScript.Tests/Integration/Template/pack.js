﻿pack({
    to: 'builtinData',
    include: '*.txt',
    recursive: true,
    template: 'builtinData'
});

pack({
    to: 'separateTemplates',
    include: [
        { files: 'root.txt' },
        { files: 'Subfolder/subfolder.txt', template: 'template2' }
    ],
    template: 'template1'
});

pack({
    to: 'pathRelativeToInclude',
    include: { files: 'Subfolder/*.*', recursive: true, template: 'template3' }
})