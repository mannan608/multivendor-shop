import { useGetCartItemsQuery } from "@/redux/api/carts/addtocart/addToCartApi";
import { useSelector } from "react-redux";

export const useSelectedCartItems = () => {
    const { data, isLoading, isFetching } = useGetCartItemsQuery();
    const products = data?.data || [];

    const { selectedItems: selectedCartItems = [] } = useSelector(
        (state) => state.cart || {}
    );

    // Filter only selected products
    const selectedProducts = products.filter((item) => {
        const key = item.product_variation_id ?? item.product_id;
        return selectedCartItems.includes(key);
    });

    return {
        selectedProducts,
        isLoading,
        isFetching,
    };
};
