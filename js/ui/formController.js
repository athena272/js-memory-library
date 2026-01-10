export function createFormController({ formEl, cancelBtnEl, onSubmit, onCancel } = {})
{
    if (!formEl) throw new Error("formEl é obrigatório");

    const idEl = formEl.querySelector("#pensamento-id");
    const contentEl = formEl.querySelector("#pensamento-conteudo");
    const authorEl = formEl.querySelector("#pensamento-autoria");
    const submitBtnEl = formEl.querySelector("#botao-salvar");

    function getValues()
    {
        return {
            id: idEl.value.trim(),
            content: contentEl.value.trim(),
            author: authorEl.value.trim(),
        };
    }

    function setEditMode(though)
    {
        idEl.value = though.id ?? "";
        contentEl.value = though.content ?? "";
        authorEl.value = though.author ?? "";
        if (submitBtnEl) submitBtnEl.textContent = "Salvar";
        contentEl.focus();
    }

    function setCreateMode()
    {
        idEl.value = "";
        formEl.reset();
        if (submitBtnEl) submitBtnEl.textContent = "Adicionar";
        contentEl.focus();
    }

    formEl.addEventListener("submit", async (event) =>
    {
        event.preventDefault();
        await onSubmit?.(getValues(), { setCreateMode });
    });

    cancelBtnEl?.addEventListener("click", () =>
    {
        setCreateMode();
        onCancel?.();
    });

    return { setEditMode, setCreateMode };
}