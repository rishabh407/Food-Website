import { useQuery } from "@tanstack/react-query";
import { getmenuItemsbyid } from "../api/apifunctions";

export const useCategoryItems = (category) => {
  return useQuery({
    queryKey: ["categoryItems", category],
    queryFn: () => getmenuItemsbyid(category),
    enabled: !!category,
  });
};
