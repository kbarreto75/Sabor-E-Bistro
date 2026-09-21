import React, { useState } from "react";
import { Header } from "./components/Header";
import { MenuItemForm } from "./components/MenuItemForm";
import { MenuItemList } from "./components/MenuItemList";
import { Notification } from "./components/Notification";
import { ApiConfigModal } from "./components/ApiConfigModal";
import { useMenuItems } from "./hooks/useMenuItems";

export function App() {
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // Todo o estado e lógica de integração vêm isolados do Custom Hook
  const {
    items,
    loading,
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
    dismissNotification
  } = useMenuItems();

  return (
    <div className="app-layout">
      {/* Toast Notification */}
      <Notification
        notification={notification}
        onDismiss={dismissNotification}
      />

      {/* Modal de Configuração de API */}
      <ApiConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onUrlUpdated={loadItems}
      />

      {/* Barra de Navegação Superior */}
      <Header onOpenSettings={() => setIsConfigOpen(true)} />

      {/* Conteúdo Principal */}
      <main className="main-content">
        <div className="content-container">
          {/* Formulário de Criação / Edição (CRUD: Create & Update) */}
          <MenuItemForm
            itemToEdit={itemToEdit}
            onSave={handleSaveItem}
            onCancel={handleCancelEdit}
          />

          {/* Listagem e Controles (CRUD: Read & Delete) */}
          <MenuItemList
            items={items}
            loading={loading}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onEdit={handleStartEdit}
            onDelete={handleDeleteItem}
          />
        </div>
      </main>

      {/* Rodapé Informativo */}
      <footer className="app-footer">
        <p>
          Sistema de Gestão de Cardápio • Desenvolvido com <strong>Node.js</strong> (Express, In-Memory Array) & <strong>React</strong> (Vite)
        </p>
      </footer>
    </div>
  );
}

export default App;
