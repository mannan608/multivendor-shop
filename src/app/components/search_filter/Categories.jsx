
const Categories = ({ categories, filters, handleCategoryChange }) => {

    return (
        <>
            <div>
                <h3 className="font-semibold mb-2">Categories</h3>
                <div className="flex flex-col gap-2">
                    {categories?.map((cat) => (
                        <label key={cat.id}
                            className={`flex items-center gap-2 cursor-pointer hover:text-primary-500 ${filters.category.includes(String(cat.id)) ? "text-primary-600 " : "text-gray-500"
                                }`}>
                            <input
                                className="hidden"
                                type="radio"
                                name="category"
                                checked={filters.category.includes(String(cat.id))}
                                onChange={() => handleCategoryChange(cat.id)}
                            />
                            <span>{cat.name}</span>
                        </label>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Categories