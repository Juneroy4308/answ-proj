import BenefitsOfRegistrationCard from "components/cards/benefits/BenefitsOfRegistrationCard.tsx";
import LoginForm from "components/form/LoginForm.tsx";
import SignUpForm from "components/form/SignUpForm.tsx";

const LoginPage = () => {
    return (
        <div className="px-[60px] py-[30px] flex bg-white">
            <BenefitsOfRegistrationCard />
            <LoginForm />
            <SignUpForm />
        </div>
    );
};

export default LoginPage;
