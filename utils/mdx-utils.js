import { api } from '../services/api';

export const getPosts = async () => {
    const { data } = await api.get('/posts'); 

    if (data) {
        return data;
    }

    return [];
};

export const getPostBySlug = async (id) => {
    try {
        // Busca um post específico pelo ID
        const { data } = await api.get(`/posts?id=eq.${id}`);
        
        // Garante que os dados existem e retorna o primeiro item (assumindo que `id` é único)
        if (data && data.length > 0) {
            const post = data[0];
            return {
                title: post.title,
                description: post.description,
                body: post.body,
                date: post.date,
                author: post.author,
                categories: post.categories || [],
                tags: post.tags || [],
            };
        }

        // Retorna vazio se post não foi encontrado
        return {};
    } catch (error) {
        console.error("Erro ao buscar o post:", error);
        return {};
    }
};
