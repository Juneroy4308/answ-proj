import { IconPencil } from "@tabler/icons-react";
import { useAppSelector } from "app/hooks.ts";
import { getUser } from "app/userSlice.ts";
import ChangeEmailForm from "components/form/ChangeEmailForm.tsx";
import ChangePasswordForm from "components/form/ChangePasswordForm.tsx";
// import ChangeUserDataForm from "components/form/ChangeUserDataForm.tsx";
import { Button } from "components/ui";
import Label from "components/ui/Label.tsx";

import { useState } from "react";

const UserAccountData = () => {
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    // const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);

    const user = useAppSelector(getUser);

    return (
        <div className="grid grid-cols-2">
            <div className="col-span-1 my-[25px]">
                <Label size="bigBold">Персональні дані</Label>
                {/*<div*/}
                {/*    className={`w-[410px] mt-[25px] ${*/}
                {/*        isEditingUserInfo ? "bg-white" : "h-[230px] bg-[#f7f7f7] px-[30px] py-[27px]"*/}
                {/*    }`}*/}
                {/*>*/}
                {/*    <div className="flex flex-row justify-between items-start">*/}
                {/*        {isEditingUserInfo ? (*/}
                {/*            <ChangeUserDataForm user={user} setIsEditingUserInfo={setIsEditingUserInfo} />*/}
                {/*        ) : (*/}
                {/*            <div className="space-y-1">*/}
                {/*                <div className="flex flex-row space-x-1">*/}
                {/*                    {user?.firstName && <Label size="bold">{user.firstName}</Label>}*/}
                {/*                    {user?.lastName && <Label size="bold">{user.lastName}</Label>}*/}
                {/*                </div>*/}
                {/*                {user?.email && <Label size={user?.firstName ? "normal" : "bold"}>{user.email}</Label>}*/}
                {/*            </div>*/}
                {/*        )}*/}
                {/*        {!isEditingUserInfo && (*/}
                {/*            <div*/}
                {/*                className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center cursor-pointer"*/}
                {/*                onClick={() => setIsEditingUserInfo(!isEditingUserInfo)}*/}
                {/*            >*/}
                {/*                <IconPencil className="w-5 h-5" stroke={1} />*/}
                {/*            </div>*/}
                {/*        )}*/}
                {/*    </div>*/}
                {/*</div>*/}

                {isEditingEmail ? (
                    <ChangeEmailForm setIsEditingEmail={setIsEditingEmail} />
                ) : (
                    <div className="w-[410px] my-[27px] ">
                        <div className=" py-[27px] px-[27px] bg-[#f7f7f7]">
                            <div className="flex flex-row justify-between items-start">
                                <div className="space-y-1">
                                    <div className="flex flex-row space-x-1">
                                        {user?.firstName && <Label size="bold">{user.firstName}</Label>}
                                        {user?.lastName && <Label size="bold">{user.lastName}</Label>}
                                    </div>
                                    {user?.email && <Label size={user?.firstName ? "normal" : "bold"}>{user.email}</Label>}
                                </div>
                                <div
                                    className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center cursor-pointer"
                                    onClick={() => setIsEditingEmail(true)}
                                    // onClick={() => setIsEditingPassword(!isEditingPassword)}
                                    // className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center"
                                >
                                    <IconPencil className="w-5 h-5" stroke={1} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <Label size="bigBold" className="my-[25px]">
                        Мої адреси доставки
                    </Label>
                    <div className="w-[410px]">
                        <Button variant="normalBorder" size="full">
                            Додати адресу доставки
                        </Button>
                    </div>
                </div>

                <div className="w-[410px]">
                    <Label size="bigBold" className="my-[25px]">
                        Змінити пароль
                    </Label>
                    {isEditingPassword ? (
                        <ChangePasswordForm setIsEditingPassword={setIsEditingPassword} />
                    ) : (
                        <div className="px-[30px] py-[27px] bg-[#f7f7f7]">
                            <div>
                                <div className="flex flex-row justify-between">
                                    <Label size="bold">**********</Label>
                                    <div
                                        className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center"
                                        onClick={() => setIsEditingPassword(true)}
                                    >
                                        <IconPencil className="w-5 h-5" stroke={1} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="col-span-1">
                <div>
                    <Label size="bigBold" className="my-[27px]">
                        Доставка за замовчуванням
                    </Label>
                    <div className="w-[410px] px-[30px] py-[27px] bg-[#f7f7f7]">
                        <Label size="bold">відсутнє</Label>
                    </div>
                </div>
                <div>
                    <Label size="bigBold" className="my-[25px]">
                        Спосіб оплати за замовчуванням
                    </Label>
                    <div className="w-[410px] px-[30px] py-[27px] bg-[#f7f7f7]">
                        <Label size="bold">відсутнє</Label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAccountData;
