import { createContext, useState, ReactNode, useCallback } from 'react';
import { Toast } from '../types/book';

interface UIContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info', duration?: number) => void;
  openModal: (bookId: number) => void;
  closeModal: () => void;
  isModalOpen: boolean;
  currentBookId: number | null;
}

export const UIContext = createContext<UIContextType>({
  showToast: () => {},
  openModal: () => {},
  closeModal: () => {},
  isModalOpen: false,
  currentBookId: null
});

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider = ({ children }: UIProviderProps) => {
  const [toast, setToast] = useState<Toast | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBookId, setCurrentBookId] = useState<number | null>(null);

  // Show toast notification
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success', duration = 3000) => {
    setToast({ message, type, duration });
    
    // Auto-dismiss the toast after the specified duration
    setTimeout(() => {
      setToast(null);
    }, duration);
  }, []);

  // Open book details modal
  const openModal = useCallback((bookId: number) => {
    setCurrentBookId(bookId);
    setIsModalOpen(true);
  }, []);

  // Close book details modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      setCurrentBookId(null);
    }, 300); // Wait for animation to complete
  }, []);

  const contextValue = {
    showToast,
    openModal,
    closeModal,
    isModalOpen,
    currentBookId
  };

  return (
    <UIContext.Provider value={contextValue}>
      {children}
      {toast && (
        <div className={`toast-message ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </UIContext.Provider>
  );
};
