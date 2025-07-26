import { Button } from "flowbite-react";
import Image from "next/image";
import { Suspense } from "react";
import CategoriesAndProduct from "./components/categoriesAndProductTabs";
import ProductSkeleton from "@/components/common/productSkeleton";

export default async function Home({
  searchParams,
}: Readonly<{
  searchParams: { readonly tenantId: string };
}>) {
  const { tenantId } = await searchParams;
  return (
    <>
      <section className=" bg-white  ">
        <div className=" container py-10 mx-auto flex justify-between items-center">
          <div className=" flex flex-col gap-4">
            <h1 className=" font-semibold text-6xl leading-tight">
              Super Delicious Pizza In <br />
              <span className=" text-primary">Only 45 Minutes!</span>
            </h1>
            <p className=" max-w-lg leading-snug">
              Enjoy a free meal if your order takes more than 45 minutes!
            </p>
            <Button
              className=" w-fit rounded-full mt-8 hover:bg-orange-200 bg-orange-400 hover:text-green-400"
              size={"lg"}
            >
              Get your pizza now!
            </Button>
          </div>

          <Image
            src={"/pizza-main.png"}
            width={400}
            height={400}
            alt="main-hero-image"
          />
        </div>
      </section>
      <section>
        <div className=" container mx-auto">
          <Suspense fallback={<ProductSkeleton />}>
            <CategoriesAndProduct tenantId={tenantId} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
