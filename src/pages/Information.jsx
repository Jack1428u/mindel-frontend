import '../styles/Information.css';

function Information() {
    return (
        <div className="information-wrapper">
            {/* Header Section */}
            <div className="info-header">
                <h1 className="info-title">
                    Sobre <span className="text-purple">Mindel</span>
                </h1>
                <div className="info-divider"></div>
            </div>
            <div className="information-container">



                {/* About Project Section */}
                <section className="info-section">
                    <div className="info-card glass-card">
                        <div className="card-icon">💡</div>
                        <h2 className="section-title">El Proyecto</h2>
                        <p className="section-text">
                            <strong>Mindel</strong> es un proyecto personal en desarrollo con el objetivo de
                            convertirse en una plataforma educativa innovadora. Esta iniciativa busca
                            transformarse en una idea de negocio sólida que democratice el acceso
                            al aprendizaje de calidad.
                        </p>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="info-section">
                    <div className="info-card glass-card">
                        <div className="card-icon">📬</div>
                        <h2 className="section-title">¿Interesado en Colaborar?</h2>
                        <p className="section-text">
                            Si estás interesado en la idea de negocio o deseas crear tu propio
                            proyecto similar, no dudes en contactarme:
                        </p>

                        {/* Placeholder para URLs - el usuario las agregará */}
                        <div className="contact-links">
                            <a href="mailto:utrillajack@gmail.com" className="contact-link" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-envelope-fill"></i>
                                <span>Email</span>
                            </a>
                            <a href="https://github.com/Jack1428u" className="contact-link" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-github"></i>
                                <span>GitHub</span>
                            </a>
                            <a href="https://www.linkedin.com/in/jack-gonzalo-utrilla-fern%C3%A1ndez-6991b4367" className="contact-link" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-linkedin"></i>
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Architecture Section */}
                <section className="info-section">
                    <div className="info-card glass-card">
                        <div className="card-icon">⚙️</div>
                        <h2 className="section-title">Arquitectura y Despliegue (Deploy)</h2>

                        <div className="architecture-grid">

                            {/* Backend Card */}
                            <div className="tech-card">
                                <div className="tech-header">
                                    <span className="tech-icon">🔧</span>
                                    <h3>Backend (API)</h3>
                                </div>
                                <div className="tech-details">
                                    <div className="tech-item">
                                        <span className="label">Tecnología:</span>
                                        <span className="value">Django Rest Framework</span>
                                    </div>
                                    <div className="tech-item">
                                        <span className="label">Deploy:</span>
                                        <span className="value">Render.com (Web Service)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Frontend Card */}
                            <div className="tech-card">
                                <div className="tech-header">
                                    <span className="tech-icon">🎨</span>
                                    <h3>Frontend (UI)</h3>
                                </div>
                                <div className="tech-details">
                                    <div className="tech-item">
                                        <span className="label">Tecnología:</span>
                                        <span className="value">React.js + Vite</span>
                                    </div>
                                    <div className="tech-item">
                                        <span className="label">Deploy:</span>
                                        <span className="value">Vercel</span>
                                    </div>
                                </div>
                            </div>

                            {/* Database Card */}
                            <div className="tech-card">
                                <div className="tech-header">
                                    <span className="tech-icon">💾</span>
                                    <h3>Base de Datos</h3>
                                </div>
                                <div className="tech-details">
                                    <div className="tech-item">
                                        <span className="label">Tecnología:</span>
                                        <span className="value">PostgreSQL</span>
                                    </div>
                                    <div className="tech-item">
                                        <span className="label">Deploy:</span>
                                        <span className="value">Supabase (Nube)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Media Files Card */}
                            <div className="tech-card">
                                <div className="tech-header">
                                    <span className="tech-icon">📁</span>
                                    <h3>Media Files</h3>
                                </div>
                                <div className="tech-details">
                                    <div className="tech-item">
                                        <span className="label">Tecnología:</span>
                                        <span className="value">Amazon S3</span>
                                    </div>
                                    <div className="tech-item">
                                        <span className="label">Deploy:</span>
                                        <span className="value">AWS S3 (Bucket)</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Footer Note */}
                <div className="info-footer">
                    <p>✨ Proyecto en desarrollo continuo | 2025-2026</p>
                </div>

            </div>
        </div>
    );
}

export default Information;
