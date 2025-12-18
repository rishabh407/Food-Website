import { useQuery } from "@tanstack/react-query";
import { getmenuItems } from "../api/apifunctions";

export const useAllItems = () => {
  return useQuery({
    queryKey: ["allItems"],
    queryFn: getmenuItems,
  });
};
