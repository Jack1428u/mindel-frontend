import '../styles/skeletons.css';

export const AuthFormSkeleton = () => {
    return (
        <div className="mindel-login-wrapper">
            <div className="glass-card">
                {/* Header Skeleton */}
                <div className="skeleton skeleton-title mb-4"></div>
                <div className="skeleton skeleton-subtitle mb-4"></div>

                {/* Form Skeletons */}
                <div className="skeleton skeleton-input mb-3"></div>
                <div className="skeleton skeleton-input mb-3"></div>
                <div className="skeleton skeleton-button"></div>
            </div>
        </div>
    );
};

export default AuthFormSkeleton;
