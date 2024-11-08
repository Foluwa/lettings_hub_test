import React, { useEffect, useMemo, useState } from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import ResumeSection from './ResumeSection';
import { extractGithubUsername } from '../utils/utility';

const Github = ({ url }) => {
    const { githubUserData, githubUserRepos, fetchGitHubUserData, fetchGitHubUserRepos, loading, error } = usePortfolio();
    const username = useMemo(() => extractGithubUsername(url), [url]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (username && !dataLoaded) {
            fetchGitHubUserData(username);
            fetchGitHubUserRepos(username, 1);
            setDataLoaded(true);
        }
    }, [username]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <ResumeSection id="github" title="GitHub User Profile">
            <div>
                {githubUserData && (
                    <div>
                        <p>Name: {githubUserData.name}</p>
                        <p>Bio: {githubUserData.bio}</p>
                        <p>Location: {githubUserData.location}</p>
                        <p>Public Repos: {githubUserData.public_repos}</p>
                    </div>
                )}

                <h3>Repositories</h3>
                <ul>
                    {githubUserRepos.map((repo) => (
                        <li key={repo.id}>
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                {repo.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </ResumeSection>
    )
}


export default Github;
