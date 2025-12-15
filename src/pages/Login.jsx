import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth_api';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Estado para mostrar el error visualmente
    const [isLoading, setIsLoading] = useState(false); // Estado de carga
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos
        setIsLoading(true);

        try {
            const res = await login(username, password);
            // Use AuthContext login method to update global state
            authLogin(res.data.access, res.data.refresh);
            navigate('/courses');
        } catch (error) {
            console.error(error);

            // Determinar tipo de error para mensaje específico
            if (error.code === 'ECONNABORTED') {
                setError('El servidor tardó demasiado en responder. Por favor, intenta nuevamente.');
            } else if (error.response?.status === 401) {
                setError('Credenciales incorrectas. Verifica tu usuario y contraseña.');
            } else if (error.code === 'ERR_NETWORK') {
                setError('Error de conexión. Verifica tu conexión a internet.');
            } else {
                setError('Error al iniciar sesión. Intenta nuevamente más tarde.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mindel-login-wrapper">
            <div className="glass-card">

                {/* Header del Formulario */}
                <div className="text-center mb-4">
                    <h2 className="login-title">
                        Bienvenido a <span className="text-purple">Mindel</span>
                    </h2>
                    <p className="text-secondary-custom">
                        Ingresa tus credenciales para continuar aprendiendo.
                    </p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="mindel-form">
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mindel-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mindel-input"
                        required
                    />

                    <button
                        type="submit"
                        className="btn-login-submit shadow"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-btn"></span>
                                Iniciando sesión...
                            </>
                        ) : (
                            'Iniciar Sesión'
                        )}
                    </button>
                </form>

                {/* Mensaje de Error (Visualización condicional) */}
                {error && (
                    <div className="error-box">
                        {/* Icono de error SVG inline */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {/* Footer del Card */}
                <div className="login-footer">
                    <p className="text-secondary-custom mb-0">
                        ¿Aún no tienes cuenta?{' '}
                        <Link to="/register" className="link-register">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Login;