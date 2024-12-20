const SkeletonProductCard = () => {
    return (
        <div className="max-w-xs group relative overflow-hidden cursor-pointer animate-pulse">
            <div className="relative">
                <div className="bg-gray-200 w-[325px] h-[495px]"></div>
            </div>

            <div className="absolute -bottom-[10px] left-0 right-0 py-1  bg-white h-[75px]">
                <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                <div className="h-4 bg-gray-200 rounded w-1/5 mt-1"></div>
            </div>
        </div>
    );
};

export default SkeletonProductCard;
