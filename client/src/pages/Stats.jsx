import React from "react";
import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const response = await customFetch.get("/projects/stats");

    return response.data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const {
    defaultStats,
    monthlyContractAmounts,
    defaultLocationStats,
    totalProjects,
    yourLiveProjects,
  } = useLoaderData();

  return (
    <>
      <StatsContainer
        defaultStats={totalProjects}
        yourLiveProjects={yourLiveProjects}
      />
      {monthlyContractAmounts?.length > 0 && (
        <ChartsContainer
          // data={monthlyContractAmounts}
          data={defaultStats}
        />
      )}
    </>
  );
};

export default Stats;
