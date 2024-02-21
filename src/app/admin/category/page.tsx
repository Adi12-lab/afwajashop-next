import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Categories from "./client";

async function Category() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL + "/category",
        {
          method: "GET",
          cache: 'no-store'
        },
      );
      const result = await response.json();
      return result;
      // return axiosInstance.get('/category')
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Categories />
    </HydrationBoundary>
  );
}

export default Category;
