import { createContext, useContext, useState, ReactNode } from 'react';

interface ErrorContextValue {
  error: { title: string; message: string } | null;
  showError: (title: string, message: string, duration?: number) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextValue | undefined>(undefined);

export function useError(): ErrorContextValue {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
}

interface ErrorProviderProps {
  children: ReactNode;
}

export function ErrorProvider({ children }: ErrorProviderProps): JSX.Element {
  const [error, setError] = useState<{ title: string; message: string } | null>(null);
  const [timerId, setTimerId] = useState<number | undefined>(undefined);

  const showError = (title: string, message: string, duration = 3000) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    setError({ title, message });
    const newTimerId = window.setTimeout(() => {
      clearError();
    }, duration);
    setTimerId(newTimerId);
  };

  const clearError = () => {
    setError(null);
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(undefined);
    }
  }
  
  return (
    <ErrorContext.Provider value={{ error, showError, clearError}}>
      {children}
    </ErrorContext.Provider>
  )
}
