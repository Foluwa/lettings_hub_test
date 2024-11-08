import React from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Github from '../components/Github';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Interests from '../components/Interests';
import Awards from '../components/Awards';


const Home = () => {
    const { portfolio, loading, error } = usePortfolio();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div id="page-top">
            <Navbar />
            <div className="container-fluid p-0">
                <About about={portfolio.about} firstName={portfolio.first_name} lastName={portfolio.last_name} location={portfolio.location}
                github={portfolio.github} linkedin={portfolio.linkedin} twitter={portfolio.twitter} skills={portfolio.skills}
                />
                <hr className="m-0" />
                <Experience experiences={portfolio.work_experience} />
                <hr className="m-0" />
                <Education education={portfolio.education} />
                <hr className="m-0" />
                <Github url={portfolio?.github} />
                <hr className="m-0" />
                <Interests interests={portfolio.interests} />
                <hr className="m-0" />
                <Awards certifications={portfolio.certifications} />
            </div>
        </div>
    );
}

export default Home;
