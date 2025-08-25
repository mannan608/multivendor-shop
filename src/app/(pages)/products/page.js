"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/app/components/products/ProductCard";
import { useGetProductsQuery } from "@/redux/api/products/productsApi";
import SidebarFilter from "@/app/components/search_filter/SidebarFilter";

const Products = () => {
    const searchParams = useSearchParams();
    const [page, setPage] = useState(1);
    const [allProducts, setAllProducts] = useState([]);
    const filters = {
        category: searchParams.get("category_id")?.split(",") || [],
        brand: searchParams.get("brand_ids")?.split(",") || [],
    };
    const { data, isLoading, isFetching, isError, error } = useGetProductsQuery({ page, filters });

    useEffect(() => {
        setPage(1);
        setAllProducts([]);
    }, [searchParams.toString()]);
    useEffect(() => {
        if (data?.products) {
            setAllProducts((prev) =>
                page === 1 ? data.products : [...prev, ...data.products]
            );
        }
    }, [data]);

    const handleLoadMore = () => {
        if (data?.currentPage < data?.lastPage) {
            setPage((prev) => prev + 1);
        }
    };

    if (isError) {
        return (
            <p className="text-red-500 p-4">
                Error: {error?.data?.message || "Something went wrong"}
            </p>
        );
    }


    return (
        <div className="min-h-screen my-12 md:mt-4">
            <div className="container-fluid mx-auto flex">
                {/* Sidebar */}
                <aside className="w-64 h-fit bg-white rounded p-4 hidden lg:block">
                    <SidebarFilter
                        filters={filters}
                    />
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

                    {
                        allProducts?.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {allProducts?.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-64">
                                <p className="text-center">No products found</p>
                            </div>
                        )
                    }

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
