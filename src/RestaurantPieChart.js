import React from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";

const COLORS = [
  "#0000FF",
  "#000080",
  "#FF00FF",
  "#800080",
  "#FF5733",
  "#36FF33",
  "#FF9C33",
  "#F3FF33",
  "#33B5FF",
  "#33FFCA",
  "#9633FF",
  "#FF339F"
];

export default ({ partials }) => {
  const chartData = partials.map(item => {
    return { name: item.name, value: item.votes };
  });

  return (
    <PieChart
      width={window.outerWidth}
      height={window.outerHeight}
      className="animated fadeIn"
    >
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx={"50%"}
        cy={"20%"}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
      >
        {chartData.map((entry, i) => (
          <Cell key={i} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend verticalAlign="top" height={150} />
    </PieChart>
  );
};
