import React from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

/**
 * Componente Notificação (Toast)
 * Apenas renderiza a mensagem recebida e aciona o evento de fechamento.
 */
export function Notification({ notification, onDismiss }) {
  if (!notification) return null;

  const isError = notification.type === "error";

  return (
    <div className={`toast-notification ${isError ? "toast-error" : "toast-success"}`} role="alert">
      <div className="toast-icon">
        {isError ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
      </div>
      <div className="toast-content">
        <p className="toast-message">{notification.message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="toast-close-btn"
        aria-label="Fechar notificação"
      >
        <X size={16} />
      </button>
    </div>
  );
}
