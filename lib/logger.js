"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachId = function (logger, color, id, styling) {
    if (color === void 0) { color = false; }
    if (id === void 0) { id = []; }
    var getId = function (additionalId) {
        var nowId = id;
        if (additionalId) {
            nowId = nowId.concat([additionalId]);
        }
        if (color && styling) {
            return [
                "%c" + nowId.join('/'),
                Object.keys(styling).map(function (property) { return property + ": " + styling[property]; }).join('; ')
            ];
        }
        else {
            return [nowId.join('/')];
        }
    };
    var newLogger = function (id, level) {
        var messages = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            messages[_i - 2] = arguments[_i];
        }
        messages = getId(id).concat(messages);
        switch (level) {
            case 'debug':
                logger.debug.apply(null, messages);
                break;
            case 'info':
                logger.info.apply(null, messages);
                break;
            case 'error':
                logger.error.apply(null, messages);
                break;
            default:
                logger.log.apply(null, messages);
                break;
        }
    };
    newLogger.id = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var styling;
        if (!args.length) {
            return id.join('/');
        }
        var newId = args.shift();
        if (color && args.length && (typeof args[0] === 'string' || typeof args[0] === 'object')) {
            if (typeof args[0] === 'string') {
                styling = {
                    color: args[0]
                };
            }
            else {
                styling = args[0];
            }
            args.shift();
        }
        var noAppend;
        if (args.length && typeof args[0] === 'boolean') {
            noAppend = args.shift();
        }
        if (newId instanceof Array) {
            newId = [newId];
        }
        if (!noAppend) {
            newId = id.concat(newId);
        }
        return exports.attachId(logger, color, newId, styling);
    };
    ['debug', 'info', 'error', 'log'].forEach(function (level) {
        newLogger[level] = function () {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i] = arguments[_i];
            }
            return logger[level].apply(null, getId().concat(data));
        };
    });
    return newLogger;
};
