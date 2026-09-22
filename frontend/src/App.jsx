import React from "react";
import { Header } from "./components/Header";
import { MenuItemForm } from "./components/MenuItemForm";
import { MenuItemList } from "./components/MenuItemList";
import { Notification } from "./components/Notification";
import { useMenuItems } from "./hooks/useMenuItems";

export function App() {
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

      {/* Barra de Navegação Superior */}
      <Header />

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
