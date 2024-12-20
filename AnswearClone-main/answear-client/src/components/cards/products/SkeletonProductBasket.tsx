const SkeletonProductBasket = () => {
    return (
        <div className="lg:col-span-7 animate-pulse">
            <div className="bg-gray-100 p-6">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 flex items-center gap-2"></div>
                <div className="bg-yellow-400 p-4 mb-6 h-16 rounded"></div>
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
            </div>
        </div>
    );
};

export default SkeletonProductBasket;
