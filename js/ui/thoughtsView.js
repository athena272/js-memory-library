export function createThoughtsView({ listEl, onEdit, onDelete, onFavorite, assetsBase = './assets/images' } = {})
{
    if (!listEl) throw new Error("listEl é obrigatório");
    const emptyMessageEl = document.getElementById("mensagem-vazia");

    // Event delegation: 1 listener no UL
    listEl.addEventListener('click', (event) =>
    {
        const button = event.target.closest('button[data-action]');
        if (!button) return;

        const li = event.target.closest('li[data-id]');
        if (!li) return;

        const id = li.dataset.id;
        const action = button.dataset.action;

        if (action === 'edit') onEdit?.(id);
        if (action === 'delete') onDelete?.(id);
        if (action === 'favorite') onFavorite?.(id);
    });

    function renderItem(thought)
    {
        const li = document.createElement('li');
        li.className = 'li-pensamento';
        li.dataset.id = thought.id;

        const icon = document.createElement('img');
        icon.src = `${assetsBase}/aspas-azuis.png`;
        icon.alt = 'Aspas Azuis';
        icon.classList.add('icone-aspas');

        const content = document.createElement('div');
        content.textContent = thought.content;
        content.className = 'pensamento-conteudo';

        const author = document.createElement("div");
        author.textContent = thought.author;
        author.className = "pensamento-autoria";

        const icons = document.createElement("div");
        icons.className = "icones";

        const btnEdit = document.createElement("button");
        btnEdit.className = "botao-editar";
        btnEdit.type = "button";
        btnEdit.dataset.action = "edit";
        btnEdit.innerHTML = `<img src="${assetsBase}/icone-editar.png" alt="Editar" />`;

        const btnDelete = document.createElement("button");
        btnDelete.className = "botao-excluir";
        btnDelete.type = "button";
        btnDelete.dataset.action = "delete";
        btnDelete.innerHTML = `<img src="${assetsBase}/icone-excluir.png" alt="Excluir" />`;

        const btnFavorite = document.createElement('button');
        btnFavorite.className = "botao-favorito";
        btnFavorite.dataset.action = 'favorite';
        btnFavorite.innerHTML = `<img src="${assetsBase}/${thought.favorite ? 'icone-favorito.png' : 'icone-favorito_outline.png'}" alt="Favoritar" />`;

        const date = document.createElement('div');
        date.className = "pensamento-data";
        if (thought.date)
        {
            const dateObj = new Date(thought.date);
            if (!isNaN(dateObj.getTime()))
            {
                const formattedDate = dateObj.toLocaleDateString('pt-BR', {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                });
                date.textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
            }
            else 
            {
                date.textContent = 'Data inválida';
            }
        }
        else
        {
            date.textContent = 'Sem data';
        }

        icons.append(btnFavorite, btnEdit, btnDelete);
        li.append(icon, content, author, date, icons);

        return li;
    }

    function render(thoughts = [])
    {
        listEl.innerHTML = "";
        if (emptyMessageEl)
        {
            emptyMessageEl.style.display = thoughts.length === 0 ? 'block' : 'none';
        }

        thoughts.forEach(thought => listEl.appendChild(renderItem(thought)));
    }

    return { render };
}