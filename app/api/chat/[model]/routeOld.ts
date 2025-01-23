import Groq from "groq-sdk";
import { NextResponse } from "next/server";

import axios from "axios";
const groq = new Groq({ apiKey: process.env.GROG_LLM_API_KEY });

export async function POST(req: Request) {
  const body = await req.json();
  const { message, history, username, model } = body;

  if (!message) {
    return NextResponse.json(
      { error: "Mensagem não fornecida." },
      { status: 400 }
    );
  }

  if (model === "gpt-3.5-turbo-instruct") {
    try {
      const gptResponse = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "gpt-3.5-turbo-instruct",
          prompt: `Você é um assistente virtual. Meu nome é ${username}. Use o contexto da conversa a seguir para responder de forma breve e direta (máximo de 40 palavras) à última mensagem.\n\n${history}\n\nÚltima mensagem do usuário: "${message}"`,
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

      return NextResponse.json({
        response: gptResponse.data.choices[0].text.trim(),
      });
    } catch (error) {
      console.error("Erro na API do gpt-3.5-turbo-instruct:", error);
      return NextResponse.json(
        { error: "Erro ao se comunicar com o gpt-3.5-turbo-instruct." },
        { status: 500 }
      );
    }
  } else {
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
        model: model,
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
      console.error("Erro ao se comunicar com a API do ", model, error);
      return NextResponse.json(
        { error: "Erro ao se comunicar com o ", model },
        { status: 500 }
      );
    }
  }
}
