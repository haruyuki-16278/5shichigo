import { useRef, useState } from "preact/hooks";
import { Fragment } from "preact/jsx-runtime";

export default function HaigoPlate() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const haigoInputRef = useRef<HTMLInputElement>(null);
  const [haigo, setHaigo] = useState(localStorage.getItem("haigo"));

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
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          class="fill-[var(--color-primary)]"
        >
          <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z">
          </path>
        </svg>
        <p>{haigo ?? "名無し"}</p>
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
