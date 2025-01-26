import Groq from "groq-sdk";
import axios from "axios";
import { Message } from "@/types/chat";

const groq = new Groq({ apiKey: process.env.GROG_LLM_API_KEY });

export async function handleGPTRequest(
  username: string,
  history: Message[],
  message: string,
  model: string
) {
  const prompt = `Você é um assistente virtual. Meu nome é ${username}. Use o contexto da conversa a seguir para responder de forma breve e direta (máximo de 40 palavras) à última mensagem.\n\n${history}\n\nÚltima mensagem do usuário: "${message}"`;

  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      model,
      prompt,
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

  return response.data.choices[0]?.text.trim();
}

export async function handleDeepSeekRequest(
  username: string,
  history: Message[],
  message: string
) {
  const response = await axios.post("http://127.0.0.1:11434/api/chat", {
    messages: [
      {
        role: "system",
        content: `Você é um assistente virtual e está conversando com ${username}. Responda de forma breve, direta e educada à última mensagem. Nunca ultrapasse o limite de 30 palavras`,
      },
      ...history,
      {
        role: "user",
        content: message,
      },
    ],
    model: "deepseek-r1:8b",
    temperature: 0.3,
    stream: false,
  });

  console.log(response.data);
  return response.data.message?.content
    ?.replace(/<think>[^]*?<\/think>/g, "")
    .replace(/<.*?>/g, "")
    .trim();
}

export async function handleGroqRequest(
  username: string,
  history: Message[],
  message: string,
  model: string
) {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Você é um assistente virtual e está conversando com ${username}. Responda de forma breve, direta e educada (máximo de 40 palavras) à última mensagem.`,
      },
      ...history,
      {
        role: "user",
        content: message,
      },
    ],
    model,
    temperature: 0.7,
    max_completion_tokens: 100,
    top_p: 1,
    stream: true,
  });

  let responseContent = "";
  for await (const chunk of response) {
    responseContent += chunk.choices[0]?.delta?.content || "";
  }

  return responseContent.trim();
}
