import { JSX } from "preact";

export function Card(props: JSX.HTMLAttributes<HTMLAnchorElement>, id: string) {
  return (
    <article class="flex justify-between w-full h-[80%] p-4 border-2 border-gray-500 rounded text-v-rl">
      <section>
        <p>この世をば</p>
        <p>我が世とぞ思ふ</p>
        <p>望月の</p>
        <p>欠けたることも</p>
        <p>なしとおもへば</p>
      </section>
      <section class="self-end">
        <p>藤原道長</p>
      </section>
    </article>
  );
}
