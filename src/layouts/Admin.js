import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import HeaderStats from "../components/Headers/HeaderStats.js";
import FooterAdmin from "../components/Footers/FotterAdmin.js";

// views
import Dashboard from "../views/admin/Dashboard";
import Profile from "../views/admin/Profile";
import ChatUsers from "../views/admin/ChatUser";
import ChatDetails from "../views/admin/ChatDetails.js";
import CardDetailOrder from "../views/admin/DetailOrder.js";
import listPackageVendors from "../views/admin/ListPacketVendor.js";


export default function Admin() {
  return (
    <>
     
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/dashboard/listall" exact component={CardDetailOrder} />
            <Route path="/admin/profile" exact component={Profile} />
            <Route path="/admin/profile/paket" exact component={listPackageVendors} />
            <Route path="/admin/chat" exact component={ChatUsers} />
            <Route path="/admin/chat/detail" exact component={ChatDetails} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      
    </>
  );
}
