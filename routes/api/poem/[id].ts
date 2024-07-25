import { FreshContext, Handlers } from "$fresh/server.ts";
import { Poem } from "../../../types/poem.class.ts";

export const handler: Handlers = {
  async POST(_req: Request, ctx: FreshContext) {
    const kv = await Deno.openKv();
    const targetId = ctx.params.id;
    const targetPoem = await kv.get([Poem.POEM_KEY, targetId]);
    return new Response(JSON.stringify(targetPoem.value));
  },
};
