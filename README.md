# FURIA Fans - Plataforma de Fãs

## 📚 Sobre o projeto

O **FURIA Fans** é uma plataforma desenvolvida para a interação entre fãs do time FURIA. Os usuários podem se cadastrar, criar seus perfis, postar mensagens (drops), favoritar outros fãs e explorar a comunidade. Foi projetado como um desafio técnico para demonstrar habilidades de desenvolvimento front-end e integração de contexto e gerenciamento de estado em React/Next.js.

## 📊 Status do projeto

> Finalizado ✅

## 🧰 Tecnologias utilizadas

- [Next.js 13 (App Router)](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- LocalStorage API

## 💪 Funcionalidades principais

- Cadastro de usuários com cadastro por e-mail.
- Login com redirecionamento automático.
- Criação de perfil de fã (com nickname, jogo favorito, nível de fã, foto).
- Sistema de Drops (posts de mensagens).
- Curtidas nos drops.
- Edição e exclusão de próprios drops.
- Lista de fãs com opção de favoritar.
- Página de favoritos pessoais.
- Sistema de Navbar dinâmico (Navbar geral e NavbarAuth exclusivo para login/cadastro).

## 🌐 Deploy

> O projeto foi desenvolvido para uso local. Para rodar:

## 🔧 Como executar localmente

1. Clone o repositório:
```bash
https://github.com/matheusrosa1/FuriaFans.git
```

2. Instale as dependências:
```bash
npm install
```

3. Rode o projeto:
```bash
npm run dev
```

4. Acesse no navegador:
```bash
http://localhost:3000
```

## 📊 Estrutura de pastas principais

```bash
src/
|-- app/
|   |-- login/
|   |-- register/
|   |-- add-fan/
|   |-- fan/[id]/
|   |-- fan/me/
|   |-- favorites/
|   |-- drops/
|-- components/
|   |-- Navbar.tsx
|   |-- NavbarAuth.tsx
|   |-- Button.tsx
|   |-- Input.tsx
|   |-- FanCard.tsx
|   |-- DropList.tsx
|-- contexts/
|   |-- AuthContext.tsx
|   |-- FanListContext.tsx
|   |-- FanProfileContext.tsx
|   |-- DropsContext.tsx
|-- interfaces/
|   |-- dropMessage.ts
|   |-- EditProfilePhotoProps.ts
|   |-- fan.ts
|   |-- FanContextType.ts
|   |-- FanProfile.ts
|   |-- FanProfileViewProps.ts
|-- mocks/
|   |-- FansMock.ts
|   |-- gameList.ts
|-- utils/
|   |-- cropImage.ts
```

## 📖 Páginas principais

- **Home:** lista de todos os fãs.
- **Login:** autenticação do usuário.
- **Cadastro:** criação de conta.
- **Perfil do Fã:** detalhamento do fã e seus drops.
- **Favoritos:** lista de fãs favoritados pelo usuário logado.
- **Drops:** feed geral de mensagens.

## 🌟 Melhorias futuras

- Integração com backend real (Node.js + PostgreSQL).
- Upload real de fotos de perfil.
- Notificações de novos drops.
- Sistema de comentários nos drops.

## 👥 Autor

Feito com ❤️ por Matheus Rosa.

> "A verdadeira força está na comunidade."

---

✨ **Projeto feito com dedicação para o desafio técnico da FURIA.**
