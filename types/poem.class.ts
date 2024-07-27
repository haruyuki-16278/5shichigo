export class Poem {
  static readonly POEM_KEY = "poem";
  id: string;
  poem: string;
  by: string;
  likes: number;
  image?: string;
  createdAt?: string;
  constructor(
    data: Record<string, string>,
  ) {
    if (!data.poem || !data.by) {
      throw new Error(`Invalid data: ${JSON.stringify(data)}`);
    }
    this.id = data?.id ? data.id : crypto.randomUUID();
    this.createdAt = data?.createdAt ? data.createdAt : Date.now().toString();
    this.likes = data?.likes ? parseInt(data.likes) : 0;
    this.poem = data.poem;
    this.by = data.by;
    this.image = data?.image ? data.image : undefined;
  }
}
