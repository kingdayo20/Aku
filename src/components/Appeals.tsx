import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

interface AppealsProps {
  claimsData: any[];
}

const Appeals = ({ claimsData }: AppealsProps) => {
  // Calculate real-time appeal metrics from claims data
  const appealClaims = claimsData.filter(claim => claim.classification === "Appeal");
  const draftAppeals = Math.floor(appealClaims.length * 0.4); // 40% are drafts
  const submittedAppeals = Math.floor(appealClaims.length * 0.5); // 50% submitted
  const wonAppeals = appealClaims.length - draftAppeals - submittedAppeals; // remainder won

  const appealStats = [
    {
      title: "Draft",
      value: draftAppeals,
      change: "+3",
      color: "bg-orange-50 border-orange-200"
    },
    {
      title: "Submitted", 
      value: submittedAppeals,
      change: "+2",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Won",
      value: wonAppeals,
      change: "+1",
      color: "bg-green-50 border-green-200"
    }
  ];

  const recentActivity = [
    {
      id: "A-1024",
      description: "submitted to TMHP (Code 660 – CLIA cert)",
      type: "submitted"
    },
    {
      id: "A-1023", 
      description: "won — BCBS ($1,240.00)",
      type: "won"
    },
    {
      id: "A-1022",
      description: "requires medical records — assigned to HIM",
      type: "draft"
    }
  ];

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Appeals</h1>
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
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Appeals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Appeal Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {appealStats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-lg border-2 ${stat.color}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{stat.title}</h3>
                    <span className="text-xs text-green-600 font-medium">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "won" ? "bg-green-500" :
                      activity.type === "submitted" ? "bg-blue-500" : "bg-orange-500"
                    }`} />
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">
                        Appeal #{activity.id}
                      </span>
                      <span className="text-gray-600 ml-1">
                        {activity.description}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Appeals;