import { Note } from "@prisma/client";

export type CreateNote = Omit<Note, "id" | "createdAt" | "updatedAt">;

export type UpdateNote = Partial<Pick<Note, "title" | "content">>;
