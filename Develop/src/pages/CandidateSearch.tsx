import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNewCandidate();
  }, []);

  const fetchNewCandidate = async () => {
    setLoading(true);
    setError(null);
  
    try {
      let users = [];
      let retries = 3; // Retry 3 times if no users found
  
      while (users.length === 0 && retries > 0) {
        users = await searchGithub();
        retries--;
      }
  
      if (users.length === 0) throw new Error("No users found");
  
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const userDetails = await searchGithubUser(randomUser.login);
  
      setCandidate(userDetails);
    } catch (err) {
      setError("No more candidates available.");
      setCandidate(null);
    } finally {
      setLoading(false);
    }
  };
  

  const saveCandidate = () => {
    if (!candidate) return;

    const savedCandidates = JSON.parse(localStorage.getItem("candidates") || "[]");
    savedCandidates.push(candidate);
    localStorage.setItem("candidates", JSON.stringify(savedCandidates));

    fetchNewCandidate();
  };

  return (
    <div>
      <h1>Candidate Search</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {candidate && (
        <div>
          <img src={candidate.avatar_url} alt="Candidate Avatar" width="100" />
          <h2>{candidate.name || "No Name"}</h2>
          <p><strong>Username:</strong> {candidate.login}</p>
          <p><strong>Location:</strong> {candidate.location || "N/A"}</p>
          <p><strong>Email:</strong> {candidate.email || "N/A"}</p>
          <p><strong>Company:</strong> {candidate.company || "N/A"}</p>
          <p><strong>GitHub:</strong> <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">Profile</a></p>

          <button onClick={saveCandidate}>➕ Save & Next</button>
          <button onClick={fetchNewCandidate}>➖ Reject & Next</button>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
