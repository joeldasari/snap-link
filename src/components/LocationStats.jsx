import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function LocationStats({ stats }) {
  const cityCount = stats.reduce((acc, item) => {
    if (acc[item.city]) {
      acc[item.city] += 1;
    } else {
      acc[item.city] = 1;
    }
    return acc;
  }, {});

  const cities = Object.entries(cityCount).map(([City, Count]) => ({
    City,
    Count,
  }));

  return (
    <div className="w-full h-[220px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] max-w-4xl mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          style={{ outline: "none" }}
          data={cities.slice(0, 5)}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          accessibilityLayer
        >
          <XAxis
            dataKey="City"
            padding={{ left: 20, right: 20 }}
            tick={{ fontSize: 12, fill: "#666" }} // Improved legibility
          />
          <YAxis
            domain={[0, "auto"]}
            allowDecimals={false}
            tick={{ fontSize: 12, fill: "#666" }}
            tickFormatter={(value) => Math.floor(value)} // Integers only
          />
          <Tooltip labelStyle={{ color: "black" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="Count"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ r: 4 }} // Visible data points
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
