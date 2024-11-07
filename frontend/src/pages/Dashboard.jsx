// src/pages/Dashboard.js
import React, { useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePortfolio } from '../contexts/PortfolioContext';
import Navbar from '../components/Navbar';
import api from '../services/api';
import WorkExperienceInput from '../components/WorkExperienceInput';
import EducationInput from '../components/EducationInput';
import CertificationInput from '../components/CertificationInput';
import { extractGithubUsername } from '../utils/utility';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, fetchUser } = useAuth();
  const navigate = useNavigate();
  const { portfolio, setPortfolio, updatePortfolio, loading, error, fetchGitHubUserData, fetchGitHubUserRepos } = usePortfolio();
  const { github } = portfolio;
  const username = extractGithubUsername(github);

  useEffect(() => {
    if (username) {
      console.log('Fetching GitHub data for:', username);
      fetchGitHubUserData(username);
      fetchGitHubUserRepos(username, 1);  
    }
  }, [username]);


  useEffect(() => {
    if (!user) {
      // navigate('/auth');
      fetchUser();
    }
  }, [user, navigate]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // setLoading(true);
  //   try {
  //     const response = portfolio.id
  //       ? await api.put('/portfolios/', portfolio)
  //       : await api.post('/portfolios/', portfolio);
  //     setPortfolio(response.data);
  //     alert('Portfolio saved successfully');
  //   } catch (error) {
  //     console.error('Failed to save portfolio:', error);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePortfolio(portfolio);
    toast('Portfolio updated successfully');
  };

  const handleInputChange = (field, value) => {
    setPortfolio((prevPortfolio) => ({ ...prevPortfolio, [field]: value }));
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
                <div className="col-12 mb-4">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
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
              {/* <div className="row gy-3">
                <div className="col-md-6">
                  <label htmlFor="cc-name" className="form-label">
                    Name on card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-name"
                    placeholder=""
                    required=""
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div className="invalid-feedback">Name on card is required</div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="cc-number" className="form-label">
                    Credit card number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-number"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>
                <div className="col-md-3">
                  <label htmlFor="cc-expiration" className="form-label">
                    Expiration
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">Expiration date required</div>
                </div>
                <div className="col-md-3">
                  <label htmlFor="cc-cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-cvv"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">Security code required</div>
                </div>
              </div> */}
              <hr className="my-4" />
              <CertificationInput
                certifications={portfolio.certifications || []}
                setCertifications={(certifications) => handleInputChange('certifications', certifications)}
              />
              <hr className="my-4" />
              {/* <button className="w-100 btn btn-primary btn-lg" type="submit">
                Continue to checkout
              </button> */}
              <button className="w-100 btn btn-primary btn-lg" type="submit" disabled={loading}>
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
