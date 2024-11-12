export const Log = {
  IDENTIFIER: '[flk]',

  error(...args: any[]): void {
    // eslint-disable-next-line no-console
    console.error(this.IDENTIFIER, ...args);
  },

  warn(...args: any[]): void {
    // eslint-disable-next-line no-console
    console.warn(this.IDENTIFIER, ...args);
  },

  info(...args: any[]): void {
    // eslint-disable-next-line no-console
    console.info(this.IDENTIFIER, ...args);
  },
};
