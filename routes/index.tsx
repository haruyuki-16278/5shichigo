import { Card } from "../components/Card.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Poem } from "../types/poem.class.ts";

export const handler: Handlers<Poem[]> = {
  async GET(_req, ctx) {
    const kv = await Deno.openKv();
    const iterable = kv.list<Record<string, string>>({
      prefix: [Poem.POEM_KEY],
    });
    const poems = [];
    for await (const poem of iterable) {
      if (!poem.value) continue;
      poems.push(new Poem(poem.value));
    }
    return ctx.render(poems);
  },
};

export default function Home(props: PageProps<Poem[]>) {
  return (
    <main class="flex flex-col items-center w-[calc(100vw_-_64px)] h-[min(36em, 80%)] border-[--color-border] pr-4 py-8 bg-[var(--color-white)] overflow-x-scroll snap-mandatory snap-x overflow-y-hidden">
      {props.data.length > 0
        ? props.data.map((item) => <Card item={item} />)
        : (
          <div class="w-[calc(100vw_-_128px)] h-[32em] text-[var(--color-gray)] font-bold grid place-content-center">
            まだ詠まれた詩がないよ
          </div>
        )}
    </main>
  );
}
