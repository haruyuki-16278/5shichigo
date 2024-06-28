import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Fragment } from "preact/jsx-runtime";
import { Card } from "../components/Card.tsx";
import PoemKnob from "../islands/PoemKnob.tsx";

export default function Home() {
  const count = useSignal(3);
  globalThis.document.addEventListener("togglePoetDrawer", () => {
    console.log("drawer toggled");
  });
  return (
    <Fragment>
      <header class="flex justify-center items-center h-full w-16 pb-36 border-l-2 border-gray-500 text-3xl font-bold">
        <PoemKnob />
        <h1>七五</h1>
      </header>
      <main class="flex flex-col justify-center items-center w-[calc(100vw_-_64px)] pr-4 overflow-x-scroll">
        {[0, 1, 2, 3].map(() => <Card class="mr-2" />)}
      </main>
    </Fragment>
  );
}
