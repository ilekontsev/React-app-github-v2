import React from "react";
import Image from "next/image";

import { HeaderProps } from "../../Interfaces/Interfaces";

const UserData = (props: HeaderProps) => {
  return (
    <>
      {props.userData && (
        <div className="leftBar-profile-user mx-6">
          <Image
            src={props.userData.viewer.avatarUrl || "/public/assets/img.png"}
            width={256}
            height={256}
            className="border rounded-full"
          />
          <p className="text-white">
            {props.userData.viewer.login || "UserName"}
          </p>
        </div>
      )}
    </>
  );
};

export default UserData;
