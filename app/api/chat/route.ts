import { NextResponse } from "next/server";
import axios from "axios";

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
  const { message, useChatGPT } = body;

  if (!message) {
    return NextResponse.json(
      { error: "Mensagem não fornecida." },
      { status: 400 }
    );
  }

  if (useChatGPT) {
    try {
      const gptResponse = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "gpt-3.5-turbo-instruct",
          prompt: `Você é um assistente virtual. Responda de forma breve e direta ao seguinte comando ou pergunta: "${message}"`,
          max_tokens: 100,
          temperature: 0.7,
          top_p: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return NextResponse.json({ response: gptResponse.data.choices[0].text });
    } catch (error) {
      console.error("Erro na API do ChatGPT:", error);
      return NextResponse.json(
        { error: "Erro ao se comunicar com o ChatGPT." },
        { status: 500 }
      );
    }
  }

  const randomResponse =
    responses[Math.floor(Math.random() * responses.length)];
  return NextResponse.json({ response: randomResponse });
}
