# Conexões em Pesquisa

Protótipo de plataforma para projeto de pesquisa, pronto para publicação estática no GitHub Pages.

## O que já está incluído

- Página institucional responsiva e áreas preparadas para quatro módulos: Territórios, Acervo, Participação e Resultados.
- Cadastro e login demonstráveis no navegador, com perfis de participante e administração.
- Painel restrito com itens próprios de gestão para administradores.
- Sem dependências, build ou servidor: basta publicar estes arquivos.

## Publicação no GitHub Pages

1. Crie um repositório no GitHub e envie os arquivos desta pasta para a raiz.
2. Em **Settings > Pages**, selecione a branch `main` e a pasta `/ (root)`.
3. Salve: o GitHub fornecerá o endereço público em poucos minutos.

## Credencial de demonstração

`admin@pesquisa.org` / `admin123`

## Antes de colocar em produção

O login desta versão usa `localStorage`, somente para validar a experiência e o layout; não é seguro nem compartilhado entre aparelhos. Para autenticação real mantendo o GitHub Pages, conecte o frontend a um serviço como **Supabase Auth** ou **Firebase Authentication**. O próximo passo recomendado é substituir as funções de `localStorage` em `app.js` pela autenticação e banco de dados do serviço escolhido, usando regras de acesso por papel (usuário/admin).
