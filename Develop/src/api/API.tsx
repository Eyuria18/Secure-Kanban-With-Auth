const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

console.log("GitHub Token:", GITHUB_TOKEN ? "Loaded" : "Not Loaded");

const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 1000000) + 1;
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API Error: ${errorData.message}`);
    }

    return await response.json();
  } catch (err) {
    console.error("API Error:", err);
    return [];
  }
};



const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
