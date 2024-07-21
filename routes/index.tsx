import { useSignal } from "@preact/signals";
import { Fragment } from "preact/jsx-runtime";
import { Card } from "../components/Card.tsx";
import PoemKnob from "../islands/PoemKnob.tsx";
import hyakuninIssyu from "../static/hyakunin-issyu.json" with { type: "json" };

export default function Home() {
  const isOpenPoemDrawer = useSignal(false);
  return (
    <Fragment>
      <header class="flex items-center h-full w-16 pt-2 pb-36 border-l-2 border-[--color-border] text-3xl font-bold">
        <PoemKnob
          onClick={() => {
            console.log("clicked");
            isOpenPoemDrawer.value = !isOpenPoemDrawer.value;
          }}
        />
        <h1 class="mt-4 mb-auto">七五</h1>
      </header>
      <main class="flex flex-col items-center w-[calc(100vw_-_64px)] border-t-8 border-b-8 border-[--color-border] pr-4 overflow-x-scroll">
        {hyakuninIssyu.items.map((item) => <Card item={item} />)}
      </main>
    </Fragment>
  );
}
