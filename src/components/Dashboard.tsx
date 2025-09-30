import Card from "@/new-components/Card";
import {
  DollarSign,
  Users,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const Dashboard = ({ claimsData }: { claimsData: any[] }) => {
  const totalBudget = claimsData.reduce(
    (acc, claim) => acc + claim.amountBilled,
    0
  );
  const totalCustomers = new Set(claimsData.map((claim) => claim.patient))
    .size;

  const totalProfit = claimsData
    .filter((claim) => claim.status === "resolved")
    .reduce((acc, claim) => acc + claim.amountBilled, 0);

  const weeklyData = [
    { day: "Mon", denials: 12 },
    { day: "Tue", denials: 18 },
    { day: "Wed", denials: 10 },
    { day: "Thu", denials: 23 },
    { day: "Fri", denials: 19 },
    { day: "Sat", denials: 8 },
    { day: "Sun", denials: 14 },
  ];

  const payerCounts = claimsData.reduce((acc, claim) => {
    const payer = claim.payerAdmin || claim.payer;
    acc[payer] = (acc[payer] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const payerData = Object.entries(payerCounts).map(([payer, count]) => ({
    payer,
    denials: count,
  }));

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card
          title="BUDGET"
          value={`$${(totalBudget / 1000).toFixed(1)}k`}
          percentage={12}
          icon={DollarSign}
          variant="danger"
        />
        <Card
          title="TOTAL CUSTOMERS"
          value={`${totalCustomers}`}
          percentage={-16}
          icon={Users}
          variant="success"
        />
        <Card
          title="TASK PROGRESS"
          value="75.5%"
          percentage={0}
          icon={CheckCircle}
          variant="warning"
        />
        <Card
          title="TOTAL PROFIT"
          value={`$${(totalProfit / 1000).toFixed(1)}k`}
          percentage={0}
          icon={TrendingUp}
          variant="default"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Weekly Denials Trend
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="denials"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Denials by Payer
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={payerData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="payer" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="denials" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;