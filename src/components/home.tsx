import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import Analytics from "@/components/Analytics";
import ClaimsPage from "@/components/ClaimsPage";
import Workqueues from "@/components/Workqueues";
import Appeals from "@/components/Appeals";
import Payers from "@/components/Payers";
import Documents from "@/components/Documents";
import Integrations from "@/components/Integrations";
import AuditLog from "@/components/AuditLog";
import Help from "@/components/Help";
import Settings from "@/components/Settings";

const Home = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Enhanced claims data with more realistic information
  const claimsData = [
    {
      id: "2025-09-0001",
      patient: "John Smith",
      dateOfService: "04/10/2025",
      cptCode: "99213",
      amountBilled: 320.45,
      payer: "medicaid",
      payerAdmin: "tmhp",
      denialReason: "CPT 99213 - No authorization",
      classification: "Appeal",
      actionNeeded: "✅ Appeal now",
      eobSnippet: "Claim denied: CPT 99213 requires prior authorization per TMHP Policy §4.2.1",
      status: "denied",
      originalDenial: "CPT 99213 requires prior authorization",
    },
    {
      id: "2025-09-0002",
      patient: "Sarah Johnson",
      dateOfService: "04/08/2025",
      cptCode: "99214",
      amountBilled: 145.00,
      payer: "commercial",
      payerAdmin: "bcbs",
      denialReason: "Missing COB",
      classification: "Investigate",
      actionNeeded: "⚠ Investigate",
      eobSnippet: "Claim denied: Missing coordination of benefits information required",
      status: "denied",
      originalDenial: "Missing coordination of benefits information",
    },
    {
      id: "2025-09-0003",
      patient: "Mike Davis",
      dateOfService: "04/05/2025",
      cptCode: "99215",
      amountBilled: 980.00,
      payer: "commercial",
      payerAdmin: "uhc-commercial",
      denialReason: "Prior Auth Expired",
      classification: "Appeal",
      actionNeeded: "📝 Draft Appeal",
      eobSnippet: "Claim denied: Authorization #TX-MED-2024-00123 expired on 03/15/2025",
      status: "denied",
      originalDenial: "Prior authorization expired",
    },
    {
      id: "2025-09-0004",
      patient: "Lisa Wilson",
      dateOfService: "04/02/2025",
      cptCode: "99212",
      amountBilled: 210.75,
      payer: "commercial",
      payerAdmin: "aetna",
      denialReason: "Duplicate Claim",
      classification: "Deny",
      actionNeeded: "❌ Close claim",
      eobSnippet: "Claim denied: Duplicate of claim #11982 processed on 04/02/2025",
      status: "resolved",
      originalDenial: "Duplicate claim submission",
    },
    {
      id: "2025-09-0005",
      patient: "Robert Brown",
      dateOfService: "04/01/2025",
      cptCode: "99213",
      amountBilled: 410.00,
      payer: "medicare",
      payerAdmin: "fiss",
      denialReason: "Patient Not Eligible",
      classification: "Investigate",
      actionNeeded: "⚠ Verify eligibility",
      eobSnippet: "Claim denied: Patient not eligible for service on date of service 04/05/2025",
      status: "denied",
      originalDenial: "Patient eligibility verification failed",
    },
    {
      id: "2025-09-0006",
      patient: "Emily Taylor",
      dateOfService: "04/12/2025",
      cptCode: "99214",
      amountBilled: 275.25,
      payer: "commercial",
      payerAdmin: "cigna",
      denialReason: "Incorrect modifier",
      classification: "Rebill",
      actionNeeded: "✅ Rebill now",
      eobSnippet: "Claim denied: Incorrect modifier used for procedure",
      status: "resolved",
      originalDenial: "Incorrect procedure modifier",
    },
    {
      id: "2025-09-0007",
      patient: "David Martinez",
      dateOfService: "04/15/2025",
      cptCode: "99213",
      amountBilled: 120.10,
      payer: "medicaid",
      payerAdmin: "tmhp",
      denialReason: "Missing documentation",
      classification: "Appeal",
      actionNeeded: "📝 Appeal with docs",
      eobSnippet: "Claim denied: Missing required documentation",
      status: "pending",
      originalDenial: "Missing required documentation",
    },
    {
      id: "2025-09-0008",
      patient: "Jennifer Lee",
      dateOfService: "04/18/2025",
      cptCode: "99215",
      amountBilled: 360.00,
      payer: "commercial",
      payerAdmin: "humana",
      denialReason: "Non-covered service",
      classification: "Investigate",
      actionNeeded: "⚠ Check coverage",
      eobSnippet: "Claim denied: Service not covered under current plan",
      status: "pending",
      originalDenial: "Service not covered under current plan",
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard claimsData={claimsData} />;
      case "analytics":
        return <Analytics claimsData={claimsData} />;
      case "claims":
        return <ClaimsPage claimsData={claimsData} />;
      case "workqueues":
        return <Workqueues claimsData={claimsData} />;
      case "appeals":
        return <Appeals claimsData={claimsData} />;
      case "payers":
        return <Payers claimsData={claimsData} />;
      case "documents":
        return <Documents />;
      case "integrations":
        return <Integrations />;
      case "audit-log":
        return <AuditLog />;
      case "help":
        return <Help />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard claimsData={claimsData} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        claimsData={claimsData}
      />
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-y-auto"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default Home;