import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { model } = body;
  return NextResponse.json({
    response: `resposta do modelo ${model}`,
  });
}
