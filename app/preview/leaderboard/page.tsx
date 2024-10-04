import Leaderboard from "@/app/widgets/leaderboard/Leaderboard";

const page = () => {
  return (
    <div className="pt-16">
      <h1 className="text-center text-3xl">
        Leaderboard (Light and Dark Theme)
      </h1>

      <div className="mt-10 flex flex-wrap justify-center gap-4 lg:flex-nowrap">
        {/* Container for Light Theme Leaderboard */}
        <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-white p-4 shadow-xl lg:w-1/2">
          <h2 className="mb-4 text-2xl font-bold text-black">
            Leaderboard (Light)
          </h2>
          <Leaderboard theme="light" />
        </div>

        {/* Container for Dark Theme Leaderboard */}
        <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-[#1a1a1a] p-4 shadow-xl lg:w-1/2">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Leaderboard (Dark)
          </h2>
          <Leaderboard theme="dark" />
        </div>
      </div>
    </div>
  );
};

export default page;
