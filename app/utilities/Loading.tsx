export const Loading = () => {
  return (
    <div
      role="alert"
      className="absolute left-0 top-0 z-10 grid h-full w-full place-content-center rounded-[24px] bg-[#ffffff81]"
    >
      <span
        className="mx-auto inline-block h-[38px] w-[38px] animate-spin rounded-full border-2 border-blue-700 border-b-transparent"
        aria-label="Loading"
      ></span>
    </div>
  );
};
