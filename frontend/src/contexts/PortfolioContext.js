import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';
import { useAuth } from './AuthContext';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState({
    first_name: '',
    last_name: '',
    location: '',
    about: '',
    education: [],
    work_experience: [],
    skills: [],
    interests: '',
    certifications: [],
    github: '',
    linkedin: '',
    twitter: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [githubUserData, setGitHubUserData] = useState(null);
  const [githubUserRepos, setGitHubUserRepos] = useState([]);
  const { token } = useAuth();

  // Flag to track if data has already been fetched
  const [isPortfolioFetched, setIsPortfolioFetched] = useState(false);

  // Fetch portfolios if not already fetched
  useEffect(() => {
    const fetchPortfolios = async () => {
      if (isPortfolioFetched) return; 

      setLoading(true);
      try {
        const response = await api.get('/api/v1/portfolios');
        setPortfolio(response.data);
        setIsPortfolioFetched(true);
      } catch (err) {
        setError('Failed to fetch portfolios');
        console.error('Error fetching portfolios:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [isPortfolioFetched]);

  // Function to create a new portfolio
  const createPortfolio = async (newPortfolio) => {
    setLoading(true);
    try {
      const response = await api.post('/', newPortfolio);
      setPortfolio((prevPortfolios) => [...prevPortfolios, response.data]);
    } catch (err) {
      setError('Failed to create portfolio');
      console.error('Error creating portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  const updatePortfolio = async (updatedPortfolio) => {
    try {
      const response = updatedPortfolio.id
        ? await api.put('/api/v1/portfolios/', updatedPortfolio, {
          headers: { Authorization: `Bearer ${token}` },
        })
        : await api.post('/api/v1/portfolios/', updatedPortfolio, {
          headers: { Authorization: `Bearer ${token}` },
        });
      setPortfolio(response.data);
    } catch (error) {
      console.error('Failed to save portfolio:', error);
      setError('Failed to save portfolio.');
    }
  };

  // Fetch GitHub user data with memoization and error handling
  const fetchGitHubUserData = useCallback(async (username) => {
    if (!username || githubUserData) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setGitHubUserData(response.data);
    } catch (err) {
      setError('Failed to load GitHub user data');
    } finally {
      setLoading(false);
    }
  }, [githubUserData]);

  // Fetch GitHub user repositories with memoization and error handling
  const fetchGitHubUserRepos = useCallback(async (username, page = 1, perPage = 10) => {
    if (!username || githubUserRepos.length > 0) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`
      );
      setGitHubUserRepos(response.data);
    } catch (err) {
      setError('Failed to load GitHub repositories');
    } finally {
      setLoading(false);
    }
  }, [githubUserRepos]);

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        setPortfolio,
        loading,
        error,
        createPortfolio,
        updatePortfolio,
        githubUserData,
        githubUserRepos,
        fetchGitHubUserData,
        fetchGitHubUserRepos,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);