export class Poem {
  static readonly POEM_KEY = "poem";
  id: string;
  poem: string;
  by: string;
  likes: number;
  imageB64?: string;
  createdAt?: string;
  constructor(
    data: Record<string, string>,
  ) {
    if (!data.poem || !data.by) {
      throw new Error("Invalid data");
    }
    this.id = crypto.randomUUID();
    this.createdAt = Date.now().toString();
    this.likes = data?.likes ? parseInt(data.likes) : 0;
    this.poem = data.poem;
    this.by = data.by;
    if (data.imageB64) {
      this.imageB64 = data.imageB64;
    }
  }
}
