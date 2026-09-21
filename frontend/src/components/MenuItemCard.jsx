import React from "react";
import { Edit3, Trash2, CheckCircle, XCircle, Tag } from "lucide-react";

/**
 * Componente: MenuItemCard
 * Responsabilidade: Exibir as informações visuais de um único item do cardápio
 * e disparar os eventos de ação (editar/excluir).
 */
export function MenuItemCard({ item, onEdit, onDelete }) {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(item.price);

  return (
    <article className={`menu-card ${!item.available ? "card-unavailable" : ""}`}>
      <div className="card-top">
        <span className="category-badge">
          <Tag size={12} />
          {item.category}
        </span>
        <span className={`status-badge ${item.available ? "status-available" : "status-out"}`}>
          {item.available ? (
            <>
              <CheckCircle size={12} />
              Disponível
            </>
          ) : (
            <>
              <XCircle size={12} />
              Esgotado
            </>
          )}
        </span>
      </div>

      <div className="card-body">
        <h3 className="card-title">{item.name}</h3>
        <p className="card-description">
          {item.description || <em>Sem descrição cadastrada.</em>}
        </p>
      </div>

      <div className="card-footer">
        <div className="card-price-wrapper">
          <span className="price-label">Preço</span>
          <span className="price-value">{formattedPrice}</span>
        </div>

        <div className="card-actions">
          <button
            onClick={() => onEdit(item)}
            className="action-btn edit-btn"
            title="Editar este item"
            aria-label={`Editar ${item.name}`}
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(item.id, item.name)}
            className="action-btn delete-btn"
            title="Remover do cardápio"
            aria-label={`Excluir ${item.name}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
