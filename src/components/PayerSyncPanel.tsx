import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  RefreshCw,
  FileText,
  Plus,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import PayerDropdown from "@/components/PayerDropdown";

interface PayerSyncPanelProps {
  lastSynced?: string;
  status?: "active" | "pending" | "error";
  recentActivity?: Array<{
    id: string;
    description: string;
    type: "rebill" | "denied" | "appeal";
  }>;
}

const PayerSyncPanel = ({
  lastSynced = "Today",
  status = "active",
  recentActivity = [
    { id: "12345", description: "Classified as Rebill", type: "rebill" },
    { id: "12346", description: "Denied: Missing COB", type: "denied" },
    { id: "12347", description: "Classified as Appeal", type: "appeal" },
  ],
}: PayerSyncPanelProps) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedPayer, setSelectedPayer] = useState("medicaid");
  const [selectedAdmin, setSelectedAdmin] = useState("tmhp");

  const handleSync = () => {
    setIsSyncing(true);
    // Simulate sync process
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };

  const handlePayerChange = (payer: string, admin?: string) => {
    setSelectedPayer(payer);
    setSelectedAdmin(admin || "");
  };

  const getStatusIcon = () => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "pending":
        return <Badge className="bg-amber-500">Pending</Badge>;
      case "error":
        return <Badge className="bg-red-500">Error</Badge>;
      default:
        return <Badge className="bg-green-500">Active</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "rebill":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "denied":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "appeal":
        return <FileText className="h-4 w-4 text-blue-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-lg overflow-hidden border-t-4 border-t-[#00A896]">
      <CardHeader className="bg-gradient-to-r from-[#0F2C5D] to-[#0F2C5D]/90 text-white pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">
            Payer Sync Panel
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={handleSync}
                    disabled={isSyncing}
                  >
                    <motion.div
                      animate={isSyncing ? { rotate: 360 } : { rotate: 0 }}
                      transition={
                        isSyncing
                          ? { repeat: Infinity, duration: 1, ease: "linear" }
                          : {}
                      }
                    >
                      <RefreshCw className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sync now</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Payer Selection */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-sm font-medium mb-2">Select Payer</h3>
            <PayerDropdown
              selectedPayer={selectedPayer}
              selectedAdmin={selectedAdmin}
              onPayerChange={handlePayerChange}
              className="w-full"
            />
          </motion.div>

          {/* Payer Portal Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-between items-center p-3 bg-slate-50 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0F2C5D]/10">
                {getStatusIcon()}
              </div>
              <div>
                <h3 className="text-sm font-medium">
                  {selectedAdmin ? selectedAdmin.toUpperCase() : selectedPayer} Portal Sync
                </h3>
                <p className="text-xs text-gray-500">
                  Last synced: {lastSynced}
                </p>
              </div>
            </div>
            <div>{getStatusBadge()}</div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
            <div className="space-y-2">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-2 text-xs p-2 border-l-2 border-l-[#00A896] bg-slate-50 rounded-r-lg"
                >
                  <span>{getActivityIcon(activity.type)}</span>
                  <span>
                    <span className="font-medium">Claim #{activity.id}:</span>{" "}
                    {activity.description}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-2 border-t border-gray-100"
          >
            <h3 className="text-sm font-medium mb-2">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  size="sm"
                  className="bg-[#0F2C5D] hover:bg-[#0F2C5D]/90"
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1" /> Run Auto-Classify
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#00A896] text-[#00A896] hover:bg-[#00A896]/10"
                >
                  <FileText className="h-3.5 w-3.5 mr-1" /> Export Report
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#0F2C5D] text-[#0F2C5D] hover:bg-[#0F2C5D]/10"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" /> Connect New Payer
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayerSyncPanel;