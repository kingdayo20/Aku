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
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";

interface AnalyticsProps {
  claimsData: any[];
}

const Analytics = ({ claimsData }: AnalyticsProps) => {
  // Calculate real-time metrics
  const totalClaims = claimsData.length;
  const deniedClaims = claimsData.filter(claim => 
    claim.classification === "Appeal" || claim.classification === "Investigate"
  ).length;
  
  const cleanClaimsPercent = ((totalClaims - deniedClaims) / totalClaims * 100).toFixed(1);
  const denialRate = (deniedClaims / totalClaims * 100).toFixed(1);
  const appealWinRate = 54;

  // Weekly denials trend data
  const weeklyData = [
    { day: "Mon", denials: 12 },
    { day: "Tue", denials: 18 },
    { day: "Wed", denials: 10 },
    { day: "Thu", denials: 23 },
    { day: "Fri", denials: 19 },
    { day: "Sat", denials: 8 },
    { day: "Sun", denials: 14 },
  ];

  // Denials by payer - calculate from real claims data
  const payerCounts = claimsData.reduce((acc, claim) => {
    const payer = claim.payerAdmin || claim.payer;
    acc[payer] = (acc[payer] || 0) + 1;
    return acc;
  }, {});

  const payerData = Object.entries(payerCounts).map(([payer, count]) => ({
    payer,
    denials: count
  }));

  const metrics = [
    {
      title: "Clean Claims %",
      value: `${cleanClaimsPercent}%`,
      change: "+1.4%",
      trend: "up"
    },
    {
      title: "Denial Rate", 
      value: `${denialRate}%`,
      change: "-0.6%",
      trend: "down"
    },
    {
      title: "Appeal Win %",
      value: `${appealWinRate}%`,
      change: "+3%", 
      trend: "up"
    }
  ];

  return (
    <div className="flex-1 bg-gray-50 p-6">
      {/* Content */}
      <div>
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                    <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                      metric.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {metric.change}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    {metric.value}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="space-y-8">
          {/* Weekly Denials Trend */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Weekly Denials Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Line 
                      type="monotone" 
                      dataKey="denials" 
                      stroke="#0F2C5D" 
                      strokeWidth={2}
                      dot={{ fill: "#0F2C5D", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Denials by Payer */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Denials by Payer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={payerData}>
                    <XAxis dataKey="payer" />
                    <YAxis />
                    <Bar dataKey="denials" fill="#0F2C5D" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;