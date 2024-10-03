const ThirdRankIcon = ({
  height,
  width,
  fill = "none",
}: {
  height: number;
  width: number;
  fill?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 33"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 20.8848C1.5 15.0858 6.033 10.3848 11.625 10.3848H12.375C17.967 10.3848 22.5 15.0858 22.5 20.8848C22.5 26.6838 17.967 31.3848 12.375 31.3848H11.625C6.033 31.3848 1.5 26.6838 1.5 20.8848Z"
        fill="#EADDFF"
        stroke="#0D0D41"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 18.0618C9.87 16.8843 10.6605 16.3848 11.487 16.3848H12.486C13.311 16.3848 14.1015 16.8843 14.2215 18.0618C14.2581 18.4429 14.2581 18.8266 14.2215 19.2078C14.1225 20.1798 13.4565 20.8848 12.7365 20.8848M12.7365 20.8848C13.4565 20.8848 14.1225 21.5898 14.2215 22.5618C14.2581 22.9429 14.2581 23.3266 14.2215 23.7078C14.1015 24.8853 13.311 25.3848 12.486 25.3848H11.487C10.6605 25.3848 9.87 24.8853 9.75 23.7078M12.7365 20.8848H12.6465M14.34 1.38477L10.5 10.2318M21 1.38477L16.7685 11.1348M9.66 1.38477L12 6.77577M3 1.38477L7.2315 11.1348"
        stroke="#0D0D41"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ThirdRankIcon;
