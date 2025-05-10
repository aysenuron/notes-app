type Tag = string;
type Note = {
  title: string,
  content: string,
  createdAt: number,
  updatedAt: number,
  tags: Tag[],
  id: number
};

export type { Tag, Note };