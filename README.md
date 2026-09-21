# 🍽️ Sabor & Bistrô — Gestão de Cardápio

> **Projeto Acadêmico Avaliativo — OAT 1**  
> **Curso:** Sistemas de Informação  
> **Disciplina:** Desenvolvimento de API’s  
> **Professor:** Pedro Borges  
> **Tema:** Projeto de CRUD com Arrays (Back-end & Front-end)

---

## 🌐 Links do Projeto no Ar

- 🚀 **Aplicação Front-end (GitHub Pages):** [https://kbarreto75.github.io/Sabor-E-Bistro/](https://kbarreto75.github.io/Sabor-E-Bistro/)
- ⚙️ **API REST Back-end (Render):** [https://sabor-e-bistro.onrender.com/api/menu](https://sabor-e-bistro.onrender.com/api/menu)

---
## 📋 Sumário Executivo e Rubrica de Avaliação

Esta aplicação full-stack foi projetada e implementada para atender integralmente a todos os critérios da **OAT 1**, demonstrando as quatro operações fundamentais de um CRUD (Create, Read, Update, Delete) em um domínio de **Gerenciamento de Itens de Cardápio**.

### Matriz de Cumprimento dos Requisitos

| Requisito Acadêmico | Pontuação | Onde está implementado no código | Status |
| :--- | :---: | :--- | :---: |
| **Back-end: Estrutura em Array em Memória** | - | [`backend/src/services/menuService.js`](backend/src/services/menuService.js#L9) (`const menuItems = [...]`) | ✅ Atendido |
| **Back-end: Funções puras e reaproveitáveis (CRUD)** | 10 pts | [`createItem`](backend/src/services/menuService.js), [`getAllItems`](backend/src/services/menuService.js), [`updateItem`](backend/src/services/menuService.js), [`deleteItem`](backend/src/services/menuService.js) | ✅ Atendido |
| **Front-end: Demonstração das 4 operações do CRUD** | 10 pts | Formulário de criação/edição, listagem reativa e exclusão com feedback visual imediato | ✅ Atendido |
| **Total** | **20 pts** | Aplicação completa, modular e documentada | **100%** |

---

## 🏛️ Arquitetura do Sistema (Clean Code & DRY)

O projeto adota o padrão **Monorepo** com separação estrita de responsabilidades (**Separation of Concerns - SoC**), onde a interface do usuário se preocupa apenas com renderização e a camada de dados é totalmente desacoplada:

```
OAT 1 API/
├── backend/                       # Back-end em Node.js com Express
│   ├── src/
│   │   ├── services/
│   │   │   └── menuService.js     # 🔹 SERVICE LAYER PURA: Funções reaproveitáveis de manipulação do Array
│   │   ├── controllers/
│   │   │   └── menuController.js  # 🔹 CONTROLLERS: Orquestração HTTP, Guard Clauses e Early Returns (404/400)
│   │   ├── middlewares/
│   │   │   └── validateItem.js    # 🔹 VALIDAÇÃO: Guard clauses para checagem rápida de dados de entrada
│   │   ├── routes/
│   │   │   └── menuRoutes.js      # 🔹 ROTAS: Mapeamento RESTful (GET, POST, PUT, DELETE)
│   │   └── server.js              # 🔹 SERVIDOR: Configuração do Express, CORS e inicialização na porta 3000
│   └── package.json
│
├── frontend/                      # Front-end reativo em React (Vite)
│   ├── src/
│   │   ├── services/
│   │   │   └── menuApiService.js  # 🔹 CAMADA DE DADOS: Isolamento de fetch e configuração de BASE_URL
│   │   ├── hooks/
│   │   │   └── useMenuItems.js    # 🔹 CUSTOM HOOK: Gerenciamento do ciclo de vida e estado reativo do CRUD
│   │   ├── components/
│   │   │   ├── Header.jsx         # Cabeçalho com status de conexão
│   │   │   ├── MenuItemForm.jsx   # Formulário desacoplado de criação e edição (Create / Update)
│   │   │   ├── MenuItemList.jsx   # Listagem com busca e filtros por categoria (Read)
│   │   │   ├── MenuItemCard.jsx   # Exibição individual e botões de ação (Update / Delete)
│   │   │   ├── Notification.jsx   # Toasts visuais de feedback (sucesso/erro)
│   │   │   └── ApiConfigModal.jsx # Modal para alternar a URL da API em tempo real
│   │   ├── styles/
│   │   │   └── index.css          # Design System refinado em tema claro (Playfair Display)
│   │   └── App.jsx
│   ├── vite.config.js             # Configurado com caminhos relativos (base: './') para o GitHub Pages
│   └── package.json
│
└── README.md                      # Documentação acadêmica e técnica do projeto
```

---

## 🛠️ Detalhamento Técnico das Operações do CRUD

### 1. Back-end (`menuService.js`)
As funções de manipulação do array são **isentas de acoplamento HTTP** (`req`, `res`), tornando-se **100% reaproveitáveis** em qualquer contexto:
- **`createItem(itemData)`**: Gera ID único universal via `crypto.randomUUID()`, sanitiza os campos e insere no array (`menuItems.push`).
- **`getAllItems(filters)`**: Consulta itens em memória com suporte a filtros dinâmicos por categoria ou busca textual (`Array.prototype.filter`).
- **`getItemById(id)`**: Localiza um item específico (`Array.prototype.find`).
- **`updateItem(id, itemData)`**: Localiza o índice (`findIndex`) e realiza merge imutável dos dados atualizados.
- **`deleteItem(id)`**: Remove o elemento através de `splice(index, 1)`.

> [!TIP]
> **Guard Clauses & Early Return**: Nos controladores de `PUT` e `DELETE`, o sistema valida se o ID existe antes de qualquer operação. Caso não exista, retorna imediatamente `404 Not Found`, eliminando aninhamentos desnecessários de `if/else`.

### 2. Front-end (`React + Vite`)
- **Create**: Formulário intuitivo para cadastrar novos pratos (nome, preço em R$, categoria, descrição e disponibilidade).
- **Read**: Listagem visual organizada em cartões com badges coloridos de categoria e status de disponibilidade, barra de pesquisa em tempo real e filtros rápidos.
- **Update**: Ao clicar no ícone de lápis de qualquer prato, o formulário entra em modo de edição com rolagem suave automática e preenchimento dos campos, permitindo salvar as alterações com `PUT`.
- **Delete**: Ao clicar na lixeira, uma confirmação de segurança é solicitada e o item é removido via `DELETE`, atualizando a lista na mesma hora com notificação toast de sucesso.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** (versão 18.x ou superior)
- **npm** instalado

### Passo 1: Inicializar a API Back-end
```bash
# Navegue até a pasta do backend
cd backend

# Instale as dependências (express, cors)
npm install

# Inicie o servidor em modo desenvolvimento
npm run dev
```
> O servidor iniciará em **`http://localhost:3000`**.  
> Teste direto no navegador: [`http://localhost:3000/api/menu`](http://localhost:3000/api/menu)

### Passo 2: Inicializar o Front-end
Abra um **segundo terminal**:
```bash
# Navegue até a pasta do frontend
cd frontend

# Instale as dependências (react, vite, lucide-react)
npm install

# Inicie o servidor Vite
npm run dev
```
> A aplicação abrirá em **`http://localhost:5173`**.

---

## 📡 Especificação dos Endpoints REST

| Operação | Método | Rota | Descrição | Status Code |
| :--- | :---: | :--- | :--- | :---: |
| **Read (Todos)** | `GET` | `/api/menu` | Retorna lista de pratos (suporta `?category=...&search=...`) | `200 OK` |
| **Read (Por ID)** | `GET` | `/api/menu/:id` | Retorna os detalhes de um prato específico | `200 OK` / `404 Not Found` |
| **Create** | `POST` | `/api/menu` | Cadastra um novo prato no cardápio | `201 Created` / `400 Bad Request` |
| **Update** | `PUT` | `/api/menu/:id` | Atualiza os dados de um prato existente | `200 OK` / `404 Not Found` |
| **Delete** | `DELETE` | `/api/menu/:id` | Remove um prato pelo ID | `200 OK` / `404 Not Found` |

### Exemplo de Payload JSON (POST / PUT)
```json
{
  "name": "Risoto de Cogumelos Trufados",
  "description": "Arroz arbóreo especial, mix de cogumelos frescos, manteiga noisette e azeite trufado.",
  "price": 58.00,
  "category": "Pratos Principais",
  "available": true
}
```

---

## 🌐 Guia de Publicação (Deploy)

- **Front-end no GitHub Pages**: O `vite.config.js` já está configurado com `base: './'`. Basta executar `npm run build` na pasta `frontend` e publicar a pasta `dist/`.
- **Back-end em Nuvem**: Pode ser hospedado gratuitamente no **Render**, **Railway** ou **Glitch**, definindo o comando de start como `npm start`.
- **Conexão Dinâmica**: Através do botão **API** no cabeçalho do front-end, é possível apontar para a URL da nuvem sem precisar alterar código-fonte!
