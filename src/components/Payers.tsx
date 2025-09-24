import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PayersProps {
  claimsData: any[];
}

const Payers = ({ claimsData }: PayersProps) => {
  // Calculate payer counts from real claims data
  const payerCounts = claimsData.reduce((acc, claim) => {
    const payer = claim.payerAdmin || claim.payer;
    const payerType = claim.payer;
    
    if (!acc[payerType]) {
      acc[payerType] = {};
    }
    acc[payerType][payer] = (acc[payerType][payer] || 0) + 1;
    return acc;
  }, {});

  const payerSections = [
    {
      title: "Medicaid",
      payers: [
        { name: "TMHP", count: payerCounts.medicaid?.tmhp || 0 },
        { name: "NY Medicaid", count: payerCounts.medicaid?.["ny-medicaid"] || 0 },
        { name: "CA Medi-Cal", count: payerCounts.medicaid?.["ca-medicaid"] || 0 },
      ]
    },
    {
      title: "Medicare", 
      payers: [
        { name: "Medicare A/B", count: payerCounts.medicare?.fiss || 0 },
        { name: "Railroad Medicare", count: payerCounts.medicare?.["railroad-medicare"] || 0 },
      ]
    },
    {
      title: "Commercial",
      payers: [
        { name: "BCBS", count: payerCounts.commercial?.bcbs || 0 },
        { name: "UHC", count: payerCounts.commercial?.["uhc-commercial"] || 0 },
        { name: "Aetna", count: payerCounts.commercial?.aetna || 0 },
        { name: "Cigna", count: payerCounts.commercial?.cigna || 0 },
        { name: "Humana", count: payerCounts.commercial?.humana || 0 },
      ]
    }
  ];

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payers</h1>
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
              Payer Directory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {payerSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                >
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.payers.map((payer, index) => (
                      <motion.div
                        key={payer.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: sectionIndex * 0.1 + index * 0.05 }}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <span className="font-medium text-gray-900">
                            {payer.name}
                          </span>
                          {payer.count > 0 && (
                            <span className="text-sm text-gray-600 ml-2">
                              ({payer.count})
                            </span>
                          )}
                        </div>
                        <Button 
                          variant="outline"
                          size="sm"
                          className="text-gray-600"
                        >
                          Open
                        </Button>
                      </motion.div>
                    ))}
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

export default Payers;