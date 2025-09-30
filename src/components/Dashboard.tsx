import Card from "@/new-components/Card";
import {
  DollarSign,
  Users,
  CheckCircle,
  TrendingUp,
  BarChart,
  PieChart,
} from "lucide-react";

const Dashboard = ({ claimsData }: { claimsData: any[] }) => {
  const totalBudget = claimsData.reduce(
    (acc, claim) => acc + claim.amountBilled,
    0
  );
  const totalCustomers = new Set(claimsData.map((claim) => claim.patient)).size;

  // Assuming 'resolved' status means profit
  const totalProfit = claimsData
    .filter((claim) => claim.status === "resolved")
    .reduce((acc, claim) => acc + claim.amountBilled, 0);

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
          value={`${(totalCustomers / 1000).toFixed(1)}k`}
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales</h3>
          <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            <BarChart className="w-16 h-16 text-gray-400" />
            <span className="ml-4 text-gray-500">Sales chart placeholder</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Traffic Source
          </h3>
          <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            <PieChart className="w-16 h-16 text-gray-400" />
            <span className="ml-4 text-gray-500">
              Traffic source chart placeholder
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;