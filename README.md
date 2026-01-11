# 🧠 JS Memory Library

Aplicação **CRUD de pensamentos** desenvolvida em JavaScript puro, com foco em **arquitetura modular**, **boas práticas de Front-end** e evolução incremental usando **ES6+**.

O projeto permite cadastrar, editar, excluir, favoritar e buscar pensamentos (frases, ideias, citações), além de trabalhar com **datas**, **validações** e **estado visual da aplicação**.

---

## ✨ Funcionalidades

- ➕ Criar pensamentos (conteúdo, autoria e data)
- ✏️ Editar pensamentos existentes
- 🗑️ Remover pensamentos
- ⭐ Favoritar / desfavoritar pensamentos
- 🔍 Buscar por conteúdo ou autoria
- 📅 Exibição de data formatada (pt-BR)
- 🧠 Prevenção de pensamentos duplicados
- ⚠️ Validações com Regex
- 🪶 Tratamento de dados legados (pensamentos sem data)
- 🖼️ Estado visual para lista vazia

---

## 🧱 Arquitetura do Projeto

O projeto segue o princípio de **separação de responsabilidades**, inspirado em MVC (sem framework).

### 📂 Estrutura de pastas

```text
js-memory-library/
├── assets/
│   └── images/          # Imagens do projeto
├── backend/
│   └── db.json          # Banco de dados (json-server)
├── css/
│   └── styles.css       # Estilos globais
├── js/
│   ├── main.js          # Orquestração da aplicação
│   ├── services/
│   │   └── api.js       # Comunicação com a API
│   └── ui/
│       ├── formController.js  # Controle do formulário
│       └── thoughtsView.js    # Renderização da lista
├── index.html
└── README.md
```

---

## 🔄 Fluxo da aplicação

1. **index.html**
   - Estrutura da página
   - Importa o JavaScript principal

2. **main.js**
   - Inicializa a aplicação
   - Conecta View, Form e API
   - Controla fluxo e regras de negócio

3. **formController.js**
   - Coleta dados do formulário
   - Executa validações (regex, data futura)
   - Controla modos de criação e edição

4. **thoughtsView.js**
   - Renderiza os pensamentos
   - Formata datas
   - Controla estado visual (lista vazia)
   - Usa *event delegation* para ações

5. **api.js**
   - Comunicação HTTP com backend
   - CRUD completo
   - Normalização e validação defensiva

---

## 🧪 Validações aplicadas

- **Conteúdo**
  - Apenas letras e espaços
  - Mínimo de 10 caracteres

- **Autoria**
  - Apenas letras
  - Entre 3 e 15 caracteres

- **Data**
  - Não permite datas futuras
  - Tratamento para dados antigos sem data

---

## 🚀 Como executar o projeto

### 1️⃣ Instalar o backend (json-server)

```bash
npm install -g json-server
```

### 2️⃣ Subir o servidor

```bash
json-server --watch backend/db.json --port 3000
```

### 3️⃣ Executar o Front-end

Use uma extensão como **Live Server** ou sirva os arquivos via servidor local:

```bash
npx serve .
```

Acesse:
```
http://localhost:5500
```

---

## 🛠️ Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Axios
- json-server

---

## 📚 Contexto educacional

Projeto desenvolvido durante estudos na **Alura**, com foco em:
- Evolução de código legado
- Arquitetura Front-end
- Boas práticas de JavaScript moderno
- Preparação para frameworks (React / Vue)

---

## 📄 Licença

Projeto fictício, sem fins comerciais, para fins educacionais.
