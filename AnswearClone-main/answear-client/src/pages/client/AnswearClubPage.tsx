import ProfileNavigationBlock from "components/blocks/user/ProfileNavigationBlock.tsx";

import React from "react";

const AnswearClubPage: React.FC = () => {
    return (
        <div className="flex px-[60px] pt-[30px] bg-white ">
            {/* Sidebar */}
            <div className="w-1/3  space-y-6">
                <ProfileNavigationBlock />
            </div>

            {/* Main Content */}
            <main className="w-2/4 p-6 space-y-6">
                <h2 className="text-2xl font-semibold">Вітаємо Вас в ANSWEARClub!</h2>
                <p>Створюйте акаунт і приєднуйтесь до ANSWEARClub!</p>

                <h2 className="text-lg font-medium mb-6">Як працює Клуб?</h2>

                <div className="space-y-8">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-sm mr-2 font-medium self-center">1</span>
                            <div className="flex-1">
                                <p className="text-base mb-1">
                                    Все дуже просто! Створіть свій акаунт на answear.ua і Ви вже - Член
                                    <span className="font-bold text-black"> ANSWEARClub.</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 px-8">
                            <div className="flex flex-col items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                                    <path d="M16.111 12.111a5.556 5.556 0 1 1 5.556-5.555 5.562 5.562 0 0 1-5.556 5.555Zm0-8.889a3.333 3.333 0 1 0 0 6.667 3.333 3.333 0 0 0 0-6.667Zm0 27.778a34.906 34.906 0 0 1-6.863-.731 1.111 1.111 0 1 1 .506-2.164 33.11 33.11 0 0 0 6.357.673c2.64-.001 7.172-.45 8.889-1.63v-1.704a8.889 8.889 0 0 0-17.778 0v2.223a1.111 1.111 0 0 1-2.222 0v-2.223c0-6.136 4.975-11.11 11.111-11.11 6.137 0 11.111 4.974 11.111 11.11v2.223c0 .294-.117.577-.325.785C24.42 30.928 16.954 31 16.11 31Z" />
                                </svg>
                                <div className="text-center">
                                    <div className="text-sm">Створити акаунт</div>
                                </div>
                            </div>

                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                                <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                            </svg>

                            <div className="flex flex-col items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="ac">
                                    <g fill="none" fillRule="evenodd">
                                        <circle cx="16" cy="16" r="13.9" stroke="#000" strokeWidth="2.2" />
                                        <path
                                            fill="#000"
                                            fillRule="nonzero"
                                            d="M7.736 20a.406.406 0 0 0 .406-.266l.644-1.694h4.144l.644 1.694c.075.177.21.266.406.266h1.246a.292.292 0 0 0 .203-.084.274.274 0 0 0 .091-.21l-.028-.126-3.36-9.03c-.093-.233-.261-.35-.504-.35h-1.54c-.243 0-.41.117-.504.35l-3.36 9.03-.028.126A.285.285 0 0 0 6.49 20h1.246Zm4.704-3.584H9.276l1.582-4.312 1.582 4.312Zm8.148 3.724c.83 0 1.554-.142 2.17-.427.616-.285 1.094-.674 1.435-1.169.34-.495.52-1.05.539-1.666a.235.235 0 0 0-.077-.21.309.309 0 0 0-.217-.084H23.08c-.112 0-.196.026-.252.077a.59.59 0 0 0-.14.273c-.14.579-.385.987-.735 1.225-.35.238-.805.357-1.365.357-1.335 0-2.03-.747-2.086-2.24-.01-.27-.014-.667-.014-1.19v-.216a29.9 29.9 0 0 1 .014-.946c.056-1.493.751-2.24 2.086-2.24.57 0 1.027.119 1.372.357.345.238.588.646.728 1.225a.59.59 0 0 0 .14.273c.056.051.14.077.252.077h1.358a.307.307 0 0 0 .203-.077.238.238 0 0 0 .091-.189v-.028a3.038 3.038 0 0 0-.539-1.666c-.34-.495-.819-.884-1.435-1.169-.616-.285-1.34-.427-2.17-.427-1.279 0-2.273.334-2.982 1.001-.71.667-1.087 1.598-1.134 2.793a30.88 30.88 0 0 0-.013.856v.801c.002.368.006.646.013.835.047 1.213.422 2.149 1.127 2.807.705.658 1.701.987 2.989.987Z"
                                        />
                                    </g>
                                </svg>
                                <div className="text-center">
                                    <div className="text-sm">ANSWEARClub</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-sm mr-2 font-medium self-center">2</span>
                            <div className="flex-1">
                                <p className="text-base">
                                    Відтепер від кожної Вашої покупки
                                    <span className="font-bold text-black"> 5% від вартості замовлення </span>
                                    буде відкладено на Ваш рахунок ANSWEARClub.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 px-8">
                            <div className="flex flex-col items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="19" fill="none" className="shoes">
                                    <path
                                        fill="#000"
                                        d="m11.935 0 .163.01a2.388 2.388 0 0 1 1.913 1.297c1.676 3.304 3.512 5.49 5.475 6.58a15.373 15.373 0 0 0 6.39 1.93A4.456 4.456 0 0 1 30 14.262a4.5 4.5 0 0 1-4.5 4.5H4a4 4 0 0 1-4-4v-9.5a2.5 2.5 0 0 1 2.5-2.5c1.34 0 2.509.913 2.834 2.213l.136.545a1.64 1.64 0 0 0 1.592 1.243H7.5c.899 0 1.65-.686 1.73-1.58l.274-3.011a2.388 2.388 0 0 1 2.27-2.17l.16-.001ZM27.95 14.762H2a2 2 0 0 0 2 2h21.5a2.5 2.5 0 0 0 2.45-2ZM11.917 2.002a.388.388 0 0 0-.421.35l-.274 3.01a3.738 3.738 0 0 1-3.722 3.4h-.438A3.64 3.64 0 0 1 3.53 6.004l-.136-.545a.921.921 0 0 0-.894-.697.5.5 0 0 0-.5.5v7.499h25.488a2.452 2.452 0 0 0-1.595-.93l-.166-.019a17.295 17.295 0 0 1-6.54-1.82l-1.48 1.477a1 1 0 1 1-1.414-1.415l1.125-1.126c-.4-.295-.791-.627-1.175-.994l-1.536 1.535a1 1 0 1 1-1.414-1.415l1.602-1.602c-.941-1.174-1.83-2.589-2.667-4.24a.388.388 0 0 0-.311-.21Z"
                                    />
                                </svg>
                                <div className="text-center">
                                    <div className="text-sm">Ціна</div>
                                    <div className="text-sm text-gray-600 font-bold">2000 грн</div>
                                </div>
                            </div>

                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                                <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                            </svg>

                            <div className="flex flex-col items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="ac">
                                    <g fill="none" fillRule="evenodd">
                                        <circle cx="16" cy="16" r="13.9" stroke="#000" strokeWidth="2.2" />
                                        <path
                                            fill="#000"
                                            fillRule="nonzero"
                                            d="M7.736 20a.406.406 0 0 0 .406-.266l.644-1.694h4.144l.644 1.694c.075.177.21.266.406.266h1.246a.292.292 0 0 0 .203-.084.274.274 0 0 0 .091-.21l-.028-.126-3.36-9.03c-.093-.233-.261-.35-.504-.35h-1.54c-.243 0-.41.117-.504.35l-3.36 9.03-.028.126A.285.285 0 0 0 6.49 20h1.246Zm4.704-3.584H9.276l1.582-4.312 1.582 4.312Zm8.148 3.724c.83 0 1.554-.142 2.17-.427.616-.285 1.094-.674 1.435-1.169.34-.495.52-1.05.539-1.666a.235.235 0 0 0-.077-.21.309.309 0 0 0-.217-.084H23.08c-.112 0-.196.026-.252.077a.59.59 0 0 0-.14.273c-.14.579-.385.987-.735 1.225-.35.238-.805.357-1.365.357-1.335 0-2.03-.747-2.086-2.24-.01-.27-.014-.667-.014-1.19v-.216a29.9 29.9 0 0 1 .014-.946c.056-1.493.751-2.24 2.086-2.24.57 0 1.027.119 1.372.357.345.238.588.646.728 1.225a.59.59 0 0 0 .14.273c.056.051.14.077.252.077h1.358a.307.307 0 0 0 .203-.077.238.238 0 0 0 .091-.189v-.028a3.038 3.038 0 0 0-.539-1.666c-.34-.495-.819-.884-1.435-1.169-.616-.285-1.34-.427-2.17-.427-1.279 0-2.273.334-2.982 1.001-.71.667-1.087 1.598-1.134 2.793a30.88 30.88 0 0 0-.013.856v.801c.002.368.006.646.013.835.047 1.213.422 2.149 1.127 2.807.705.658 1.701.987 2.989.987Z"
                                        />
                                    </g>
                                </svg>
                                <div className="text-center">
                                    <div className="text-sm">Заощаджуйте 5%</div>
                                    <div className="text-sm text-gray-600 font-bold">100 AC</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-sm mr-2 font-medium self-center">3</span>
                            <div className="flex-1">
                                <p className="text-base">
                                    На що можеш використати накопичені бонуси? На знижки до -50% на наступні покупки!
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 px-8">
                            <div className="flex flex-col items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="t-shirt">
                                    <path
                                        fill="#000"
                                        fillRule="evenodd"
                                        d="M17.493 7.59c-.442 0-.8.412-.8.919v11.78H7.07V8.51c0-.507-.36-.92-.801-.92-.442 0-.8.413-.8.92v.966l-2.61-1.023 2.403-3.633c.467-.707 1.168-1.112 1.924-1.112h1.511c.643 1.357 1.857 2.196 3.184 2.196 1.327 0 2.54-.839 3.184-2.196h1.51c.756 0 1.458.405 1.926 1.112l2.401 3.633-2.61 1.024v-.967c0-.507-.358-.92-.8-.92m5.358.764-3.075-4.649c-.772-1.167-1.938-1.837-3.2-1.837h-2.028c-.338 0-.64.246-.753.611-.295.948-1.064 1.586-1.913 1.586-.85 0-1.618-.638-1.913-1.586-.113-.365-.416-.61-.754-.61H7.186c-1.26 0-2.428.669-3.2 1.836L.914 8.353a1.037 1.037 0 0 0-.13.818.876.876 0 0 0 .507.61l4.179 1.64v9.789c0 .507.358.92.8.92h11.224c.441 0 .8-.413.8-.92v-9.79l4.179-1.64a.88.88 0 0 0 .508-.61 1.04 1.04 0 0 0-.13-.816"
                                    />
                                </svg>
                                <div className="text-center">
                                    <div className="text-sm">Ціна</div>
                                    <div className="text-sm text-gray-600 font-bold">500 грн</div>
                                </div>
                            </div>

                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                                <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                            </svg>

                            <div className="flex flex-col items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="ac">
                                    <g fill="none" fillRule="evenodd">
                                        <circle cx="16" cy="16" r="13.9" stroke="#000" strokeWidth="2.2" />
                                        <path
                                            fill="#000"
                                            fillRule="nonzero"
                                            d="M7.736 20a.406.406 0 0 0 .406-.266l.644-1.694h4.144l.644 1.694c.075.177.21.266.406.266h1.246a.292.292 0 0 0 .203-.084.274.274 0 0 0 .091-.21l-.028-.126-3.36-9.03c-.093-.233-.261-.35-.504-.35h-1.54c-.243 0-.41.117-.504.35l-3.36 9.03-.028.126A.285.285 0 0 0 6.49 20h1.246Zm4.704-3.584H9.276l1.582-4.312 1.582 4.312Zm8.148 3.724c.83 0 1.554-.142 2.17-.427.616-.285 1.094-.674 1.435-1.169.34-.495.52-1.05.539-1.666a.235.235 0 0 0-.077-.21.309.309 0 0 0-.217-.084H23.08c-.112 0-.196.026-.252.077a.59.59 0 0 0-.14.273c-.14.579-.385.987-.735 1.225-.35.238-.805.357-1.365.357-1.335 0-2.03-.747-2.086-2.24-.01-.27-.014-.667-.014-1.19v-.216a29.9 29.9 0 0 1 .014-.946c.056-1.493.751-2.24 2.086-2.24.57 0 1.027.119 1.372.357.345.238.588.646.728 1.225a.59.59 0 0 0 .14.273c.056.051.14.077.252.077h1.358a.307.307 0 0 0 .203-.077.238.238 0 0 0 .091-.189v-.028a3.038 3.038 0 0 0-.539-1.666c-.34-.495-.819-.884-1.435-1.169-.616-.285-1.34-.427-2.17-.427-1.279 0-2.273.334-2.982 1.001-.71.667-1.087 1.598-1.134 2.793a30.88 30.88 0 0 0-.013.856v.801c.002.368.006.646.013.835.047 1.213.422 2.149 1.127 2.807.705.658 1.701.987 2.989.987Z"
                                        />
                                    </g>
                                </svg>
                                <div className="text-center">
                                    <div className="text-sm">Оплата коштами AC</div>
                                    <div className="text-sm text-gray-600 font-bold">
                                        500 грн -<span className="text-black"> 100 AC</span>= 400 грн
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-sm mr-2 font-medium self-center">4</span>
                            <div className="flex-1">
                                <p className="text-base">
                                    Коштами Ви можете сплатити до половини вартості товару - новинок й тих, що вже на розпродажі.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 px-8">
                            <div className="flex flex-col items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="t-shirt">
                                    <path
                                        fill="#000"
                                        fillRule="evenodd"
                                        d="M17.493 7.59c-.442 0-.8.412-.8.919v11.78H7.07V8.51c0-.507-.36-.92-.801-.92-.442 0-.8.413-.8.92v.966l-2.61-1.023 2.403-3.633c.467-.707 1.168-1.112 1.924-1.112h1.511c.643 1.357 1.857 2.196 3.184 2.196 1.327 0 2.54-.839 3.184-2.196h1.51c.756 0 1.458.405 1.926 1.112l2.401 3.633-2.61 1.024v-.967c0-.507-.358-.92-.8-.92m5.358.764-3.075-4.649c-.772-1.167-1.938-1.837-3.2-1.837h-2.028c-.338 0-.64.246-.753.611-.295.948-1.064 1.586-1.913 1.586-.85 0-1.618-.638-1.913-1.586-.113-.365-.416-.61-.754-.61H7.186c-1.26 0-2.428.669-3.2 1.836L.914 8.353a1.037 1.037 0 0 0-.13.818.876.876 0 0 0 .507.61l4.179 1.64v9.789c0 .507.358.92.8.92h11.224c.441 0 .8-.413.8-.92v-9.79l4.179-1.64a.88.88 0 0 0 .508-.61 1.04 1.04 0 0 0-.13-.816"
                                    />
                                </svg>
                                <div className="text-center">
                                    <div className="text-sm">Розпродаж</div>
                                    <div className="text-sm text-gray-600">
                                        <span className="line-through font-bold">500 грн</span>
                                        <span className="text-red-700 font-bold"> 400 грн</span>
                                    </div>
                                </div>
                            </div>

                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                                <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                            </svg>

                            <div className="flex flex-col items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="ac">
                                    <g fill="none" fillRule="evenodd">
                                        <circle cx="16" cy="16" r="13.9" stroke="#000" strokeWidth="2.2" />
                                        <path
                                            fill="#000"
                                            fillRule="nonzero"
                                            d="M7.736 20a.406.406 0 0 0 .406-.266l.644-1.694h4.144l.644 1.694c.075.177.21.266.406.266h1.246a.292.292 0 0 0 .203-.084.274.274 0 0 0 .091-.21l-.028-.126-3.36-9.03c-.093-.233-.261-.35-.504-.35h-1.54c-.243 0-.41.117-.504.35l-3.36 9.03-.028.126A.285.285 0 0 0 6.49 20h1.246Zm4.704-3.584H9.276l1.582-4.312 1.582 4.312Zm8.148 3.724c.83 0 1.554-.142 2.17-.427.616-.285 1.094-.674 1.435-1.169.34-.495.52-1.05.539-1.666a.235.235 0 0 0-.077-.21.309.309 0 0 0-.217-.084H23.08c-.112 0-.196.026-.252.077a.59.59 0 0 0-.14.273c-.14.579-.385.987-.735 1.225-.35.238-.805.357-1.365.357-1.335 0-2.03-.747-2.086-2.24-.01-.27-.014-.667-.014-1.19v-.216a29.9 29.9 0 0 1 .014-.946c.056-1.493.751-2.24 2.086-2.24.57 0 1.027.119 1.372.357.345.238.588.646.728 1.225a.59.59 0 0 0 .14.273c.056.051.14.077.252.077h1.358a.307.307 0 0 0 .203-.077.238.238 0 0 0 .091-.189v-.028a3.038 3.038 0 0 0-.539-1.666c-.34-.495-.819-.884-1.435-1.169-.616-.285-1.34-.427-2.17-.427-1.279 0-2.273.334-2.982 1.001-.71.667-1.087 1.598-1.134 2.793a30.88 30.88 0 0 0-.013.856v.801c.002.368.006.646.013.835.047 1.213.422 2.149 1.127 2.807.705.658 1.701.987 2.989.987Z"
                                        />
                                    </g>
                                </svg>
                                <div className="text-center">
                                    <div className="text-sm">Оплата коштами AC</div>
                                    <div className="text-sm text-gray-600 font-bold">
                                        400 грн -<span className="text-black"> 100 AC</span>= 300 грн
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/*<div className="w-1/3 p-6"></div>*/}
        </div>
    );
};

export default AnswearClubPage;