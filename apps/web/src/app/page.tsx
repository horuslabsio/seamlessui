import Connect from "../widgets/connect/Connect";
import { Highlight } from "@seamlessui/ui/highlight";
export default function Page(): JSX.Element {
  return (
    <main>
      <Highlight code={`Connect layout="list" theme="light" />`} />
      <Connect layout="list" theme="light" />
    </main>
  );
}
