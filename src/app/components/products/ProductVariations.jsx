
const ProductVariations = ({
    selectedOptions,
    groupedAttributes,
    handleAttributeSelect,
    isOptionAvailable,
}) => {


    return (

        <>
            <div className="space-y-4">
                {Object.entries(groupedAttributes).map(([attributeName, options]) => (
                    <div key={attributeName}>
                        <div className="flex gap-1 text-sm md:text-base mb-1">
                            <h3 className="text-neutral-600">{attributeName}:</h3>
                            <strong>{selectedOptions[attributeName] || 'Select'}</strong>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {options.map(option => {
                                const isSelected = selectedOptions[attributeName] === option.value;
                                const isAvailable = isOptionAvailable(attributeName, option.value);
                                const disabled = !isAvailable && !isSelected;

                                return (
                                    <button
                                        key={option.valueId}
                                        type="button"
                                        disabled={disabled}
                                        onClick={() => handleAttributeSelect(attributeName, option.value)}
                                        className={`px-3 py-1 border rounded transition-all duration-200   
                    ${isSelected
                                                ? 'border-primary-500 bg-primary-500 text-white cursor-pointer'
                                                : disabled
                                                    ? 'border-gray-200 bg-gray-200 text-gray-400 cursor-not-allowed'
                                                    : 'border-gray-300 bg-white text-gray-700 cursor-pointer'
                                            }`}
                                    >
                                        {option.value}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </>

    )
}

export default ProductVariations