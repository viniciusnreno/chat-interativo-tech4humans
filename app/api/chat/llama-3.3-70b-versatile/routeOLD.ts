import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { toast } from "sonner";

const groq = new Groq({ apiKey: process.env.GROG_LLM_API_KEY });

export async function POST(req: Request) {
  const body = await req.json();
  const { history, message, username } = body;

  if (!message) {
    return NextResponse.json(
      { error: "Mensagem não fornecida." },
      { status: 400 }
    );
  }

  if (!history) {
    return NextResponse.json(
      { error: "O histórico não fornecido." },
      { status: 400 }
    );
  }

  try {
    const systemMessage = {
      role: "system",
      content: `Você é um assistente virtual e está conversando com ${username}. Responda de forma breve, direta e educada (máximo de 40 palavras) à última mensagem.`,
    };

    const llmaResponse = await groq.chat.completions.create({
      messages: [
        systemMessage,
        ...history,
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_completion_tokens: 100,
      top_p: 1,
      stream: true,
      stop: null,
    });

    let responseContent = "";

    for await (const chunk of llmaResponse) {
      responseContent += chunk.choices[0]?.delta?.content || "";
    }

    return NextResponse.json({
      response: responseContent.trim(),
    });
  } catch (error) {
    toast.error("Erro ao se comunicar com o llama-3.3-70b-versatile.");
    console.error(
      "Erro ao se comunicar com a API do llama-3.3-70b-versatile:",
      error
    );
    return NextResponse.json(
      { error: "Erro ao se comunicar com o llama-3.3-70b-versatile." },
      { status: 500 }
    );
  }
}
