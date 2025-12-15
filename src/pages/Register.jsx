import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register, login } from '../api/auth_api';
import { useAuth } from '../context/AuthContext';
import '../styles/Register.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(''); // Estado para manejo de errores visual
    const [isLoading, setIsLoading] = useState(false); // Estado de carga
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden. Por favor, verifica que ambas sean iguales.');
            return;
        }

        setIsLoading(true);

        try {
            // Solo se envía la contraseña principal al backend
            await register({ username, password });

            // Auto-login despúes de registro exitoso
            const loginRes = await login(username, password);
            authLogin(loginRes.data.access, loginRes.data.refresh);
            navigate('/courses');
        } catch (error) {
            console.error(error);

            if (error.code === 'ECONNABORTED') {
                setError('El servidor tardó demasiado en responder. Intenta nuevamente.');
            } else if (error.response?.status === 400) {
                setError('El nombre de usuario ya existe o los datos son inválidos.');
            } else if (error.code === 'ERR_NETWORK') {
                setError('Error de conexión. Verifica tu conexión a internet.');
            } else {
                setError('Ocurrió un error al registrarse. Intenta nuevamente.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mindel-register-wrapper">
            <div className="glass-card">

                <h3 className="register-title">Crea tu cuenta</h3>

                <form onSubmit={handleSubmit} className="mindel-form">

                    {/* Input Usuario */}
                    <div>
                        <label className="d-none">Usuario</label> {/* Label oculto para accesibilidad */}
                        <input
                            type="text"
                            placeholder="Nombre de Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mindel-input"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    {/* Input Contraseña */}
                    <div>
                        <label className="d-none">Contraseña</label>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mindel-input"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    {/* Input Confirmar Contraseña */}
                    <div>
                        <label className="d-none">Confirmar Contraseña</label>
                        <input
                            type="password"
                            placeholder="Confirmar Contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mindel-input"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-register-submit shadow"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-btn"></span>
                                Registrando...
                            </>
                        ) : (
                            'Empezar a estudiar'
                        )}
                    </button>
                </form>

                {/* Área de Errores (Renderizado Condicional) */}
                {error && (
                    <div className="error-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <p className="text-secondary mt-3 fs-6 text-center register-footer">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="link-login">
                        Inicia sesión
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register;