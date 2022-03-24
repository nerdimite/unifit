import React from "react";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

export default function Admin({ children }) {
  return (
    <div className="relative bg-slate-100">
      <AdminNavbar />
      {/* Header */}
      <HeaderStats />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        {children}
        <FooterAdmin />
      </div>
      <>
        <div className="flex flex-wrap mt-10 justify-center">
          <div className="w-full xl:w-5/12 mb-12 xl:mb-4 px-4">
            <CardLineChart />
          </div>
          <div className="w-full xl:w-5/12 px-4">
            <CardBarChart />
          </div>
        </div>
        <div className="flex flex-wrap mt-4 justify-center">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardPageVisits />
          </div>
          {/* <div className="w-full xl:w-4/12 px-4">
            <CardSocialTraffic />
          </div> */}
        </div>
      </>
    </div>
  );
}
