import { Highlight } from "@/../../packages/ui/src/highlight";
import Connect from "../../widgets/connect/Connect";

const Components = () => {
  return (
    <main className="px-[4.5rem] py-20">
      <div className="mb-8">
        <p>Components &gt; Cards</p>
      </div>
      <section>
        <div className="mb-20">
          <h2 className="mb-8">NFT Cards</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
            esse dolores earum et voluptatum accusamus enim ratione perspiciatis
            iste. Eius minus vitae deleniti accusamus vel veniam a, voluptatem
            ex optio!
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <p>NFT Card</p>
            <div>grid variant</div>
            <button>theme</button>
          </div>
          <div className="flex">
            <div>preview/code</div>
            <p>React</p>
            <button>copy</button>
          </div>
        </div>
        <div>
          <Connect layout="list" theme="light" />
          <Highlight code={`<Connect layout="list" theme="light" />`} />
        </div>
      </section>
    </main>
  );
};

export default Components;
