function LeaderboardTable({ data = [] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full text-left text-sm bg-white rounded-xl overflow-hidden shadow">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th scope="col" className="px-4 py-3">
              Rank
            </th>
            <th scope="col" className="px-4 py-3">
              Name
            </th>
            <th scope="col" className="px-4 py-3">
              Total Points
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-4 py-4 text-center text-gray-400">
                No leaderboard data available.
              </td>
            </tr>
          ) : (
            data.map((user, index) => (
              <tr
                key={user.name}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition duration-150`}
              >
                <td className="px-4 py-3 font-medium text-gray-700">
                  {user.rank}
                </td>
                <td className="px-4 py-3 text-gray-700">{user.name}</td>
                <td className="px-4 py-3 text-blue-600 font-semibold">
                  {user.totalPoints}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardTable;
