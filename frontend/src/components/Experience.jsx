import React from 'react';
import ResumeSection from './ResumeSection';
import { usePortfolio } from '../contexts/PortfolioContext';

const Experience = () => {
    const { portfolio } = usePortfolio();
    const { work_experience } = portfolio;
    return (
        <ResumeSection id="experience" title="Experience">
            {
                work_experience.map((exp) => (
                    <div key={exp.role}className="d-flex flex-column flex-md-row justify-content-between mb-5">
                        <div className="flex-grow-1">
                            <h3 className="mb-0">{exp.role}</h3>
                            <div className="subheading mb-3">{exp.company_name}</div>
                            <p>
                                {exp.description}
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <span className="text-primary">{exp.duration}</span>
                        </div>
                    </div>
                ))}
        </ResumeSection>
    )
};

export default Experience;
