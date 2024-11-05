import React from 'react';
import ResumeSection from './ResumeSection';

const About = () => (
    <ResumeSection id="about" title="About">
        <h2 className="mb-0">
            Foluwa <span className="text-primary">Akintola</span>
        </h2>
        <div className="subheading mb-5">
            3542 Berry Street · Cheyenne Wells, CO 80810 · (317) 585-8468 · <a href="mailto:name@email.com">name@email.com</a>
        </div>
        <p className="lead mb-5">
            I am experienced in leveraging agile frameworks to provide a robust synopsis for high-level overviews...
        </p>
        <div className="social-icons">
            <a className="social-icon" href="#!"><i className="fab fa-linkedin-in"></i></a>
            <a className="social-icon" href="#!"><i className="fab fa-github"></i></a>
            <a className="social-icon" href="#!"><i className="fab fa-twitter"></i></a>
            <a className="social-icon" href="#!"><i className="fab fa-facebook-f"></i></a>
        </div>
    </ResumeSection>
);

export default About;
