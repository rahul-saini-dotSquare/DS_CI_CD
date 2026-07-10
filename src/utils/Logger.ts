export default class Logger {
  private constructor() {}

  static log = (...args: unknown[]) => {
    if (__DEV__) {
      console.log(...args);
    }
  };

  static info = (...args: unknown[]) => {
    if (__DEV__) {
      console.info(...args);
    }
  };

  static warn = (...args: unknown[]) => {
    if (__DEV__) {
      console.warn(...args);
    }
  };

  static error = (...args: unknown[]) => {
    if (__DEV__) {
      console.error(...args);
    }
  };

  static debug = (...args: unknown[]) => {
    if (__DEV__) {
      console.debug(...args);
    }
  };
}
