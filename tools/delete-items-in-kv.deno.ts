const kv = await Deno.openKv();
const iterable = kv.list({ prefix: [] });
let cnt = 0;
for await (const item of iterable) {
  kv.delete(item.key);
  console.log("deleted", item.key);
  cnt++;
}
console.log(`deleted ${cnt} items`);
