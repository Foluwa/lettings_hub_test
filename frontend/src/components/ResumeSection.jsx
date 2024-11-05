import React from 'react';

const ResumeSection = ({ id, title, children }) => (
    <section className="resume-section" id={id}>
        <div className="resume-section-content">
            <h2 className="mb-5">{title}</h2>
            {children}
        </div>
    </section>
);

export default ResumeSection;
