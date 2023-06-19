import React from "react";
import CardHome from "../../components/Cards/CardHome";


export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
            <CardHome/>
        </div>
      </div>
    </>
  );
}
