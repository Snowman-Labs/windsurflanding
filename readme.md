# Windsurf x Snowman Labs — Landing Page

Projeto React + Vite + TypeScript com landing page minimalista para parceria oficial da Windsurf no Brasil.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:5173

## Estrutura

- `index.html`: entrada do app com meta tags SEO básicas
- `src/main.tsx`: bootstrap React
- `src/App.tsx`: renderiza a landing
- `src/WindsurfPartnerLanding.tsx`: landing page completa
- `src/styles.css`: estilos globais minimalistas
- `public/logos/`: coloque aqui os arquivos de logo
  - `windsurf-white.png` (logo branca do Windsurf)
  - `snowman-labs.png` (logo Snowman Labs)

## Ajustes pendentes

- Substituir no rodapé: `Snowman Labs LTDA • CNPJ: inserir CNPJ` pelo CNPJ real.
- Conectar o formulário a um endpoint/CRM (o `onSubmit` está com placeholder `console.log`).

## Licenças e marcas

Os logotipos e marcas citados pertencem aos seus respectivos proprietários. Use apenas ativos oficiais autorizados.
