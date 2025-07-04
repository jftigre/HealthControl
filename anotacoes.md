📌 HealthControl – Progresso até agora
– Estrutura do projeto criada com pastas: css/, js/, assets/icons/
– Arquivos principais na raiz: index.html, manifest.json, service-worker.js
– Formulário criado no index.html com campos:
  – nome, marca, quantidade, onde comprou, preço e validade
  – todos os inputs com required
  – botão type="submit" incluído
– Arquivo js/app.js criado
– Script do JS incluído no final do HTML com defer
– Próximo passo: capturar dados do formulário e salvar no localStorage

📦 Como o localStorage funciona
O localStorage só armazena strings, então:

Para salvar um objeto → usamos JSON.stringify(objeto)

Para ler de volta → usamos JSON.parse(string)