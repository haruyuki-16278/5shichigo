import { FreshContext, Handlers } from "$fresh/server.ts";
import { Poem } from "../../../types/poem.class.ts";

export const handler: Handlers = {
  async GET(_req: Request, _ctx: FreshContext): Promise<Response> {
    const kv = await Deno.openKv();
    const iterable = kv.list({ prefix: [Poem.POEM_KEY] });
    const result = [];
    for await (const poem of iterable) {
      result.push(poem.value);
    }
    console.log(result);
    return new Response(JSON.stringify(result ?? {}));
  },
  async POST(req: Request, _ctx: FreshContext): Promise<Response> {
    try {
      const data = new Poem(await req.json());
      console.log(data);
      const kv = await Deno.openKv();
      await kv.set([Poem.POEM_KEY, data.id], data);
      const response = {
        id: data.id,
        message: "ok",
      };
      return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(error.message, { status: 500 });
    }
  },
};
