const IllustrationIcon = ({ ...props }) => {
  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 292 205"
    {...props}
  >
    <g clipPath="url(#clip0_2_2)">
      <path
        fill="url(#paint0_linear_2_2)"
        d="M140.961 168.058v-.002l-100.884-39.25c-3.46-1.347-3.378-6.272.126-7.502l101.192-35.52a13.93 13.93 0 0 1 9.21 0l101.192 35.52c3.504 1.23 3.587 6.155.126 7.502l-100.889 39.252a13.95 13.95 0 0 1-10.073 0"
        opacity="0.42"
      ></path>
      <path
        stroke="url(#paint1_linear_2_2)"
        strokeLinejoin="round"
        strokeWidth="7"
        d="M141.18 120.87 40.33 80.35l101.24-36.7c2.7-.98 5.67-.98 8.37 0l101.24 36.7-100.85 40.52a12.3 12.3 0 0 1-9.16 0z"
      ></path>
      <path
        stroke="url(#paint2_linear_2_2)"
        strokeLinejoin="round"
        strokeWidth="7"
        d="M141.18 81.45 40.33 40.93l101.24-36.7c2.7-.98 5.67-.98 8.37 0l101.24 36.7-100.85 40.52a12.3 12.3 0 0 1-9.16 0z"
      ></path>
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_2_2"
        x1="146"
        x2="146"
        y1="83.5"
        y2="169"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.205" stopColor="#D9D9D9" stopOpacity="0"></stop>
        <stop offset="1" stopColor="#737373"></stop>
      </linearGradient>
      <linearGradient
        id="paint1_linear_2_2"
        x1="145.76"
        x2="145.76"
        y1="125.26"
        y2="39.42"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E0E0E0"></stop>
        <stop offset="0.31" stopColor="#888" stopOpacity="0.58"></stop>
        <stop offset="0.72" stopColor="#4D4D4D" stopOpacity="0.15"></stop>
        <stop offset="1" stopColor="#2D2D2D" stopOpacity="0"></stop>
      </linearGradient>
      <linearGradient
        id="paint2_linear_2_2"
        x1="0"
        x2="1"
        y1="85.84"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#818181"></stop>
        <stop offset="0.31" stopColor="#5F5F5F" stopOpacity="0.58"></stop>
        <stop offset="0.72" stopColor="#343434" stopOpacity="0.15"></stop>
        <stop offset="1" stopColor="#2D2D2D" stopOpacity="0"></stop>
      </linearGradient>
      <clipPath id="clip0_2_2">
        <path fill="#fff" d="M0 0h291.6v204.63H0z"></path>
      </clipPath>
    </defs>
  </svg>
  );
};

export const LoadingFullScreen = () => (
  <div className="w-screen h-screen flex items-center justify-center">
    <IllustrationIcon className="max-w-[24rem] h-304 animate-pulse pt-48" />
  </div>
);
