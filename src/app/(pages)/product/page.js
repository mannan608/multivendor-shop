
import ProductCard from '@/app/components/products/ProductCard';

const Product = () => {

    return (
        <div className=" min-h-screen mt-[50px] md:mt-3 ">
            <div className='container-fluid mx-auto flex'>
                {/* Sidebar */}
                <aside className="w-64 bg-white rounded p-4 hidden lg:block">
                    <h2 className="text-xl font-semibold mb-4">Categories</h2>
                    <ul className="space-y-2 text-gray-700">
                        <li>Cups, Mugs & Saucers</li>
                        <li className="text-blue-500 font-semibold">Cookware Sets</li>
                        <li>Teapots & Coffee Servers</li>
                        <li>Everyday Glassware</li>
                        <li>Playsets - Kitchen Toys</li>
                        <li>Drink Bottles</li>
                        <li>Baby Cups</li>
                    </ul>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Price range</h2>
                        <input type="range" min={0} max={5000} className="w-full" />
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Ratings</h2>
                        <ul className="space-y-1">
                            {[5, 4, 3, 2, 1].map(star => (
                                <li key={star}>
                                    {'★'.repeat(star)}{'☆'.repeat(5 - star)}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Brands</h2>
                        <ul className="space-y-2">
                            <li><input type="checkbox" /> Hitachi</li>
                            <li><input type="checkbox" /> Walton</li>
                            <li><input type="checkbox" /> Marcel</li>
                            <li><input type="checkbox" /> Samsung</li>
                            <li><input type="checkbox" /> Whirlpool</li>
                        </ul>
                    </div>
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
                        {[...Array(12)].map((_, index) => (
                            <ProductCard key={index} />
                        ))}
                    </div>
                </main>
            </div>

        </div>
    );
};

export default Product;