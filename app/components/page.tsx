"use client";

import Preview from "@/app/ui/Preview";
import Connect from "@/app/widgets/connect/Connect";

const Components = () => {
  return (
    <main className="px-8 py-20">
      <div className="mb-8">
        <p>Components &gt; Cards</p>
      </div>
      <section>
        <Preview
          name="Connect"
          variants={["list", "grid"]}
          codeString={`const [theme, setTheme] = useState<"light" | "dark">("light")`}
          description="lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima exercitationem rem quos, at consequuntur magni blanditiis quae libero debitis repudiandae dolorum dicta amet explicabo nihil? Id voluptas nihil culpa! Reiciendis."
        >
          <Connect layout="list" theme="light" />
        </Preview>
      </section>
    </main>
  );
};

export default Components;
