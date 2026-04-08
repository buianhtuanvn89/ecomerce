"use client";

import { useRouter } from "next/navigation";

type User = {
  id: number;
  userName: string;
};

export default function UserGrid({ users }: { users: User[] }) {
  const router = useRouter();

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <span>{user.userName}</span>
          <button onClick={() => router.push(`/admin/user/${user.id}`)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}