import { Head } from "$fresh/runtime.ts";
import { Fragment } from "preact/jsx-runtime";

export default function Error404() {
  return (
    <Fragment>
      <Head>
        <title>四〇四 お探しのページ なかったよ | 七五</title>
      </Head>
      <div class="main-base grid place-content-center">
        <div class="w-full flex flex-col items-center justify-center gap-8 h-full">
          <h2 class="text-2xl text-bold text-[var(--color-darkgray)]">
            四〇四 お探しのページ なかったよ
          </h2>
          <a href="/" class="sg-button gray self-end">
            ここからトップに もどってちょうだい
          </a>
        </div>
      </div>
    </Fragment>
  );
}
