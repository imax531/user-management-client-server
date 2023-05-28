"use client";
import * as crud from "@/crud";
import { Table } from "@components/Table";
import { UserDTO } from "@dtos/User";
import { useEffect, useState } from "react";
import { useJWT } from "@/hooks/useJWT";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { AddUserForm } from "./AddUserForm";

export default function UsersPage() {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userDetails = useJWT();
  const router = useRouter();

  if (!userDetails) {
    router.push("/login");
  }

  async function fetchUsers() {
    try {
      const result = await crud.getUsers();
      setUsers(result.data);
    } catch (e) {
      setErrorMessage("Error loading users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function onAddUser(username: string) {
    try {
      await crud.addUser(username);
      await fetchUsers();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError;
        setErrorMessage(axiosError.message);
      } else {
        setErrorMessage("An error occured");
        console.log(e);
      }
    }
  }

  const tableColumns = [
    { title: "Username", key: "username", dataIndex: "username" },
    {
      title: "Password",
      key: "password",
      dataIndex: "password",
      defaultValue: "••••",
      editable: userDetails?.isAdmin,
      onEdit: (data: UserDTO & { password?: string }) =>
        data.password &&
        crud.editUserPassword(data.username, data.password).then(fetchUsers),
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      editable: userDetails?.isAdmin,
      onEdit: (data: UserDTO) =>
        crud.editUserType(data.username, data.type).then(fetchUsers),
    },
  ];

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="my-4 flex justify-between">
          <div>Hi {userDetails?.username}!</div>
          <a href="#" onClick={userDetails?.clear}>
            Logout
          </a>
        </div>

        <Table
          columns={tableColumns}
          data={users}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onDelete={
            userDetails?.isAdmin
              ? (user) => crud.deleteUser(user.username).then(fetchUsers)
              : undefined
          }
        />

        <p className="mt-6 text-base leading-7 text-red-600">{errorMessage}</p>

        {userDetails?.isAdmin && <AddUserForm onAddUser={onAddUser} />}
      </div>
    </div>
  );
}
