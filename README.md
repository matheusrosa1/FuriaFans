
# FURIA Fans - Plataforma de Fãs

## 📚 Sobre o projeto

O **FURIA Fans** é uma plataforma desenvolvida para a interação entre fãs do time FURIA. Os usuários podem se cadastrar, criar seus perfis, postar mensagens (drops), favoritar outros fãs e explorar a comunidade. Foi projetado como um desafio técnico para demonstrar habilidades de desenvolvimento front-end e integração de contexto e gerenciamento de estado em React/Next.js.



## 🧰 Tecnologias utilizadas

- [Next.js 13 (App Router)](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest](https://jestjs.io/)
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

2. Entre na pasta do projeto
```bash
cd frontend
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

## 🧪 Sobre os testes

Para garantir a qualidade do código e o bom funcionamento dos principais componentes da aplicação, foram desenvolvidos **testes unitários** utilizando o **Jest** em conjunto com o **React Testing Library**.

✅ Para rodar os testes localmente:

```bash
npm run test
```

Os testes garantem que a estrutura visual dos componentes e suas interações principais se mantenham consistentes.

---

## 📊 Estrutura de pastas principais

```bash
src/
|-- __tests__/
|   |-- components/
|   |  |-- DropList.test.tsx
|   |  |-- FanCard.test.tsx
|   |  |-- FanDetails.test.tsx
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
|   |-- EditProfilePhoto.tsx
|   |-- DropList.tsx
|   |-- NavbarAuth.tsx
|-- contexts/
|   |-- AuthContext.tsx
|   |-- FanListContext.tsx
|   |-- FanProfileContext.tsx
|   |-- DropsContext.tsx
|-- interfaces/
|   |-- dropMessage.ts
|   |-- EditProfilePhotoProps.ts
|   |-- FanContextType.ts
|   |-- FanProfile.ts
|   |-- DropsContextType.ts
|   |-- FanProfileContextType.ts
|   |-- FanProfileViewProps.ts
|   |-- FanRecord.ts
|-- mocks/
|   |-- FansMock.ts
|   |-- gameList.ts
|   |-- fanMock.ts
|-- utils/
|   |-- cropImage.ts
...
```

## 📖 Páginas principais

- **Home:** lista de todos os fãs.
- **Login:** autenticação do usuário.
- **Cadastro:** criação de conta.
- **Perfil do Fã:** detalhamento do fã e seus drops.
- **Favoritos:** lista de fãs favoritados pelo usuário logado.
- **Drops:** feed geral de mensagens.


## 👥 Autor

Feito com ❤️ por Matheus Rosa.

> "A verdadeira força está na comunidade."

---

✨ **Projeto feito com dedicação para o desafio técnico da FURIA.**
