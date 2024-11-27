type IsUniqueNameArgs = {
  name: string;
  list: any[];
};

export const isUniqueName = ({ name, list }: IsUniqueNameArgs): boolean =>
  !list.some((item) => item?.name?.toLocaleUpperCase() === name.toLocaleUpperCase());
