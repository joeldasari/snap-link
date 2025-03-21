import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DeviceStats({ stats }) {
  // Step 1: Correctly count devices
  const deviceCount = stats.reduce((acc, item) => {
    acc[item.device] = (acc[item.device] || 0) + 1; // Increment or initialize to 1
    return acc;
  }, {});

  // Step 2: Transform into array of objects for Recharts
  const devices = Object.entries(deviceCount).map(([device, count]) => ({
    name: device,
    count: count,
  }));

  return (
    <div className="w-full h-[150px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={devices}
            dataKey="count"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
            outerRadius="70%" // Use percentage for responsive scaling
            paddingAngle={2}
          >
            {devices.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
