import { IconStyles as S } from '../Icon.styles';

export const EthereumIcon: React.FC<S.CustomProps> = (props) => (
  <S.Custom
    {...props}
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#fff" d="M0 0h96v96H0z" />
    <path fill="#000" d="M26 49.013 48 13l22 36.013L48 61.86 26 49.013Z" />
    <path
      fill="#000"
      d="m48 65.905 21.296-13.25L48 83 26.202 52.654 48 65.905Z"
    />
  </S.Custom>
);
