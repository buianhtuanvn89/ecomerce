"use client";

import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  totalElement: number;
  size: number;
  page: number;
};

export default function ProductPagination({ totalElement, size, page }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page - 1)); // AntD bắt đầu từ 1, Spring từ 0

    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination
        current={page + 1}
        pageSize={size}
        total={totalElement}
        onChange={handleChange}
        showQuickJumper
    />
  );
}