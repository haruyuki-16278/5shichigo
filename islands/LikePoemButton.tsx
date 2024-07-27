import { useEffect, useState } from "preact/hooks";

export default function LikePoemButton(
  props: { poemId: string; poemLikes: number },
) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(
      JSON.parse(localStorage.getItem("liked-poems") ?? "[]").includes(
        props.poemId,
      ),
    );
  }, []);

  const onClick = async (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const response = await fetch(`/api/like/${props.poemId}`, {
      method: isLiked ? "DELETE" : "POST",
    });
    if (response.ok) {
      props.poemLikes += isLiked ? -1 : 1;
      const currentLikedPoems = JSON.parse(
        localStorage.getItem("liked-poems") ?? "[]",
      ) as string[];
      localStorage.setItem(
        "liked-poems",
        JSON.stringify(
          isLiked ? currentLikedPoems.filter((v) => v !== props.poemId) : [
            ...currentLikedPoems,
            props.poemId,
          ],
        ),
      );
      setIsLiked(!isLiked);
    }
  };
  return (
    <button class="flex items-center gap-1" onClick={onClick}>
      {isLiked
        ? (
          <svg
            width="16"
            height="16"
            class="fill-[var(--color-primary)]"
          >
            <use xlink:href="#icon-heart-fill" />
          </svg>
        )
        : (
          <svg
            width="16"
            height="16"
            class="fill-[var(--color-gray)]"
          >
            <use xlink:href="#icon-heart" />
          </svg>
        )}
      <p class="text-sm text-[var(--color-darkgray)]">{props.poemLikes}</p>
    </button>
  );
}
