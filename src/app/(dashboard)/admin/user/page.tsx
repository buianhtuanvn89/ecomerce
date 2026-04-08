import DataPagination from "@/app/component/DataPagination";
import SortDropdown from "@/app/component/SortDropdown";
import UserGrid from "@/app/component/UserGrid";
import UserSearch from "@/app/component/UserSearch";
import UserSort from "@/app/component/UserSort";

type Props = {
  searchParams: {
    page?: string;
    size?: string;
    search?: string;
    sort?: string;
  };
};

async function getUsers(params: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users?${params}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function Page({ searchParams }: Props) {
  const queryParams = new URLSearchParams();
  const paramsObj = await searchParams;

  Object.entries(paramsObj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, v));
    } else if (value) {
      queryParams.append(key, value);
    }
  });

  const query = queryParams.toString();

  const usersPage = await getUsers(query);
  const users = usersPage.content;

  return (
    <div>
      <h1>User Management</h1>

      {/* SEARCH */}
      <UserSearch />

      {/* SORT */}
      <UserSort />

      {/* LIST */}
      <UserGrid users={users} />


      {/* PAGINATION */}
      <DataPagination
        totalElement={usersPage.totalElements}
        size={usersPage.size}
        page={usersPage.number}
      />
    </div>
  );
}