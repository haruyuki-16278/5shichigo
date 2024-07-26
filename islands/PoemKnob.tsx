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
    const haigo = localStorage.getItem("haigo") ?? "名無し";
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
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">詩を詠む</h2>
          <input
            type="file"
            accept="image/*"
            class="sg-button gray w-12 h-12 rounded-full self-end grid place-content-center"
            onClick={onClickClosePoemDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
            >
              <path d="M16 13.25A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25V2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75ZM1.75 2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h.94l.03-.03 6.077-6.078a1.75 1.75 0 0 1 2.412-.06L14.5 10.31V2.75a.25.25 0 0 0-.25-.25Zm12.5 11a.25.25 0 0 0 .25-.25v-.917l-4.298-3.889a.25.25 0 0 0-.344.009L4.81 13.5ZM7 6a2 2 0 1 1-3.999.001A2 2 0 0 1 7 6ZM5.5 6a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0Z">
              </path>
            </svg>
          </input>
        </div>
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
