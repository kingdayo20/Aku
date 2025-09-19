import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Copy,
  Calendar,
  DollarSign,
  User,
  Building,
  ChevronRight,
} from "lucide-react";
import PayerDropdown from "@/components/PayerDropdown";
import ClaimDetailView from "@/components/ClaimDetailView";

interface Claim {
  id: string;
  patient: string;
  dateOfService: string;
  cptCode: string;
  amountBilled: number;
  payer: string;
  payerAdmin?: string;
  denialReason: string;
  classification: "Rebill" | "Appeal" | "Deny" | "Investigate";
  actionNeeded: string;
  eobSnippet?: string;
  status: "resolved" | "unresolved";
  resolvedDate?: string;
  originalDenial: string;
}

interface ClaimsTableProps {
  claims?: Claim[];
  onClaimSelect?: (claim: Claim) => void;
}

const ClaimsTable = ({
  claims = defaultClaims,
  onClaimSelect = () => {},
}: ClaimsTableProps) => {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [selectedPayer, setSelectedPayer] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [activeTab, setActiveTab] = useState("unresolved");

  const handlePayerFilter = (payer: string, admin?: string) => {
    setSelectedPayer(payer);
    setSelectedAdmin(admin || "");
  };

  const handleClaimClick = (claim: Claim) => {
    setSelectedClaim(claim);
    onClaimSelect(claim);
  };

  const getPayerDisplayName = (claim: Claim) => {
    if (claim.payerAdmin) {
      return `${claim.payerAdmin}`;
    }
    return claim.payer;
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "Rebill":
        return "bg-green-100 text-green-800 border-green-200";
      case "Appeal":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Deny":
        return "bg-red-100 text-red-800 border-red-200";
      case "Investigate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredClaims = claims.filter(claim => {
    const payerMatch = !selectedPayer || claim.payer.toLowerCase() === selectedPayer;
    const adminMatch = !selectedAdmin || claim.payerAdmin?.toLowerCase() === selectedAdmin;
    const statusMatch = claim.status === activeTab;
    return payerMatch && adminMatch && statusMatch;
  });

  const resolvedClaims = claims.filter(claim => claim.status === "resolved");
  const unresolvedClaims = claims.filter(claim => claim.status === "unresolved");

  return (
    <div className="flex h-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* Left Panel - Claims List */}
      <div className="w-1/2 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#0F2C5D]">Claims</h2>
            <div className="flex items-center gap-4">
              <PayerDropdown
                selectedPayer={selectedPayer}
                selectedAdmin={selectedAdmin}
                onPayerChange={handlePayerFilter}
                className="w-48"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedPayer("");
                  setSelectedAdmin("");
                }}
                className="text-gray-600"
              >
                Clear
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="unresolved" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Unresolved ({unresolvedClaims.length})
              </TabsTrigger>
              <TabsTrigger value="resolved" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Resolved ({resolvedClaims.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="overflow-y-auto h-96">
          <AnimatePresence>
            {filteredClaims.map((claim) => (
              <motion.div
                key={claim.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                whileHover={{ backgroundColor: "#f9fafb" }}
                onClick={() => handleClaimClick(claim)}
                className={`p-3 border-b border-gray-100 cursor-pointer transition-colors duration-200 ${
                  selectedClaim?.id === claim.id ? "bg-blue-50 border-l-4 border-l-[#00A896]" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">#{claim.id}</span>
                      <Badge
                        className={`${getClassificationColor(claim.classification)} text-xs px-2 py-0.5`}
                      >
                        {claim.classification}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600 mb-1">
                      {claim.patient} • {getPayerDisplayName(claim)}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {claim.denialReason}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-medium">${claim.amountBilled}</span>
                    {claim.status === "resolved" && claim.resolvedDate && (
                      <span className="text-xs text-green-600">
                        Resolved {claim.resolvedDate}
                      </span>
                    )}
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredClaims.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No claims found matching your filters</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {filteredClaims.length} of {claims.filter(c => c.status === activeTab).length} claims
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[#00A896] text-[#00A896] hover:bg-[#00A896]/10"
          >
            Export List
          </Button>
        </div>
      </div>

      {/* Right Panel - Claim Details */}
      <div className="w-1/2 bg-gray-50">
        <AnimatePresence mode="wait">
          {selectedClaim ? (
            <motion.div
              key={selectedClaim.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full overflow-y-auto"
            >
              <ClaimDetailView claim={selectedClaim} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center text-center p-8"
            >
              <div>
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Select a Claim
                </h3>
                <p className="text-gray-500">
                  Click on any claim from the list to view detailed information
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const defaultClaims: Claim[] = [
  {
    id: "12345",
    patient: "John Smith",
    dateOfService: "04/10/2025",
    cptCode: "99213",
    amountBilled: 150,
    payer: "Medicaid",
    payerAdmin: "TMHP",
    denialReason: "CPT 99213 - No authorization",
    classification: "Rebill",
    actionNeeded: "✅ Rebill now",
    eobSnippet: "Claim denied: CPT 99213 requires prior authorization per TMHP Policy §4.2.1",
    status: "unresolved",
    originalDenial: "CPT 99213 requires prior authorization",
  },
  {
    id: "12346",
    patient: "Sarah Johnson",
    dateOfService: "04/08/2025",
    cptCode: "99214",
    amountBilled: 200,
    payer: "Medicaid",
    payerAdmin: "TMHP",
    denialReason: "Missing COB",
    classification: "Investigate",
    actionNeeded: "⚠ Investigate",
    eobSnippet: "Claim denied: Missing coordination of benefits information required",
    status: "unresolved",
    originalDenial: "Missing coordination of benefits information",
  },
  {
    id: "12347",
    patient: "Mike Davis",
    dateOfService: "04/05/2025",
    cptCode: "99215",
    amountBilled: 250,
    payer: "Commercial Payer",
    payerAdmin: "Availity",
    denialReason: "Prior Auth Expired",
    classification: "Appeal",
    actionNeeded: "📝 Draft Appeal",
    eobSnippet: "Claim denied: Authorization #TX-MED-2024-00123 expired on 03/15/2025",
    status: "unresolved",
    originalDenial: "Prior authorization expired",
  },
  {
    id: "12348",
    patient: "Lisa Wilson",
    dateOfService: "04/02/2025",
    cptCode: "99212",
    amountBilled: 120,
    payer: "Medicare",
    payerAdmin: "FISS",
    denialReason: "Duplicate Claim",
    classification: "Deny",
    actionNeeded: "❌ Close claim",
    eobSnippet: "Claim denied: Duplicate of claim #11982 processed on 04/02/2025",
    status: "resolved",
    resolvedDate: "04/14/2025",
    originalDenial: "Duplicate claim submission",
  },
  {
    id: "12349",
    patient: "Robert Brown",
    dateOfService: "04/01/2025",
    cptCode: "99213",
    amountBilled: 175,
    payer: "Commercial Payer",
    payerAdmin: "Aetna",
    denialReason: "Patient Not Eligible",
    classification: "Investigate",
    actionNeeded: "⚠ Verify eligibility",
    eobSnippet: "Claim denied: Patient not eligible for service on date of service 04/05/2025",
    status: "resolved",
    resolvedDate: "04/13/2025",
    originalDenial: "Patient eligibility verification failed",
  },
  {
    id: "12350",
    patient: "Emily Taylor",
    dateOfService: "04/12/2025",
    cptCode: "99214",
    amountBilled: 190,
    payer: "Medicaid",
    payerAdmin: "Molina",
    denialReason: "Incorrect modifier",
    classification: "Rebill",
    actionNeeded: "✅ Rebill now",
    eobSnippet: "Claim denied: Incorrect modifier used for procedure",
    status: "unresolved",
    originalDenial: "Incorrect procedure modifier",
  },
];

export default ClaimsTable;