import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AuditLog = () => {
  const auditEntries = [
    {
      action: "TMHP bot ran",
      user: "System",
      timestamp: "2025-09-22 02:00",
      details: "Automated scraping completed successfully"
    },
    {
      action: "Appeal template edited",
      user: "Alyssa", 
      timestamp: "2025-09-21 15:42",
      details: "Updated BCBS appeal template formatting"
    },
    {
      action: "Queue thresholds updated",
      user: "Femi",
      timestamp: "2025-09-21 09:10", 
      details: "Adjusted alert thresholds for workqueue monitoring"
    }
  ];

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
            <p className="text-gray-600">SECTION</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Export</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
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
              Audit Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auditEntries.map((entry, index) => (
                <motion.div
                  key={`${entry.action}-${entry.timestamp}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{entry.action}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      By {entry.user} • {entry.timestamp}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{entry.details}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuditLog;