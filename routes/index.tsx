import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Fragment } from "preact/jsx-runtime";
import { Card } from "../components/Card.tsx";
import PoemKnob from "../islands/PoemKnob.tsx";
import hyakuninIssyu from "../static/hyakunin-issyu.json" with { type: "json" };

export default function Home() {
  const count = useSignal(3);
  const isOpenPoemDrawer = useSignal(false);
  return (
    <Fragment>
      <header class="flex items-center h-full w-16 pt-2 pb-36 border-l-2 border-gray-500 text-3xl font-bold">
        <PoemKnob
          onClick={() => isOpenPoemDrawer.value = !isOpenPoemDrawer.value}
        />
        <h1 class="mt-auto mb-auto">七五</h1>
      </header>
      <main class="flex flex-col justify-center items-center w-[calc(100vw_-_64px)] pr-4 overflow-x-scroll">
        {hyakuninIssyu.items.map((item) => <Card item={item} />)}
      </main>
    </Fragment>
  );
}
