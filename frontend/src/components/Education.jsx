import React from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import ResumeSection from './ResumeSection';

const Education = () => {
    const { portfolio } = usePortfolio();
    const { education } = portfolio;
    return (

        <ResumeSection id="education" title="Education">
            {education.map((edu) => (
                <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
                    <div className="flex-grow-1">
                        <h3 className="mb-0">{edu.school_name}</h3>
                        <div className="subheading mb-3">{edu.degree_name}</div>
                        <p>GPA: {edu.gpa}</p>
                    </div>
                    <div className="flex-shrink-0">
                        <span className="text-primary">{edu.year}</span>
                    </div>
                </div>
            ))}
        </ResumeSection>
    )
};

export default Education;
