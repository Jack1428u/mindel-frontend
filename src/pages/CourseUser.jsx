import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetEnrolledCourses } from '../api/courses_api';
import '../styles/CourseUser.css';

function CourseUser() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadEnrolledCourses() {
            try {
                const response = await GetEnrolledCourses();
                setCourses(response.data);
            } catch (error) {
                console.error('Error loading enrolled courses:', error);
            } finally {
                setLoading(false);
            }
        }
        loadEnrolledCourses();
    }, []);

    // Loader Minimalista (Dark Mode)
    if (loading) return (
        <div className="mindel-container d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <div className="text-white">Cargando cursos...</div>
        </div>
    );

    return (
        <div className="mindel-container">
            <div className="container py-5">

                {/* === Encabezado de Sección === */}
                <div className="page-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div>
                        <h1 className="fw-bold mb-0 text-white">Mis Cursos</h1>
                        <p className="text-secondary mb-0 small mt-1">Continúa donde lo dejaste</p>
                    </div>

                    {/* Botón Inscribirse (Funcionalidad de React Link) */}
                    <Link to="/enroll" className="btn-enroll-primary shadow-sm">
                        Inscribirme ahora
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" className="ms-2">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                    </Link>
                </div>

                {/* === Grid de Cursos === */}
                <div className="row g-4">
                    {courses.length === 0 ? (
                        /* Estado Vacío */
                        <div className="col-12 text-center py-5">
                            <p className="text-secondary fs-5 mb-3">No estás inscrito en ningún curso.</p>
                            <Link to="/enroll" className="text-decoration-none" style={{ color: '#7E57C2' }}>
                                Explorar catálogo de cursos →
                            </Link>
                        </div>
                    ) : (
                        /* Lista de Cursos */
                        courses.map(course => (
                            <div key={course.id} className="col-12 col-md-6 col-lg-4">
                                <div className="course-card">

                                    {/* Icono Visual (Estático según diseño) */}
                                    <div>
                                        <span className="icon-box">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z" />
                                                <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.43 4.176 9.032Z" />
                                            </svg>
                                        </span>
                                    </div>

                                    {/* Título */}
                                    <Link to={`/courses/${course.id}/units`} className="course-title">
                                        {course.title}
                                    </Link>

                                    {/* Profesor (Elemento de React) */}
                                    {course.teacher && (
                                        <span className="course-teacher">
                                            Prof: {course.teacher}
                                        </span>
                                    )}

                                    {/* Descripción */}
                                    <p className="course-desc">
                                        {course.description}
                                    </p>

                                    {/* Botón de Acción */}
                                    <Link
                                        to={`/courses/${course.id}/units`}
                                        className="btn-course"
                                    >
                                        Continuar Aprendiendo
                                    </Link>

                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default CourseUser;