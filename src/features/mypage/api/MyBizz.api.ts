import ClientApi from "@/lib/clientApi";

export const getMyBizz = async () => {
  try {
    const res = await ClientApi<MyBizzResponse>("/wallet/bizz", {
      method: "GET",
    });

    return res.data.bizz;
  } catch {
    return null;
  }
};
