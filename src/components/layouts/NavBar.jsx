import { Link, useNavigate } from "react-router-dom";
import './NavBar.css';
import { useAuth } from '../../context/AuthContext';

export default function NavBar() {
    const navigate = useNavigate();
    const { isAuthenticated, logout: authLogout } = useAuth();

    const handleLogout = () => {
        authLogout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg py-3 mindel-navbar">
            <div className="container">

                {/* Logo / Home Link */}
                <Link className="navbar-brand fw-bold fs-2" to="/">
                    <i className="bi bi-stars me-2"></i>
                    Mindel
                </Link>

                {/* Mobile Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span
                        className="navbar-toggler-icon"
                        style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 30 30\\'><path stroke=\\'rgba(255, 255, 255, 0.8)\\' stroke-linecap=\\'round\\' stroke-miterlimit=\\'10\\' stroke-width=\\'2\\' d=\\'M4 7h22M4 15h22M4 23h22\\'/></svg>')" }}
                    ></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">

                        {/* Link Home */}
                        <li className="nav-item">
                            <Link className="nav-link fs-5 mx-2" to="/">Home</Link>
                        </li>

                        {isAuthenticated ? (
                            <>
                                {/* Authenticated Links */}
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-2" to="/courses">Courses</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-2" to="/enroll">Enroll</Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        onClick={handleLogout}
                                        className="nav-link btn btn-mindel-outline fs-6 px-4 py-2 ms-3 rounded-pill"
                                        style={{ display: 'inline-block', width: 'auto' }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* Guest Links */}
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-2" to="/register">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link btn btn-mindel-primary fs-5 px-5 py-2 ms-3 rounded-pill"
                                        to="/login"
                                    >
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}