import { randomUUID } from "node:crypto";

/**
 * Camada de Serviço (Service Layer)
 * Responsabilidade única: Manipular a estrutura de dados em memória (Array).
 * Isenta de qualquer contexto HTTP (req, res, status codes).
 */

// Array em memória para armazenamento dos itens do cardápio
const menuItems = [
  {
    id: "101",
    name: "Hambúrguer Artesanal Smash",
    description: "Pão brioche tostado, duplo blend 90g, queijo cheddar derretido e maionese defumada da casa.",
    price: 34.90,
    category: "Lanches",
    available: true
  },
  {
    id: "102",
    name: "Pizza Napolitana Individual",
    description: "Massa de fermentação natural de 48h, molho de tomate pelado, mussarela de búfala e manjericão fresco.",
    price: 42.00,
    category: "Pratos Principais",
    available: true
  },
  {
    id: "103",
    name: "Suco Natural de Laranja com Morango",
    description: "500ml de suco integral de laranja fresca batido com morangos selecionados, sem açúcar adicionado.",
    price: 14.50,
    category: "Bebidas",
    available: true
  },
  {
    id: "104",
    name: "Petit Gâteau com Sorvete",
    description: "Bolinho quente de chocolate belga com recheio cremoso e bola de sorvete artesanal de baunilha.",
    price: 22.00,
    category: "Sobremesas",
    available: false
  }
];

/**
 * Retorna todos os itens do cardápio, com suporte a filtros opcionais.
 * @param {Object} [filters]
 * @param {string} [filters.category]
 * @param {string} [filters.search]
 * @returns {Array}
 */
export function getAllItems(filters = {}) {
  const { category, search } = filters;

  return menuItems.filter((item) => {
    const matchesCategory = category ? item.category.toLowerCase() === category.toLowerCase() : true;
    const matchesSearch = search
      ? item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });
}

/**
 * Busca um item pelo identificador único.
 * @param {string} id
 * @returns {Object|null}
 */
export function getItemById(id) {
  const item = menuItems.find((currentItem) => currentItem.id === id);
  return item ? { ...item } : null;
}

/**
 * Cadastra um novo item no cardápio.
 * @param {Object} itemData
 * @returns {Object} Novo item criado
 */
export function createItem(itemData) {
  const newItem = {
    id: randomUUID(),
    name: itemData.name.trim(),
    description: itemData.description ? itemData.description.trim() : "",
    price: Number(itemData.price),
    category: itemData.category.trim(),
    available: itemData.available !== undefined ? Boolean(itemData.available) : true
  };

  menuItems.push(newItem);
  return { ...newItem };
}

/**
 * Atualiza um item existente no array.
 * @param {string} id
 * @param {Object} itemData
 * @returns {Object|null} Item atualizado ou null se não encontrado
 */
export function updateItem(id, itemData) {
  const index = menuItems.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const currentItem = menuItems[index];
  const updatedItem = {
    ...currentItem,
    name: itemData.name !== undefined ? itemData.name.trim() : currentItem.name,
    description: itemData.description !== undefined ? itemData.description.trim() : currentItem.description,
    price: itemData.price !== undefined ? Number(itemData.price) : currentItem.price,
    category: itemData.category !== undefined ? itemData.category.trim() : currentItem.category,
    available: itemData.available !== undefined ? Boolean(itemData.available) : currentItem.available
  };

  menuItems[index] = updatedItem;
  return { ...updatedItem };
}

/**
 * Remove um item do cardápio pelo ID.
 * @param {string} id
 * @returns {Object|null} Item removido ou null se não encontrado
 */
export function deleteItem(id) {
  const index = menuItems.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const [deletedItem] = menuItems.splice(index, 1);
  return deletedItem;
}
