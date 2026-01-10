![Thumbnail](./thumb.png)

# Memoteca (js-memory-library)

Aplicação para organizar frases/pensamentos com **CRUD completo** (criar, listar, editar e excluir), usando um **backend fake com JSON Server**.

> **Modelo de dados atual**
>
> - **thoughts**
>   - `id` (string)
>   - `content` (string)
>   - `author` (string)

---

## 🔨 Funcionalidades

- **Cadastro de pensamentos** (content + author)
- **Listagem de pensamentos** (mural)
- **Edição** de pensamentos existentes
- **Exclusão** de pensamentos com confirmação
- **Arquitetura modular** no frontend (API service, view e controller)

---

## 🧱 Estrutura do projeto

```text
js-memory-library/
  backend/
    db.json
  css/
    styles.css
  js/
    main.js
    services/
      api.js
    ui/
      formController.js
      thoughtsView.js
  assets/
    images/
      ...
  index.html
  thumb.png
  README.md
```

---

## ✔️ Técnicas e tecnologias

- **JavaScript (ES Modules)**: organização do código em módulos
- **Fetch API**: requisições HTTP para o backend fake
- **JSON Server**: simula uma API REST com persistência em `db.json`
- **CSS**: estilos do layout

> Observação: o `index.html` carrega o **Axios via CDN**, mas o projeto atualmente usa **Fetch** no service `api.js`.  
> Se quiser, você pode remover o script do Axios para enxugar dependências.

---

## 🛠️ Como rodar o projeto localmente

### 1) Requisitos
- **Node.js** (recomendado: 18+)
- **JSON Server**

### 2) Subir o backend (JSON Server)

Você pode instalar o JSON Server globalmente:

```bash
npm install -g json-server
```

Depois, dentro da pasta `backend`, execute:

```bash
json-server --watch db.json --port 3000
```

A API ficará disponível em:

- http://localhost:3000

E o recurso principal em:

- http://localhost:3000/thoughts

### 3) Subir o frontend

Abra o projeto no VS Code e use a extensão **Live Server** para abrir o `index.html`.

---

## 🔌 Endpoints usados pelo app

Base URL (local): `http://localhost:3000`

- `GET /thoughts` → lista pensamentos
- `GET /thoughts/:id` → detalhe
- `POST /thoughts` → cria
- `PUT /thoughts/:id` → atualiza
- `DELETE /thoughts/:id` → remove

---

## 🌐 Sobre GitHub Pages

O GitHub Pages **não** executa o JSON Server (é hosting estático).  
Então, para ter CRUD funcionando em produção você precisa de uma API real (Render, Railway, Fly.io, etc).

No seu `js/services/api.js` existe um `DEFAULT_BASE_URL` que tenta apontar para um arquivo `db.json` no GitHub Pages.  
⚠️ Isso é **somente leitura** (não dá para fazer `POST/PUT/DELETE` num arquivo estático). Para produção, substitua o `baseUrl` por uma API hospedada.

---

## 📁 Link do Figma

Você pode acessar o Figma do projeto aqui:
https://www.figma.com/design/Sz1gmmemxqcB3amInL4Ndp/Rebrand-Memoteca-%7C-Curso-CRUD?node-id=148-26&t=FpdmfbiM1i1s6REQ-0
