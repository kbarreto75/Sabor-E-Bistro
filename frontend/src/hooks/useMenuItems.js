import { useState, useEffect, useCallback } from "react";
import * as menuApi from "../services/menuApiService";

/**
 * Custom Hook: useMenuItems
 * Responsabilidade: Gerenciamento do estado reativo do CRUD e conexão com a API.
 * Isola a lógica de negócio dos componentes puramente visuais.
 */
export function useMenuItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [notification, setNotification] = useState(null);

  // Filtros
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  /**
   * Carrega os itens do cardápio a partir da API
   */
  const loadItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const filters = {};
      if (selectedCategory && selectedCategory !== "Todas") {
        filters.category = selectedCategory;
      }
      if (searchQuery.trim()) {
        filters.search = searchQuery.trim();
      }

      const data = await menuApi.getMenuItems(filters);
      setItems(data);
    } catch (err) {
      setError(err.message);
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  // Carrega ao montar ou ao alterar os filtros
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  /**
   * Salva um item (cria ou atualiza dependendo se há itemToEdit)
   */
  const handleSaveItem = async (formData) => {
    try {
      if (itemToEdit) {
        // Atualização (PUT)
        const updated = await menuApi.updateMenuItem(itemToEdit.id, formData);
        setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
        setItemToEdit(null);
        showNotification(`"${updated.name}" atualizado com sucesso!`);
      } else {
        // Criação (POST)
        const created = await menuApi.createMenuItem(formData);
        setItems((prev) => [created, ...prev]);
        showNotification(`"${created.name}" adicionado ao cardápio com sucesso!`);
      }
      return true;
    } catch (err) {
      showNotification(err.message, "error");
      return false;
    }
  };

  /**
   * Prepara o item para edição
   */
  const handleStartEdit = (item) => {
    setItemToEdit(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * Cancela a edição atual
   */
  const handleCancelEdit = () => {
    setItemToEdit(null);
  };

  /**
   * Exclui um item por ID com confirmação
   */
  const handleDeleteItem = async (id, name) => {
    const confirmed = window.confirm(`Tem certeza que deseja remover "${name}" do cardápio?`);
    if (!confirmed) return;

    try {
      await menuApi.deleteMenuItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      showNotification(`Item "${name}" removido com sucesso.`);

      // Se o item excluído estava sendo editado, limpa o formulário
      if (itemToEdit && itemToEdit.id === id) {
        setItemToEdit(null);
      }
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  return {
    items,
    loading,
    error,
    itemToEdit,
    notification,
    selectedCategory,
    searchQuery,
    setSelectedCategory,
    setSearchQuery,
    loadItems,
    handleSaveItem,
    handleStartEdit,
    handleCancelEdit,
    handleDeleteItem,
    dismissNotification: () => setNotification(null)
  };
}
