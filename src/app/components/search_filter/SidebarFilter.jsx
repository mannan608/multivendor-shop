
import Categories from './Categories'
import Brands from './Brands'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const SidebarFilter = ({ filters }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateFilterInURL = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());

        if (Array.isArray(value)) {
            value.length ? params.set(key, value.join(",")) : params.delete(key);
        } else {
            value ? params.set(key, value) : params.delete(key);
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleCategoryChange = (id) => {
        updateFilterInURL("category_id", id ? [id] : []);
    };

    const handleBrandChange = (id) => {
        let selected = filters.brand.includes(String(id))
            ? filters.brand.filter((b) => b !== String(id))
            : [...filters.brand, String(id)];
        updateFilterInURL("brand_ids", selected);
    };

    return (
        <>
            <Categories
                filters={filters}
                handleCategoryChange={handleCategoryChange}
            />
            <Brands
                filters={filters}
                handleBrandChange={handleBrandChange}
            />
        </>
    )
}

export default SidebarFilter