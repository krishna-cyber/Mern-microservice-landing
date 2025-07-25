import ProductCard from "@/components/common/productCard";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabItem, Tabs } from "flowbite-react";

import { Category, ProductType } from "@/lib/types";
import React from "react";

const CategoriesAndProduct = async ({ tenantId }: { tenantId: string }) => {
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
    `${process.env.API_URL}/api/category/product?currentPage=1&pageSize=100&tenantId=${tenantId}`,
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
    <Tabs aria-label="Tabs with underline" variant="underline">
      {categoryResult.map((category, index) => (
        <TabItem key={category._id} active={index == 0} title={category.name}>
          {productResult
            .filter((product) => product.categoryId._id == category._id)
            .map((product) => {
              return <ProductCard product={product} key={product._id} />;
            })}
        </TabItem>
      ))}
      {/* <TabItem active title="Profile">
        This is{" "}
        <span className="font-medium text-gray-800 dark:text-white">
          Profile tab&apos;s associated content
        </span>
        . Clicking another tab will toggle the visibility of this one for the
        next. The tab JavaScript swaps classes to control the content visibility
        and styling.
      </TabItem>
      <TabItem title="Dashboard">
        This is{" "}
        <span className="font-medium text-gray-800 dark:text-white">
          Dashboard tab&apos;s associated content
        </span>
        . Clicking another tab will toggle the visibility of this one for the
        next. The tab JavaScript swaps classes to control the content visibility
        and styling.
      </TabItem>
      <TabItem title="Settings">
        This is{" "}
        <span className="font-medium text-gray-800 dark:text-white">
          Settings tab&apos;s associated content
        </span>
        . Clicking another tab will toggle the visibility of this one for the
        next. The tab JavaScript swaps classes to control the content visibility
        and styling.
      </TabItem>
      <TabItem title="Contacts">
        This is{" "}
        <span className="font-medium text-gray-800 dark:text-white">
          Contacts tab&apos;s associated content
        </span>
        . Clicking another tab will toggle the visibility of this one for the
        next. The tab JavaScript swaps classes to control the content visibility
        and styling.
      </TabItem>
      <TabItem disabled title="Disabled">
        Disabled content
      </TabItem> */}

      {/* <TabsList className="grid w-fit grid-cols-2 ">
        {categoryResult.map((category) => (
          <TabsTrigger key={category._id} value={category._id}>
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList> */}

      {/* {categoryResult.map((category) => {
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
      })} */}
    </Tabs>
  );
};

export default CategoriesAndProduct;
