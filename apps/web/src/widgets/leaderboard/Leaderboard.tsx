import FirstRankIcon from "../../../public/first-rank";
import SecondRankIcon from "../../../public/second-rank";
import ThirdRankIcon from "../../../public/third-rank";

const Leaderboard = ({ theme = "light" }) => {
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
      className={`mx-auto mb-8 w-full overflow-hidden rounded-[24px] shadow-lg ${
        isDarkTheme ? "text-white" : "text-black"
      } bg-transparent`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate">
          <thead>
            <tr
              className={`text-left font-bold ${
                isDarkTheme
                  ? "bg-[#212121] text-[#FAFAFA]"
                  : "bg-[#F9FAFB] text-[#344054]"
              }`}
            >
              <th
                className="rounded-tl-[24px] px-4 py-2 text-left"
                style={{ fontSize: "16px", lineHeight: "24px" }}
              >
                Rank
              </th>
              <th
                className="px-4 py-2 text-left"
                style={{ fontSize: "16px", lineHeight: "24px" }}
              >
                User
              </th>
              <th
                className="rounded-tr-[24px] px-4 py-2 text-left"
                style={{ fontSize: "16px", lineHeight: "24px" }}
              >
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry, index) => (
              <tr
                key={index}
                className={`group cursor-pointer overflow-hidden rounded-[6px] transition-all duration-300 ease-in-out ${
                  isDarkTheme ? "hover:bg-[#3A3A3A]" : "hover:bg-[#F7F7F7]"
                }`}
              >
                <td
                  className={`overflow-hidden rounded-s-[6px] border-2 border-transparent px-4 py-4 text-left font-bold transition-all ${
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
                  className={`border-2 border-transparent px-4 py-4 text-left font-bold transition-all ${
                    isDarkTheme
                      ? "text-[#FAFAFA] group-hover:border-[#494949]"
                      : "text-[#344054] group-hover:border-[#EEEEEE]"
                  }`}
                  style={{ fontSize: "18px", lineHeight: "28px" }}
                >
                  {entry.user}
                </td>
                <td
                  className={`overflow-hidden rounded-e-[6px] border-2 border-transparent px-4 py-4 text-left font-bold transition-all ${
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
