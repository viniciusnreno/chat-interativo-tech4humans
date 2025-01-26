## Chat com Assistente Virtual 🤖💬

Este projeto é uma aplicação frontend que simula um chat interativo com um assistente virtual. Ele utiliza armazenamento local para gerenciar o histórico de conversas e implementa o padrão **Backend for Frontend (BFF)** com Next.js, permitindo a integração com diferentes modelos de IA ou respostas fixadas/aleatórias.

---

## 🚀 Tecnologias Utilizadas

### Linguagens e Frameworks

- **[Next.js 15](https://nextjs.org/)**: Framework React moderno para aplicações web escaláveis e performáticas.
- **[TypeScript](https://www.typescriptlang.org/)**: Adiciona tipagem estática ao JavaScript para maior confiabilidade no código.
- **[TailwindCSS](https://tailwindcss.com/)**: Framework CSS utilitário para estilização rápida e responsiva.
- **[shadcn UI](https://shadcn.dev/)**: Biblioteca de componentes de interface elegantes e acessíveis.
- **[Sonner](https://sonner.dev/)**: Biblioteca para exibição de notificações dinâmicas e estilizadas.

---

## 📝 Funcionalidades

1. **Chat com Assistente Virtual**:
   - Envio de mensagens pelo usuário com resposta automática do assistente.
   - Integração com modelos de IA ou uso de respostas fixadas/aleatórias.
   - Respostas podem ser geradas via array predefinido ou por modelos de IA.

2. **Switch de IA**:
   - **Modo IA ativado**: O usuário pode escolher entre os modelos disponíveis.
     - Modelos suportados:
       - **Groq API**:
         - llama-3.3-70b-versatile
         - llama-3.1-8b-instant
         - llama3-70b-8192
         - llama3-8b-8192
         - gemma2-9b-it
       - **OpenAI API**:
         - gpt-3.5-turbo-instruct
       - **Local (Ollama)**:
         - deepseek-r1:8b (local)
   - **Modo IA desativado**: O assistente responde utilizando frases predefinidas em um array local.

3. **Histórico de Conversas**:
   - Armazenamento local (localStorage) das conversas para persistência após o refresh da página.
   - Possibilidade de renomear os chats para melhor organização.

4. **Gestão de Conversas**:
   - Criação de novos chats.
   - Exclusão de chats existentes.
   - Renomeação de chats diretamente pela interface.

5. **Integração com Backend for Frontend (BFF)**:
   - Uso do App Router do Next.js para gerenciar mensagens entre cliente e servidor.
   - Endpoints para processar mensagens e listar modelos disponíveis.

---

## 🛠️ Como Rodar o Projeto Localmente

1. Clone o repositório:

   ```bash
      git clone https://github.com/viniciusnreno/chat-interativo-tech4humans.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd chat-interativo-tech4humans
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto e adicione as chaves de API necessárias:
   ```bash
   OPENAI_API_KEY=sua_openai_api_key
   GROQ_API_KEY=sua_groq_api_key
   ```

5. Instale o **Ollama** (opcional para o modelo local):
- Siga as instruções no [site oficial do Ollama](https://ollama.ai) para configurar o modelo `deepseek-r1:8b`.

6. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

7. Acesse a aplicação em: http://localhost:3000

---

## 🌐 Link Hospedado

Acesse a versão online do projeto: [https://chat-interativo-tech4humans.vercel.app/](https://chat-interativo-tech4humans.vercel.app/).

 

## 🌟 Estrutura do Projeto

- app/api/chat/[model]/route.ts: Endpoint responsável por processar mensagens via modelo de IA.
- app/api/chat/presetList/route.ts: Endpoint para listar modelos disponíveis.
- app/page.tsx: Página principal do chat.
- components/: Contém os componentes reutilizáveis como formulário de envio, conteúdo do chat, e itens de interface.
- contexts/chat-context.tsx: Gerenciamento de estado e lógica de conversas.
- utils/chatService.ts: Gerenciamento do histórico e manipulação de chats no localStorage.
- utils/userService.ts: Funções para salvar e recuperar o nome do usuário.
- utils/handleRequest.tsx: Utilitário para chamadas às APIs.

---

## 📜 Padrão Backend for Frontend (BFF)

O padrão BFF foi implementado através do App Router do Next.js:

- Endpoint /api/chat/[model]: Gerencia a lógica de mensagens e respostas do assistente virtual com suporte a múltiplos modelos de IA.
- Endpoint /api/chat/presetList: Retorna a lista de modelos disponíveis para seleção no front-end.

---

💡 Desenvolvido por [Vinicius Renó](https://viniciusreno.vercel.app/). 🚀
