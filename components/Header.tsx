import HaigoPlate from "../islands/HaigoPlate.tsx";
import PoemKnob from "../islands/PoemKnob.tsx";

export function Header() {
  return (
    <header class="flex items-center h-full w-16 py-4 border-l-2 border-[--color-border] bg-[var(--color-white)]">
      <PoemKnob />
      <h1 class="mt-4 mb-auto text-3xl font-bold">七五</h1>
      <HaigoPlate />
    </header>
  );
}
