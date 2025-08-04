
"use client";
import ProductCard from '@/app/components/products/ProductCard';
import Brands from '@/app/components/search_filter/Brands';
import Categories from '@/app/components/search_filter/Categories';
import PriceRange from '@/app/components/search_filter/PriceRange';
import Ratings from '@/app/components/search_filter/Ratings';
import { useGetProductsQuery } from '@/redux/api/products/productsApi';
import { useEffect, useState } from 'react';

const Products = () => {
    const [page, setPage] = useState(1);
    const [allProducts, setAllProducts] = useState([]);

    const { data, isLoading, isFetching, isError, error } = useGetProductsQuery(page);
    useEffect(() => {
        if (data?.products) {
            setAllProducts((prev) => [...prev, ...data.products]);
        }
    }, [data]);

    const handleLoadMore = () => {
        if (data?.currentPage < data?.lastPage) {
            setPage((prev) => prev + 1);
        }
    };

    if (isError) {
        return <p className="text-red-500">Error: {error?.data?.message || 'Something went wrong'}</p>;
    }

    return (
        <div className=" min-h-screen my-12  md:mt-4 ">
            <div className='container-fluid mx-auto flex'>
                {/* Sidebar */}
                <aside className="w-64 h-fit bg-white rounded p-4 hidden lg:block">
                    <Categories />
                    <Brands />
                    <PriceRange />
                    <Ratings />
                </aside>

                {/* Product Listing */}
                <main className="flex-1 lg:ml-6 bg-white rounded p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Cup</h1>
                        <select className="border rounded px-3 py-1">
                            <option>Best Match</option>
                            <option>Price Low to High</option>
                            <option>Price High to Low</option>
                        </select>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {allProducts?.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    {/* Load More */}
                    {data?.currentPage < data?.lastPage && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleLoadMore}
                                disabled={isFetching}
                                className="px-6 py-2 bg-primary-500 text-white rounded cursor-pointer "
                            >
                                {isFetching ? 'Loading...' : 'Load More'}
                            </button>
                        </div>
                    )}
                </main>
            </div>

        </div>
    );
};

export default Products;