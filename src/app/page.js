import axios from "axios";
import { cookies } from "next/headers";

export async function getUserDetail() {
  const token = cookies().get("token").value;
  const res = await axios.get("http://localhost:3000/api/users/currentUser", {
    headers: {
      Cookie: `token=${token}`,
    },
  });
  return res.data.data;
}

export default async function Home() {
  const user = await getUserDetail();
  console.log(user, "User");
  return (
    <>
      <h1>Main Page </h1>
      <h1>Welcome {user.name} </h1>
    </>
  );
}
