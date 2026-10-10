import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, XCircle } from "lucide-react";

export function Toast({ message, visible, onClose, type = "success" }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setIsExiting(false);
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  if (!visible) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-success" aria-hidden="true" />,
    error: <XCircle className="w-5 h-5 text-danger" aria-hidden="true" />,
    info: <CheckCircle className="w-5 h-5 text-blue-bright" aria-hidden="true" />,
  };

  const toastContent = (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 bg-surface-2 border border-line rounded-full shadow-[0_20px_60px_-20px_rgba(27,111,168,.45)] animate-in slide-in-from-bottom-4 fade-in-200 ${isExiting ? "animate-out slide-out-to-bottom-4 fade-out-200" : ""}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {icons[type]}
      <span className="text-ink">{message}</span>
    </div>
  );

  return createPortal(toastContent, document.body);
}