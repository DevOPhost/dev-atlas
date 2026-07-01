# Política de segurança

## Como reportar

Se você encontrar uma vulnerabilidade, não publique detalhes em uma issue.

Use o recurso **Report a vulnerability** na aba **Security** do repositório para enviar um relato privado. Se esse recurso não estiver disponível, entre em contato com o mantenedor pelo perfil [DevOPhost](https://github.com/DevOPhost) e peça um canal privado antes de compartilhar detalhes técnicos.

Inclua, quando possível:

- descrição do impacto;
- rota ou componente afetado;
- passos mínimos para reproduzir;
- ambiente e navegador utilizados;
- sugestão de correção, se houver.

Relatos de conteúdo incorreto, links quebrados e problemas de acessibilidade podem ser abertos como issues comuns.

## Escopo atual

O DevAtlas é uma aplicação de conteúdo sem contas, API própria ou envio de dados pessoais. Tema, idioma e progresso dos roadmaps são armazenados somente no navegador.

O projeto mantém:

- auditoria de dependências pelo npm;
- validação de IDs, relações e URLs de conteúdo no build;
- política de segurança de conteúdo e headers defensivos;
- ausência de renderização de HTML fornecido pelo catálogo;
- proteção em links externos abertos em nova aba;
- arquivos de ambiente e artefatos locais fora do versionamento.

## Versões

Apenas a versão mais recente da branch principal recebe correções de segurança.
