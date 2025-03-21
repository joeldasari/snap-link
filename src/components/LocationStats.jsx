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
    <div className="h-[250px] xl:h-[300px] w-full m-auto">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={cities.slice(0, 5)}
          margin={{ top: 20 }}
          accessibilityLayer
        >
          <XAxis dataKey="City" padding={{ left: 30, right: 30 }} />
          <YAxis tickCount={1} />
          <Tooltip labelStyle={{ color: "black" }} />
          <Legend />
          <Line type="monotone" dataKey="Count" stroke="#3B82F6"></Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
