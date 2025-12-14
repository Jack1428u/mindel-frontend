import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GetCourseUnits } from '../api/courses_api';
import '../styles/ListUnitsFromCourse.css';

function ListUnitsFromCourse() {
    const { courseId } = useParams();
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUnits() {
            try {
                const response = await GetCourseUnits(courseId);
                setUnits(response.data);
            } catch (error) {
                console.error('Error loading units:', error);
            } finally {
                setLoading(false);
            }
        }
        loadUnits();
    }, [courseId]);

    // Estado de Carga (Dark Mode)
    if (loading) return (
        <div className="mindel-container loading-container">
            <div className="spinner-border text-purple me-2" role="status"></div>
            <span>Cargando contenido...</span>
        </div>
    );

    return (
        <div className="mindel-container">
            <div className="container py-5">

                {/* Header de la Página */}
                <div className="text-center mb-5 border-bottom border-secondary border-opacity-25 pb-4">
                    <h1 className="page-header-title display-6">Plan de Estudios</h1>
                    <p className="page-header-subtitle">Selecciona una unidad para acceder a sus recursos</p>
                </div>

                {units.length === 0 ? (
                    /* Estado Vacío */
                    <div className="container" style={{ maxWidth: '600px' }}>
                        <div className="empty-state">
                            <div className="fs-1 mb-3">📂</div>
                            <p className="mb-0">No hay unidades disponibles para este curso aún.</p>
                        </div>
                    </div>
                ) : (
                    /* Lista de Unidades */
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {units.map((unit, index) => (
                            <Link
                                key={unit.id}
                                to={`/units/${unit.id}`}
                                className="unit-list-card shadow-sm"
                            >
                                {/* Información de la Unidad */}
                                <div className="me-3">
                                    <h2 className="unit-title">
                                        <span style={{ color: '#7E57C2', marginRight: '8px' }}>#{index + 1}</span>
                                        {unit.title}
                                    </h2>
                                    <p className="unit-desc">
                                        {unit.description || "Sin descripción disponible."}
                                    </p>
                                </div>

                                {/* Botón Visual (Flecha o Texto) */}
                                <div className="d-none d-md-block">
                                    <span className="btn-unit-action">
                                        Ver Recursos →
                                    </span>
                                </div>

                                {/* Flecha simple para móviles */}
                                <div className="d-md-none text-purple fs-4">
                                    ›
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListUnitsFromCourse;