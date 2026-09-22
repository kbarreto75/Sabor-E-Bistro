/**
 * Camada de Serviço de API (Data Layer - Frontend)
 * Responsabilidade: Isolar completamente as requisições HTTP (fetch) da camada de renderização.
 * Conectado de forma segura e direta à API oficial no Render.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://sabor-e-bistro.onrender.com/api";

export function getApiBaseUrl() {
  return API_BASE_URL;
}

/**
 * Função utilitária interna para requisições seguras com tratamento de erro
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };

  try {
    const response = await fetch(url, { ...options, headers });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = data?.error || `Erro na requisição (HTTP ${response.status})`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("Failed to fetch")) {
      throw new Error(`Não foi possível conectar ao servidor backend em "${API_BASE_URL}". Certifique-se de que a API está rodando.`);
    }
    throw error;
  }
}

/**
 * Obtém todos os itens de cardápio com suporte a busca e categoria
 */
export async function getMenuItems(filters = {}) {
  const params = new URLSearchParams();
  if (filters.category) params.append("category", filters.category);
  if (filters.search) params.append("search", filters.search);

  const query = params.toString() ? `?${params.toString()}` : "";
  return request(`/menu${query}`, { method: "GET" });
}

/**
 * Busca um item específico por ID
 */
export async function getMenuItemById(id) {
  return request(`/menu/${id}`, { method: "GET" });
}

/**
 * Cadastra um novo item de cardápio
 */
export async function createMenuItem(itemData) {
  return request("/menu", {
    method: "POST",
    body: JSON.stringify(itemData)
  });
}

/**
 * Atualiza um item existente por ID
 */
export async function updateMenuItem(id, itemData) {
  return request(`/menu/${id}`, {
    method: "PUT",
    body: JSON.stringify(itemData)
  });
}

/**
 * Exclui um item por ID
 */
export async function deleteMenuItem(id) {
  return request(`/menu/${id}`, {
    method: "DELETE"
  });
}
