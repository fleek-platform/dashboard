// TODO: Notice that this should be a value not a function
export const isServerSide = () =>
  typeof window === 'undefined' || window === null;
