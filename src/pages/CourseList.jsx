import { useEffect, useState } from 'react';
import { GetCourses, EnrollCourse, GetEnrolledCourses } from '../api/courses_api';
import '../styles/CourseEnroll.css'; // Importamos los estilos

function CourseList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState({});
    const [errors, setErrors] = useState({}); // Store errors per course

    useEffect(() => {
        async function loadCourses() {
            try {
                // Fetch all available courses
                const response = await GetCourses();

                // Fetch enrolled courses to check which ones user is already in
                const enrolledResponse = await GetEnrolledCourses();
                const enrolledIds = enrolledResponse.data.map(c => c.id);

                // Mark courses as enrolled if user is already enrolled
                const coursesWithEnrollStatus = response.data.map(course => ({
                    ...course,
                    enrolled: enrolledIds.includes(course.id)
                }));

                setCourses(coursesWithEnrollStatus);
            } catch (error) {
                console.error("Error loading courses", error);
            } finally {
                setLoading(false);
            }
        }
        loadCourses();
    }, []);

    const handleEnroll = async (courseId) => {
        setEnrolling(prev => ({ ...prev, [courseId]: true }));
        setErrors(prev => ({ ...prev, [courseId]: null })); // Clear previous errors

        try {
            await EnrollCourse(courseId);
            // Mark as enrolled in local state
            setCourses(prev => prev.map(c =>
                c.id === courseId ? { ...c, enrolled: true } : c
            ));
            // Clear any error for this course
            setErrors(prev => ({ ...prev, [courseId]: null }));
        } catch (error) {
            let errorMessage = 'Error al inscribirse. Intenta nuevamente.';

            if (error.response?.status === 400) {
                errorMessage = 'Ya estás inscrito en este curso';
            }

            // Set error message for this specific course
            setErrors(prev => ({ ...prev, [courseId]: errorMessage }));
            console.error('Enrollment error:', error);
        } finally {
            setEnrolling(prev => ({ ...prev, [courseId]: false }));
        }
    };

    if (loading) return <div className="text-white text-center py-5">Cargando...</div>;

    return (
        <div className="container py-5">

            {/* Header */}
            <div className="catalog-header d-flex justify-content-between align-items-end">
                <div>
                    <h1 className="display-6 fw-bold text-white mb-0">Cursos Disponibles</h1>
                    <p className="text-secondary mb-0 mt-1">Selecciona y añade nuevas materias a tu plan.</p>
                </div>
                <div className="d-none d-md-block text-secondary small">
                    Mindel Academic v2.0
                </div>
            </div>

            {/* Grid */}
            <div className="row g-4">
                {courses.length > 0 ? (
                    courses.map(course => (
                        <div key={course.id} className="col-12 col-md-6 col-lg-4">
                            <article className="enroll-card">

                                {/* Contenido Informativo */}
                                <div>
                                    <div className="mb-3">
                                        <span style={{ color: '#7E57C2', background: 'rgba(126,87,194,0.1)', padding: '8px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                            CURSO
                                        </span>
                                    </div>

                                    <h2 className="enroll-title">{course.title}</h2>

                                    {/* Mostramos el profesor si existe en la data (según tu componente react original) */}
                                    {course.teacher && (
                                        <small className="d-block text-secondary mb-2">Prof: {course.teacher}</small>
                                    )}

                                    <p className="enroll-desc">
                                        {course.description}
                                    </p>
                                </div>

                                {/* Botón de Acción */}
                                <div className="mt-auto">
                                    <button
                                        type="button"
                                        className="btn-add-course"
                                        onClick={() => handleEnroll(course.id)}
                                        disabled={enrolling[course.id] || course.enrolled}
                                    >
                                        {/* Renderizado condicional del contenido del botón */}
                                        {enrolling[course.id] ? (
                                            <span>Inscribiendo...</span>
                                        ) : course.enrolled ? (
                                            <span>✓ Matriculado</span>
                                        ) : (
                                            <>
                                                <span>Añadir Curso</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                                </svg>
                                            </>
                                        )}
                                    </button>

                                    {/* Error message display */}
                                    {errors[course.id] && (
                                        <div className="error-message mt-2">
                                            {errors[course.id]}
                                        </div>
                                    )}
                                </div>

                            </article>
                        </div>
                    ))
                ) : (
                    /* Empty State */
                    <div className="col-12 text-center py-5">
                        <div className="text-secondary fs-4">No hay cursos disponibles para añadir en este momento.</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseList;