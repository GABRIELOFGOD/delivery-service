"use client";

import { ReactNode, useState } from "react";

const AdminLayout = ({ children }:  { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingn, setLoading] = useState(true);


  if (!isLoggedIn) {

  }
  
  return (
    <div>{children}</div>
  )
}
export default AdminLayout;