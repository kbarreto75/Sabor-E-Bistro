/**
 * Camada de Serviço de API (Data Layer - Frontend)
 * Responsabilidade: Isolar completamente as requisições HTTP (fetch) da camada de renderização.
 * Permite alternar facilmente a BASE_URL entre desenvolvimento local e produção.
 */

const DEFAULT_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Permite obter ou sobrescrever em tempo de execução (útil para testes ou no GitHub Pages)
export function getApiBaseUrl() {
  return localStorage.getItem("MENU_API_URL") || DEFAULT_API_URL;
}

export function setApiBaseUrl(url) {
  if (!url) {
    localStorage.removeItem("MENU_API_URL");
  } else {
    localStorage.setItem("MENU_API_URL", url.trim().replace(/\/$/, ""));
  }
}

/**
 * Função utilitária interna para requisições seguras com tratamento de erro
 */
async function request(endpoint, options = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;

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
      throw new Error(`Não foi possível conectar ao servidor backend em "${baseUrl}". Certifique-se de que a API está rodando.`);
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
