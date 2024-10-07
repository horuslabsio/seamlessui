"use client";

import Preview from "@/app/ui/Preview";
import Connect from "@/app/widgets/connect/Connect";
import Settings from "@/app/widgets/settings/Settings";
import Leaderboard from "../widgets/leaderboard/Leaderboard";
import { connCodeGen } from "../widgets/connect/code";
import { settingsCodeGen } from "../widgets/settings/code";

const Components = () => {
  return (
    <main className="mx-auto px-8 py-20 seamlessui-container">
      <section className="flex flex-col gap-20">
        <Preview
          name="Connect"
          variants={["list", "grid"]}
          codeStringGenerator={connCodeGen}
          description="lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima exercitationem rem quos, at consequuntur magni blanditiis quae libero debitis repudiandae dolorum dicta amet explicabo nihil? Id voluptas nihil culpa! Reiciendis."
        >
          <Connect layout="list" theme="light" />
        </Preview>
        <Preview
          name="Settings"
          variants={[]}
          codeStringGenerator={settingsCodeGen}
          description="lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima exercitationem rem quos, at consequuntur magni blanditiis quae libero debitis repudiandae dolorum dicta amet explicabo nihil? Id voluptas nihil culpa! Reiciendis."
        >
          <Settings />
        </Preview>

        <Preview
          name="Leader board"
          variants={["list", "grid"]}
          codeStringGenerator={connCodeGen}
          description="lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima exercitationem rem quos, at consequuntur magni blanditiis quae libero debitis repudiandae dolorum dicta amet explicabo nihil? Id voluptas nihil culpa! Reiciendis."
          layoutVariants={false}
        >
          <Leaderboard theme="dark" />
        </Preview>
      </section>
    </main>
  );
};

export default Components;
