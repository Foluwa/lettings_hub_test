import React from 'react';
import ResumeSection from './ResumeSection';

const Education = () => (
    <ResumeSection id="education" title="Education">
        <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
            <div className="flex-grow-1">
                <h3 className="mb-0">University of Colorado Boulder</h3>
                <div className="subheading mb-3">Bachelor of Science</div>
                <div>Computer Science - Web Development Track</div>
                <p>GPA: 3.23</p>
            </div>
            <div className="flex-shrink-0">
                <span className="text-primary">August 2006 - May 2010</span>
            </div>
        </div>
        {/* Repeat similar blocks for other education entries */}
    </ResumeSection>
);

export default Education;
