
export function calculateDiscountPercentage(regularPrice, discountedPrice) {
    const regPrice = Number(regularPrice);
    const discPrice = Number(discountedPrice);

    if (isNaN(regPrice) || isNaN(discPrice) || regPrice <= 0 || discPrice < 0) {
        return 0;
    }

    const discountAmount = regPrice - discPrice;
    const discountPercentage = (discountAmount / regPrice) * 100;

    return Math.round(discountPercentage * 100) / 100;
}
