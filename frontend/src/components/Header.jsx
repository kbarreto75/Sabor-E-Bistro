import React from "react";
import { Settings2, Server } from "lucide-react";
import { getApiBaseUrl } from "../services/menuApiService";

export function Header({ onOpenSettings }) {
  const currentUrl = getApiBaseUrl();

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="brand-wrapper">
          <div>
            <h1 className="brand-title">Sabor & Bistrô</h1>
            <p className="brand-subtitle">Gestão Inteligente de Cardápio</p>
          </div>
        </div>

        <div className="header-actions">
          <button
            onClick={onOpenSettings}
            className="api-indicator-btn"
            title={`API Conectada: ${currentUrl}`}
          >
            <Server size={16} className="indicator-icon" />
            <span className="indicator-text">API:</span>
            <code className="indicator-url">{currentUrl.replace(/^https?:\/\//, "")}</code>
            <Settings2 size={16} className="settings-icon" />
          </button>
        </div>
      </div>
    </header>
  );
}
