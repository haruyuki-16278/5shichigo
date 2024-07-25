import { useSignal } from "@preact/signals";
import { Fragment } from "preact/jsx-runtime";
import { useRef, useState } from "preact/hooks";

export default function PoemKnob() {
  const isOpenPoemDrawer = useSignal(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const poemInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

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

  const onClickSubmitPoem = async () => {
    const haigo = localStorage.getItem("haigo");
    const response = await fetch("/api/poem", {
      method: "POST",
      body: JSON.stringify({ poem: poemInputRef.current?.value, by: haigo }),
    });
    if (response.ok) {
      isOpenPoemDrawer.value = false;
      location.reload();
    } else {
      setErrorMessage("詩を詠むことができませんでした。");
    }
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
        class="dialog-base"
      >
        <h2 class="text-xl font-bold">詩を詠む</h2>
        <input
          class="border-[--color-border] border-2 p-8 rounded-2xl"
          placeholder="一句詠む ここタップして 気のままに"
          type="text"
          ref={poemInputRef}
        />
        {errorMessage && <p class="text-[--color-secondary]">{errorMessage}</p>}
        <div class="flex justify-end gap-2">
          <button
            class="sg-button primary h-fit self-end"
            onClick={onClickSubmitPoem}
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
