import { createApi } from "./services/api.js";
import { createThoughtsView } from "./ui/thoughtsView.js";
import { createFormController } from "./ui/formController.js";

document.addEventListener("DOMContentLoaded", () =>
{
    const api = createApi({ baseUrl: "http://localhost:3000" });

    const listEl = document.getElementById("lista-pensamentos");
    const formEl = document.getElementById("pensamento-form");
    const cancelBtnEl = document.getElementById("botao-cancelar");

    const view = createThoughtsView({
        listEl,
        onEdit: handleEdit,
        onDelete: handleDelete,
        assetsBase: "./assets/images",
    });

    const form = createFormController({
        formEl,
        cancelBtnEl,
        onSubmit: handleSubmit,
    });

    async function refresh()
    {
        try
        {
            const thoughts = await api.index();
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
            console.log("🚀 ~ handleSubmit ~ values:", values);
            const { id, content, author } = values;

            if (!content || !author)
            {
                alert("Preencha pensamento e autoria.");
                return;
            }

            if (id)
            {
                await api.update({ id, content, author });
            } else
            {
                await api.store({ content, author });
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

    // inicialização
    form.setCreateMode();
    refresh();
});
