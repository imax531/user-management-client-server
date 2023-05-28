import axios from "axios";
import { LoginDetails } from "@dtos/LoginDetails";
import { UserDTO, UserType } from "@dtos/User";

const baseUrl = "http://localhost:4000";

export function login(username: string, password: string) {
  const url = `${baseUrl}/v1/login`;
  const body = { username, password } as LoginDetails;
  return axios.post(url, body);
}

export function validateLogin(token: string) {
  const url = `${baseUrl}/v1/login/verify`;
  const body = { token };
  return axios.post(url, body);
}

export function getUsers() {
  const url = `${baseUrl}/v1/users`;
  return axios.get<UserDTO[]>(url, { withCredentials: true });
}

export function addUser(username: string) {
  const url = `${baseUrl}/v1/users`;
  const body = { username };
  return axios.post(url, body, { withCredentials: true });
}

export function deleteUser(username: string) {
  const url = `${baseUrl}/v1/users/${username}`;
  return axios.delete(url, { withCredentials: true });
}

export function editUserType(username: string, type: number) {
  const url = `${baseUrl}/v1/users/${username}/type`;
  return axios.put(url, { type }, { withCredentials: true });
}

export function editUserPassword(username: string, password: string) {
  const url = `${baseUrl}/v1/users/${username}/password`;
  return axios.put(url, { password }, { withCredentials: true });
}
