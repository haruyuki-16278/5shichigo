import { FreshContext, Handlers } from "$fresh/server.ts";
import { Poem } from "../../../types/poem.class.ts";

export const handler: Handlers = {
  async POST(_req: Request, ctx: FreshContext) {
    const kv = await Deno.openKv();
    const targetId = ctx.params.id;
    const targetPoem = await kv.get([Poem.POEM_KEY, targetId]);
    const poem = new Poem(targetPoem.value as Record<string, string>);
    poem.likes += 1;
    await kv.set([Poem.POEM_KEY, targetId], poem);
    return new Response(JSON.stringify(targetId));
  },
};
