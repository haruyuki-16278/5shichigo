import { useSignal } from "@preact/signals";
import { Fragment } from "preact/jsx-runtime";
import { useRef, useState } from "preact/hooks";
import { ImageService } from "../services/image.service.ts";

export default function PoemKnob() {
  const isOpenPoemDrawer = useSignal(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const poemInputRef = useRef<HTMLInputElement>(null);
  const poemImageInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [resizedImage, setResizedImage] = useState("");

  const onClickPoemKnob = () => {
    isOpenPoemDrawer.value = !isOpenPoemDrawer.value;
  };
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

  const onClickSubmitPoem = async () => {
    const haigo = localStorage.getItem("haigo") ?? "名無し";
    const response = await fetch("/api/poem", {
      method: "POST",
      body: JSON.stringify({
        poem: poemInputRef.current?.value,
        by: haigo,
        image: resizedImage !== "" ? resizedImage : undefined,
      }),
    });
    if (response.ok) {
      isOpenPoemDrawer.value = false;
      setErrorMessage("");
      location.reload();
    } else {
      setErrorMessage("詩を詠むことができませんでした。");
    }
  };
  const onClickClosePoemDrawer = () => {
    if (poemInputRef.current) {
      poemInputRef.current.value = "";
    }
    if (poemImageInputRef.current) {
      poemImageInputRef.current.value = "";
    }
    setErrorMessage("");
    isOpenPoemDrawer.value = false;
  };
  const onChangePoemImage = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const resizedImage = await ImageService.resize(file, 160, 442);
      console.log(resizedImage);
      setResizedImage(resizedImage);
    }
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
        class="dialog-base h-fit max-h-fit w-fit max-w-fit"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">詩を詠む</h2>
          <button
            class="sg-button primary w-12 h-12 rounded-full self-end grid place-content-center"
            onClick={() => poemImageInputRef.current?.click()}
          >
            <input
              type="file"
              accept="image/*"
              class="hidden"
              ref={poemImageInputRef}
              onChange={onChangePoemImage}
            />
            <svg
              width="16"
              height="16"
              class="fill-[var(--color-primary)]"
            >
              <use xlink:href="#icon-image" />
            </svg>
          </button>
        </div>
        <input
          class="w-[10em] h-[32em] border-[--color-border] border-2 p-8 rounded-2xl"
          placeholder="一句詠む ここタップして 気のままに"
          type="text"
          ref={poemInputRef}
          style={resizedImage &&
            {
              backgroundImage: `url(${resizedImage})`,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "color",
            }}
        />
        {errorMessage && <p class="text-[--color-error]">{errorMessage}</p>}
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
