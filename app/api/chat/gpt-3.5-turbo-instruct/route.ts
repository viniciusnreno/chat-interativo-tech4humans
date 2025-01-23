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
    // const gptResponse = await axios.post(
    //   "https://api.openai.com/v1/completions",
    //   {
    //     model: "gpt-3.5-turbo-instruct",
    //     prompt: `Você é um assistente virtual. Use o contexto da conversa a seguir para responder de forma breve e direta (máximo de 40 palavras) à última mensagem.\n\n${formattedHistory}\n\nÚltima mensagem do usuário: "${message}"`,
    //     max_tokens: 100,
    //     temperature: 0.7,
    //     top_p: 1,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    return NextResponse.json({
      // response: gptResponse.data.choices[0].text.trim(),
      response: "resposta do gpt-3.5-turbo-instruct",
    });
  } catch (error) {
    console.error("Erro na API do gpt-3.5-turbo-instruct:", error);
    return NextResponse.json(
      { error: "Erro ao se comunicar com o gpt-3.5-turbo-instruct." },
      { status: 500 }
    );
  }
}
