import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  LabelList,
  Cell,
} from "recharts";

const BarChartComponent = ({ data }) => {
  const kys = Object.keys(data);
  const kys2 = Object.values(data);
  console.log(kys);
  const blob = kys.map((item, index) => {
    return { name: kys[index], value: kys2[index] };
  });
  console.log("sdfg", blob);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "rgb(0,0,23)",
    "rgb(68,0,23)",
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={blob} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" nameKey="name" />
        <YAxis
          allowDecimals={false}
          label={{
            value: "Number of Projects",
            angle: -90,
            fontSize: 15,
            position: "Left",
            padding: 100,
          }}
        />
        <Bar dataKey="value" fill="red" barSize={100}>
          {blob.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} />
          ))}
          <LabelList
            dataKey="value"
            fill="black"
            position="inside"
            style={{ fontSize: 18 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
