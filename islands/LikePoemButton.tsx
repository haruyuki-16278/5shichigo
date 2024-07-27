import { useEffect, useState } from "preact/hooks";

export default function LikePoemButton(
  props: { poemId: string; poemLikes: number },
) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("liked-poems") ?? "[]"));
    console.log(props.poemId);
    setIsLiked(
      JSON.parse(localStorage.getItem("liked-poems") ?? "[]").includes(
        props.poemId,
      ),
    );
  }, []);

  const onClick = async () => {
    console.log("fire");
    if (isLiked) {
      return;
    }
    const response = await fetch(`/api/like/${props.poemId}`, {
      method: "POST",
    });
    if (response.ok) {
      setIsLiked(!isLiked);
      props.poemLikes++;
      localStorage.setItem(
        "liked-poems",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("liked-poems") ?? "[]"),
          props.poemId,
        ]),
      );
    }
  };
  return (
    <button class="flex items-center gap-1" onClick={onClick}>
      {isLiked
        ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            class="fill-[var(--color-primary)]"
          >
            <path d="M7.655 14.916v-.001h-.002l-.006-.003-.018-.01a22.066 22.066 0 0 1-3.744-2.584C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.044 5.231-3.886 6.818a22.094 22.094 0 0 1-3.433 2.414 7.152 7.152 0 0 1-.31.17l-.018.01-.008.004a.75.75 0 0 1-.69 0Z">
            </path>
          </svg>
        )
        : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            class="fill-[var(--color-gray)]"
          >
            <path d="m8 14.25.345.666a.75.75 0 0 1-.69 0l-.008-.004-.018-.01a7.152 7.152 0 0 1-.31-.17 22.055 22.055 0 0 1-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.066 22.066 0 0 1-3.744 2.584l-.018.01-.006.003h-.002ZM4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.58 20.58 0 0 0 8 13.393a20.58 20.58 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z">
            </path>
          </svg>
        )}
      <p class="text-sm text-[var(--color-darkgray)]">{props.poemLikes}</p>
    </button>
  );
}
