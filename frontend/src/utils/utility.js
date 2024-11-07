export const extractGithubUsername = (url) => {
    // Use regular expression to capture the username
    const match = url.match(/github\.com\/([^\/]+)/);
    return match ? match[1] : null;
}