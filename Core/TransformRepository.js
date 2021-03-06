﻿Pack.TransformRepository = function (transforms) {
    var self = this;

    _.extend(this, transforms);

    this.events = ['includeFiles', 'excludeFiles', 'content', 'output', 'finalise'];
    this.defaultTransforms = { excludeDefaults: true, load: true, combine: true, template: true };
    
    this.add = function (name, event, func) {
        self[name] = { event: event, apply: func };
    };

    this.applyTo = function (output, pack) {
        return self.applyEventsTo(self.events, output, pack);
    };

    this.applyEventsTo = function(events, output, pack) {
        var target = new Pack.Container();
        var transforms = _.extend({}, self.defaultTransforms, output.transforms);
        _.each(events, function(event) {
            _.each(transforms, function(value, name) {
                if (self[name] && self[name].event === event)
                    self[name].apply({ value: value, output: output, target: target }, pack);
            });
        });
        return target;
    };
};