export const Log = {
  IDENTIFIER: '[flk]',

  // biome-ignore lint/suspicious/noExplicitAny: Allow any for flexible values
  error(...args: any[]): void {
    console.error(this.IDENTIFIER, ...args);
  },

  // biome-ignore lint/suspicious/noExplicitAny: Allow any for flexible values
  warn(...args: any[]): void {
    console.warn(this.IDENTIFIER, ...args);
  },

  // biome-ignore lint/suspicious/noExplicitAny: Allow any for flexible values
  info(...args: any[]): void {
    console.info(this.IDENTIFIER, ...args);
  },
};
