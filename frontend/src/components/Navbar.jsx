import React from 'react';
import ScrollSpy from './ScrollSpy';

const Navbar = () => {

    const sectionIds = ['about', 'experience', 'education', 'skills', 'interests', 'awards'];
    const activeSection = ScrollSpy(sectionIds, 10); // Adjust offset as needed
    console.log('activeSection:', activeSection);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
            <a className="navbar-brand js-scroll-trigger" href="#page-top">
                <span className="d-block d-lg-none">Clarence Taylor</span>
                <span className="d-none d-lg-block">
                    <img className="img-fluid img-profile rounded-circle mx-auto mb-2" src="https://tse1.mm.bing.net/th?id=OIP.PgBm98dCicK8Q8o8T28isAHaHa&w=474&h=474&c=7" alt="profile" />
                </span>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav">
                    {sectionIds.map((id) => (
                        <li key={id} className={activeSection === id ? 'active nav-item' : 'nav-item'}>
                            <a href={`#${id}`} className="nav-link js-scroll-trigger">{id.charAt(0).toUpperCase() + id.slice(1)}</a>
                        </li>
                    ))}
                </ul>
            </div>
            {/* <ul className="navbar-nav">
          <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#about">About</a></li>
          <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#experience">Experience</a></li>
          <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#education">Education</a></li>
          <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#skills">Skills</a></li>
          <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#interests">Interests</a></li>
          <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#awards">Awards</a></li>
        </ul> */}
        </nav>
    );
};

export default Navbar;
