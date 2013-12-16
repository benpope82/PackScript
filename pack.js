﻿var core = [
    'Core/Pack.js',
    'Core/Container.js',
    'Core/TransformRepository.js',
    'Core/Path.js',
    'Core/utils.js',
    'Core/FileList.js',
    'Core/Output.js',
    'Core/resources.js',
    'Core/commands.js',
    'Core/changeHandlers.js',
    'Core/Api.js',
    'Core/exports.js',
    { files: 'Core/Transforms/*.js', prioritise: 'combine.js' },
    { files: 'Embedded/*.pack.config.js', recursive: true },
    { files: 'Embedded/*.template.*', template: 'Pack.embedTemplate', recursive: true }
];

pack({
    to: 'Build/Node/packscript.js',
    include: [
        'Node/setup.js',
        core,
        { files: 'Node/*.js', exclude: 'Node/setup.js', recursive: true }
    ],
    includeConfigs: true
});

pack({
    to: 'Build/Node/packscript.tests.js',
    include: [
        { files: 'Tests/Infrastructure/*.js', first: 'setup.js' },
        'Tests/*.js',
        'Tests/Transforms/*.js',
        'Tests/Integration/*.js',
        'Tests/Embedded/*.js'
    ]
})