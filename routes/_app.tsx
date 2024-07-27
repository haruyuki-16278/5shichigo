import { type PageProps } from "$fresh/server.ts";
import { Header } from "../components/Header.tsx";
import { Sprites } from "../components/Sprites.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html class="w-[100vw] h-[100svh]">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>七五 | Shichigo - 七語のリズムでSNS</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="w-[100vw] h-[100svh] bg-checker text-v-rl flex flex-col items-center overflow-hidden">
        <Sprites />
        <Header />
        <Component />
      </body>
    </html>
  );
}
