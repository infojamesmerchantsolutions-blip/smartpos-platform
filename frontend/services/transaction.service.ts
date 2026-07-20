import api from "@/lib/axios";

export async function getTransaction(id: string) {
  const { data } = await api.get(`/transactions/${id}`);
  return data.data;
}