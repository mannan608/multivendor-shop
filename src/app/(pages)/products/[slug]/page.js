import { getSingleProduct } from "@/app/ssrApi/productApi/productApi";
import { getShopDetails } from "@/app/ssrApi/shopApi/shopApi";
import DelExpress from "@/app/components/icons/DelExpress";
import DelRegular from "@/app/components/icons/DelRegular";
import ProductDetails from "@/app/components/products/ProductDetails";
import ProductInformation from "@/app/components/products/ProductInformation";
import Review from "@/app/components/reviews/Review";
import Image from "next/image";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import ProductImage from "@/app/components/products/ProductImage";

const SingleProduct = async ({ params }) => {
    const { slug } = await params;
    const product = await getSingleProduct(slug);
    const shopDetails = await getShopDetails({ id: product.shop_id });

    console.log("first", product)


    return (
        <section className="single-product  mt-5 mb-5">
            <div className="container-fluid mx-auto px-5">
                <div className="flex flex-col md:flex-row gap-6 w-full bg-white p-5">
                    <div className="product-details flex-1 flex gap-5 relative ">
                        {/* <ProductDetails product={product} /> */}

                        <div className="flex flex-col lg:flex-row gap-8 w-full">
                            <div className="product-images flex flex-col gap-4 w-full lg:w-[380px] flex-shrink-0">
                                <ProductImage product={product} />
                            </div>
                            <div className="product-info flex-1">
                                <div className="space-y-6">
                                    <h1 className="text-base md:text-xl font-medium">{product.name}</h1>
                                    <ProductDetails product={product} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="vendor-info w-full md:w-[320px]">
                        <div className="flex flex-col gap-5">
                            <div className="bg-white p-4 border border-gray-200 rounded-md mb-4">
                                <h2 className="text-lg font-medium">Delivery Options</h2>
                                <div className="flex items-start gap-2 mt-2 text-neutral-400">
                                    <DelRegular />
                                    <div>
                                        <h3 className="text-base">Regular </h3>
                                        <small className="text-xs font-normal">Delivery within 2-3 days</small>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2 mt-2 text-neutral-400">
                                    <span className="w-6 h-6">
                                        <DelExpress />
                                    </span>

                                    <div>
                                        <h3 className="text-base">
                                            Express{" "}
                                            {/* <small className="text-red-500 ml-5">Not Available</small> */}
                                        </h3>
                                        <small className="">Delivery within 24 Hours.</small>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 border border-gray-200 rounded-md mb-4">
                                <h5 className="text-xs sm:text-sm text-neutral-600 mb-2">Sold by</h5>
                                <Link href="#" className="flex items-center gap-3 sm:gap-4 mb-5">
                                    <div className="w-10 h-10 border border-neutral-200 p-1 rounded-full  overflow-hidden">
                                        <Image
                                            src={
                                                shopDetails?.shop_settings?.shop_logo_and_cover?.shop_logo?.image ||
                                                "/shop_default_img.svg"
                                            }
                                            width={40}
                                            height={40}
                                            className="w-full h-full object-cover hidden tab:block rounded-full"
                                            alt="shop logo"
                                        />

                                    </div>
                                    < div>
                                        <h4 className="text-sm sm:text-base font-normal flex items-center gap-2 text-[#475569]">
                                            {shopDetails?.shop?.name}
                                            <MdVerified size={18} className="text-sky-500" />
                                        </h4>
                                        <span>
                                            <Image
                                                src="/images/risingstar.svg"
                                                alt="tag"
                                                className="mt-2"
                                                width={110}
                                                height={40}
                                            />
                                        </span>
                                    </div>
                                </Link>
                                <div className="flex flex-col sm:flex-row gap-4 text-center mb-3">
                                    <Link href="#" className=" w-full text-primary-500 text-sm sm:text-base font-medium px-4 py-2 bg-primary-500/10 rounded" >
                                        View Shop
                                    </Link>
                                    <button disabled className="w-full rounded bg-neutral-200 text-sm sm:text-base font-normal text-neutral-500 px-4 py-2 cursor-not-allowed">
                                        Chat Now
                                    </button>
                                </div>

                                <hr className="text-neutral-300" />
                                <div className="flex justify-between gap-3 mt-3">
                                    <div className="flex-1 text-center sm:text-left">
                                        <small className="text-xs sm:text-sm text-neutral-500">Ship Time</small>
                                        <h3 className="text-sm sm:text-base md:text-lg font-medium text-neutral-900">
                                            {shopDetails?.ship_on_time}%
                                        </h3>
                                    </div>
                                    <div className="flex-1 text-center sm:text-left">
                                        <small className="text-xs sm:text-sm text-neutral-500">Response</small>
                                        <h3 className="text-sm sm:text-base md:text-lg font-medium text-neutral-900">
                                            {shopDetails?.chat_response_time}%
                                        </h3>
                                    </div>
                                    <div className="flex-1 text-center sm:text-left">
                                        <small className="text-xs sm:text-sm text-neutral-500">Shop Rating</small>
                                        <h3 className="text-sm sm:text-base md:text-lg font-medium text-neutral-900">
                                            {shopDetails?.shop_rating}%
                                        </h3>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="mt-5 flex gap-6">
                    <div className="bg-white p-4  rounded w-1/2">
                        <ProductInformation title="Product Description" data={product.description} />
                    </div>
                    <div className="bg-white p-4  rounded  w-1/2">
                        <ProductInformation title="Product Specification" data={product.specification} />
                    </div>
                </div>
                <div className="bg-white p-4  rounded mt-5" >
                    <div className="rating"> sas</div>
                    <div className="reviews mt-5">
                        <Review productSlug={slug} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SingleProduct