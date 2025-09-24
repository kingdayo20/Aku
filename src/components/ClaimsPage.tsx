import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, FileText, Calendar, DollarSign, User, Building } from "lucide-react";

interface ClaimsPageProps {
  claimsData: any[];
}

const ClaimsPage = ({ claimsData }: ClaimsPageProps) => {
  const [filterPayer, setFilterPayer] = useState("All Payers");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [showClaimDetail, setShowClaimDetail] = useState(false);

  // Filter claims based on status
  const getFilteredClaims = (status: string) => {
    let filtered = claimsData;
    
    if (status === "Pending") {
      filtered = filtered.filter(claim => claim.status === "pending");
    } else if (status === "Denied") {
      filtered = filtered.filter(claim => claim.status === "denied");
    } else if (status === "Paid") {
      filtered = filtered.filter(claim => claim.status === "resolved");
    }

    if (filterPayer !== "All Payers") {
      filtered = filtered.filter(claim => 
        claim.payerAdmin?.toLowerCase().includes(filterPayer.toLowerCase()) ||
        claim.payer.toLowerCase().includes(filterPayer.toLowerCase())
      );
    }

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(claim =>
        claim.id.toLowerCase().includes(lowercasedTerm) ||
        claim.patient.toLowerCase().includes(lowercasedTerm) ||
        claim.denialReason.toLowerCase().includes(lowercasedTerm) ||
        claim.cptCode.toLowerCase().includes(lowercasedTerm)
      );
    }

    return filtered;
  };

  const getStatusBadge = (claim: any) => {
    if (claim.status === "resolved") {
      return <Badge className="bg-gray-900 text-white">Paid</Badge>;
    } else if (claim.status === "pending") {
      return <Badge className="bg-gray-500 text-white">Pending</Badge>;
    } else if (claim.status === "denied") {
      return <Badge className="bg-red-500 text-white">Denied</Badge>;
    }
    return <Badge className="bg-gray-500 text-white">Pending</Badge>;
  };

  const handleClaimClick = (claim: any) => {
    setSelectedClaim(claim);
    setShowClaimDetail(true);
  };

  const allClaims = getFilteredClaims("All");
  const pendingClaims = getFilteredClaims("Pending");
  const deniedClaims = getFilteredClaims("Denied");
  const paidClaims = getFilteredClaims("Paid");

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Claims</h1>
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
              Claims
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by payer
                </label>
                <Select value={filterPayer} onValueChange={setFilterPayer}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Payers">All Payers</SelectItem>
                    <SelectItem value="TMHP">TMHP</SelectItem>
                    <SelectItem value="BCBS">BCBS</SelectItem>
                    <SelectItem value="UHC">UHC</SelectItem>
                    <SelectItem value="Aetna">Aetna</SelectItem>
                    <SelectItem value="Medicare">Medicare</SelectItem>
                    <SelectItem value="Cigna">Cigna</SelectItem>
                    <SelectItem value="Humana">Humana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search ICN / MRN / Patient
                </label>
                <Input
                  placeholder="e.g., 2025-09-0001 or Jane Doe"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="All">All</TabsTrigger>
                <TabsTrigger value="Pending">Pending</TabsTrigger>
                <TabsTrigger value="Denied">Denied</TabsTrigger>
                <TabsTrigger value="Paid">Paid</TabsTrigger>
              </TabsList>

              <TabsContent value="All" className="mt-6">
                <ClaimsTable claims={allClaims} getStatusBadge={getStatusBadge} onClaimClick={handleClaimClick} />
              </TabsContent>
              <TabsContent value="Pending" className="mt-6">
                <ClaimsTable claims={pendingClaims} getStatusBadge={getStatusBadge} onClaimClick={handleClaimClick} />
              </TabsContent>
              <TabsContent value="Denied" className="mt-6">
                <ClaimsTable claims={deniedClaims} getStatusBadge={getStatusBadge} onClaimClick={handleClaimClick} />
              </TabsContent>
              <TabsContent value="Paid" className="mt-6">
                <ClaimsTable claims={paidClaims} getStatusBadge={getStatusBadge} onClaimClick={handleClaimClick} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Claim Detail Dialog */}
      <Dialog open={showClaimDetail} onOpenChange={setShowClaimDetail}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#0F2C5D]">
              Claim Details - #{selectedClaim?.id}
            </DialogTitle>
          </DialogHeader>
          
          {selectedClaim && (
            <div className="space-y-6">
              {/* Basic Info */}
              <Card>
                <CardHeader className="bg-[#0F2C5D] text-white">
                  <CardTitle className="flex items-center justify-between">
                    <span>Basic Information</span>
                    <Badge className="bg-[#00A896] text-white">
                      {selectedClaim.payerAdmin?.toUpperCase() || selectedClaim.payer}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Patient</p>
                          <p className="font-medium">{selectedClaim.patient}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Date of Service</p>
                          <p className="font-medium">{selectedClaim.dateOfService}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">CPT Code</p>
                          <p className="font-medium">{selectedClaim.cptCode}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Amount Billed</p>
                          <p className="font-medium text-lg">${selectedClaim.amountBilled.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Payer</p>
                          <p className="font-medium">{selectedClaim.payer}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        {getStatusBadge(selectedClaim)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Denial Information */}
              <Card>
                <CardHeader className="bg-red-50">
                  <CardTitle className="text-red-800">Denial Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Denial Reason</p>
                      <p className="font-medium text-red-600">{selectedClaim.denialReason}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Classification</p>
                      <Badge className={`${
                        selectedClaim.classification === "Appeal" ? "bg-blue-100 text-blue-800" :
                        selectedClaim.classification === "Investigate" ? "bg-yellow-100 text-yellow-800" :
                        selectedClaim.classification === "Rebill" ? "bg-green-100 text-green-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {selectedClaim.classification}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Action Needed</p>
                      <p className="font-medium">{selectedClaim.actionNeeded}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">EOB Snippet</p>
                      <div className="bg-gray-50 p-3 rounded border">
                        <p className="text-sm">{selectedClaim.eobSnippet}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button className="bg-[#00A896] hover:bg-[#008A7B] text-white">
                  Run AI Analysis
                </Button>
                <Button variant="outline">
                  Create Appeal
                </Button>
                <Button variant="outline">
                  Export Details
                </Button>
                <Button variant="outline" onClick={() => setShowClaimDetail(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ClaimsTable = ({ 
  claims, 
  getStatusBadge, 
  onClaimClick 
}: { 
  claims: any[], 
  getStatusBadge: (claim: any) => React.ReactNode,
  onClaimClick: (claim: any) => void
}) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold">ICN</TableHead>
            <TableHead className="font-semibold">Payer</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Action</TableHead>
            <TableHead className="font-semibold text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {claims.map((claim, index) => (
            <motion.tr
              key={claim.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-gray-50"
            >
              <TableCell
                className="font-medium cursor-pointer"
                onClick={() => onClaimClick(claim)}
              >
                {claim.id}
              </TableCell>
              <TableCell>{claim.payerAdmin?.toUpperCase() || claim.payer}</TableCell>
              <TableCell>{getStatusBadge(claim)}</TableCell>
              <TableCell>
                <Button
                  variant="link"
                  className="p-0 h-auto text-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClaimClick(claim);
                  }}
                >
                  {claim.actionNeeded}
                </Button>
              </TableCell>
              <TableCell className="text-right font-medium">
                ${claim.amountBilled.toFixed(2)}
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
      {claims.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No claims found matching your criteria
        </div>
      )}
    </div>
  );
};

export default ClaimsPage;