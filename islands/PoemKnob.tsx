import type { JSX } from "preact";

export default function PoetKnob(props: {
  onClick: JSX.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      class="grid w-14 h-14 rounded-full bg-blue-500 text-white font-bold text-4xl"
      onClick={props.onClick}
    >
      <span class="place-self-center">詠</span>
    </button>
  );
}
