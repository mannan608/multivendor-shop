import { getSingleProduct } from "@/app/api/productsApi/productsApi";
import ProductDetails from "@/app/components/products/ProductDetails";


const SingleProduct = async ({ params }) => {
    const slug = await params.slug;
    const product = await getSingleProduct(slug);

    console.log("first", product)

    return (
        <section className="single-product  mt-5">
            <div className="container-fluid mx-auto px-5">
                <div className="flex flex-col md:flex-row gap-6 w-full bg-white p-5">
                    <div className="product-details flex-1 flex gap-5 relative ">
                        <ProductDetails product={product} />
                    </div>
                    <div className="vendor-info w-full md:w-[320px] lg:block hidden">
                        <div className="flex flex-col gap-5">
                            <div className="bg-white p-4 border border-gray-200 rounded-md mb-4">
                                <h4 className="text-xl font-semibold mb-2">Vendor Information</h4>
                                <p className="text-sm text-gray-600">Vendor: {product.vendor}</p>
                                <p className="text-sm text-gray-600">Email: {product.vendor_email}</p>
                                <p className="text-sm text-gray-600">Phone: {product.vendor_phone}</p>
                            </div>
                            <div className="bg-white p-4 border border-gray-200 rounded-md mb-4">
                                <h4 className="text-xl font-semibold mb-2">Vendor Information</h4>
                                <p className="text-sm text-gray-600">Vendor: {product.vendor}</p>
                                <p className="text-sm text-gray-600">Email: {product.vendor_email}</p>
                                <p className="text-sm text-gray-600">Phone: {product.vendor_phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SingleProduct