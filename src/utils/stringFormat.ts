type ShortStringFormatArgs = {
  str: string;
  index?: number;
};

// function to slice a string from a given index and return with format 'abcd...xyz' if index = 4
export const shortStringFormat = ({
  str,
  index = 4,
}: ShortStringFormatArgs): string => {
  return `${str.slice(0, index)}...${str.slice(-index)}`;
};

export const firstLetterUpperCase = (str: string): string => {
  const words = str.toLowerCase().split(' ');

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
