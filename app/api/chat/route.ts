// app/api/chat/route.ts
import { NextResponse } from "next/server";

const responses = [
  "Como posso ajudar?",
  "Tudo bem com você?",
  "Pode me explicar melhor?",
  "Entendido, vamos continuar!",
  "Esse é um bom ponto.",
  "Deixe-me verificar isso para você.",
  "Pode repetir isso, por favor?",
  "Interessante, continue.",
  "Claro, aqui está o que encontrei.",
  "Me fale mais sobre isso.",
  "Que tal tentarmos outra abordagem?",
  "Isso faz sentido para você?",
  "Ótimo ponto!",
  "Deixe-me pensar sobre isso.",
  "Posso ajudá-lo com mais alguma coisa?",
  "Isso parece promissor.",
  "Gostei dessa ideia.",
  "Vamos explorar isso mais a fundo.",
  "Com certeza, vamos resolver isso.",
  "Essa é uma questão interessante.",
  "Posso tentar novamente se preferir.",
  "Tenho algumas ideias para isso.",
  "Você precisa de mais informações?",
  "Isso está claro para você?",
  "Obrigado por compartilhar isso.",
];

export async function POST(req: Request) {
  const body = await req.json();
  const { message } = body;

  if (!message) {
    return NextResponse.json({ error: "Sem mensagem." }, { status: 400 });
  }

  const randomResponse =
    responses[Math.floor(Math.random() * responses.length)];

  return NextResponse.json({ response: randomResponse });
}
