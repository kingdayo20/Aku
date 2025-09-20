import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  Edit,
  FileText,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";

interface ClaimDetailViewProps {
  claim?: {
    id: string;
    patient: string;
    dateOfService: string;
    cptCode: string;
    amountBilled: number;
    payer: string;
    payerAdmin?: string;
    originalDenial: string;
    eobSnippet: string;
  };
  showAIAnalysis?: boolean;
  isRunningAI?: boolean;
  aiAnalysis?: {
    reason: string;
    source: string;
    confidence: number;
    historicalPattern: string;
  };
  recommendedAction?: string;
  epicReadyNote?: string;
}

const ClaimDetailView: React.FC<ClaimDetailViewProps> = ({
  claim = {
    id: "12345",
    patient: "John Smith",
    dateOfService: "04/10/2025",
    cptCode: "99213",
    amountBilled: 150,
    payer: "Medicaid",
    payerAdmin: "TMHP",
    originalDenial: "CPT 99213 requires prior authorization",
    eobSnippet: "EOB_12345.pdf",
  },
  showAIAnalysis = false,
  isRunningAI = false,
  aiAnalysis = {
    reason: "Missing Prior Authorization",
    source:
      'TMHP Policy §4.2.1 — "All E&M visits >$100 require pre-auth effective 01/01/2025."',
    confidence: 97,
    historicalPattern:
      "89% of similar denials were fixed via REBILL after resubmission with auth.",
  },
  recommendedAction = "Rebill",
  epicReadyNote = "Note: Claim #12345 denied due to missing prior authorization per TMHP Policy §4.2.1. Verified patient eligibility; authorization was not obtained prior to service. Resubmitting with supporting documentation (auth #TX-MED-2025-00432). Requested: Rebill.\\\\n\\\\nAudit Trail: AI classified on 04/15/2025. Source: TMHP EOB dated 04/12/2025.",
}) => {
  const [activeTab, setActiveTab] = useState("claim");
  const [copied, setCopied] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "bg-green-500";
    if (confidence >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getPayerDisplayName = () => {
    if (claim.payerAdmin) {
      return `${claim.payerAdmin.toUpperCase()} (${claim.payer})`;
    }
    return claim.payer;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunAIAnalysis = () => {
    setIsRunningAI(true);
    // Simulate AI analysis and auto-switch to analysis tab
    setTimeout(() => {
      setIsRunningAI(false);
      setShowAIAnalysis(true);
      setActiveTab("analysis"); // Auto-switch to analysis tab
    }, 4000);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 max-w-full mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="claim" className="text-sm font-medium">
            Claim Details
          </TabsTrigger>
          <TabsTrigger 
            value="analysis" 
            className="text-sm font-medium"
            disabled={!showAIAnalysis && !isRunningAI}
          >
            AI Analysis
          </TabsTrigger>
          <TabsTrigger 
            value="action" 
            className="text-sm font-medium"
            disabled={!showAIAnalysis}
          >
            Action & Notes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="claim">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="bg-[#0F2C5D] text-white rounded-t-xl">
                <CardTitle className="text-xl flex items-center justify-between">
                  <span>Claim #{claim.id}</span>
                  <div className="flex flex-col items-end gap-1">
                    <Badge
                      variant="outline"
                      className="bg-[#00A896] text-white border-none"
                    >
                      {getPayerDisplayName()}
                    </Badge>
                    {claim.payerAdmin && (
                      <span className="text-xs text-white/80">
                        Administrator: {claim.payerAdmin.toUpperCase()}
                      </span>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={containerVariants}
                >
                  <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Patient:</span>
                      <span className="font-medium">{claim.patient}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date of Service:</span>
                      <span className="font-medium">{claim.dateOfService}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">CPT Code:</span>
                      <span className="font-medium">{claim.cptCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payer Type:</span>
                      <span className="font-medium">{claim.payer}</span>
                    </div>
                  </motion.div>
                  <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Amount Billed:</span>
                      <span className="font-medium">
                        ${claim.amountBilled.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Administrator:</span>
                      <span className="font-medium">
                        {claim.payerAdmin?.toUpperCase() || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Original Denial:</span>
                      <span className="font-medium text-red-500">
                        {claim.originalDenial}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">EOB Snippet:</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <FileText size={16} />
                        <span>View PDF</span>
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="analysis">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="bg-gradient-to-r from-[#00A896] to-[#0F2C5D] text-white rounded-t-xl">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Zap className="h-6 w-6" />
                  AI Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {isRunningAI ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="mb-4"
                    >
                      <Zap className="h-12 w-12 text-[#00A896]" />
                    </motion.div>
                    <h3 className="text-lg font-medium text-[#0F2C5D] mb-2">
                      AI Analysis in Progress
                    </h3>
                    <p className="text-gray-600 text-center">
                      Analyzing claim patterns, policy references, and historical data...
                    </p>
                    <div className="w-64 h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#00A896] to-[#0F2C5D]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                ) : showAIAnalysis ? (
                  <motion.div
                    className="space-y-6"
                    variants={containerVariants}
                  >
                    <motion.div variants={itemVariants}>
                      <h3 className="text-lg font-semibold text-[#0F2C5D] mb-3">
                        Denial Analysis
                      </h3>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-blue-800 font-medium">
                          {aiAnalysis.reason}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <h3 className="text-lg font-semibold text-[#0F2C5D] mb-3">
                        Policy Source
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#00A896]">
                        <p className="text-gray-700 italic">{aiAnalysis.source}</p>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <h3 className="text-lg font-semibold text-[#0F2C5D] mb-3">
                        Confidence Score
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <motion.div
                            className="bg-gradient-to-r from-[#00A896] to-[#0F2C5D] h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${aiAnalysis.confidence}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                        <span className="text-2xl font-bold text-[#0F2C5D]">
                          {aiAnalysis.confidence}%
                        </span>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <h3 className="text-lg font-semibold text-[#0F2C5D] mb-3">
                        Historical Pattern
                      </h3>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-green-800">{aiAnalysis.historicalPattern}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500">
                      Click "Run AI Analysis" to analyze this claim
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="action">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="bg-[#0F2C5D] text-white rounded-t-xl">
                <CardTitle className="text-xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6" />
                  Recommended Action & Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <motion.div className="space-y-6" variants={containerVariants}>
                  <motion.div variants={itemVariants}>
                    <h3 className="text-lg font-semibold text-[#0F2C5D] mb-3">
                      Recommended Action
                    </h3>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-[#00A896] text-white text-lg px-4 py-2">
                        {recommendedAction}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#00A896] text-[#00A896] hover:bg-[#00A896]/10"
                      >
                        Execute Action
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold text-[#0F2C5D]">
                        Epic-Ready Note
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(epicReadyNote)}
                        className="flex items-center gap-2"
                      >
                        <Copy size={16} />
                        {copied ? "Copied!" : "Copy Note"}
                      </Button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                        {epicReadyNote}
                      </pre>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ClaimDetailView;