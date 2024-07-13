import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import cors, { runMiddleware } from "@/libs/cors";

export async function GET(request: NextRequest) {
  const response = NextResponse.next();
  await runMiddleware(request, response, cors);

  try {
    const notes = await prisma.note.findMany();
    return NextResponse.json(notes);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  const response = NextResponse.next();
  await runMiddleware(request, response, cors);

  try {
    const { title, content } = await request.json();

    const newNote = await prisma.note.create({
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(newNote);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
