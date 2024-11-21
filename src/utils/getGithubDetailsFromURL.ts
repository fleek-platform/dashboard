type GitHubDetails = {
  username?: string;
  repoName?: string;
};

export const extractGitHubDetailsFromURL = (url: string): GitHubDetails => {
  if (!url) {
    return {
      username: undefined,
      repoName: undefined,
    };
  }

  const pattern = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)(\/|$)/;
  const match = url.match(pattern);

  if (match) {
    return {
      username: match[1],
      repoName: match[2],
    };
  } else {
    return {
      username: undefined,
      repoName: undefined,
    };
  }
};
