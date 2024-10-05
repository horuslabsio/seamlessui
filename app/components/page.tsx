"use client";

import Preview from "@/app/ui/Preview";
import Connect from "@/app/widgets/connect/Connect";
import Settings from "@/app/widgets/settings/Settings";
import Leaderboard from "../widgets/leaderboard/Leaderboard";

const Components = () => {
  return (
    <main className="mx-auto px-8 py-20 seamlessui-container">
      <div className="mb-8">
        <p>Components &gt; Cards</p>
      </div>
      <section className="flex flex-col gap-20">
        <Preview
          name="Connect"
          variants={["list", "grid"]}
          codeString={`const [theme, setTheme] = useState<"light" | "dark">("light")`}
          description="lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima exercitationem rem quos, at consequuntur magni blanditiis quae libero debitis repudiandae dolorum dicta amet explicabo nihil? Id voluptas nihil culpa! Reiciendis."
        >
          <Connect layout="list" theme="light" />
        </Preview>
        <Preview
          name="Settings"
          variants={["list", "grid"]}
          codeString={`const [theme, setTheme] = useState<"light" | "dark">("light")`}
          description="lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima exercitationem rem quos, at consequuntur magni blanditiis quae libero debitis repudiandae dolorum dicta amet explicabo nihil? Id voluptas nihil culpa! Reiciendis."
          themeVariants={false}
          layoutVariants={false}
        >
          <Settings />
        </Preview>

        <Preview
          name="Leader board"
          variants={["list", "grid"]}
          codeString={`const [theme, setTheme] = useState<"light" | "dark">("light")`}
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
