// hooks/useProductVariation.js
import { useEffect, useMemo, useState } from "react";

export function useProductVariation(attributes, variations, initialSelected = {}) {
    const [selectedOptions, setSelectedOptions] = useState(initialSelected);
    const [selectedAttributes, setSelectedAttributes] = useState({});

    // Group attributes by name
    const groupedAttributes = useMemo(() => {
        const map = {};
        attributes.forEach(attr => {
            if (!map[attr.name]) map[attr.name] = [];
            if (!map[attr.name].some(o => o.value === attr.value)) {
                map[attr.name].push(attr);
            }
        });
        return map;
    }, [attributes]);

    // Available variants (with quantity > 0)
    const availableVariants = useMemo(() => {
        return variations?.filter(v => v.quantity > 0) || [];
    }, [variations]);

    // Check if an attribute option is available
    const isOptionAvailable = (attributeName, value) => {
        const tempSelections = {
            ...selectedAttributes,
            [attributeName]: value,
        };

        return availableVariants.some(variant =>
            Object.entries(tempSelections).every(([attrName, attrVal]) =>
                variant.variant.some(
                    v => v.attribute_name === attrName && v.attribute_option === attrVal
                )
            )
        );
    };

    // Select an attribute option
    const handleAttributeSelect = (attributeName, value) => {
        const newSelections = {
            ...selectedAttributes,
            [attributeName]: value,
        };

        setSelectedAttributes(newSelections);
        setSelectedOptions(prev => ({
            ...prev,
            [attributeName]: value,
        }));
    };

    // Auto-select first available option for each attribute
    useEffect(() => {
        Object.entries(groupedAttributes).forEach(([attrName, options]) => {
            if (!selectedOptions[attrName]) {
                const firstAvailable = options.find(opt =>
                    isOptionAvailable(attrName, opt.value)
                );
                if (firstAvailable) {
                    setSelectedOptions(prev => ({
                        ...prev,
                        [attrName]: firstAvailable.value,
                    }));
                    setSelectedAttributes(prev => ({
                        ...prev,
                        [attrName]: firstAvailable.value,
                    }));
                }
            }
        });
    }, [groupedAttributes]);

    // Get selected variant
    const selectedVariant = useMemo(() => {
        if (!Object.keys(selectedOptions).length) return null;
        return availableVariants.find(variant =>
            Object.entries(selectedOptions).every(([attrName, attrVal]) =>
                variant.variant.some(
                    v => v.attribute_name === attrName && v.attribute_option === attrVal
                )
            )
        );
    }, [selectedOptions, availableVariants]);

    return {
        selectedOptions,
        setSelectedOptions,
        handleAttributeSelect,
        isOptionAvailable,
        groupedAttributes,
        selectedVariant, // ✅ Added
    };
}
