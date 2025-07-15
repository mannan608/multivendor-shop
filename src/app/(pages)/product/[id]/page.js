

const SingleProduct = ({ params }) => {
    const id = params.id
    console.log("first", id)

    return (
        <div>

            <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-lg font-semibold">single product</p> <p>Current route: </p>

            </div>
        </div>
    )
}

export default SingleProduct