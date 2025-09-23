import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

interface DashboardProps {
  claimsData: any[];
}

const Dashboard = ({ claimsData }: DashboardProps) => {
  // Calculate real-time metrics from claims data
  const totalClaims = claimsData.length;
  const activeClaims = claimsData.filter(claim => claim.status === "active").length;
  const pendingClaims = claimsData.filter(claim => claim.status === "pending").length;
  const deniedClaims = claimsData.filter(claim => claim.classification === "Appeal" || claim.classification === "Investigate").length;
  
  const cleanClaimsPercent = ((totalClaims - deniedClaims) / totalClaims * 100).toFixed(1);
  const denialRate = (deniedClaims / totalClaims * 100).toFixed(1);
  const appealWinRate = 54; // This would be calculated from historical data
  const followUpsDue = 14;

  // Today's focus data
  const dueWithin7Days = 73;
  const appealsToFile = 18;
  const newDenials24h = 37;

  const metrics = [
    {
      title: "Clean Claims %",
      value: `${cleanClaimsPercent}%`,
      change: "+1.4%",
      trend: "up",
      color: "text-green-600"
    },
    {
      title: "Denial Rate",
      value: `${denialRate}%`,
      change: "-0.6%",
      trend: "down",
      color: "text-red-600"
    },
    {
      title: "Appeal Win %",
      value: `${appealWinRate}%`,
      change: "+3%",
      trend: "up",
      color: "text-blue-600"
    },
    {
      title: "Follow-ups Due",
      value: followUpsDue.toString(),
      change: "+4",
      trend: "up",
      color: "text-orange-600"
    }
  ];

  const focusItems = [
    {
      title: "Due within 7 days",
      value: dueWithin7Days,
      subtitle: "Across Medicaid/Commercial",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Appeals to file",
      value: appealsToFile,
      subtitle: "Docs needed: 6",
      color: "bg-orange-50 border-orange-200"
    },
    {
      title: "New denials (24h)",
      value: newDenials24h,
      subtitle: "TMHP spike • 12%",
      color: "bg-red-50 border-red-200"
    }
  ];

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">SECTION</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Export</Button>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white" size="sm">
              Run Bot
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
                    <div className={`flex items-center gap-1 text-xs ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {metric.trend === "up" ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {metric.change}
                    </div>
                  </div>
                  <div className={`text-3xl font-bold ${metric.color}`}>
                    {metric.value}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Today's Focus */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Today's Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {focusItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`p-6 rounded-lg border-2 ${item.color}`}
                >
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {item.value}
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.subtitle}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;