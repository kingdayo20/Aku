import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings, LogOut, RefreshCw, FileDown, Link } from "lucide-react";
import PayerSyncPanel from "./PayerSyncPanel";
import ClaimsTable from "./ClaimsTable";
import LoadingAnimation from "./LoadingAnimation";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Jane Doe");
  const [denialBacklog, setDenialBacklog] = useState(47);
  const [unrecoveredRevenue, setUnrecoveredRevenue] = useState(18200);
  const [metrics, setMetrics] = useState({
    totalClaims: 47,
    resolved: 12,
    pending: 35,
    avgTimeToResolve: 7.2,
  });

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <motion.header
        className="bg-[#0F2C5D] text-white p-4 shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold text-[#00A896]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Akuvera
          </motion.div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5 text-white" />
            </Button>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=jdoe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">{userName}</span>
            </div>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Welcome Banner */}
      <motion.div
        className="container mx-auto mt-6 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-[#0F2C5D] to-[#00A896] text-white overflow-hidden">
          <CardContent className="p-6">
            <motion.div
              className="flex flex-col md:flex-row justify-between items-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  WELCOME, {userName.toUpperCase()}
                </h1>
                <p className="text-lg">
                  Your Denial Backlog:{" "}
                  <span className="font-bold">{denialBacklog} claims</span> •{" "}
                  <span className="font-bold">
                    ${unrecoveredRevenue.toLocaleString()}
                  </span>{" "}
                  in unrecovered revenue
                </p>
              </div>
              <motion.div
                className="mt-4 md:mt-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button className="bg-white text-[#0F2C5D] hover:bg-gray-100">
                  View All Claims
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto mt-6 px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Payer Sync Panel */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <PayerSyncPanel />

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="flex flex-col gap-3">
                  <Button className="w-full justify-start" variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" /> Run Auto-Classify
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileDown className="mr-2 h-4 w-4" /> Export Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Link className="mr-2 h-4 w-4" /> Connect New Payer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Claims Table */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <ClaimsTable />
          </motion.div>
        </div>
      </div>

      {/* Metrics Footer */}
      <motion.footer
        className="bg-white border-t border-gray-200 py-4 mt-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center">
              <Badge variant="outline" className="mr-2 bg-[#0F2C5D] text-white">
                Total Claims: {metrics.totalClaims}
              </Badge>
              <Badge variant="outline" className="mr-2 bg-[#00A896] text-white">
                Resolved: {metrics.resolved}
              </Badge>
              <Badge variant="outline" className="mr-2">
                Pending: {metrics.pending}
              </Badge>
            </div>
            <div>
              <Badge variant="outline" className="bg-gray-100">
                Avg. Time to Resolve: {metrics.avgTimeToResolve} days
              </Badge>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default HomePage;
