import React from "react";
import { Search, Utensils, AlertCircle } from "lucide-react";
import { MenuItemCard } from "./MenuItemCard";

const CATEGORY_OPTIONS = ["Todas", "Lanches", "Pratos Principais", "Bebidas", "Sobremesas", "Entradas"];

/**
 * Componente: MenuItemList
 * Responsabilidade: Renderizar a barra de pesquisa, filtros de categoria,
 * contagem de itens e a grade de cards do cardápio.
 */
export function MenuItemList({
  items,
  loading,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onEdit,
  onDelete
}) {
  return (
    <section className="menu-list-section">
      {/* Barra de Filtros e Busca */}
      <div className="list-controls">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por nome ou ingredientes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="search-clear-btn"
              title="Limpar busca"
            >
              ✕
            </button>
          )}
        </div>

        {/* Pílulas de Categoria */}
        <div className="category-pills">
          {CATEGORY_OPTIONS.map((category) => (
            <button
              key={category}
              className={`pill-btn ${selectedCategory === category ? "pill-active" : ""}`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Cabeçalho da Lista */}
      <div className="list-header">
        <h2 className="list-title">
          Pratos no Cardápio
          <span className="items-count-badge">{items.length} {items.length === 1 ? "item" : "itens"}</span>
        </h2>
      </div>

      {/* Estados de Carregamento e Vazio */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Carregando itens do cardápio...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <Utensils size={48} className="empty-icon" />
          <h3 className="empty-title">Nenhum item encontrado</h3>
          <p className="empty-description">
            {searchQuery || selectedCategory !== "Todas"
              ? "Tente ajustar os filtros ou termos da busca para encontrar o prato desejado."
              : "Seu cardápio ainda está vazio. Utilize o formulário acima para cadastrar o primeiro item!"}
          </p>
        </div>
      ) : (
        /* Grade de Itens */
        <div className="cards-grid">
          {items.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
