import HelpBlockDesktop from "components/blocks/HelpBlockDesktop.tsx";
import HelpBlockMobile from "components/blocks/HelpBlockMobile.tsx";
import BenefitsSection from "components/blocks/user/BenefitsSection.tsx";
import OurAdvantagesSection from "components/blocks/user/OurAdvantagesSection.tsx";
import Footer from "components/partials/Footer.tsx";
import Navbar from "components/partials/Navbar.tsx";
import TopBar from "components/partials/TopBar.tsx";
import { isMobile } from "react-device-detect";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
    return (
        <div className="bg-white min-h-screen flex flex-col max-w-screen-2xl mx-auto">
            <TopBar />
            <Navbar />
            <div className="flex-1">
                <Outlet />
            </div>
            <OurAdvantagesSection />
            <BenefitsSection />

            {isMobile ? <HelpBlockMobile /> : <HelpBlockDesktop />}
            <Footer />
        </div>
    );
};

export default UserLayout;
