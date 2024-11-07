import React, { useState, useEffect, Suspense, lazy } from 'react';
import ScrollSpy from './ScrollSpy';
import { usePortfolio } from '../contexts/PortfolioContext';

const Navbar = () => {
    const { portfolio, githubUserData } = usePortfolio();
    const sectionIds = ['about', 'experience', 'education', 'interests', 'awards'];
    const activeSection = ScrollSpy(sectionIds, 100); // Adjust offset as needed
    const { first_name, last_name } = portfolio;

    // State to handle image loading
    const [isImageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
            <a className="navbar-brand js-scroll-trigger" href="#page-top">
                <span className="d-block d-lg-none">
                    {first_name} {last_name}
                </span>
                <span className="d-none d-lg-block">
                    {/* Lazy load image and add skeleton loading */}
                    <div className="img-profile-container">
                        {!isImageLoaded && <div className="skeleton-loader img-skeleton rounded-circle"></div>}
                        <img
                            className={`img-fluid img-profile rounded-circle mx-auto mb-2 ${isImageLoaded ? '' : 'hidden'}`}
                            src={githubUserData?.avatar_url}
                            alt="profile"
                            onLoad={handleImageLoad}
                            loading="lazy"
                        />
                    </div>
                </span>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav">
                    {sectionIds.map((id) => (
                        <li key={id} className={activeSection === id ? 'active nav-item' : 'nav-item'}>
                            <a className="nav-link js-scroll-trigger">{id.charAt(0).toUpperCase() + id.slice(1)}</a>
                        </li>
                    ))}
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="/auth">Auth</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
