import { Handlers, PageProps } from "$fresh/server.ts";
import { Card } from "../../components/Card.tsx";
import { Poem } from "../../types/poem.class.ts";

export const handler: Handlers<Poem | null> = {
  async GET(_req, ctx) {
    const kv = await Deno.openKv();
    const targetId = ctx.params.id;
    const targetPoem = await kv.get<Poem>([Poem.POEM_KEY, targetId]);
    return ctx.render(targetPoem.value);
  },
};

export default function SinglePoem(props: PageProps<Poem | null>) {
  return (
    <main class="main-base flex flex-col items-center justify-center">
      {props.data !== null
        ? <Card item={props.data}></Card>
        : (
          <div class="w-[calc(100vw_-_128px)] h-[32em] text-[var(--color-gray)] font-bold grid place-content-center">
            その詩は 七五ではまだ 詠まれてない （字余り）
          </div>
        )}
      <a class="sg-button gray h-fit place-self-end" href="/">戻る</a>
    </main>
  );
}
