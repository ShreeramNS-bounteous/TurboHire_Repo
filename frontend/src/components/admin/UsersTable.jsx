export default function UsersTable({ users }) {

    return (
      <div className="bg-white rounded-2xl shadow-md border overflow-hidden">
  
        <table className="w-full text-sm">
  
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Business Unit</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
  
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{user.fullName}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.roleName}</td>
                <td className="p-4">{user.businessUnitName}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded-lg bg-green-100 text-green-700">
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
  
        </table>
      </div>
    );
  }