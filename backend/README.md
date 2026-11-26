# API do Arquivo Sombrio

## Configuração local

1. Copie `.env.example` para `.env` e preencha `DATABASE_URL` com a conexão do banco MySQL e `TOKEN_SECRETO` com um valor longo e aleatório.
2. No VS Code, aplique a migration `adicionar-relatos` usando Prisma Migrate Dev. A migration precisa de uma conexão válida, inclusive para validar o histórico existente.
3. Popule o acervo inicial com `npm run db:seed`.
4. Inicie a API com `npm run dev` na pasta `backend` e o frontend com `npm run dev` na pasta `frontend`.

## API de relatos

- `GET /relatos` lista relatos; aceita `busca` e `categoria` como filtros.
- `GET /relatos/:id` consulta um relato.
- `POST /relatos`, `PATCH /relatos/:id` e `DELETE /relatos/:id` exigem `Authorization: Bearer <TOKEN_SECRETO>`.

## Cadastro de usuários

- `POST /usuarios/cadastro` recebe `{ "nome": "Nome", "email": "email@exemplo.com", "senha": "senha-com-8-caracteres" }` e cria uma conta. A senha é armazenada como hash e nunca devolvida na resposta.
- `POST /usuarios/login` recebe e-mail e senha para validar as credenciais.

O conteúdo inicial é introdutório e inclui links para fontes externas. Revise fatos e referências antes de publicar novos relatos. O projeto evita detalhes gráficos, especulação apresentada como fato e glorificação dos autores.
