import React from "react";

const Dashboard = () => {
    return (
          <div className="dashboard-header">
               <h2 className="section-title">
                 {/* <Award className="icon-orange" /> */}
                 Badges
               </h2>
               
               <select className="filter-select">
                  <option>Most Recent</option>
                  <option>Most Popular</option>
               </select>
            </div>
    );

}
export default Dashboard;