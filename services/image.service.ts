export class ImageService {
  static resize(
    imageFile: File,
    maxWidth: number,
    maxHeight: number,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const scale = maxHeight / img.height;
        const scaledWidth = img.width * scale;
        const scaledHeight = maxHeight;

        canvas.width = maxWidth;
        canvas.height = maxHeight;

        const x = (maxWidth - scaledWidth) / 2;
        ctx?.drawImage(img, x, 0, scaledWidth, scaledHeight);

        resolve(canvas.toDataURL(imageFile.type));
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(imageFile);
    });
  }
}
