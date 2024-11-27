export type ChildrenProps<T = {}> = React.PropsWithChildren<T>;

export type LoadingProps<T = {}> =
  | ({ isLoading: true } & Partial<T>)
  | ({ isLoading?: false } & T);

export type DisabledProps<T = {}> = { isDisabled?: boolean } & T;
