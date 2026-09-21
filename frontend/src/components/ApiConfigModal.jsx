import React, { useState } from "react";
import { X, Server, Check, RotateCcw } from "lucide-react";
import { getApiBaseUrl, setApiBaseUrl } from "../services/menuApiService";

export function ApiConfigModal({ isOpen, onClose, onUrlUpdated }) {
  const [url, setUrl] = useState(getApiBaseUrl());

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setApiBaseUrl(url);
    onUrlUpdated();
    onClose();
  };

  const handleReset = () => {
    setApiBaseUrl("");
    setUrl(getApiBaseUrl());
    onUrlUpdated();
    onClose();
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title-wrapper">
            <Server size={20} className="text-orange" />
            <h3 className="modal-title">Configuração do Endpoint da API</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="modal-body">
          <p className="modal-description">
            Defina o endereço base da API Node.js/Express. Ao hospedar no <strong>GitHub Pages</strong>, 
            você pode apontar para a sua instância em nuvem (ex: Render, Glitch, Railway) ou manter 
            <code>http://localhost:3000/api</code> para execução local.
          </p>

          <div className="form-group">
            <label htmlFor="api-url-input" className="form-label">
              URL Base da API:
            </label>
            <input
              id="api-url-input"
              type="url"
              required
              className="form-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Ex: http://localhost:3000/api"
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary"
              title="Restaurar padrão"
            >
              <RotateCcw size={16} />
              Padrão
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={16} />
              Salvar Conexão
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
