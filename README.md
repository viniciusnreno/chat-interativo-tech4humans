# Chat com Assistente Virtual 🤖💬

Este projeto é uma aplicação frontend que simula um chat interativo com um assistente virtual. Ele utiliza armazenamento local para gerenciar histórico de conversas e um padrão **Backend for Frontend (BFF)** implementado com Next.js para retornar respostas fixadas ou aleatórias.

---

## 🚀 Tecnologias Utilizadas

### Linguagens e Frameworks

- **[Next.js 15](https://nextjs.org/)**: Framework React moderno para aplicações web escaláveis e performáticas.
- **[TypeScript](https://www.typescriptlang.org/)**: Adiciona tipagem estática ao JavaScript para maior confiabilidade no código.
- **[TailwindCSS](https://tailwindcss.com/)**: Framework CSS utilitário para estilização rápida e responsiva.
- **[shadcn UI](https://shadcn.dev/)**: Biblioteca de componentes de interface elegantes e acessíveis.

---

## 📝 Funcionalidades

1. **Chat com Assistente Virtual**:

   - Envio de mensagens pelo usuário com resposta automática do assistente.
   - Respostas fixadas ou aleatórias, geradas a partir de um array de frases.

2. **Histórico de Conversas**:

   - Armazenamento local de mensagens e chats para persistência após o refresh da página.
   - Possibilidade de renomear os chats para melhor organização.

3. **Gestão de Conversas**:

   - Criação de novos chats.
   - Exclusão de chats existentes.
   - Renomeação de chats diretamente pela interface.

4. **Integração com Backend for Frontend (BFF)**:
   - Uso do App Router do Next.js para gerenciar mensagens entre cliente e servidor.
   - Endpoint `/api/chat` que processa e retorna mensagens do assistente virtual.

---

## 🛠️ Como Rodar o Projeto Localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/chat-assistente.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd chat-assistente
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Acesse a aplicação em: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Link Hospedado

Acesse a versão online do projeto: [https://chat-interativo-tech4humans.vercel.app/](https://chat-interativo-tech4humans.vercel.app/).

---

## 🌟 Estrutura do Projeto

- **`app/api/chat/route.ts`**: Endpoint responsável por processar mensagens e retornar respostas do assistente.
- **`app/chat/page.tsx`**: Página principal do chat.
- **`components/`**: Contém os componentes reutilizáveis como formulário de envio, conteúdo do chat, e itens de interface.
- **`utils/chatService.ts`**: Gerenciamento do histórico e manipulação de chats no `localStorage`.

---

## 📜 Padrão Backend for Frontend (BFF)

O padrão BFF foi implementado através do App Router do Next.js:

- **Endpoint `/api/chat`**: Gerencia a lógica de respostas do assistente virtual.
- O cliente envia mensagens para o servidor, que processa e retorna uma resposta aleatória.

---

💡 Desenvolvido por [Vinicius Renó](https://viniciusreno.vercel.app/). 🚀
