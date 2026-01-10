const DEFAULT_BASE_URL = "http://localhost:3000";

export function createApi({ baseUrl = DEFAULT_BASE_URL } = {})
{
    async function request(path, { method = 'GET', body } = {})
    {
        try
        {
            const response = await fetch(`${baseUrl}${path}`, {
                method,
                headers: body ? { "Content-Type": "application/json" } : undefined,
                body: body ? JSON.stringify(body) : undefined,
            });

            // json-server retorna 204 no delete; não tente json() nesse caso
            if (response.status === 204) return null;

            if (!response.ok)
            {
                const text = await response.text().catch(() => "");
                throw new Error(`HTTP ${response.status} ${response.statusText} ${text}`.trim());
            }

            return await response.json();
        } catch (error)
        {
            console.log("🚀 ~ request ~ error:", error);
            throw error;
        }
    }

    return {
        index()
        {
            return request('/thoughts');
        },
        show(id)
        {
            return request(`/thoughts/${id}`);
        },
        store({ content, author })
        {
            return request('/thoughts', { method: 'POST', body: { content, author } });
        },
        update({ id, content, author })
        {
            return request(`/thoughts/${id}`, { method: 'PUT', body: { id, content, author } });
        },
        delete(id)
        {
            return request(`/thoughts/${id}`, { method: 'DELETE' });
        }
    };
}