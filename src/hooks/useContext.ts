import { useContext } from 'react';

export function createContextHook<T>(
  context: React.Context<T | null>,
  errorMessage: string
): () => T {
  return () => {
    const contextValue = useContext(context);
    if (contextValue === null) {
      throw new Error(errorMessage);
    }
    return contextValue;
  };
}