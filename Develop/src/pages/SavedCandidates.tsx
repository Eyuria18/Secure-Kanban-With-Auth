import { useState, useEffect } from "react";

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem("candidates") || "[]");
    setCandidates(storedCandidates);
  }, []);

  const removeCandidate = (username: string) => {
    const updatedCandidates = candidates.filter((candidate) => candidate.login !== username);
    setCandidates(updatedCandidates);
    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h1>Potential Candidates</h1>

      {candidates.length === 0 ? (
        <p>No potential candidates saved.</p>
      ) : (
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate.login}>
              <img src={candidate.avatar_url} alt="Avatar" width="50" />
              <h3>{candidate.name || "No Name"}</h3>
              <p><strong>Username:</strong> {candidate.login}</p>
              <p><strong>Location:</strong> {candidate.location || "N/A"}</p>
              <p><strong>Email:</strong> {candidate.email || "N/A"}</p>
              <p><strong>Company:</strong> {candidate.company || "N/A"}</p>
              <p><strong>GitHub:</strong> <a href={candidate.html_url} target="_blank">Profile</a></p>
              
              <button onClick={() => removeCandidate(candidate.login)}>❌ Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;
