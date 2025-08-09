"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ProductCard from "@/app/components/products/ProductCard";
import Brands from "@/app/components/search_filter/Brands";
import Categories from "@/app/components/search_filter/Categories";
import PriceRange from "@/app/components/search_filter/PriceRange";
import Ratings from "@/app/components/search_filter/Ratings";
import { useGetBrandsQuery, useGetCategoriesQuery } from "@/redux/api/filters/filtersApi";
import { useGetProductsQuery } from "@/redux/api/products/productsApi";

const Products = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [page, setPage] = useState(1);
    const [allProducts, setAllProducts] = useState([]);

    // 🔁 Convert URL params to filters
    const filters = {
        category: searchParams.get("category_id")?.split(",") || [],
        brand: searchParams.get("brand_ids")?.split(",") || [],
        // price_min: searchParams.get("price_min") || "",
        // price_max: searchParams.get("price_max") || "",
        // rating: searchParams.get("rating") || "",
    };


    const { data, isLoading, isFetching, isError, error } = useGetProductsQuery({ page, filters });
    const { data: categories } = useGetCategoriesQuery();
    const { data: brands } = useGetBrandsQuery();

    // 🛒 Populate products list
    useEffect(() => {
        if (data?.products) {
            setAllProducts((prev) => (page === 1 ? data.products : [...prev, ...data.products]));
        }
    }, [data]);

    // 🔁 Reset page & products when filters change
    useEffect(() => {
        setPage(1);
        setAllProducts([]);
    }, [searchParams.toString()]);

    // ⏫ Update URL when filter changes
    const updateFilterInURL = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());

        if (Array.isArray(value)) {
            if (value.length) {
                params.set(key, value.join(","));
            } else {
                params.delete(key);
            }
        } else {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    const handleLoadMore = () => {
        if (data?.currentPage < data?.lastPage) {
            setPage((prev) => prev + 1);
        }
    };

    if (isError) {
        return <p className="text-red-500">Error: {error?.data?.message || "Something went wrong"}</p>;
    }

    return (
        <div className="min-h-screen my-12 md:mt-4">
            <div className="container-fluid mx-auto flex">
                {/* Sidebar */}
                <aside className="w-64 h-fit bg-white rounded p-4 hidden lg:block">
                    <Categories
                        categories={categories}
                        selected={filters.category}
                        onChange={(val) => updateFilterInURL("category_id", val)}
                    />
                    <Brands
                        brands={brands}
                        selected={filters.brand}
                        onChange={(val) => updateFilterInURL("brand_ids", val)}
                    />
                    {/* <PriceRange
                        min={filters.price_min}
                        max={filters.price_max}
                        onChange={(key, val) => updateFilterInURL(key, val)}
                    />
                    <Ratings selected={filters.rating} onChange={(val) => updateFilterInURL("rating", val)} /> */}
                </aside>

                {/* Product Listing */}
                <main className="flex-1 lg:ml-6 bg-white rounded p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Products</h1>
                        <select className="border rounded px-3 py-1">
                            <option>Best Match</option>
                            <option>Price Low to High</option>
                            <option>Price High to Low</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {allProducts?.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {data?.currentPage < data?.lastPage && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleLoadMore}
                                disabled={isFetching}
                                className="px-6 py-2 bg-primary-500 text-white rounded cursor-pointer"
                            >
                                {isFetching ? "Loading..." : "Load More"}
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Products;
