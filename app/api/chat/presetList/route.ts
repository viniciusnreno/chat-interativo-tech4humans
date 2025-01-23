import { NextResponse } from "next/server";

const questions = [
  "Como posso ajudar?",
  "Tudo bem com você?",
  "Pode me explicar melhor?",
  "Pode repetir isso, por favor?",
  "Isso faz sentido para você?",
  "Você precisa de mais informações?",
  "Isso está claro para você?",
];

const statements = [
  "Entendido, vamos continuar!",
  "Esse é um bom ponto.",
  "Deixe-me verificar isso para você.",
  "Interessante, continue.",
  "Claro, aqui está o que encontrei.",
  "Me fale mais sobre isso.",
  "Que tal tentarmos outra abordagem?",
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
  "Obrigado por compartilhar isso.",
];

export async function POST(req: Request) {
  const body = await req.json();
  const { message, history } = body;

  console.log(history);
  if (!message) {
    return NextResponse.json(
      { error: "Mensagem não fornecida." },
      { status: 400 }
    );
  }

  const containsNegativeWords =
    /\bnão consigo|chateado|difícil|problema\b/i.test(message);
  const containsGratitude = /\bobrigado|valeu|grato\b/i.test(message);

  if (containsNegativeWords) {
    return NextResponse.json({
      response:
        "Entendo como isso pode ser frustrante. Estou aqui para ajudar. Pode explicar melhor?",
    });
  }

  if (containsGratitude) {
    return NextResponse.json({
      response:
        "De nada! Fico feliz em ajudar. Se precisar de algo mais, é só chamar.",
    });
  }

  if (/\bconfiguração\b/.test(message)) {
    return NextResponse.json({
      response:
        "Você mencionou configuração. Precisa de ajuda com algo específico?",
    });
  }

  if (/\berro\b/.test(message)) {
    return NextResponse.json({
      response: "Parece que encontrou um erro. Pode descrever o que aconteceu?",
    });
  }

  const isQuestion = message.trim().includes("?");

  const response = isQuestion
    ? questions[Math.floor(Math.random() * questions.length)]
    : statements[Math.floor(Math.random() * statements.length)];

  return NextResponse.json({ response });
}
