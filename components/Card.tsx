import LikePoemButton from "../islands/LikePoemButton.tsx";
import { Poem } from "../types/poem.class.ts";

export function Card(props: {
  item: Poem;
}) {
  return (
    <a class="h-full" href={`/poem/${props.item.id}`}>
      <article
        class="flex flex-col justify-between min-w-[10em] h-[min(32em,calc(100% - 2em))] ml-4 p-4 border-2 border-[--color-border] rounded-2xl text-v-rl snap-center overflow-auto"
        style={props.item.image &&
          {
            backgroundImage: `url(${props.item.image})`,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "color",
          }}
      >
        <section class="h-50">
          {props.item.poem.split(/[\s-]/)
            .map((part) => <p class="whitespace-nowrap text-nowrap">{part}</p>)}
        </section>
        <section class="self-end flex gap-4">
          <p>{props.item.by}</p>
          <LikePoemButton poemId={props.item.id} poemLikes={props.item.likes} />
        </section>
      </article>
    </a>
  );
}
