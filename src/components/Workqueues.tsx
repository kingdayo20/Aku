import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WorkqueuesProps {
  claimsData: any[];
}

const Workqueues = ({ claimsData }: WorkqueuesProps) => {
  // Generate workqueues based on real claims data
  const workqueues = [
    {
      title: "Medicaid — TMHP — Denials to Review",
      subtitle: "95-day timely filing risk • 124 accounts",
      payer: "Medicaid",
      count: claimsData.filter(c => c.payerAdmin === "tmhp" && c.status === "active").length
    },
    {
      title: "Medicaid — TMHP — COB/MCO Mismatch", 
      subtitle: "Eligibility validation • 61 accounts",
      payer: "Medicaid",
      count: claimsData.filter(c => c.payerAdmin === "tmhp" && c.denialReason.includes("COB")).length
    },
    {
      title: "Medicare — Medicare — Modifier Missing",
      subtitle: "Request coder review • 38 accounts", 
      payer: "Medicare",
      count: claimsData.filter(c => c.payer === "medicare").length
    },
    {
      title: "Commercial — BCBS — Prior Auth Missing",
      subtitle: "Needs clinical uploads • 42 accounts",
      payer: "Commercial", 
      count: claimsData.filter(c => c.payerAdmin === "bcbs").length
    },
    {
      title: "Commercial — UHC — Medical Records Requested",
      subtitle: "Assign to HIM • 19 accounts",
      payer: "Commercial",
      count: claimsData.filter(c => c.payerAdmin === "uhc-commercial").length
    },
    {
      title: "Commercial — Aetna — Non-Covered Code", 
      subtitle: "Check plan doc • 27 accounts",
      payer: "Commercial",
      count: claimsData.filter(c => c.payerAdmin === "aetna").length
    },
    {
      title: "Commercial — Cigna — Bundling Edits",
      subtitle: "Appeal window 30d • 14 accounts",
      payer: "Commercial", 
      count: claimsData.filter(c => c.payerAdmin === "cigna").length
    }
  ];

  const getPayerColor = (payer: string) => {
    switch (payer) {
      case "Medicaid": return "bg-blue-100 text-blue-800";
      case "Medicare": return "bg-green-100 text-green-800"; 
      case "Commercial": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Workqueues</h1>
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
              Workqueues by Payer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workqueues.map((queue, index) => (
                <motion.div
                  key={queue.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {queue.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {queue.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getPayerColor(queue.payer)}>
                      {queue.payer}
                    </Badge>
                    <Button 
                      className="bg-gray-900 hover:bg-gray-800 text-white"
                      size="sm"
                    >
                      Open Queue
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Workqueues;