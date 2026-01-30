import ClientApi from "@/lib/clientApi";

export const getMyBizz = async () => {
  const hasAuthCookie = document.cookie
    .split(";")
    .some(item => item.trim().startsWith("accessToken="));

  if (!hasAuthCookie) return null;

  const res = await ClientApi<MyBizzResponse>("/wallet/bizz", {
    method: "GET",
  });

  return res.data.bizz;
};
