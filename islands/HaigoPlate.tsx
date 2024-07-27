import { useEffect, useRef, useState } from "preact/hooks";
import { Fragment } from "preact/jsx-runtime";

export default function HaigoPlate() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const haigoInputRef = useRef<HTMLInputElement>(null);
  const [haigo, setHaigo] = useState("");

  useEffect(() => {
    // クライアントサイドでのみ実行
    const storedHaigo = localStorage.getItem("haigo");
    setHaigo(storedHaigo ?? "");
  }, []);

  const onClickHaigo = () => {
    dialogRef.current?.showModal();
  };

  const onClickSubmit = () => {
    localStorage.setItem("haigo", haigoInputRef.current?.value ?? "名無し");
    setHaigo(haigoInputRef.current?.value ?? "名無し");
    dialogRef.current?.close();
  };
  const onClickCancel = () => {
    dialogRef.current?.close();
  };

  return (
    <Fragment>
      <button class="flex items-center gap-1" onClick={onClickHaigo}>
        <svg
          width="16"
          height="16"
          class="fill-[var(--color-primary)]"
        >
          <use xlink:href="#icon-pencil" />
        </svg>
        <p>{haigo !== "" ? haigo : "名無し"}</p>
      </button>
      <dialog ref={dialogRef} class="dialog-base">
        <h2 class="text-xl font-bold">俳号を決める</h2>
        <input
          type="text"
          placeholder="名無し"
          value={haigo ?? undefined}
          class="border-[--color-border] border-2 p-8 rounded-2xl"
          ref={haigoInputRef}
        />
        <div class="flex justify-end gap-2">
          <button
            class="sg-button primary h-fit self-end"
            onClick={onClickSubmit}
          >
            名乗る
          </button>
          <button
            class="sg-button gray h-fit self-end"
            onClick={onClickCancel}
          >
            やめる
          </button>
        </div>
      </dialog>
    </Fragment>
  );
}
