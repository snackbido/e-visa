import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import ComponentCard from "../../components/common/ComponentCard";
import { useEffect, useState } from "react";
import axios from "../../../axios/axios";

export function User() {
  const type = "user";
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get("/user");
      if (data.status === "success") {
        setUsers(data.data);
      }
    };
    getUsers();
  }, []);
  return (
    <>
      <ComponentCard title="User management">
        <BasicTableOne type={type} data={users} />
      </ComponentCard>
    </>
  );
}
