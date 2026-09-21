import * as menuService from "../services/menuService.js";

/**
 * Controller de Itens de Cardápio
 * Responsabilidade: Orquestrar requisições HTTP, delegar lógica ao service
 * e aplicar Guard Clauses com Early Return para status codes adequados.
 */

export function getAllItemsController(req, res) {
  const { category, search } = req.query;
  const items = menuService.getAllItems({ category, search });
  return res.status(200).json(items);
}

export function getItemByIdController(req, res) {
  const { id } = req.params;

  // Guard Clause: Verifica existência antes de prosseguir
  const item = menuService.getItemById(id);
  if (!item) {
    return res.status(404).json({ error: `Item com id '${id}' não foi encontrado.` });
  }

  return res.status(200).json(item);
}

export function createItemController(req, res) {
  const createdItem = menuService.createItem(req.body);
  return res.status(201).json(createdItem);
}

export function updateItemController(req, res) {
  const { id } = req.params;

  // Guard Clause: Valida se o ID existe antes de tentar atualizar
  const existingItem = menuService.getItemById(id);
  if (!existingItem) {
    return res.status(404).json({ error: `Impossível atualizar: item '${id}' não encontrado.` });
  }

  const updatedItem = menuService.updateItem(id, req.body);
  return res.status(200).json(updatedItem);
}

export function deleteItemController(req, res) {
  const { id } = req.params;

  // Guard Clause: Valida se o ID existe antes de tentar remover
  const existingItem = menuService.getItemById(id);
  if (!existingItem) {
    return res.status(404).json({ error: `Impossível excluir: item '${id}' não encontrado.` });
  }

  const deletedItem = menuService.deleteItem(id);
  return res.status(200).json({
    message: "Item excluído com sucesso do cardápio.",
    item: deletedItem
  });
}
