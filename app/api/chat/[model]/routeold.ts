import { NextResponse } from "next/server";
import {
  handleGPTRequest,
  handleDeepSeekRequest,
  handleGroqRequest,
} from "@/utils/handleRequests";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history, username, model } = body;

    if (!message || !model || !username) {
      return NextResponse.json(
        {
          error:
            "Parâmetros obrigatórios ausentes: 'message', 'username' ou 'model'.",
        },
        { status: 400 }
      );
    }

    let response;
    switch (model) {
      case "gpt-3.5-turbo-instruct":
        response = await handleGPTRequest(username, history, message, model);
        break;
      case "deepseek-r1:8b":
        response = await handleDeepSeekRequest(username, history, message);
        break;
      default:
        response = await handleGroqRequest(username, history, message, model);
        break;
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar a requisição." },
      { status: 500 }
    );
  }
}
