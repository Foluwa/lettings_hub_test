import React, { useEffect } from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import ResumeSection from './ResumeSection';
import { extractGithubUsername } from '../utils/utility';

const Github = ({ url }) => {
    console.log({ url });
    const { githubUserData, githubUserRepos, fetchGitHubUserData, fetchGitHubUserRepos, loading, error } = usePortfolio();
    const username = extractGithubUsername(url);
    console.log('userName:', username);

    useEffect(() => {
        if (username) {
            console.log('Fetching GitHub data for:', username);
            fetchGitHubUserData(username);
            fetchGitHubUserRepos(username, 1);  // Fetch the first page of repos
        }
    }, [username]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    console.log({ githubUserData });
    console.log({ githubUserRepos });

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
