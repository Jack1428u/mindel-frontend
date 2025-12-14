import React from 'react';
import '../styles/Home.css';

export default function Home() {
    return (
        <div className="mindel-home-container">

            {/* === HERO SECTION === */}
            <section className="container py-5 my-5">
                <div className="row align-items-center justify-content-center"> {/* Centrado Horizontal */}

                    {/* Usamos col-lg-8 y text-center para centrar totalmente el contenido visualmente */}
                    <div className="col-lg-8 text-center">

                        {/* Badge */}
                        <span className="badge rounded-pill px-3 py-2 mb-3 mindel-badge">
                            🚀 Admisión 2025
                        </span>

                        {/* Título Principal */}
                        <h1 className="display-3 fw-bold mb-3 lh-1">
                            Potencia tu ingreso a la <span className="text-purple">Universidad</span>
                        </h1>

                        {/* Subtítulo / Descripción */}
                        <p className="lead text-secondary mb-4 mx-auto" style={{ maxWidth: '90%' }}>
                            Prepárate para las mejores universidades nacionales de Lima con recursos concisos y una metodología
                            directa. En Mindel, cerramos brechas con tecnología accesible.
                        </p>

                        {/* Estadísticas (Centradas) */}
                        <div className="d-flex gap-4 pt-2 justify-content-center">
                            <div>
                                <h4 className="fw-bold mb-0 text-white">100%</h4>
                                <small className="text-secondary">Clases Concisas</small>
                            </div>
                            <div style={{ borderLeft: '1px solid #2C313A' }}></div>
                            <div>
                                <h4 className="fw-bold mb-0 text-white">24/7</h4>
                                <small className="text-secondary">Acceso Digital</small>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* === FEATURES SECTION === */}
            <section className="container py-5 mb-5">
                <div className="row text-center mb-5">
                    <div className="col-12">
                        <h2 className="fw-bold">Nuestra Filosofía</h2>
                        <p className="text-secondary">Menos ruido, más aprendizaje.</p>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Feature 1 */}
                    <div className="col-md-4">
                        <div className="feature-card">
                            <div className="fs-1 mb-3">🎯</div>
                            <h4 className="fw-bold mb-3">Recursos Concisos</h4>
                            <p className="text-secondary small">
                                Sin relleno. Entregamos material directo para maximizar tu tiempo de estudio y mejorar tu
                                rendimiento académico.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="col-md-4">
                        <div className="feature-card">
                            <div className="fs-1 mb-3">⚡</div>
                            <h4 className="fw-bold mb-3">Innovación Ágil</h4>
                            <p className="text-secondary small">
                                Plataforma rápida y minimalista diseñada para que te enfoques únicamente en aprender y medir tu
                                progreso.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="col-md-4">
                        <div className="feature-card">
                            <div className="fs-1 mb-3">🎓</div>
                            <h4 className="fw-bold mb-3">Ingreso Seguro</h4>
                            <p className="text-secondary small">
                                Nuestro objetivo es tu vacante en universidades de prestigio mediante un aprendizaje medible y
                                efectivo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* === FOOTER === */}
            <footer className="mindel-footer mt-auto py-3">
                <div className="container text-center">
                    <span className="text-secondary">
                        Created with ❤️ by{' '}
                        <a
                            className="text-purple text-decoration-none fw-medium footer-link"
                            href="https://linkedin.com/in/jack-gonzalo-utrilla-fernández-6991b4367"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Jack Utrilla
                        </a>
                    </span>
                </div>
            </footer>

        </div>
    );
}