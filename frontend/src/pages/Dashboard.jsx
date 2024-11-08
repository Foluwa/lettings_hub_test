import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePortfolio } from '../contexts/PortfolioContext';
import Navbar from '../components/Navbar';
import WorkExperienceInput from '../components/WorkExperienceInput';
import EducationInput from '../components/EducationInput';
import CertificationInput from '../components/CertificationInput';
import { extractGithubUsername } from '../utils/utility';
import toast from 'react-hot-toast';
import Select from 'react-select';

const skillOptions = [
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'Python', label: 'Python' },
  { value: 'React', label: 'React' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'Django', label: 'Django' },
  { value: 'SQL', label: 'SQL' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'HTML', label: 'HTML' },
  { value: 'CSS', label: 'CSS' },
  { value: 'Ruby on Rails', label: 'Ruby on Rails' },
  { value: 'PHP', label: 'PHP' },
  { value: 'Java', label: 'Java' },
  { value: 'C#', label: 'C#' },
  { value: 'Go', label: 'Go' },
  { value: 'Swift', label: 'Swift' },
  { value: 'Kotlin', label: 'Kotlin' },
  { value: 'Angular', label: 'Angular' },
  { value: 'Vue.js', label: 'Vue.js' },
  { value: 'GraphQL', label: 'GraphQL' },
  { value: 'MongoDB', label: 'MongoDB' },
  { value: 'PostgreSQL', label: 'PostgreSQL' },
  { value: 'Firebase', label: 'Firebase' },
  { value: 'AWS', label: 'AWS' },
  { value: 'Azure', label: 'Azure' },
  { value: 'GCP', label: 'GCP' },
];

const Dashboard = () => {
  const { user, fetchUser, token, logout } = useAuth();
  const navigate = useNavigate();
  const { portfolio, setPortfolio, updatePortfolio, loading, error, fetchGitHubUserData, fetchGitHubUserRepos } = usePortfolio();

  const [initialLoad, setInitialLoad] = useState(true);

  // Memoize GitHub username extraction to prevent repeated calculations
  const username = useMemo(() => portfolio.github && extractGithubUsername(portfolio.github), [portfolio.github]);

  // Check for token on initial load, fetch user data if needed
  useEffect(() => {
    if (!token) {
      navigate('/auth');
    } else if (!user) {
      fetchUser().catch(() => navigate('/auth'));
    }
  }, [user, token, navigate, fetchUser]);

  // Only fetch GitHub data once when username changes
  useEffect(() => {
    if (username && initialLoad) {
      fetchGitHubUserData(username);
      fetchGitHubUserRepos(username, 1);
      setInitialLoad(false);
    }
  }, [username, initialLoad, fetchGitHubUserData, fetchGitHubUserRepos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePortfolio(portfolio);
      toast('Portfolio updated successfully');
    } catch (err) {
      console.error("Error updating portfolio:", err);
    }
  };

  const handleInputChange = (field, value) => {
    setPortfolio((prevPortfolio) => ({ ...prevPortfolio, [field]: value }));
  };

  const handleSkillsChange = (selectedOptions) => {
    const skills = selectedOptions.map(option => option.value);
    setPortfolio((prevPortfolio) => ({ ...prevPortfolio, skills }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log({ user });
  console.log({ portfolio });

  return (
    <div id="page-top">
      <Navbar />

      <div className="container px-5">

        <h2>Dashboard </h2>
        <p className="lead">
          Welcome, {user?.name}! Edit your portfolio
        </p>
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Admin Details </span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Name</h6>
                </div>
                <span className="text-muted">{user?.name}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Email </h6>
                </div>
                <span className="text-muted">{user?.email}</span>
              </li>

              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Logout </h6>
                </div>
                <button className="btn btn-danger mt-2 btn-sm w-50" type="button" onClick={() => {
                  if (window.confirm("Are you sure you want to log out?")) {
                    logout();
                  }
                }}>Logout</button>
              </li>
            </ul>

          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Porfolio Details</h4>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    value={portfolio.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    value={portfolio.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Location"
                    value={portfolio.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="about" className="form-label">
                    About
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="about"
                    placeholder="Location"
                    value={portfolio.about}
                    onChange={(e) => handleInputChange('about', e.target.value)}
                    required
                  />
                </div>


                <div className="col-12">

                  <label className="form-label">Interests</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter your interests"
                    value={portfolio.interests}
                    onChange={(e) => setPortfolio({ ...portfolio, interests: e.target.value })}
                  />

                </div>
                <div className="col-12">
                  <label>Skills</label>
                  <Select
                    options={skillOptions}
                    isMulti
                    value={portfolio.skills.map(skill => ({ value: skill, label: skill }))}
                    onChange={handleSkillsChange}
                    placeholder="Select skills"
                    className="multi-select"
                  />
                </div>

                <div className="row g-3  mb-4">
                  <div className="col-4">
                    <label htmlFor="github" className="form-label">
                      Github
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="github"
                      placeholder="Github"
                      value={portfolio.github}
                      onChange={(e) => handleInputChange('github', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="linkedin" className="form-label">
                      Linkedin
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="linkedin"
                      placeholder="Linkedin"
                      value={portfolio.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      required
                    />
                  </div>                  <div className="col-4">
                    <label htmlFor="twitter" className="form-label">
                      X(formerly Twitter)
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="twitter"
                      placeholder="Github"
                      value={portfolio.twitter}
                      onChange={(e) => handleInputChange('twitter', e.target.value)}
                      required
                    />
                  </div>
                </div>


              </div>
              <EducationInput
                education={portfolio.education || []}
                setEducation={(education) => handleInputChange('education', education)}
              />
              <hr className="my-4" />
              <WorkExperienceInput
                workExperience={portfolio.work_experience || []}
                setWorkExperience={(work_experience) => handleInputChange('work_experience', work_experience)}
              />

              <hr className="my-4" />
              <CertificationInput
                certifications={portfolio.certifications || []}
                setCertifications={(certifications) => handleInputChange('certifications', certifications)}
              />
              <hr className="my-4" />
              <button className="w-100 btn btn-primary btn-lg text-white" type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Update Portfolio'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
