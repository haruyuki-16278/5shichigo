export default function PoetKnob() {
  const onClickPoetKnob = () => {
    globalThis.document.dispatchEvent(new CustomEvent("togglePoetDrawer"));
  };
  return (
    <button
      class="grid w-16 h-16 rounded-full bg-blue-500 text-white font-bold text-4xl"
      onClick={onClickPoetKnob}
    >
      <span class="place-self-center">詠</span>
    </button>
  );
}
