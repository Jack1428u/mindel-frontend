import { useQuery } from '@tanstack/react-query';
import api from '../api/config';

/**
 * Hook personalizado para obtener cursos con caché automático
 * Ejemplo de cómo usar TanStack Query con tu API
 */
export const useCourses = () => {
    return useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const response = await api.get('/courses/');
            return response.data;
        },
        // Configuración específica (opcional, ya hay defaults globales)
        staleTime: 5 * 60 * 1000, // 5 minutos
        retry: 2,
    });
};

/**
 Hook para obtener los cursos del usuario autenticado
 */
export const useMyCourses = () => {
    return useQuery({
        queryKey: ['my-courses'],
        queryFn: async () => {
            const response = await api.get('/my-courses/');
            return response.data;
        },
    });
};

/**
 * Hook para obtener detalles de un curso específico
 */
export const useCourseDetail = (courseId) => {
    return useQuery({
        queryKey: ['course', courseId],
        queryFn: async () => {
            const response = await api.get(`/courses/${courseId}/`);
            return response.data;
        },
        enabled: !!courseId, // Solo ejecuta si hay courseId
    });
};

/**
 * Ejemplo de uso en un componente:
 * 
 * function CourseList() {
 *     const { data, isLoading, isError, error } = useCourses();
 *     
 *     if (isLoading) return <LoadingSpinner />;
 *     if (isError) return <div>Error: {error.message}</div>;
 *     
 *     return (
 *         <div>
 *             {data.map(course => (
 *                 <CourseCard key={course.id} course={course} />
 *             ))}
 *         </div>
 *     );
 * }
 */
