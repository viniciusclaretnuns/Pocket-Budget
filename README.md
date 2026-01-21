# PocketBudget 

Aplicativo mobile **offline-first** para controle simples de gastos e entradas, com **CRUD de lançamentos**, **filtro por mês**, **resumo financeiro** (entradas/saídas/saldo) e **exportação para CSV**.  
Construído com **Expo + React Native + TypeScript**, usando **armazenamento local** e **React Query** para estado/cache.

---

## Funcionalidades

- Criar, listar, editar e excluir lançamentos (entradas e saídas)
- Filtro por mês (ex.: 01/2026) e visualização “Todos”
- Resumo automático:
  - Entradas
  - Saídas
  - Saldo final
- Exportação **CSV** (compatível com Excel/Google Sheets)
- Tema escuro/claro com persistência
- Funciona **sem internet** (dados locais)

---

## Tecnologias

- **Expo** (React Native)
- **Expo Router** (navegação)
- **TypeScript**
- **@tanstack/react-query** (cache/estado e invalidação)
- **expo-file-system** + **expo-sharing** (exportação CSV)
- Armazenamento local (offline persistence)

---

## Screenshots

## HomePage

<img width="796" height="1600" alt="image" src="https://github.com/user-attachments/assets/3aecb8d8-b0f7-40a7-90fd-640e87bb3771" />


## Tela de configurações

<img width="796" height="1600" alt="image" src="https://github.com/user-attachments/assets/762ed2f0-3e97-47d7-95b6-89b9cafbcb91" />


## Tela de adição de lançamentos(Entrada e Saída de valores)

<img width="796" height="1600" alt="image" src="https://github.com/user-attachments/assets/5726d0e6-8d2e-4b6b-a5e4-dca0d0ab7c5f" />
<img width="796" height="1600" alt="image" src="https://github.com/user-attachments/assets/d25e00c6-8b83-47a5-8831-bfd5552972a7" />


## Tela de visualização dos lançamentos(com e sem valores)

<img width="796" height="1600" alt="image" src="https://github.com/user-attachments/assets/b48d1b17-2fa8-4aa3-a35d-e5eda0a9c6dd" />
<img width="796" height="1600" alt="image" src="https://github.com/user-attachments/assets/c23adc59-3ac4-4959-9ff0-042c0ccf2a52" />


---


## Como rodar o projeto

### Pré-requisitos
- **Node.js** (recomendado **LTS**)
- **Expo Go** no celular (ou emulador Android/iOS)
- **Git**

### Instalação
```bash
npm install

Executar (Expo)

npx expo start


Depois:

Escaneie o QR Code com o Expo Go (Android)

No iOS, use a câmera ou Expo Go para escanear
```

## Exportação CSV

### No app, acesse Lançamentos → toque em Exportar CSV.
#### O arquivo gerado inclui:

- **Data**
- **Tipo (entrada/saída)**
- **Categoria**
- **Descrição**
- **Valor**
- **Resumo final com entradas, saídas e saldo**

---

## Decisões de implementação 

- **Offline-first: dados persistidos localmente para uso sem internet.**

- **React Query: usado para centralizar leitura/atualização e invalidação da lista após mutations (create/update/delete).**

- **CSV exportável: geração de CSV e compartilhamento usando APIs do Expo.**
  
---

## Autor

### Vinícius Claret Nunes

- **GitHub: @viniciusclaretnuns**
- **LinkedIn: ([Link](https://www.linkedin.com/in/vin%C3%ADcius-claret-nunes-7908a8253/))**


