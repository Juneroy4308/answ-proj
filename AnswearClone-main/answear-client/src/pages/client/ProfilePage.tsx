import ProfileNavigationBlock from "components/blocks/user/ProfileNavigationBlock.tsx";
import UserAccountData from "components/blocks/user/UserAccountData.tsx";

const ProfilePage = () => {
    return (
        <div className="px-[60px] py-[30px] grid grid-cols-3 bg-white">
            <div className="col-span-1">
                <ProfileNavigationBlock />
            </div>
            <div className="col-span-2">
                <UserAccountData />
            </div>
        </div>
    );
};

export default ProfilePage;
