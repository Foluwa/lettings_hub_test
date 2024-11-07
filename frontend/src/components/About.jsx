import React from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import ResumeSection from './ResumeSection';

const About = () => {
    const { portfolio } = usePortfolio();
    const { first_name, last_name, github, linkedin, twitter, skills, about, location } = portfolio;
    return (
        <ResumeSection id="about" title="">
            <h2 className="mb-3">
                {first_name} <span className="text-primary">{last_name}</span>
            </h2>
            <div className="subheading mb-2">
                {location} <a href={`${first_name.toLowerCase()}${last_name.toLowerCase()}@gmail.com`}>{first_name.toLowerCase()}{last_name.toLowerCase()}@gmail.com</a>
            </div>
            <span className="lead mb-3">{about}</span>
            <div className="mb-3 mt-3">Programming Languages: {skills.toString().replace(/,/g, ', ')}</div>
            <span></span>
            <div className="social-icons mt-4">
                <a className="social-icon" target="_blank" rel="noopener noreferrer" href={linkedin}><i className="fab fa-linkedin-in"></i></a>
                <a className="social-icon" target="_blank" rel="noopener noreferrer" href={github}><i className="fab fa-github"></i></a>
                <a className="social-icon" target="_blank" rel="noopener noreferrer" href={twitter}><i className="fab fa-twitter"></i></a>
            </div>

     
        </ResumeSection>);
};

export default About;
