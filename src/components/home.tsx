import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings, LogOut, RefreshCw, FileDown, Link, FileText, Clock, CheckCircle, DollarSign, Zap } from "lucide-react";
import PayerSyncPanel from "./PayerSyncPanel";
import ClaimsTable from "./ClaimsTable";
import LoadingAnimation from "./LoadingAnimation";

const defaultClaims = [
  {
    id: "12345",
    patient: "John Smith",
    dateOfService: "04/10/2025",
    cptCode: "99213",
    amountBilled: 150,
    payer: "medicaid",
    payerAdmin: "tmhp",
    denialReason: "CPT 99213 - No authorization",
    classification: "Rebill" as const,
    actionNeeded: "✅ Rebill now",
    eobSnippet: "Claim denied: CPT 99213 requires prior authorization per TMHP Policy §4.2.1",
    status: "active" as const,
    originalDenial: "CPT 99213 requires prior authorization",
  },
  {
    id: "12346",
    patient: "Sarah Johnson",
    dateOfService: "04/08/2025",
    cptCode: "99214",
    amountBilled: 200,
    payer: "medicaid",
    payerAdmin: "tmhp",
    denialReason: "Missing COB",
    classification: "Investigate" as const,
    actionNeeded: "⚠ Investigate",
    eobSnippet: "Claim denied: Missing coordination of benefits information required",
    status: "active" as const,
    originalDenial: "Missing coordination of benefits information",
  },
  {
    id: "12347",
    patient: "Mike Davis",
    dateOfService: "04/05/2025",
    cptCode: "99215",
    amountBilled: 250,
    payer: "commercial",
    payerAdmin: "availity",
    denialReason: "Prior Auth Expired",
    classification: "Appeal" as const,
    actionNeeded: "📝 Draft Appeal",
    eobSnippet: "Claim denied: Authorization #TX-MED-2024-00123 expired on 03/15/2025",
    status: "active" as const,
    originalDenial: "Prior authorization expired",
  },
  {
    id: "12348",
    patient: "Lisa Wilson",
    dateOfService: "04/02/2025",
    cptCode: "99212",
    amountBilled: 120,
    payer: "medicare",
    payerAdmin: "fiss",
    denialReason: "Duplicate Claim",
    classification: "Deny" as const,
    actionNeeded: "❌ Close claim",
    eobSnippet: "Claim denied: Duplicate of claim #11982 processed on 04/02/2025",
    status: "pending" as const,
    resolvedDate: "04/14/2025",
    originalDenial: "Duplicate claim submission",
  },
  {
    id: "12349",
    patient: "Robert Brown",
    dateOfService: "04/01/2025",
    cptCode: "99213",
    amountBilled: 175,
    payer: "commercial",
    payerAdmin: "aetna",
    denialReason: "Patient Not Eligible",
    classification: "Investigate" as const,
    actionNeeded: "⚠ Verify eligibility",
    eobSnippet: "Claim denied: Patient not eligible for service on date of service 04/05/2025",
    status: "pending" as const,
    resolvedDate: "04/13/2025",
    originalDenial: "Patient eligibility verification failed",
  },
];

const Home = () => {
  const [selectedPayer, setSelectedPayer] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [claims] = useState(defaultClaims);

  const handlePayerChange = (payer: string, admin?: string) => {
    setSelectedPayer(payer);
    setSelectedAdmin(admin || "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <motion.header
        className="bg-white shadow-sm border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            className="text-3xl font-bold text-[#0F2C5D]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Akuvera
            <span className="text-[#00A896] text-sm ml-2">AI</span>
          </motion.div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-[#0F2C5D]">
              Dashboard
            </Button>
            <Button variant="ghost" className="text-[#0F2C5D]">
              Reports
            </Button>
            <Button variant="ghost" className="text-[#0F2C5D]">
              Settings
            </Button>
            <Button className="bg-[#00A896] hover:bg-[#008A7B] text-white">
              Profile
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <motion.div
          className="bg-gradient-to-r from-[#0F2C5D] to-[#00A896] text-white rounded-xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome to Akuvera AI
              </h1>
              <p className="text-white/90 text-lg">
                Your intelligent denial resolution assistant is ready to help
              </p>
            </div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Zap className="h-16 w-16 text-white/80" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Claims Table (Wider) */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ClaimsTable 
                claims={claims}
                selectedPayerFromSync={selectedPayer}
                selectedAdminFromSync={selectedAdmin}
              />
            </motion.div>
          </div>

          {/* Right Column - Payer Sync Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <PayerSyncPanel onPayerChange={handlePayerChange} />
            </motion.div>
          </div>
        </div>

        {/* Metrics Footer */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { 
              label: "Total Claims", 
              value: claims.length.toString(), 
              icon: FileText, 
              color: "text-blue-600" 
            },
            { 
              label: "Active Claims", 
              value: claims.filter(c => c.status === "active").length.toString(), 
              icon: Clock, 
              color: "text-yellow-600" 
            },
            { 
              label: "Pending Claims", 
              value: claims.filter(c => c.status === "pending").length.toString(), 
              icon: CheckCircle, 
              color: "text-green-600" 
            },
            { 
              label: "Revenue at Risk", 
              value: `$${claims.filter(c => c.status === "active").reduce((sum, claim) => sum + claim.amountBilled, 0).toLocaleString()}`, 
              icon: DollarSign, 
              color: "text-[#00A896]" 
            },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white rounded-lg p-6 shadow-md border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>
                    {metric.value}
                  </p>
                </div>
                <metric.icon className={`h-8 w-8 ${metric.color} opacity-80`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;