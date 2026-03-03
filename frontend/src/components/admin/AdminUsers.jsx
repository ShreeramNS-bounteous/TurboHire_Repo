import { useEffect, useState } from "react";
import {
  getAllUsers,
  getRoles,
  getBusinessUnits,
  createUser
} from "../../api/adminUserService";

import UsersTable from "../../components/admin/UsersTable";
import CreateUserModal from "../../components/admin/CreateUserModal";

export default function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [businessUnits, setBusinessUnits] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const loadData = async () => {
    const usersData = await getAllUsers();
    const rolesData = await getRoles();
    const buData = await getBusinessUnits();

    setUsers(usersData);
    setRoles(rolesData);
    setBusinessUnits(buData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateUser = async (formData) => {
    await createUser(formData);
    setShowModal(false);
    loadData();
    };
    
   
    console.log(users);

  return (
    <div className="p-8 space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg"
        >
          + Create User
        </button>
      </div>

      <UsersTable users={users} />

      {showModal && (
        <CreateUserModal
          roles={roles}
          businessUnits={businessUnits}
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateUser}
        />
      )}

    </div>
  );
}