import { Fragment } from "preact/jsx-runtime";
import { Card } from "../components/Card.tsx";
import PoemKnob from "../islands/PoemKnob.tsx";
import hyakuninIssyu from "../static/hyakunin-issyu.json" with { type: "json" };

export default function Home() {
  return (
    <Fragment>
      <header class="flex items-center h-full w-16 py-4 border-l-2 border-[--color-border] bg-[var(--color-white)]">
        <PoemKnob />
        <h1 class="mt-4 mb-auto text-3xl font-bold">七五</h1>
      </header>
      <main class="flex flex-col items-center w-[calc(100vw_-_64px)] h-[min(36em, 80%)] border-[--color-border] pr-4  bg-[var(--color-white)] overflow-x-scroll snap-mandatory snap-x">
        {hyakuninIssyu.items.map((item) => <Card item={item} />)}
      </main>
    </Fragment>
  );
}
