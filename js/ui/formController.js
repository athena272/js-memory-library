export function createFormController({ formEl, cancelBtnEl, onSubmit, onCancel } = {})
{
    if (!formEl) throw new Error("formEl é obrigatório");

    const idEl = formEl.querySelector("#pensamento-id");
    const contentEl = formEl.querySelector("#pensamento-conteudo");
    const authorEl = formEl.querySelector("#pensamento-autoria");
    const submitBtnEl = formEl.querySelector("#botao-salvar");
    const dateEl = formEl.querySelector("#pensamento-data");

    const regexContent = /^[A-Za-zÀ-ÿ\s]{10,}$/;
    const regexAuthor = /^[A-Za-zÀ-ÿ]{3,15}$/;

    function isValidDate(date)
    {
        return new Date(date) <= new Date();
    }

    function getValues()
    {
        return {
            id: idEl.value.trim(),
            content: contentEl.value.trim(),
            author: authorEl.value.trim(),
            date: dateEl.value.trim()
        };
    }

    function setEditMode(thought)
    {
        idEl.value = thought.id ?? "";
        contentEl.value = thought.content ?? "";
        authorEl.value = thought.author ?? "";
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
        const { content, author, date } = getValues();
        console.log("🚀 ~ createFormController ~ date:", date);
        
        if (!regexContent.test(content))
        {
            alert("Conteúdo inválido (mín. 10 letras)");
            return;
        }
        if (!regexAuthor.test(author))
        {
            alert("Autoria inválida (3-15 letras, sem espaços)");
            return;
        }
        if (!isValidDate(date))
        {
            alert("Não é permitido data futura");
            return;
        }

        await onSubmit?.(getValues(), { setCreateMode });
    });

    cancelBtnEl?.addEventListener("click", () =>
    {
        setCreateMode();
        onCancel?.();
    });

    return { setEditMode, setCreateMode };
}