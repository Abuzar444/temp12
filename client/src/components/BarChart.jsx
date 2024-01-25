import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Label,
  LabelList,
} from "recharts";

const data01 = [
  {
    name: "Design",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];
const data02 = [
  {
    name: "Design",
    value: 2400,
  },
  {
    name: "Group B",
    value: 4567,
  },
  {
    name: "Group C",
    value: 1398,
  },
  {
    name: "Group D",
    value: 9800,
  },
  {
    name: "Group E",
    value: 3908,
  },
  {
    name: "Group F",
    value: 4800,
  },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "rgb(0,0,23)",
  "rgb(68,0,23)",
];

const BarChart = ({ data }) => {
  console.log("das blob", data);
  console.log(typeof data);
  const kys = Object.keys(data);
  const kys2 = Object.values(data);
  console.log(kys);
  const blob = kys.map((item, index) => {
    return { name: kys[index], value: kys2[index] };
  });

  console.log(blob);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={blob}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={140}
          fill="#8884d8"
        >
          {data02.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} />
          ))}
          {/* <Label value="pages"></Label> */}
          <LabelList
            dataKey="name"
            position="outside"
            style={{
              fontSize: 16,
              letterSpacing: 4,
              fontFamily: "Arial",
              textTransform: "capitalize",

              stroke: "rgba(153, 30, 98, 0.411)",
            }}
          />
          <LabelList
            dataKey="value"
            position="inside"
            style={{ fontSize: 16 }}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
