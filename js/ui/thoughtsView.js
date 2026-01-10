export function createThoughtsView({ listEl, onEdit, onDelete, assetsBase = './assets/images' } = {})
{
    if (!listEl) throw new Error("listEl é obrigatório");

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

        icons.append(btnEdit, btnDelete);
        li.append(icon, content, author, icons);

        return li;
    }

    function render(thoughts = [])
    {
        listEl.innerHTML = "";
        thoughts.forEach(thought => listEl.appendChild(renderItem(thought)));
    }

    return { render };
}