import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { message } = body;

  if (!message) {
    return NextResponse.json(
      { error: "Mensagem não fornecida." },
      { status: 400 }
    );
  }

  try {
    return NextResponse.json({
      response: "resposta do llama-3.3-70b-versatile",
    });
  } catch (error) {
    console.error("Erro na API do llama-3.3-70b-versatile:", error);
    return NextResponse.json(
      { error: "Erro ao se comunicar com o llama-3.3-70b-versatile." },
      { status: 500 }
    );
  }
}
