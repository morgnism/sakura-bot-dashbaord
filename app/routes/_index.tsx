import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import MainLayout from '~/components/MainLayout';
import { authenticator } from '~/server/auth.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.isAuthenticated(request);
};

export default function HomePage() {
  return (
    <MainLayout>
      <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
        <section className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 md:pb-32 lg:flex lg:px-6 lg:py-40">
            <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-white md:text-6xl">
                Deploy to the cloud with confidence
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#d1d5db]">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  to="#"
                  className=" rounded-md bg-[#6366f1] px-[0.875rem] py-[0.625rem] text-sm font-semibold text-white shadow-sm hover:bg-[hsl(239,84%,67%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f46e5]"
                >
                  Add to Discord
                </Link>
                <Link
                  to="#"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  Explore Features
                </Link>
              </div>
            </div>
            <div className="mx-auto mt-16 flex max-w-2xl md:ml-10 md:mt-24 lg:ml-32 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none">
              <div className="max-w-3xl flex-none md:max-w-5xl lg:max-w-none">
                <img
                  src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                  alt="App screenshot"
                  width="2432"
                  height="1442"
                  className="w-[76rem] rounded-md bg-white"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1240px] !py-16 px-6 lg:!py-24 lg:px-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-5 md:gap-28">
            <div className="md:col-span-2">
              <h2 className="text-dark-100 undefined text-[35px] font-bold leading-[42px]">
                All-in-One Discord Bot
              </h2>
              {/* <button className="brand-bg-color text-dark-100 hover:bg-brand-hover active:brand-bg-color disabled:hover:brand-bg-color">
            Add to Discord
          </button> */}
            </div>
            <div className="grid grid-cols-1 gap-x-24 gap-y-10 md:col-span-3 md:grid-cols-2">
              <div className="aos-init aos-animate text-center md:text-left">
                <div className="mx-auto max-w-max md:mx-0 md:min-h-[48px] md:max-w-[48px]">
                  <svg
                    width="48"
                    height="48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                  >
                    <g clipPath="url(#clip0_456_5136)">
                      <path
                        opacity="0.2"
                        d="M26.7891 40.022C33.077 34.2156 33.7202 24.6851 28.2258 18.735C22.7314 12.7849 13.1799 12.6684 6.89205 18.4748C0.604167 24.2811 -0.0390474 33.8116 5.45538 39.7617C10.9498 45.7118 20.5013 45.8283 26.7891 40.022Z"
                        fill="#3994FF"
                      ></path>
                      <path
                        opacity="0.2"
                        d="M41.6428 34.0476C48.1269 28.06 47.6199 16.9647 40.5104 9.2656C33.4009 1.56647 22.381 0.179001 15.8969 6.1666C9.4127 12.1542 9.91966 23.2495 17.0292 30.9486C24.1387 38.6478 35.1586 40.0352 41.6428 34.0476Z"
                        fill="#3994FF"
                      ></path>
                      <path
                        d="M40.5005 15.06V21.48C40.5005 22.5029 40.0942 23.4839 39.3709 24.2072C38.6476 24.9305 37.6665 25.3369 36.6436 25.3369H10.5511C10.0445 25.3371 9.54275 25.2375 9.07459 25.0438C8.60644 24.8501 8.18104 24.5661 7.8227 24.2079C7.46436 23.8497 7.18009 23.4245 6.98615 22.9564C6.79221 22.4883 6.69238 21.9867 6.69238 21.48V15.06C6.69238 14.5534 6.79221 14.0517 6.98615 13.5836C7.18009 13.1155 7.46436 12.6903 7.8227 12.3321C8.18104 11.9739 8.60644 11.6899 9.07459 11.4962C9.54275 11.3025 10.0445 11.2029 10.5511 11.2031H36.6418C37.1484 11.2029 37.6501 11.3025 38.1183 11.4962C38.5865 11.6899 39.0118 11.9739 39.3702 12.3321C39.7285 12.6903 40.0128 13.1155 40.2067 13.5836C40.4007 14.0517 40.5005 14.5534 40.5005 15.06Z"
                        fill="#5ACFF5"
                      ></path>
                      <g opacity="0.5" style={{ mixBlendMode: 'overlay' }}>
                        <path
                          d="M40.5004 15.06V21.48C40.5004 22.5029 40.094 23.4839 39.3707 24.2072C38.6474 24.9305 37.6664 25.3369 36.6435 25.3369H23.6348V11.2031H36.6416C37.1483 11.2029 37.65 11.3025 38.1182 11.4962C38.5863 11.6899 39.0117 11.9739 39.3701 12.3321C39.7284 12.6903 40.0127 13.1155 40.2066 13.5836C40.4006 14.0517 40.5004 14.5534 40.5004 15.06Z"
                          fill="black"
                        ></path>
                      </g>
                      <path
                        d="M38.1076 12.8719V23.7375C38.1078 24.0728 38.042 24.4048 37.9138 24.7146C37.7857 25.0245 37.5978 25.306 37.3608 25.5432C37.1238 25.7803 36.8424 25.9685 36.5327 26.0968C36.2229 26.2252 35.891 26.2913 35.5557 26.2913H11.5763C11.241 26.2913 10.909 26.2252 10.5993 26.0968C10.2896 25.9685 10.0082 25.7803 9.77119 25.5432C9.5342 25.306 9.34627 25.0245 9.21814 24.7146C9.09 24.4048 9.02418 24.0728 9.02443 23.7375V12.8719C9.02344 12.5361 9.08872 12.2035 9.21652 11.893C9.34432 11.5825 9.53213 11.3003 9.7692 11.0626C10.0063 10.8248 10.2879 10.6362 10.598 10.5075C10.9081 10.3788 11.2406 10.3125 11.5763 10.3125H35.5557C35.6119 10.3125 35.6682 10.3125 35.7244 10.3125C36.373 10.355 36.9809 10.6436 37.4238 11.1193C37.8668 11.595 38.1113 12.2219 38.1076 12.8719Z"
                        fill="#B3EEFF"
                      ></path>
                      <g opacity="0.5" style={{ mixBlendMode: 'overlay' }}>
                        <path
                          d="M38.108 12.8719V23.7375C38.1083 24.0728 38.0425 24.4048 37.9143 24.7146C37.7862 25.0245 37.5983 25.306 37.3613 25.5432C37.1243 25.7803 36.8429 25.9685 36.5332 26.0968C36.2234 26.2252 35.8914 26.2912 35.5562 26.2912H23.5918V10.3256H35.7249C36.3712 10.368 36.9772 10.6548 37.4198 11.1277C37.8624 11.6006 38.1085 12.2242 38.108 12.8719Z"
                          fill="black"
                        ></path>
                      </g>
                      <path
                        d="M21.5625 26.2856H25.62V38.6606C25.6195 39.1977 25.4061 39.7127 25.0265 40.0926C24.6469 40.4726 24.1321 40.6865 23.595 40.6875C23.3278 40.688 23.0631 40.6357 22.8162 40.5336C22.5692 40.4315 22.3449 40.2817 22.156 40.0926C21.9672 39.9036 21.8175 39.6791 21.7157 39.4321C21.6138 39.1851 21.5618 38.9203 21.5625 38.6531V26.2781V26.2856Z"
                        fill="#5ACFF5"
                      ></path>
                      <g opacity="0.5" style={{ mixBlendMode: 'overlay' }}>
                        <path
                          d="M25.5983 26.2856V38.8256C25.5983 39.3179 25.4027 39.7901 25.0546 40.1382C24.7065 40.4863 24.2343 40.6819 23.742 40.6819H23.5039V26.2856H25.5983Z"
                          fill="black"
                        ></path>
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_456_5136">
                        <rect width="48" height="48" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h4 className="text-dark-100 mb-5 mt-4 text-[22px] font-bold">
                  Feature 1
                </h4>
                <p className="text-dark-300 text-base">Feature description 1</p>
              </div>
              <div className="aos-init aos-animate text-center md:text-left">
                <div className="mx-auto max-w-max md:mx-0 md:min-h-[48px] md:max-w-[48px]">
                  <svg
                    width="48"
                    height="48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#prefix__clip0_48_2461)">
                      <g clipPath="url(#prefix__clip1_48_2461)">
                        <path
                          opacity="0.2"
                          d="M32.379 37.659c4.08-7.523 1.618-16.752-5.5-20.614-7.12-3.862-16.199-.895-20.28 6.628-4.081 7.523-1.619 16.753 5.5 20.615 7.119 3.862 16.198.894 20.28-6.63z"
                          fill="#3994FF"
                        ></path>
                        <path
                          opacity="0.2"
                          d="M44.515 27.216c4.209-7.758.153-18.098-9.058-23.095s-20.09-2.76-24.3 4.998c-4.208 7.758-.152 18.098 9.06 23.095 9.21 4.998 20.09 2.76 24.298-4.998z"
                          fill="#3994FF"
                        ></path>
                        <path
                          d="M33.43 7.555c-1.894-1.365-5.605-1.026-8.45.77-.36.23-.69.505-.98.818a4.978 4.978 0 00-.99-.818c-2.85-1.796-6.56-2.137-8.454-.77-.696.508-1.056 1.17-1.056 1.914.005.36.081.716.225 1.046.394.947 1.292 1.9 2.528 2.681 1.642 1.04 3.909 1.257 5.508 1.257.638.002 1.275-.034 1.909-.107l.33-.04.326.04c.633.073 1.27.109 1.907.107h.375c1.568-.032 3.619-.29 5.138-1.25 1.235-.783 2.133-1.735 2.527-2.682.47-1.159.167-2.239-.844-2.966zM18.803 11.35c-.733-.465-1.275-1.018-1.485-1.52-.15-.36-.058-.533-.037-.55.157-.112 1.6-.095 3.157.89.642.404.912 1.124 1.01 1.745-.927-.024-2.003-.161-2.64-.565h-.005zm11.852-1.52c-.21.502-.75 1.056-1.483 1.52-.64.404-1.714.54-2.644.563.098-.624.375-1.34 1.007-1.746a5.698 5.698 0 012.831-.937c.111-.01.223.007.327.047.039.054.056.12.049.187a.955.955 0 01-.083.366h-.004z"
                          fill="#B3EEFF"
                        ></path>
                        <path
                          opacity="0.15"
                          d="M33.43 7.554c-1.894-1.365-5.605-1.025-8.45.77-.36.23-.69.505-.98.818v3.7l2.606 1.605c1.568-.032 3.619-.29 5.138-1.25 1.235-.783 2.133-1.735 2.527-2.682.473-1.153.169-2.233-.842-2.96zm-2.77 2.277c-.21.502-.75 1.055-1.483 1.52-.64.403-1.714.54-2.644.563.098-.625.375-1.34 1.007-1.746a5.698 5.698 0 012.831-.937c.111-.01.223.006.327.046.039.055.056.122.048.188a.955.955 0 01-.086.366z"
                          fill="#005FED"
                        ></path>
                        <path
                          d="M39.527 17.813v18.603a4.271 4.271 0 01-4.277 4.272H12.726a4.271 4.271 0 01-4.268-4.272V17.813a4.27 4.27 0 014.268-4.277H35.25a4.27 4.27 0 014.277 4.277z"
                          fill="#5ACFF5"
                        ></path>
                        <path
                          opacity="0.15"
                          d="M39.527 17.813v18.603a4.271 4.271 0 01-4.277 4.272H24V13.535h11.25a4.27 4.27 0 014.277 4.277z"
                          fill="#005FED"
                        ></path>
                        <path
                          d="M40.313 16.946v2.074c0 .499-.342.902-.766.902H8.454c-.423 0-.765-.403-.765-.902v-2.074c0-1.893 1.313-3.43 2.912-3.43H37.4c1.601 0 2.913 1.537 2.913 3.43z"
                          fill="#5ACFF5"
                        ></path>
                        <path
                          d="M40.313 27.06v.482a1.863 1.863 0 01-1.83 1.896H9.518a1.864 1.864 0 01-1.83-1.896v-.482a1.862 1.862 0 011.828-1.893h28.967a1.861 1.861 0 011.83 1.893z"
                          fill="#B3EEFF"
                        ></path>
                        <path
                          opacity="0.15"
                          d="M24 13.515v6.407H8.454c-.423 0-.765-.403-.765-.902v-2.074c0-1.893 1.313-3.43 2.912-3.43H24zM40.313 27.06v.482a1.864 1.864 0 01-1.83 1.896H24v-4.271h14.483a1.861 1.861 0 011.83 1.893z"
                          fill="#005FED"
                        ></path>
                        <path
                          d="M26.128 14.389v25.048a1.875 1.875 0 01-1.895 1.847h-.48a1.875 1.875 0 01-1.896-1.847V14.389a1.875 1.875 0 011.896-1.845h.48a1.875 1.875 0 011.895 1.845z"
                          fill="#B3EEFF"
                        ></path>
                        <path
                          opacity="0.15"
                          d="M26.128 14.389v25.048a1.875 1.875 0 01-1.895 1.847H24v-28.74h.24a1.875 1.875 0 011.888 1.845z"
                          fill="#005FED"
                        ></path>
                      </g>
                    </g>
                    <defs>
                      <clipPath id="prefix__clip0_48_2461">
                        <path fill="#fff" d="M0 0h48v48H0z"></path>
                      </clipPath>
                      <clipPath id="prefix__clip1_48_2461">
                        <path fill="#fff" d="M0 0h48v48H0z"></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h4 className="text-dark-100 mb-5 mt-4 text-[22px] font-bold">
                  Feature 2
                </h4>
                <p className="text-dark-300 text-base">Feature description 2</p>
              </div>
              <div className="aos-init aos-animate text-center md:text-left">
                <div className="mx-auto max-w-max md:mx-0 md:min-h-[48px] md:max-w-[48px]">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.12 33.466c4.825-5.9 4.211-14.384-1.372-18.95-5.583-4.567-14.02-3.486-18.846 2.414-4.825 5.9-4.21 14.384 1.372 18.95 5.583 4.566 14.02 3.485 18.846-2.414z"
                      fill="#3994FF"
                      fillOpacity="0.16"
                    ></path>
                    <path
                      d="M36.528 26.443c4.976-6.084 3.154-15.806-4.07-21.715-7.225-5.908-17.115-5.766-22.091.318-4.976 6.084-3.154 15.805 4.07 21.714 7.225 5.909 17.115 5.767 22.09-.317z"
                      fill="#3994FF"
                      fillOpacity="0.16"
                    ></path>
                    <path
                      d="M34.453 20a14.375 14.375 0 11-28.75 0 14.375 14.375 0 0128.75 0z"
                      fill="#5ACFF5"
                    ></path>
                    <path
                      opacity="0.1"
                      d="M34.375 20A14.375 14.375 0 0120 34.375V5.625A14.375 14.375 0 0134.375 20z"
                      fill="#000"
                    ></path>
                    <path
                      d="M13.244 20.03c1.49 0 2.697-1.313 2.697-2.934 0-1.62-1.208-2.934-2.697-2.934-1.49 0-2.697 1.314-2.697 2.934 0 1.621 1.207 2.935 2.697 2.935zM26.911 20.234c1.49 0 2.697-1.314 2.697-2.934 0-1.621-1.208-2.935-2.697-2.935-1.49 0-2.697 1.314-2.697 2.935 0 1.62 1.208 2.934 2.697 2.934z"
                      fill="#313442"
                    ></path>
                    <path
                      d="M13.984 16.797a.938.938 0 100-1.875.938.938 0 000 1.875zM27.734 16.953a.938.938 0 100-1.875.938.938 0 000 1.875z"
                      fill="#F2F2F2"
                    ></path>
                    <path
                      d="M28.875 5c.408-.68.722-2.686.88-3.883a.111.111 0 01.218 0c.157 1.19.497 3.201 1.085 4.081A3.016 3.016 0 0032.8 6.403a.11.11 0 010 .21c-.48.157-1.242.458-1.75.966-.507.508-.882 2.388-1.059 3.563a.111.111 0 01-.219 0c-.13-1.17-.437-3.022-1.103-3.628-.504-.46-1.394-.747-1.973-.896a.11.11 0 010-.214c.647-.154 1.64-.514 2.178-1.404zM33.264 8.07c.256-.427.453-1.686.552-2.438a.069.069 0 11.137 0c.098.747.313 2.01.681 2.563.261.376.65.645 1.094.756a.069.069 0 010 .133c-.405.117-.779.323-1.094.604-.333.333-.554 1.499-.665 2.236a.069.069 0 11-.138 0c-.081-.734-.273-1.895-.692-2.276-.313-.29-.875-.469-1.238-.563a.069.069 0 010-.132c.396-.094 1.025-.32 1.363-.883zM8.906 31.486c.313-.535.567-2.111.692-3.052a.086.086 0 11.172 0c.124.938.391 2.516.852 3.208.327.47.814.807 1.37.947a.086.086 0 010 .165c-.378.12-.976.36-1.375.758-.398.399-.694 1.875-.833 2.8a.088.088 0 01-.171 0c-.104-.92-.344-2.375-.868-2.851-.397-.363-1.093-.588-1.55-.703a.086.086 0 010-.17c.502-.115 1.29-.4 1.711-1.102zM6.077 29.21c.182-.313.325-1.207.395-1.746a.05.05 0 01.098 0c.07.534.224 1.44.488 1.834.186.27.464.461.781.541a.05.05 0 01.035.048.05.05 0 01-.035.047c-.29.085-.556.233-.781.435-.24.237-.397 1.072-.477 1.6a.05.05 0 01-.049.04.05.05 0 01-.05-.04c-.057-.527-.196-1.358-.494-1.632a2.27 2.27 0 00-.888-.401.048.048 0 010-.095c.284-.068.734-.229.977-.632z"
                      fill="#FFE570"
                    ></path>
                    <path
                      d="M25.156 23.783v.045a5.156 5.156 0 11-10.312 0v-.045a1.045 1.045 0 011.048-1.049h8.216a1.045 1.045 0 011.048 1.049z"
                      fill="#313442"
                    ></path>
                    <path
                      d="M20.625 28.438v.514a5.157 5.157 0 01-5.49-3.405h2.602a2.885 2.885 0 012.888 2.89z"
                      fill="#E2003D"
                    ></path>
                  </svg>
                </div>
                <h4 className="text-dark-100 mb-5 mt-4 text-[22px] font-bold">
                  Feature 3
                </h4>
                <p className="text-dark-300 text-base">Feature description 3</p>
              </div>
              <div className="aos-init aos-animate text-center md:text-left">
                <div className="mx-auto max-w-max md:mx-0 md:min-h-[48px] md:max-w-[48px]">
                  <svg
                    width="48"
                    height="48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                  >
                    <g clipPath="url(#clip0_444_1361)">
                      <path
                        opacity="0.2"
                        d="M37.6156 28.8992C44.3481 25.4139 47.1321 17.4237 43.8339 11.0526C40.5357 4.68157 32.4042 2.34221 25.6717 5.82752C18.9392 9.31284 16.1552 17.303 19.4534 23.6741C22.7516 30.0452 30.8831 32.3845 37.6156 28.8992Z"
                        fill="#3994FF"
                      ></path>
                      <path
                        opacity="0.2"
                        d="M27.036 37.3001C33.9791 33.7057 36.1477 24.1086 31.8797 15.8643C27.6118 7.61995 18.5234 3.85039 11.5803 7.44473C4.63726 11.0391 2.46867 20.6362 6.73665 28.8805C11.0046 37.1248 20.093 40.8944 27.036 37.3001Z"
                        fill="#3994FF"
                      ></path>
                      <path
                        d="M21.5454 30.9019H26.4092V40.3013C26.4092 40.9477 26.1524 41.5677 25.6953 42.0248C25.2381 42.482 24.6181 42.7388 23.9717 42.7388C23.3252 42.7388 22.7052 42.482 22.2481 42.0248C21.791 41.5677 21.5342 40.9477 21.5342 40.3013V30.9019H21.5454Z"
                        fill="#5ACFF5"
                      ></path>
                      <g opacity="0.5" style={{ mixBlendMode: 'overlay' }}>
                        <path
                          d="M26.4093 30.9019V40.2994C26.414 40.615 26.3564 40.9284 26.2399 41.2217C26.1235 41.5151 25.9503 41.7826 25.7304 42.0089C25.5104 42.2353 25.2481 42.4161 24.9582 42.541C24.6683 42.6659 24.3567 42.7325 24.0411 42.7369H24.0205V30.9019H26.4093Z"
                          fill="black"
                        ></path>
                      </g>
                      <g opacity="0.6" style={{ mixBlendMode: 'overlay' }}>
                        <path
                          d="M21.5454 31.8206H26.4092V32.6344C26.4092 32.7338 26.3697 32.8292 26.2993 32.8995C26.229 32.9699 26.1336 33.0094 26.0342 33.0094H21.9092C21.8097 33.0094 21.7143 32.9699 21.644 32.8995C21.5737 32.8292 21.5342 32.7338 21.5342 32.6344V31.8206H21.5454Z"
                          fill="black"
                        ></path>
                      </g>
                      <path
                        d="M20.6475 30.1125H27.3506V30.7238C27.3506 31.0848 27.2072 31.431 26.9519 31.6863C26.6966 31.9416 26.3504 32.085 25.9893 32.085H22.0087C21.6477 32.085 21.3014 31.9416 21.0462 31.6863C20.7909 31.431 20.6475 31.0848 20.6475 30.7238V30.1125Z"
                        fill="#5ACFF5"
                      ></path>
                      <g opacity="0.5" style={{ mixBlendMode: 'overlay' }}>
                        <path
                          d="M27.3524 30.1125V30.7238C27.3524 31.0848 27.209 31.431 26.9537 31.6863C26.6984 31.9416 26.3522 32.085 25.9911 32.085H24.0205V30.1125H27.3524Z"
                          fill="black"
                        ></path>
                      </g>
                      <path
                        d="M26.092 5.26877H21.907C18.1625 5.26877 15.127 8.30428 15.127 12.0488V23.595C15.127 27.3395 18.1625 30.375 21.907 30.375H26.092C29.8364 30.375 32.872 27.3395 32.872 23.595V12.0488C32.872 8.30428 29.8364 5.26877 26.092 5.26877Z"
                        fill="#B3EEFF"
                      ></path>
                      <path
                        d="M20.8728 11.3569H16.984C16.5263 11.3569 16.1553 11.7279 16.1553 12.1856V12.6225C16.1553 13.0802 16.5263 13.4512 16.984 13.4512H20.8728C21.3305 13.4512 21.7015 13.0802 21.7015 12.6225V12.1856C21.7015 11.7279 21.3305 11.3569 20.8728 11.3569Z"
                        fill="#5ACFF5"
                      ></path>
                      <path
                        d="M24.3883 11.3569H23.6946C23.2058 11.3569 22.8096 11.7531 22.8096 12.2419V12.5662C22.8096 13.055 23.2058 13.4512 23.6946 13.4512H24.3883C24.8771 13.4512 25.2733 13.055 25.2733 12.5662V12.2419C25.2733 11.7531 24.8771 11.3569 24.3883 11.3569Z"
                        fill="#5ACFF5"
                      ></path>
                      <path
                        d="M31.1003 11.3569H27.2116C26.7539 11.3569 26.3828 11.7279 26.3828 12.1856V12.6225C26.3828 13.0802 26.7539 13.4512 27.2116 13.4512H31.1003C31.558 13.4512 31.9291 13.0802 31.9291 12.6225V12.1856C31.9291 11.7279 31.558 11.3569 31.1003 11.3569Z"
                        fill="#5ACFF5"
                      ></path>
                      <path
                        d="M20.8728 16.9012H16.984C16.5263 16.9012 16.1553 17.2723 16.1553 17.73V18.1669C16.1553 18.6246 16.5263 18.9956 16.984 18.9956H20.8728C21.3305 18.9956 21.7015 18.6246 21.7015 18.1669V17.73C21.7015 17.2723 21.3305 16.9012 20.8728 16.9012Z"
                        fill="#5ACFF5"
                      ></path>
                      <path
                        d="M24.3883 16.9012H23.6946C23.2058 16.9012 22.8096 17.2975 22.8096 17.7862V18.1106C22.8096 18.5994 23.2058 18.9956 23.6946 18.9956H24.3883C24.8771 18.9956 25.2733 18.5994 25.2733 18.1106V17.7862C25.2733 17.2975 24.8771 16.9012 24.3883 16.9012Z"
                        fill="#5ACFF5"
                      ></path>
                      <path
                        d="M31.1003 16.9012H27.2116C26.7539 16.9012 26.3828 17.2723 26.3828 17.73V18.1669C26.3828 18.6246 26.7539 18.9956 27.2116 18.9956H31.1003C31.558 18.9956 31.9291 18.6246 31.9291 18.1669V17.73C31.9291 17.2723 31.558 16.9012 31.1003 16.9012Z"
                        fill="#5ACFF5"
                      ></path>
                      <path
                        d="M20.8728 22.3238H16.984C16.5263 22.3238 16.1553 22.6948 16.1553 23.1525V23.5894C16.1553 24.0471 16.5263 24.4181 16.984 24.4181H20.8728C21.3305 24.4181 21.7015 24.0471 21.7015 23.5894V23.1525C21.7015 22.6948 21.3305 22.3238 20.8728 22.3238Z"
                        fill="#5ACFF5"
                      ></path>
                      <path
                        d="M24.3883 22.3238H23.6946C23.2058 22.3238 22.8096 22.72 22.8096 23.2088V23.5331C22.8096 24.0219 23.2058 24.4181 23.6946 24.4181H24.3883C24.8771 24.4181 25.2733 24.0219 25.2733 23.5331V23.2088C25.2733 22.72 24.8771 22.3238 24.3883 22.3238Z"
                        fill="#5ACFF5"
                      ></path>
                      <path
                        d="M31.1003 22.3238H27.2116C26.7539 22.3238 26.3828 22.6948 26.3828 23.1525V23.5894C26.3828 24.0471 26.7539 24.4181 27.2116 24.4181H31.1003C31.558 24.4181 31.9291 24.0471 31.9291 23.5894V23.1525C31.9291 22.6948 31.558 22.3238 31.1003 22.3238Z"
                        fill="#5ACFF5"
                      ></path>
                      <g opacity="0.5" style={{ mixBlendMode: 'overlay' }}>
                        <path
                          d="M32.8498 12.0487V23.595C32.8496 24.4859 32.6738 25.3681 32.3325 26.191C31.9912 27.014 31.4912 27.7616 30.8608 28.3913C30.2305 29.0209 29.4823 29.5202 28.6589 29.8605C27.8356 30.2009 26.9533 30.3757 26.0623 30.375H24.043V5.26874H26.0623C26.9533 5.268 27.8356 5.44281 28.6589 5.78318C29.4823 6.12356 30.2305 6.62282 30.8608 7.25245C31.4912 7.88208 31.9912 8.62974 32.3325 9.4527C32.6738 10.2757 32.8496 11.1578 32.8498 12.0487Z"
                          fill="black"
                        ></path>
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_444_1361">
                        <rect width="48" height="48" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h4 className="text-dark-100 mb-5 mt-4 text-[22px] font-bold">
                  Feature 4
                </h4>
                <p className="text-dark-300 text-base">Feature description 4</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
