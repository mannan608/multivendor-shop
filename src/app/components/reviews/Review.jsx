import { getProductReviews } from '@/app/ssrApi/productApi/productApi';
import Image from 'next/image';
import { TiStarFullOutline } from 'react-icons/ti';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';

const Review = async ({ productSlug }) => {
    const review = await getProductReviews(productSlug);

    const formatDate = (dateString, options) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    console.log("review", review);

    return (
        <>
            <div className="border border-neutral-200 rounded-lg p-3 sm:p-4 transition-all hover:shadow-sm">
                {/* Review Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3">
                        <div className="relative shrink-0">
                            <Image
                                src={review?.user_avatar || "/merchant/m1.svg"}
                                alt={review?.user_name ? `${review.user_name}'s avatar` : "User avatar"}
                                width={56}
                                height={56}
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                                priority={false}
                            />
                        </div>
                        <div>
                            <p className="font-medium text-sm sm:text-base text-gray-900 line-clamp-1">
                                {review?.user_name || "Anonymous"}
                            </p>
                            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                                {formatDate(review?.created_at, {
                                    month: 'short',
                                    day: '2-digit',
                                    year: 'numeric',
                                })}
                                {review?.product_variant && (
                                    <span className="before:content-['•'] before:mx-2">
                                        {review.product_variant}
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <TiStarFullOutline
                                    key={i}
                                    size={20}
                                    className={i < (review?.rating || 0) ? "text-amber-400" : "text-gray-300"}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 hidden sm:inline">
                            {review?.rating}.0
                        </span>
                    </div>
                </div>

                {/* Review Content */}
                <hr className="my-3 border-gray-100" />
                <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line">
                    {review?.review}
                </p>

                {/* Review Images */}
                {review?.feedback_images?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {review.feedback_images.map((image, i) => (
                            <div key={i} className="relative w-16 h-16 sm:w-20 sm:h-20 rounded overflow-hidden">
                                <Image
                                    src={image.url}
                                    alt={`Review image ${i + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 64px, 80px"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Seller Reply */}
                {review?.seller_reply && (
                    <div className="p-3 bg-neutral-50 mt-4 rounded-md relative">
                        <div className="flex items-start gap-2">
                            <div className="relative w-4 h-4 mt-0.5 shrink-0">
                                <Image
                                    src="/sellerimg.svg"
                                    alt="Seller"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-baseline gap-1">
                                    <span className="text-sm sm:text-base font-medium text-blue-600">
                                        Seller Reply
                                    </span>
                                    <span className="text-xs text-neutral-500">
                                        {formatDate(review?.seller_reply_date, {
                                            month: 'short',
                                            day: '2-digit',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">
                                    {review.seller_reply}
                                </p>
                            </div>
                        </div>

                        {/* Menu Dropdown */}
                        <div className="absolute top-3 right-3">
                            <Menu as="div" className="relative">
                                <MenuButton
                                    className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    aria-label="Review options"
                                >
                                    <div className="relative w-5 h-5">
                                        <Image
                                            src="/3dot_menu.svg"
                                            alt="Menu"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </MenuButton>

                                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                    <div className="py-1">
                                        <MenuItem>
                                            {({ active }) => (
                                                <button
                                                    className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                        } block w-full px-4 py-2 text-left text-sm`}
                                                >
                                                    Report review
                                                </button>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ active }) => (
                                                <button
                                                    className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                        } block w-full px-4 py-2 text-left text-sm`}
                                                >
                                                    Contact support
                                                </button>
                                            )}
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Review