import * as L from '../../typings/logger';

export const attachId = (logger: L.Logger | Console, color: boolean = false,
    id: Array<string> = [], styling?): L.Logger.id => {
  const getId = (additionalId?: string) => {
    let nowId = id;
    if (additionalId) {
      nowId = nowId.concat([ additionalId ]);
    }

    if (color && styling) {
      return [
        `%c${nowId.join('/')}`,
        Object.keys(styling).map((property) => `${property}: ${styling[property]}`).join('; ')
      ];
    } else {
      return [ nowId.join('/') ];
    }
  };

  let newLogger: any = (id: string, level: L.DebugLevel, ...messages) => {
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

  newLogger.id = (...args) => {
    let styling;

    if (!args.length) {
      return id.join('/')
    }

    let newId = args.shift();

    if (color && args.length && (typeof args[0] === 'string' || typeof args[0] === 'object')) {
      if (typeof args[0] === 'string') {
        styling = {
          color: args[0]
        };
      } else {
        styling = args[0];
      }
      args.shift();
    }

    let noAppend;
    if (args.length && typeof args[0] === 'boolean') {
      noAppend = args.shift();
    }

    if (newId instanceof Array) {
      newId = [ newId ];
    }

    if (!noAppend) {
      newId = id.concat(newId);
    }

    return attachId(logger, color, newId, styling);
  };

  ['debug', 'info', 'error', 'log'].forEach((level) => {
    newLogger[level] = (...data) => logger[level].apply(null,
        getId().concat(data));
  });

  return newLogger;
};
