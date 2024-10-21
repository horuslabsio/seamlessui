import FirstRankIcon from "@/public/icons/first-rank";
import SecondRankIcon from "@/public/icons/second-rank";
import ThirdRankIcon from "@/public/icons/third-rank";
import { ThemeProps } from "@/types";

const Leaderboard = ({ theme }: { theme: ThemeProps }) => {
  const leaderboardData = [
    { rank: 1, user: "0xc662c4100CEC747543f5b", score: "6,500,370.000" },
    { rank: 2, user: "0xc662c4100CEC747543f5b", score: "6,100,525.000" },
    { rank: 3, user: "0xc662c4100CEC747543f5b", score: "5,720,320.000" },
    { rank: 4, user: "0xc662c4100CEC747543f5b", score: "5,350,320.000" },
    { rank: 5, user: "0xc662c4100CEC747543f5b", score: "5,350,320.000" },
    { rank: 6, user: "0xc662c4100CEC747543f5b", score: "5,350,320.000" },
    { rank: 7, user: "0xc662c4100CEC747543f5b", score: "5,350,320.000" },
    { rank: 8, user: "0xc662c4100CEC747543f5b", score: "5,350,320.000" },
    { rank: 9, user: "0xc662c4100CEC747543f5b", score: "5,350,320.000" },
    { rank: 10, user: "0xc662c4100CEC747543f5b", score: "5,350,320.000" },
    { rank: 11, user: "0xc662c4100CEC747543f5b", score: "5,350,320.000" },
    { rank: 12, user: "0xc662c4100CEC747543f5b", score: "5,350,320.000" },
    { rank: 13, user: "0xc662c4100CEC747543f5b", score: "5,350,320.000" },
    { rank: 14, user: "0xc662c4100CEC747543f5b", score: "5,350,320.000" },
    { rank: 15, user: "0xc662c4100CEC747543f5b", score: "5,350,320.000" },
  ];

  const isDarkTheme = theme === "dark";

  return (
    <div
      className={`mx-auto my-4 mb-8 w-[90%] overflow-hidden rounded-3xl shadow-lg ${
        isDarkTheme ? "bg-[#1A1A1A] text-white" : "bg-white text-black"
      } `}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-separate border-spacing-0">
          <thead>
            <tr
              className={`border-spacing-x-[2px] rounded-t-3xl text-left text-lg font-bold tracking-[2%] ${
                isDarkTheme
                  ? "bg-[#212121] text-[#FAFAFA]"
                  : "bg-[#F9FAFB] text-[#344054]"
              }`}
            >
              <th
                className="rounded-tl-[24px] px-[10px] py-[18px] text-left"
                style={{
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Rank
              </th>
              <th
                className="px-[10px] py-[18px] text-left"
                style={{ fontSize: "16px", lineHeight: "24px" }}
              >
                User
              </th>
              <th
                className="rounded-tr-[24px] px-[10px] py-[18px] text-left"
                style={{
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3} className="py-2"></td>
            </tr>
            {leaderboardData.map((entry, index) => (
              <tr
                key={index}
                className={`group border-collapse cursor-pointer overflow-hidden rounded-[6px] text-[19px] font-bold leading-8 tracking-[2%] transition-all duration-300 ease-in-out ${
                  isDarkTheme ? "hover:bg-[#3A3A3A]" : "hover:bg-[#F7F7F7]"
                }`}
              >
                <td
                  className={`overflow-hidden rounded-s-[6px] border-[1.5px] border-transparent px-4 py-5 text-left transition-all ${
                    isDarkTheme
                      ? "text-[#FAFAFA] group-hover:border-[#494949]"
                      : "text-[#344054] group-hover:border-[#EEEEEE]"
                  }`}
                  style={{ fontSize: "18px", lineHeight: "28px" }}
                >
                  {entry.rank === 1 ? (
                    <FirstRankIcon height={33} width={24} />
                  ) : entry.rank === 2 ? (
                    <SecondRankIcon height={33} width={24} />
                  ) : entry.rank === 3 ? (
                    <ThirdRankIcon height={33} width={24} />
                  ) : (
                    entry.rank
                  )}
                </td>
                <td
                  className={`border-[1.5px] border-transparent px-4 py-5 text-left transition-all ${
                    isDarkTheme
                      ? "text-[#FAFAFA] group-hover:border-[#494949]"
                      : "text-[#344054] group-hover:border-[#EEEEEE]"
                  }`}
                  style={{ fontSize: "18px", lineHeight: "28px" }}
                >
                  {entry.user}
                </td>
                <td
                  className={`overflow-hidden rounded-e-[6px] border-[1.5px] border-transparent px-4 py-5 text-left transition-all ${
                    isDarkTheme
                      ? "text-[#FAFAFA] group-hover:border-[#494949]"
                      : "text-[#344054] group-hover:border-[#EEEEEE]"
                  }`}
                  style={{ fontSize: "18px", lineHeight: "28px" }}
                >
                  {entry.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
