"use client";

import Preview from "@/app/ui/Preview";
import Connect from "@/app/widgets/connect/Connect";
import Settings from "@/app/widgets/settings/Settings";
import Leaderboard from "../widgets/leaderboard/Leaderboard";
import { connectCodeGen } from "../widgets/connect/code";
import { settingsCodeGen } from "../widgets/settings/code";
import { leaderboardCodeGen } from "../widgets/leaderboard/code";

const Components = () => {
  return (
    <main className="mx-auto px-2 pb-12 seamlessui-container lg:px-[clamp(2rem,4vw,4rem)]">
      <section className="flex flex-col gap-20 pt-[10rem] md:pt-[18rem]">
        <Preview
          name="Connect"
          variants={["list", "grid"]}
          codeStringGenerator={connectCodeGen}
          description="lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima exercitationem rem quos, at consequuntur magni blanditiis quae libero debitis repudiandae dolorum dicta amet explicabo nihil? Id voluptas nihil culpa! Reiciendis."
        >
          <Connect layout="list" theme="light" />
        </Preview>
        <Preview
          name="Settings"
          variants={["list", "grid"]}
          codeStringGenerator={settingsCodeGen}
          description="lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima exercitationem rem quos, at consequuntur magni blanditiis quae libero debitis repudiandae dolorum dicta amet explicabo nihil? Id voluptas nihil culpa! Reiciendis."
          layoutVariants={false}
          themeVariants={false}
        >
          <Settings />
        </Preview>

        <Preview
          name="Leader board"
          variants={["list", "grid"]}
          codeStringGenerator={leaderboardCodeGen}
          description="lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima exercitationem rem quos, at consequuntur magni blanditiis quae libero debitis repudiandae dolorum dicta amet explicabo nihil? Id voluptas nihil culpa! Reiciendis."
          layoutVariants={false}
          themeVariants={true}
        >
          <Leaderboard theme="dark" />
        </Preview>
      </section>
    </main>
  );
};

export default Components;
