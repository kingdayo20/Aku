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

interface ClaimsPageProps {
  claimsData: any[];
}

const ClaimsPage = ({ claimsData }: ClaimsPageProps) => {
  const [filterPayer, setFilterPayer] = useState("All Payers");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // Filter claims based on status
  const getFilteredClaims = (status: string) => {
    let filtered = claimsData;
    
    if (status === "Pending") {
      filtered = filtered.filter(claim => claim.status === "pending");
    } else if (status === "Denied") {
      filtered = filtered.filter(claim => 
        claim.classification === "Appeal" || claim.classification === "Investigate"
      );
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
      filtered = filtered.filter(claim =>
        claim.id.includes(searchTerm) ||
        claim.patient.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const getStatusBadge = (claim: any) => {
    if (claim.status === "resolved") {
      return <Badge className="bg-gray-900 text-white">Paid</Badge>;
    } else if (claim.status === "pending") {
      return <Badge className="bg-gray-500 text-white">Pending</Badge>;
    } else if (claim.classification === "Appeal" || claim.classification === "Investigate") {
      return <Badge className="bg-red-500 text-white">Denied</Badge>;
    }
    return <Badge className="bg-gray-500 text-white">Pending</Badge>;
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
                <ClaimsTable claims={allClaims} getStatusBadge={getStatusBadge} />
              </TabsContent>
              <TabsContent value="Pending" className="mt-6">
                <ClaimsTable claims={pendingClaims} getStatusBadge={getStatusBadge} />
              </TabsContent>
              <TabsContent value="Denied" className="mt-6">
                <ClaimsTable claims={deniedClaims} getStatusBadge={getStatusBadge} />
              </TabsContent>
              <TabsContent value="Paid" className="mt-6">
                <ClaimsTable claims={paidClaims} getStatusBadge={getStatusBadge} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ClaimsTable = ({ claims, getStatusBadge }: { claims: any[], getStatusBadge: (claim: any) => React.ReactNode }) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold">ICN</TableHead>
            <TableHead className="font-semibold">Payer</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
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
              <TableCell className="font-medium">{claim.id}</TableCell>
              <TableCell>{claim.payerAdmin?.toUpperCase() || claim.payer}</TableCell>
              <TableCell>{getStatusBadge(claim)}</TableCell>
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