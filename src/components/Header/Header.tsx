import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

import Image from "next/image";

import { HeaderProps } from "../../Interfaces/Interfaces";

const Header = (props: HeaderProps) => {
  const router = useRouter();
  const avatar = props?.userData?.viewer?.avatarUrl;

  const logout = () => {
    localStorage.setItem("token", "");
    router.push("../auth/sign-in");
  };

  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };

  const handleClick = () => {
    router.push("../repositories");
  };

  return (
    <header className="flex items-center justify-between bg-customGray w-full py-4 px-8">
      <div className="logo" onClick={handleClick}>
        <Image src="/assets/logo.png" width={32} height={32} />
      </div>
      <Disclosure>
        <>
          <div className="relative flex items-center justify-between">
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Menu as="div" className="ml-3 relative">
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button
                        role="button"
                        className="flex items-center text-sm rounded-full"
                      >
                        {props.userData && (
                          <Image
                            src={avatar || "/assets/img.png"}
                            width={32}
                            height={32}
                            className="border rounded-full"
                          />
                        )}
                        <div
                          className={
                            open
                              ? "ml-2 text-white transform rotate-180"
                              : "ml-2 text-white "
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        static
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <Menu.Item onClick={logout}>
                          {({ active }) => (
                            <p
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                              )}
                            >
                              Sign out
                            </p>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </>
      </Disclosure>
    </header>
  );
};

export default Header;
