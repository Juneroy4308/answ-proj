const ItemsNotFound = () => {
    return (
        <div className="grid  place-items-center bg-white px-6 py-24   ">
            <div className="text-center">
                <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-gray-900">Товарів не знайдено</h1>
                <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/20">Перегляньте інші категорії</p>
            </div>
        </div>
    );
};

export default ItemsNotFound;
