import React, { useState, useEffect } from "react";
import { PlusCircle, Save, XCircle, Sparkles } from "lucide-react";

const CATEGORIES = ["Lanches", "Pratos Principais", "Bebidas", "Sobremesas", "Entradas"];

const INITIAL_FORM_STATE = {
  name: "",
  description: "",
  price: "",
  category: "Lanches",
  available: true
};

/**
 * Componente: MenuItemForm
 * Responsabilidade: Coletar e validar dados do usuário para criação/edição.
 * Não realiza requisições HTTP; apenas despacha o evento onSave.
 */
export function MenuItemForm({ itemToEdit, onSave, onCancel }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [submitting, setSubmitting] = useState(false);

  // Sincroniza o formulário com o item selecionado para edição
  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        name: itemToEdit.name || "",
        description: itemToEdit.description || "",
        price: itemToEdit.price !== undefined ? String(itemToEdit.price) : "",
        category: itemToEdit.category || "Lanches",
        available: itemToEdit.available !== undefined ? itemToEdit.available : true
      });
    } else {
      setFormData(INITIAL_FORM_STATE);
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price) {
      return;
    }

    setSubmitting(true);
    const success = await onSave({
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      category: formData.category,
      available: formData.available
    });
    setSubmitting(false);

    if (success && !itemToEdit) {
      setFormData(INITIAL_FORM_STATE);
    }
  };

  const isEditing = Boolean(itemToEdit);

  return (
    <section className="form-card">
      <div className="form-header">
        <div className="form-header-badge">
          {isEditing ? <Save size={18} /> : <PlusCircle size={18} />}
        </div>
        <div>
          <h2 className="form-title">
            {isEditing ? `Editar Item: ${itemToEdit.name}` : "Novo Item de Cardápio"}
          </h2>
          <p className="form-subtitle">
            {isEditing
              ? "Modifique os dados abaixo e clique em salvar para atualizar o cardápio."
              : "Preencha as informações para adicionar um novo prato ao cardápio."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="menu-form">
        <div className="form-grid">
          {/* Nome */}
          <div className="form-group col-span-2">
            <label htmlFor="item-name" className="form-label">
              Nome do Item <span className="text-danger">*</span>
            </label>
            <input
              id="item-name"
              type="text"
              name="name"
              required
              className="form-input"
              placeholder="Ex: Hambúrguer Artesanal Trufado"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Categoria */}
          <div className="form-group">
            <label htmlFor="item-category" className="form-label">
              Categoria <span className="text-danger">*</span>
            </label>
            <select
              id="item-category"
              name="category"
              required
              className="form-select"
              value={formData.category}
              onChange={handleChange}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Preço */}
          <div className="form-group">
            <label htmlFor="item-price" className="form-label">
              Preço (R$) <span className="text-danger">*</span>
            </label>
            <input
              id="item-price"
              type="number"
              name="price"
              step="0.01"
              min="0.01"
              required
              className="form-input"
              placeholder="0,00"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          {/* Descrição */}
          <div className="form-group col-span-2">
            <label htmlFor="item-description" className="form-label">
              Descrição & Ingredientes
            </label>
            <textarea
              id="item-description"
              name="description"
              rows={3}
              className="form-textarea"
              placeholder="Descreva os ingredientes, modo de preparo ou detalhes do item..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Disponibilidade */}
          <div className="form-group col-span-2 form-checkbox-wrapper">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-label">
                <strong>Item Disponível para Pedidos</strong> (exibido como ativo no cardápio)
              </span>
            </label>
          </div>
        </div>

        {/* Ações do Formulário */}
        <div className="form-actions">
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
              disabled={submitting}
            >
              <XCircle size={18} />
              Cancelar Edição
            </button>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {isEditing ? (
              <>
                <Save size={18} />
                {submitting ? "Salvando..." : "Salvar Alterações"}
              </>
            ) : (
              <>
                <PlusCircle size={18} />
                {submitting ? "Cadastrando..." : "Adicionar ao Cardápio"}
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
