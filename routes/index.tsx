import { useSignal } from "@preact/signals";
import { Fragment } from "preact/jsx-runtime";
import { Card } from "../components/Card.tsx";
import PoemKnob from "../islands/PoemKnob.tsx";
import hyakuninIssyu from "../static/hyakunin-issyu.json" with { type: "json" };

export default function Home() {
  const isOpenPoemDrawer = useSignal(false);
  return (
    <Fragment>
      <header class="flex items-center h-full w-16 py-4 border-l-2 border-[--color-border] bg-[var(--color-white)] text-3xl font-bold">
        <PoemKnob
          onClick={() => {
            console.log("clicked");
            isOpenPoemDrawer.value = !isOpenPoemDrawer.value;
          }}
        />
        <h1 class="mt-4 mb-auto">七五</h1>
      </header>
      <main class="flex flex-col items-center w-[calc(100vw_-_64px)] h-[36em] my-auto border-[--color-border] pr-4  bg-[var(--color-white)] overflow-x-scroll">
        {hyakuninIssyu.items.map((item) => <Card item={item} />)}
      </main>
    </Fragment>
  );
}
