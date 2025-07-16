import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Imports components
import PrimaryButton from "../components/PrimaryButton";
import SelectDropdown from "../components/SelectDropdown";
import LeaderboardTable from "../components/LeaderboardTable";

function Dashboard() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchUser();
    fetchClaimHistory();
    fetchLeaderboard();
    fetchAllUsers();
  }, [userId, page]);

  // Fetch user
  const fetchUser = async () => {
    try {
      const res = await axios.get(`/api/v1/auth/users/${userId}`);
      setUser(res.data.data);
    } catch {
      toast.error("User not found");
    }
  };

  // Claim history
  const fetchClaimHistory = async () => {
    try {
      const res = await axios.get(`/api/v1/auth/claim-history/${userId}`);
      setHistory(res.data.data);
    } catch {
      toast.error("Failed to load claim history");
    }
  };

  // Fetch leaderboard
  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(
        `/api/v1/auth/leaderboard?page=${page}&limit=${limit}`
      );
      setLeaderboard(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch {
      toast.error("Failed to fetch leaderboard");
    }
  };

  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      const res = await axios.get("/api/v1/auth/all-users");
      setAllUsers(res.data.data);
    } catch {
      toast.error("Failed to fetch users");
    }
  };

  // Handle claim points
  const handleClaim = async () => {
    try {
      const res = await axios.post(`/api/v1/auth/claim/${userId}`);
      setUser(res.data.data.user);
      toast.success(res.data.message);
      fetchClaimHistory();
      fetchLeaderboard();
    } catch {
      toast.error("Failed to claim points");
    }
  };

  // Spinner
  if (!user) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 px-4 py-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Register
        </button>
        <h1 className="text-xl font-bold">3W Intern Round 1</h1>
      </div>

      {/* Welcome & Stats */}
      <div className="bg-white md:w-4/5  mx-auto shadow-md rounded-2xl p-6 space-y-4 text-center">
        <h2 className="text-2xl font-semibold">Welcome, {user.name}</h2>
        <p className="text-gray-600">
          You have{" "}
          <span className="font-bold text-blue-600">{user.totalPoints}</span>{" "}
          points
        </p>
        <PrimaryButton text="Claim Points" onClick={handleClaim} />
        {/* Dropdown */}
        <div>
          <label className="text-sm text-gray-500">Switch User</label>
          <SelectDropdown
            options={allUsers}
            value={userId}
            onChange={(e) => navigate(`/dashboard/${e.target.value}`)}
          />
        </div>
      </div>

      {/* Leaderboard */}
      <div className="w-full md:w-4/5 mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
        <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
          <span>🏆</span> Leaderboard
        </h3>

        <LeaderboardTable data={leaderboard} />

        {/* Pagination */}
        <div className="flex justify-between items-center text-sm mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            aria-label="Previous Page"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Previous
          </button>

          <span className="text-gray-600 font-medium px-4">Page {page}</span>

          <button
            onClick={() =>
              setPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={page === totalPages}
            aria-label="Next Page"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Next
          </button>
        </div>
      </div>

      {/* Claim History */}
      <div className="w-full md:w-4/5 mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4">
        <h3 className="text-xl font-semibold text-blue-600">
          📜 Claim History
        </h3>
        {history.length === 0 ? (
          <p className="text-gray-500 italic">No claims yet.</p>
        ) : (
          <ul className="space-y-3">
            {history.map((entry, i) => (
              <li
                key={entry._id}
                className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div className="text-sm">
                  <p className="font-medium">Claimed {entry.points} pts</p>
                  <p className="text-gray-500 text-xs">
                    {new Date(entry.claimedAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
