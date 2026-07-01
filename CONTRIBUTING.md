# Contribuindo com o DevAtlas

Obrigado por considerar uma contribuição. O DevAtlas mistura código, conteúdo técnico e três idiomas; por isso, mudanças pequenas e bem justificadas são mais fáceis de revisar.

## Antes de começar

- Procure uma issue existente ou abra uma proposta curta.
- Para vulnerabilidades, não use issues públicas: siga [SECURITY.md](./SECURITY.md).
- Não inclua dados pessoais, credenciais, conteúdo copiado sem licença ou logotipos de origem incerta.

## Ambiente local

```bash
npm ci
npm run dev
```

Antes de enviar:

```bash
npm run lint
npm run build
```

## Alterações de conteúdo

- Preserve IDs existentes; eles fazem parte das URLs.
- Preencha português, inglês e espanhol com texto natural.
- Use nomes oficiais de tecnologias.
- Prefira documentação oficial e URLs HTTPS.
- Explique contexto, pré-requisitos e limitações; evite recomendações universais.
- Não transforme roadmaps em promessas de prazo.
- Confira relações, páginas associadas e busca.

## Alterações de interface

- Teste tema claro e escuro.
- Verifique teclado, foco visível e `prefers-reduced-motion`.
- Teste ao menos uma largura móvel sem overflow horizontal.
- Não esconda conteúdo essencial atrás de animações ou hover.

## Pull requests

Descreva o problema, a decisão tomada e como validar. Se houver mudança visual, inclua capturas relevantes. Evite misturar refatoração ampla, conteúdo e redesign em um único pull request.
