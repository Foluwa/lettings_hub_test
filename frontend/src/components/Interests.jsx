import React from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import ResumeSection from './ResumeSection';

const Interests = () => {
  const { portfolio, loading, error } = usePortfolio();
  const { interests } = portfolio;
  return (
    <ResumeSection id="interests" title="Interests">
     <p dangerouslySetInnerHTML={{ __html: interests }}></p>
    </ResumeSection>);
};

export default Interests;
