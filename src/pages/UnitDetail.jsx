import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetUnitDetail } from '../api/courses_api'

function UnitDetail() {
    const { unitId } = useParams()
    const [unit, setUnit] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUnit() {
            try {
                const response = await GetUnitDetail(unitId);
                setUnit(response.data);
            } catch (error) {
                console.error('Error loading unit:', error);
            } finally {
                setLoading(false);
            }
        }
        loadUnit();
    }, [unitId])

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando...</div>
    if (!unit) return <div style={{ padding: '2rem', textAlign: 'center' }}>Unidad no encontrada</div>

    const videoResources = unit.resources?.filter(r => r.resource_type === 'VIDEO') || []
    const pdfResources = unit.resources?.filter(r => r.resource_type === 'PDF') || []
    const formResources = unit.resources?.filter(r => r.resource_type === 'FORM') || []

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>{unit.title}</h1>
            <p style={{ color: '#7f8c8d', marginBottom: '2rem' }}>{unit.description}</p>

            {/* Videos */}
            {videoResources.length > 0 && (
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ color: '#34495e', marginBottom: '1rem', borderBottom: '2px solid #3498db', paddingBottom: '0.5rem' }}>
                        📹 Videos
                    </h2>
                    {videoResources.map(resource => (
                        <div key={resource.id} style={{ marginBottom: '2rem' }}>
                            <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>{resource.title}</h3>
                            {resource.youtube_id ? (
                                <iframe
                                    width="100%"
                                    height="450"
                                    src={`https://www.youtube.com/embed/${resource.youtube_id}`}
                                    title={resource.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ borderRadius: '8px' }}
                                ></iframe>
                            ) : (
                                <p style={{ color: '#e74c3c' }}>Video no disponible</p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* PDFs */}
            {pdfResources.length > 0 && (
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ color: '#34495e', marginBottom: '1rem', borderBottom: '2px solid #e67e22', paddingBottom: '0.5rem' }}>
                        📄 Materiales de Lectura
                    </h2>
                    {pdfResources.map(resource => (
                        <div key={resource.id} style={{
                            padding: '1rem',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{ color: '#2c3e50', fontWeight: 'bold' }}>{resource.title}</span>
                            {resource.file ? (
                                <a
                                    href={resource.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        backgroundColor: '#e67e22',
                                        color: 'white',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '4px',
                                        textDecoration: 'none',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Descargar PDF
                                </a>
                            ) : (
                                <span style={{ color: '#e74c3c' }}>No disponible</span>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Forms */}
            {formResources.length > 0 && (
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ color: '#34495e', marginBottom: '1rem', borderBottom: '2px solid #27ae60', paddingBottom: '0.5rem' }}>
                        📝 Formularios y Simulacros
                    </h2>
                    {formResources.map(resource => (
                        <div key={resource.id} style={{ marginBottom: '2rem' }}>
                            <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>{resource.title}</h3>
                            {resource.link ? (
                                <iframe
                                    src={resource.link}
                                    width="100%"
                                    height="600"
                                    frameBorder="0"
                                    marginHeight="0"
                                    marginWidth="0"
                                    style={{ borderRadius: '8px' }}
                                >
                                    Cargando formulario...
                                </iframe>
                            ) : (
                                <p style={{ color: '#e74c3c' }}>Formulario no disponible</p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {unit.resources?.length === 0 && (
                <p style={{ textAlign: 'center', color: '#7f8c8d', padding: '2rem' }}>
                    No hay recursos disponibles en esta unidad
                </p>
            )}
        </div>
    )
}

export default UnitDetail
