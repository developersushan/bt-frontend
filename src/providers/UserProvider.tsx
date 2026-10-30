/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext } from "react";

const UserContext = createContext<any>(null);

export function UserProvider({
  children,
  userInfo,
}: {
  children: React.ReactNode;
  userInfo: any;
}) {
  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};
