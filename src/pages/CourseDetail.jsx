import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetCourseDetail } from '../api/courses_api';

function CourseDetail() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        // Petición al backend
        GetCourseDetail(id).then(response => {
            setCourse(response.data);
        });
    }, [id]);

    if (!course) return <div>Cargando...</div>;

    return (
        <div>
            <h1>{course.title}</h1>
            <p>{course.description}</p>

            <div className="units">
                {course.units.map(unit => (
                    <div key={unit.id} className="unit-card">
                        <h3>{unit.title}</h3>
                        {/* Renderizar recursos iterando unit.resources */}
                        {unit.resources.map(resource => (
                            <div key={resource.id}>
                                {/* Lógica condicional para Video/PDF/Form igual que en Jinja pero en JSX */}
                                {resource.resource_type === 'VIDEO' && (
                                    <iframe src={`https://www.youtube.com/embed/${resource.youtube_id}`} />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default CourseDetail;