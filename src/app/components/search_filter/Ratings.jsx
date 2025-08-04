
const Ratings = () => {
    return (
        <>
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Ratings</h2>
                <ul className="space-y-1">
                    {[5, 4, 3, 2, 1].map(star => (
                        <li key={star}>
                            {'★'.repeat(star)}{'☆'.repeat(5 - star)}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Ratings