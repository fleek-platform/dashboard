type Values = Record<'name', string>;
type IsUniqueNameArgs = {
  name: string;
  list: Values[];
};

export const isUniqueName = ({ name, list }: IsUniqueNameArgs): boolean =>
  !list.some(
    (item) => item?.name?.toLocaleUpperCase() === name.toLocaleUpperCase(),
  );
