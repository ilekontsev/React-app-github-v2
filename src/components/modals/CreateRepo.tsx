import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import Button from "../Buttons/Button";
import Input from "../Input/Input";

import { CreateRepoProps } from "../../Interfaces/Interfaces";

const CreateRepoModal = (props: CreateRepoProps) => {
  const [open, setOpen] = useState(true);
  const [nameRepo, setNameRepo] = useState("");
  const [checkBox, setCheckBox] = useState(true);
  const [protect, setProtect] = useState("PUBLIC");

  useEffect(() => {
    props.handleModal(open);
  }, [open]);

  const handleClickCancel = () => {
    setOpen(!open);
  };
  const inputNameRepo = (text: string) => {
    setNameRepo(text);
  };

  const handleClickCreate = () => {
    if (nameRepo.trim().length) {
      props.create(nameRepo, protect);
      setOpen(!open);
    }
  };

  const handleCLickCheckBox = (e: any) => {
    const textCheckBox = e.target.nextElementSibling.innerHTML;
    switch (textCheckBox) {
      case "Public":
        setCheckBox(true);
        break;
      case "Private":
        setCheckBox(false);
        setProtect(textCheckBox.toUpperCase());
        break;
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-customBlack rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-customBlack  px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="form-input mt-2 flex">
                      <Input
                        action={inputNameRepo}
                        placeholder={" Name repo"}
                        class={"mb-4"}
                      />
                      <div>
                        <div className={"flex items-center"}>
                          <input
                            aria-label="name-repo"
                            type="checkbox"
                            checked={checkBox}
                            onChange={handleCLickCheckBox}
                          />
                          <p className={"text-white ml-2"}>Public</p>
                        </div>
                        <div className={"flex items-center"}>
                          <input
                            type="checkbox"
                            checked={!checkBox}
                            onChange={handleCLickCheckBox}
                          />
                          <p className={"text-white ml-2"}>Private</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group-button bg-customGray px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  title={"Create"}
                  class={
                    "inline-flex ml-4  items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-400"
                  }
                  action={handleClickCreate}
                />
                <Button
                  title={"Cancel"}
                  class={
                    "inline-flex ml-4  items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-400"
                  }
                  action={handleClickCancel}
                />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateRepoModal;
