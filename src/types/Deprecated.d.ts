export type DeprecatedProps<T, K> = ({ deprecated: true } & T) | ({ deprecated?: false } & K);
