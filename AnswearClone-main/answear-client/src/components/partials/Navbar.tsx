import { IconCircleLetterA, IconHeart, IconShoppingBag, IconUser } from "@tabler/icons-react";
import { useAppSelector } from "app/hooks.ts";
import { getToken } from "app/userSlice.ts";
import { Link, useSearchParams } from "react-router-dom";
import { useGetPagedCategoriesQuery } from "services/category.ts";
import { useGetTargetGroupsQuery } from "services/targetGroup.ts";
import { checkTokenExpiration } from "utils/checkTokenExpiration.ts";

import { useEffect, useState } from "react";

const Navbar = () => {
    const [currentTargetGroup, setCurrentTargetGroup] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const token = useAppSelector(getToken);
    const isTokenValid = checkTokenExpiration(token);

    const { data: targetGroups } = useGetTargetGroupsQuery();
    const { data: categories } = useGetPagedCategoriesQuery({
        targetGroupId: currentTargetGroup,
        isParent: true,
    });

    useEffect(() => {
        if (currentTargetGroup) {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set("targetGroupId", currentTargetGroup.toString());

            setSearchParams(newSearchParams);
        }
    }, [currentTargetGroup, searchParams, setSearchParams]);

    useEffect(() => {
        setCurrentTargetGroup(targetGroups?.[0]?.id || 1);
    }, [targetGroups]);

    return (
        <>
            <div className="py-[4px] flex justify-center bg-white items-center relative w-full">
                <ul className="left-0 top-0 bottom-0 absolute flex gap-4 px-14">
                    {targetGroups?.map((targetGroup) => (
                        <li
                            className={`${targetGroup.id === currentTargetGroup ? "border-b-black" : "border-b-white "} pt-4 pb-3 border-b-4 duration-500 cursor-pointer`}
                            key={targetGroup.id}
                        >
                            <button
                                className={`${targetGroup.id === currentTargetGroup ? "text-black" : "text-[#585858]"} text-lg font-semibold hover:text-black duration-200`}
                                onClick={() => setCurrentTargetGroup(targetGroup.id)}
                                key={targetGroup.id}
                            >
                                {targetGroup.name}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="w-full flex items-center justify-center">
                    <Link to="/" className="w-full text-center">
                        <h1 className="w-full text-4xl text-black font-semibold">aria apparel</h1>
                    </Link>
                </div>

                <ul className="right-0 top-0 bottom-0 absolute flex items-center gap-10 px-14">
                    <li>
                        <Link className="text-lg font-semibold" to={isTokenValid ? "/ac" : "/login"}>
                            <IconCircleLetterA />
                        </Link>
                    </li>
                    <li>
                        <Link className="text-lg font-semibold" to={isTokenValid ? "/profile" : "/login"}>
                            {isTokenValid ? <IconUser fill="#F69B14" /> : <IconUser />}
                        </Link>
                    </li>
                    <li>
                        <Link className="text-lg font-semibold" to={isTokenValid ? "/favorites" : "/login"}>
                            <IconHeart />
                        </Link>
                    </li>
                    <li>
                        <Link className="text-lg font-semibold" to={isTokenValid ? "/cart" : "/login"}>
                            <IconShoppingBag />
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="px-14 flex bg-[#f4f4f4]">
                {categories?.items.map((category) => (
                    <Link
                        to={`/category/${category.slug}`}
                        key={category.id}
                        className="pt-4 pb-3 pe-2 hover:bg-[#fff] border-b-4 hover:border-b-4 hover:border-b-black duration-500 cursor-pointer"
                    >
                        <p className="text-[13px]">{category.name}</p>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Navbar;
