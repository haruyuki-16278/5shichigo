import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html class="w-[100vw] h-[100vh]">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>七五 | Shichigo - 七語のリズムでSNS</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="w-[100vw] h-[100vh] bg-[--color-white] text-v-rl overflow-hidden">
        <Component />
      </body>
    </html>
  );
}
