import { createApi } from "./services/api.js";
import { createThoughtsView } from "./ui/thoughtsView.js";
import { createFormController } from "./ui/formController.js";

document.addEventListener("DOMContentLoaded", () =>
{
    const api = createApi({ baseUrl: 'http://localhost:3000' });

    const listEl = document.getElementById("lista-pensamentos");
    const formEl = document.getElementById("pensamento-form");
    const cancelBtnEl = document.getElementById("botao-cancelar");
    const searchInput = document.getElementById('campo-busca');

    const thoughtsKeySet = new Set();
    function buildKey({ content, author })
    {
        return `${content.trim().toLowerCase()}-${author.trim().toLowerCase()}`;
    }

    const view = createThoughtsView({
        listEl,
        onEdit: handleEdit,
        onDelete: handleDelete,
        onFavorite: handleFavorite,
        assetsBase: "./assets/images",
    });

    const form = createFormController({
        formEl,
        cancelBtnEl,
        onSubmit: handleSubmit,
    });

    searchInput.addEventListener('input', async (event) =>
    {
        const term = event.target.value;
        const results = term ? await api.search(term) : await api.index();
        view.render(results);
    });

    async function refresh()
    {
        try
        {
            const thoughts = await api.index();
            thoughtsKeySet.clear();

            thoughts.forEach(thought =>
            {
                thoughtsKeySet.add(buildKey(thought));
            });

            view.render(thoughts);
        } catch (error)
        {
            console.log("🚀 ~ refresh ~ error:", error);
            alert("Erro ao carregar pensamentos.");
        }
    }

    async function handleSubmit(values, { setCreateMode })
    {
        try
        {
            const { id, content, author, date } = values;

            if (!content || !author)
            {
                alert("Preencha pensamento e autoria.");
                return;
            }

            const key = buildKey({ content, author });

            if (!id && thoughtsKeySet.has(key))
            {
                alert("Esse pensamento já existe");
                return;
            }

            if (id)
            {
                await api.update({ id, content, author, date });
            } else
            {
                await api.store({ content, author, date });
            }

            setCreateMode();
            await refresh();
        } catch (error)
        {
            console.log("🚀 ~ handleSubmit ~ error:", error);
            alert("Erro ao salvar pensamento.");
        }
    }

    async function handleEdit(id)
    {
        try
        {
            const thought = await api.show(id);
            form.setEditMode(thought);
        } catch (error)
        {
            console.log("🚀 ~ handleEdit ~ error:", error);
            alert("Erro ao carregar pensamento para edição.");
        }
    }

    async function handleDelete(id)
    {
        const ok = confirm("Tem certeza que deseja excluir?");
        if (!ok) return;

        try
        {
            await api.delete(id);
            await refresh();
        } catch (error)
        {
            console.log("🚀 ~ handleDelete ~ error:", error);
            alert("Erro ao excluir pensamento.");
        }
    }

    async function handleFavorite(id)
    {
        try
        {
            const thought = await api.show(id);
            await api.toggleFavorite({ id, favorite: !thought.favorite });
            await refresh();
        } catch (error)
        {
            console.log("🚀 ~ handleFavorite ~ error:", error);
            alert("Erro ao favoritar pensamento.");
        }
    }

    // inicialização
    form.setCreateMode();
    refresh();
});
