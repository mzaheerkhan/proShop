import React from "react";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="tabs bg-gray-300 p-2 rounded-md shadow-md">
      {tabs.map((tab) => (
        <button
                  key={tab}
                  className={`py-1 px-4 font-bold ${
                    activeTab === tab
                      ? "border-b-4 border-primary text-primary"
                      : "text-black"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;