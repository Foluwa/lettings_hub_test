import React from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import ResumeSection from './ResumeSection';

const Awards = () => {
    const { portfolio } = usePortfolio();
    const { certifications } = portfolio;
    return (
        <ResumeSection id="awards" title="Awards & Certifications">
            <ul lassName="fa-ul mb-0">
                {certifications.map((certification) => (
                    <li key={certification.name}>
                        <a href={certification.url} target="_blank" rel="noopener noreferrer">
                            {certification.name}
                        </a>
                    </li>
                ))}
            </ul>
        </ResumeSection>);
};

export default Awards;