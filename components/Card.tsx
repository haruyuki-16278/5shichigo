import LikePoemButton from "../islands/LikePoemButton.tsx";
import { Poem } from "../types/poem.class.ts";

export function Card(props: {
  item: Poem;
}) {
  return (
    <article class="flex justify-between w-[10em] h-[32em] mr-2 p-4 border-2 border-[--color-border] rounded-2xl text-v-rl snap-center">
      <section class="h-50">
        {props.item.poem.split(/[\s-]/)
          .map((part) => <p class="whitespace-nowrap text-nowrap">{part}</p>)}
      </section>
      <section class="self-end flex gap-4">
        <p>{props.item.by}</p>
        <LikePoemButton poemId={props.item.id} poemLikes={props.item.likes} />
      </section>
    </article>
  );
}
