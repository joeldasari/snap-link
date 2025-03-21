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
    name: device, // Use 'name' as the label key (common convention in Recharts)
    count: count, // Use lowercase 'count' for consistency
  }));

  return (
    <div className="size-[300px] sm:size-[450px] m-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={devices}
            dataKey="count" // Matches the key in the devices array
            label={
              ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` // Use 'name' and 'percent'
            }
            labelLine={false}
            outerRadius={{ base: 60, sm: 80, md: 100, lg: 120, xl: 140 }}
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
