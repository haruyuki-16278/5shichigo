import { useSignal } from "@preact/signals";
import { Fragment } from "preact/jsx-runtime";
import { useRef } from "preact/hooks";

export default function PoemKnob() {
  const isOpenPoemDrawer = useSignal(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  isOpenPoemDrawer.subscribe((value) => {
    if (dialogRef.current) {
      if (value) {
        dialogRef.current.showModal();
        dialogRef.current.addEventListener("close", () => {
          isOpenPoemDrawer.value = false;
        }, { once: true });
      } else {
        dialogRef.current.close();
      }
    }
  });

  const onClickPoemKnob = () => {
    isOpenPoemDrawer.value = !isOpenPoemDrawer.value;
  };

  const onClickClosePoemDrawer = () => {
    isOpenPoemDrawer.value = false;
  };

  return (
    <Fragment>
      <button
        class="grid w-14 h-14 rounded-full bg-[--color-primary] text-[--color-white] font-bold text-4xl"
        onClick={onClickPoemKnob}
      >
        <span class="place-self-center">詠</span>
      </button>
      <dialog
        ref={dialogRef}
        class="max-w-[80%] max-h-[80%] w-full h-full border-2 border-[--color-border] rounded-2xl p-8 bg-[--color-white] open:flex flex-col justify-center gap-4 backdrop:bg-black backdrop:opacity-40"
      >
        <h2 class="text-xl font-bold">詩を詠む</h2>
        <input
          class="border-[--color-border] border-2 p-8 rounded-2xl"
          placeholder="一句詠む ここタップして 気のままに"
          type="text"
        />
        <div class="flex justify-end gap-2">
          <button
            class="sg-button primary h-fit self-end"
            onClick={onClickClosePoemDrawer}
          >
            詠む
          </button>
          <button
            class="sg-button gray h-fit self-end"
            onClick={onClickClosePoemDrawer}
          >
            流す
          </button>
        </div>
      </dialog>
    </Fragment>
  );
}
