import { IconLogout, IconShirt, IconUser } from "@tabler/icons-react";
import { useAppDispatch } from "app/hooks.ts";
import { logOut } from "app/userSlice.ts";
import { Link } from "components/ui";
import { useNavigate } from "react-router-dom";

const ProfileNavigationBlock = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOut());
        navigate("/login");
    };

    const handleToProfile = () => {
        navigate("/profile");
    };

    const handleToAC = () => {
        navigate("/ac");
    };

    const handleToOrders = () => {
        navigate("/orders");
    };

    return (
        <div className="w-[300px] flex flex-col items-start text-[#585858]">
            <div className="flex flex-row items-center space-x-4 group hover:text-black hover:cursor-pointer">
                <IconUser className="w-6 h-6" stroke={2} />
                <Link
                    onClick={handleToProfile}
                    variant="spanNavigation"
                    size="span"
                    className="group-hover:text-black group-hover:font-bold group-hover:cursor-pointer"
                >
                    Мій акаунт
                </Link>
            </div>
            <div className="flex flex-row items-center space-x-4 group hover:text-black hover:cursor-pointer">
                <IconShirt className="w-6 h-6" stroke={2} />
                <Link
                    onClick={handleToOrders}
                    variant="spanNavigation"
                    size="span"
                    className="group-hover:text-black group-hover:font-bold group-hover:cursor-pointer"
                >
                    Мої замовлення
                </Link>
            </div>
            <div className="flex flex-row items-center space-x-4 group hover:text-black hover:cursor-pointer">
                <div className="flex items-center justify-center w-6 h-6 p-2 rounded-full border-3 border-[#585858] text-[#585858] font-bold text-xs group-hover:text-black group-hover:border-black group-hover:font-bold">
                    AC
                </div>
                <Link
                    onClick={handleToAC}
                    variant="spanNavigation"
                    size="span"
                    className="group-hover:text-black group-hover:font-bold group-hover:cursor-pointer"
                >
                    ANSWEARClub
                </Link>
            </div>
            {/*<div className="flex flex-row items-center space-x-4 group hover:text-black hover:cursor-pointer">*/}
            {/*    <IconMail className="w-6 h-6 " stroke={2} />*/}
            {/*    <Link*/}
            {/*        variant="spanNavigation"*/}
            {/*        size="span"*/}
            {/*        className="group-hover:text-black group-hover:font-bold group-hover:cursor-pointer"*/}
            {/*    >*/}
            {/*        Зв'язатися з нами*/}
            {/*    </Link>*/}
            {/*</div>*/}
            <div className="border-t-2 border-[#dbdce0] w-full my-2"></div>
            <div
                onClick={handleLogout}
                className="flex flex-row items-center space-x-4  group hover:text-black hover:cursor-pointer"
            >
                <IconLogout className="w-6 h-6" stroke={2} />
                <Link
                    variant="spanNavigation"
                    size="span"
                    className="group-hover:text-black group-hover:font-bold group-hover:cursor-pointer"
                >
                    Вийти
                </Link>
            </div>
        </div>
    );
};

export default ProfileNavigationBlock;
