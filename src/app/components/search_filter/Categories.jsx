import React from 'react'

const Categories = ({ categories, selected = [], onChange }) => {

    const handleToggle = (category) => {
        const updated = selected.includes(category)
            ? selected.filter((c) => c !== category)
            : [...selected, category];
        onChange(updated);
    };

    return (
        <>
            <div>
                <h3 className="font-semibold mb-2">Categories</h3>
                {categories?.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selected.includes(cat.name)}
                            onChange={() => handleToggle(cat.name)}
                        />
                        {cat.name}
                    </label>
                ))}
            </div>
        </>
    )
}

export default Categories