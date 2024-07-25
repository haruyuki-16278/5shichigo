const kv = await Deno.openKv();
const iterable = kv.list({ prefix: [] });
for await (const item of iterable) {
  console.log(item.key);
}
