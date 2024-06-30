export interface Uta {
  "0": string;
  "5": string;
  "12": string;
  "17": string;
  "24": string;
  "author": string;
}

export function Card(props: {
  item: Uta;
}) {
  return (
    <article class="flex justify-between w-full h-[80%] mr-2 p-4 border-2 border-gray-500 rounded text-v-rl">
      <section>
        <p>{props.item["0"]}</p>
        <p>{props.item["5"]}</p>
        <p>{props.item["12"]}</p>
        <p>{props.item["17"]}</p>
        <p>{props.item["24"]}</p>
      </section>
      <section class="self-end">
        <p>{props.item["author"]}</p>
      </section>
    </article>
  );
}
