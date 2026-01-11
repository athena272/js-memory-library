const DEFAULT_BASE_URL = "http://localhost:3000";

export function createApi({ baseUrl = DEFAULT_BASE_URL } = {})
{
    const axiosInstance = globalThis.axios?.create({
        baseURL: baseUrl,
        timeout: 5 * 1000,
        headers: { "Content-Type": "application/json" },
    });

    if (!axiosInstance)
    {
        throw new Error("Axios não foi carregado. Verifique se o script CDN vem antes do main.js.");
    }

    // Axios separa erro de rede x erro HTTP
    function normalizeError(error)
    {
        if (error.response)
        {
            const { status, statusText, data } = error.response;
            const msg =
                typeof data === "string"
                    ? data
                    : data?.message
                        ? data.message
                        : JSON.stringify(data ?? {});
            return new Error(`HTTP ${status} ${statusText} ${msg}`.trim());
        }

        if (error.request)
        {
            return new Error("Erro de rede: sem resposta do servidor.");
        }

        return error instanceof Error ? error : new Error(String(error));
    }

    function normalizeDate(date)
    {
        if (!date) throw new Error("Data é obrigatória");

        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) throw new Error("Data inválida");

        return parsedDate.toISOString();
    }

    return {
        async index()
        {
            try
            {
                const { data } = await axiosInstance.get('/thoughts');
                return data;
            } catch (error)
            {
                throw normalizeError(error);
            }
        },
        async show(id)
        {
            try
            {
                const { data } = await axiosInstance.get(`/thoughts/${id}`);
                return data;
            } catch (error)
            {
                throw normalizeError(error);
            }
        },
        async store({ content, author, date })
        {
            try
            {
                const { data } = await axiosInstance.post('/thoughts', {
                    content,
                    author,
                    date: normalizeDate(date),
                    favorite: false,
                });
                return data;
            } catch (error)
            {
                throw normalizeError(error);
            }
        },
        async update({ id, content, author, date })
        {
            try
            {
                const { data } = await axiosInstance.put(`/thoughts/${id}`, {
                    id,
                    content,
                    author,
                    date: normalizeDate(date),
                });
                return data;
            } catch (error)
            {
                throw normalizeError(error);
            }
        },
        async delete(id)
        {
            try
            {
                await axiosInstance.delete(`/thoughts/${id}`);
                return null;
            } catch (error)
            {
                throw normalizeError(error);
            }
        },
        async toggleFavorite({ id, favorite })
        {
            try
            {
                const { data } = axiosInstance.patch(`/thoughts/${id}`, {
                    favorite
                });
                return data;
            } catch (error)
            {
                throw normalizeError(error);
            }
        },
        async search(t)
        {
            const thoughts = await this.index();
            const term = t.toLowerCase();

            return thoughts.filter(thought => thought.content.toLowerCase().includes(term) || thought.author.toLowerCase().includes(term));
        }
    };
}