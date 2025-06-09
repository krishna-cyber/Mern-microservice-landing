import ProductCard from "@/components/common/productCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, ProductType } from "@/lib/types";
import React from "react";

const CategoriesAndProduct = async ({
  searchParams,
}: {
  searchParams: { tenantId: string };
}) => {
  const categoryResponse = await fetch(
    `${process.env.API_URL}/api/category/category/`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!categoryResponse.ok) {
    throw Error("Failed to fetch category lists");
  }

  const category = await categoryResponse.json();
  const categoryResult: Category[] = category?.result;

  const productResponse = await fetch(
    `${process.env.API_URL}/api/category/product?currentPage=1&pageSize=100&tenantId=${searchParams.tenantId}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );
  if (!productResponse.ok) {
    throw Error(`Failed to fetch product lists`);
  }

  const product = await productResponse.json();
  const productResult: ProductType[] = product?.result;

  return (
    <Tabs defaultValue={categoryResult[0]._id}>
      <TabsList className="grid w-fit grid-cols-2 ">
        {categoryResult.map((category) => (
          <TabsTrigger key={category._id} value={category._id}>
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {categoryResult.map((category) => {
        return (
          <TabsContent key={category._id} value={category._id}>
            <div className=" grid grid-cols-4 gap-6 mt-6">
              {productResult
                .filter((product) => product.categoryId._id == category._id)
                .map((product) => {
                  return <ProductCard product={product} key={product._id} />;
                })}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default CategoriesAndProduct;
