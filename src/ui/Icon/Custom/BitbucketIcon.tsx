import { IconStyles as S } from '../Icon.styles';

export const BitbucketIcon: React.FC<S.CustomProps> = (props) => (
  <S.Custom
    {...props}
    preserveAspectRatio="xMidYMid"
    viewBox="-0.9662264221278978 -0.5824607696358868 257.93281329857973 230.8324730411935"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <linearGradient id="bitbucket-icon" x1="108.633%" x2="46.927%" y1="13.818%" y2="78.776%">
      <stop offset=".18" stopColor="#0052cc" />
      <stop offset="1" stopColor="#2684ff" />
    </linearGradient>
    <g fill="none">
      <path d="M101.272 152.561h53.449l12.901-75.32H87.06z" />
      <path
        d="M8.308 0A8.202 8.202 0 0 0 .106 9.516l34.819 211.373a11.155 11.155 0 0 0 10.909 9.31h167.04a8.202 8.202 0 0 0 8.201-6.89l34.82-213.752a8.202 8.202 0 0 0-8.203-9.514zm146.616 152.768h-53.315l-14.436-75.42h80.67z"
        fill="#2684ff"
      />
      <path
        d="M244.61 77.242h-76.916l-12.909 75.36h-53.272l-62.902 74.663a11.105 11.105 0 0 0 7.171 2.704H212.73a8.196 8.196 0 0 0 8.196-6.884z"
        fill="url(#bitbucket-icon)"
      />
    </g>
  </S.Custom>
);
