import React, { useState, useEffect } from "react";
import { Search, Utensils, AlertCircle, RotateCcw, Clock, Sparkles } from "lucide-react";
import { MenuItemCard } from "./MenuItemCard";

const CATEGORY_OPTIONS = ["Todas", "Lanches", "Pratos Principais", "Bebidas", "Sobremesas", "Entradas"];

/**
 * Componente: MenuItemList
 * Responsabilidade: Renderizar filtros, busca, estados de carregamento (com aviso de cold-start do Render),
 * tratamento de erros com retry e a grade de pratos.
 */
export function MenuItemList({
  items,
  loading,
  error,
  onRetry,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onEdit,
  onDelete
}) {
  const [loadingSeconds, setLoadingSeconds] = useState(0);

  // Contador de segundos durante o carregamento para feedback dinâmico
  useEffect(() => {
    let timer;
    if (loading) {
      setLoadingSeconds(0);
      timer = setInterval(() => {
        setLoadingSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [loading]);

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
          <span className="items-count-badge">
            {loading ? "..." : `${items.length} ${items.length === 1 ? "item" : "itens"}`}
          </span>
        </h2>
      </div>

      {/* Estado de Carregamento Inteligente (com aviso de Cold Start do Render) */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <h3 className="loading-title">
            {loadingSeconds > 6
              ? "Servidor em nuvem despertando..."
              : "Conectando ao cardápio..."}
          </h3>
          <p className="loading-subtitle">
            {loadingSeconds > 6
              ? `Aguardando resposta da API (${loadingSeconds}s)... Quase lá!`
              : "Buscando os itens atualizados no servidor."}
          </p>

          <div className="cold-start-notice">
            <div className="notice-header">
              <Clock size={16} className="notice-icon" />
              <strong>Nota sobre o Servidor em Nuvem (Render):</strong>
            </div>
            <p className="notice-body">
              Como esta API acadêmica está hospedada no plano gratuito do <strong>Render</strong>, se o servidor estiver em repouso por inatividade, o primeiro despertar pode levar cerca de <strong>30 a 50 segundos</strong>. Os pratos e funcionalidades surgirão automaticamente assim que a conexão for concluída!
            </p>
          </div>
        </div>
      ) : error ? (
        /* Estado de Erro com Botão de Reconexão */
        <div className="error-state">
          <AlertCircle size={44} className="error-icon" />
          <h3 className="error-title">Não foi possível carregar o cardápio</h3>
          <p className="error-description">
            O servidor demorou para responder ou ainda está inicializando na nuvem.
          </p>
          <button onClick={onRetry} className="btn btn-primary btn-retry">
            <RotateCcw size={16} />
            Tentar Conectar Novamente
          </button>
        </div>
      ) : items.length === 0 ? (
        /* Estado Vazio */
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
