import { QueryClient } from '@tanstack/react-query';

// Configuración global de QueryClient
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Tiempo que los datos permanecen frescos
            staleTime: 5 * 60 * 1000, // 5 minutos
            // Tiempo que los datos permanecen en caché
            cacheTime: 10 * 60 * 1000, // 10 minutos
            // Número de reintentos automáticos en caso de error
            retry: 2,
            // Función de delay entre reintentos (exponential backoff)
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            // Refetch cuando la ventana vuelve a tener foco
            refetchOnWindowFocus: false,
            // Refetch cuando se reconecta a internet
            refetchOnReconnect: true,
        },
        mutations: {
            //Reintentos para mutaciones (registro, login, etc)
            retry: 1,
        },
    },
});
