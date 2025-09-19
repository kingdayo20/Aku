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
  aiAnalysis = {
    reason: "Missing Prior Authorization",
    source:
      'TMHP Policy §4.2.1 — "All E&M visits >$100 require pre-auth effective 01/01/2025."',
    confidence: 97,
    historicalPattern:
      "89% of similar denials were fixed via REBILL after resubmission with auth.",
  },
  recommendedAction = "Rebill",
  epicReadyNote = "Note: Claim #12345 denied due to missing prior authorization per TMHP Policy §4.2.1. Verified patient eligibility; authorization was not obtained prior to service. Resubmitting with supporting documentation (auth #TX-MED-2025-00432). Requested: Rebill.\\n\\nAudit Trail: AI classified on 04/15/2025. Source: TMHP EOB dated 04/12/2025.",
}) => {
  const [selectedAction, setSelectedAction] =
    useState<string>(recommendedAction);
  const [note, setNote] = useState<string>(epicReadyNote);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("claim");

  const handleCopyNote = () => {
    navigator.clipboard.writeText(note);
    setCopied(true);
    toast({
      title: "Note copied to clipboard",
      description: "The Epic-ready note has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetNote = () => {
    setNote(epicReadyNote);
    toast({
      title: "Note reset",
      description: "The note has been reset to the AI-generated version.",
    });
  };

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
      return `${claim.payerAdmin} (${claim.payer})`;
    }
    return claim.payer;
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="claim" className="text-sm font-medium">
            Claim Details
          </TabsTrigger>
          <TabsTrigger value="analysis" className="text-sm font-medium">
            AI Analysis
          </TabsTrigger>
          <TabsTrigger value="action" className="text-sm font-medium">
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
                        Administrator: {claim.payerAdmin}
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
                        {claim.payerAdmin || "N/A"}
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
              <CardHeader className="bg-[#0F2C5D] text-white rounded-t-xl">
                <CardTitle className="text-xl">AI Analysis</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <motion.div className="space-y-6" variants={containerVariants}>
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Denial Reason:</span>
                      <span className="font-medium text-[#0F2C5D]">
                        {aiAnalysis.reason}
                      </span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm italic">{aiAnalysis.source}</p>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">AI Confidence:</span>
                      <span className="font-bold">
                        {aiAnalysis.confidence}%
                      </span>
                    </div>
                    <div className="relative pt-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${aiAnalysis.confidence}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      >
                        <Progress
                          value={aiAnalysis.confidence}
                          className="h-2"
                        />
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="p-4 bg-blue-50 rounded-lg border border-blue-100"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <AlertCircle size={18} className="text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-700 mb-1">
                          Historical Pattern
                        </h4>
                        <p className="text-sm text-blue-600">
                          {aiAnalysis.historicalPattern}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="action">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="bg-[#0F2C5D] text-white rounded-t-xl">
                <CardTitle className="text-xl">Recommended Action</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <motion.div className="space-y-8" variants={containerVariants}>
                  <motion.div variants={itemVariants}>
                    <RadioGroup
                      defaultValue={selectedAction}
                      onValueChange={setSelectedAction}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                      <div
                        className={`border rounded-lg p-4 ${selectedAction === "Rebill" ? "border-[#00A896] bg-[#00A896]/10" : "border-gray-200"}`}
                      >
                        <RadioGroupItem
                          value="Rebill"
                          id="rebill"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="rebill"
                          className={`flex flex-col items-center cursor-pointer ${selectedAction === "Rebill" ? "text-[#00A896]" : ""}`}
                        >
                          {selectedAction === "Rebill" && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="mb-2"
                            >
                              <CheckCircle size={24} />
                            </motion.div>
                          )}
                          <span>Rebill</span>
                        </Label>
                      </div>

                      <div
                        className={`border rounded-lg p-4 ${selectedAction === "Appeal" ? "border-[#00A896] bg-[#00A896]/10" : "border-gray-200"}`}
                      >
                        <RadioGroupItem
                          value="Appeal"
                          id="appeal"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="appeal"
                          className={`flex flex-col items-center cursor-pointer ${selectedAction === "Appeal" ? "text-[#00A896]" : ""}`}
                        >
                          {selectedAction === "Appeal" && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="mb-2"
                            >
                              <CheckCircle size={24} />
                            </motion.div>
                          )}
                          <span>Appeal</span>
                        </Label>
                      </div>

                      <div
                        className={`border rounded-lg p-4 ${selectedAction === "Write-off" ? "border-[#00A896] bg-[#00A896]/10" : "border-gray-200"}`}
                      >
                        <RadioGroupItem
                          value="Write-off"
                          id="write-off"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="write-off"
                          className={`flex flex-col items-center cursor-pointer ${selectedAction === "Write-off" ? "text-[#00A896]" : ""}`}
                        >
                          {selectedAction === "Write-off" && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="mb-2"
                            >
                              <CheckCircle size={24} />
                            </motion.div>
                          )}
                          <span>Write-off</span>
                        </Label>
                      </div>

                      <div
                        className={`border rounded-lg p-4 ${selectedAction === "Close" ? "border-[#00A896] bg-[#00A896]/10" : "border-gray-200"}`}
                      >
                        <RadioGroupItem
                          value="Close"
                          id="close"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="close"
                          className={`flex flex-col items-center cursor-pointer ${selectedAction === "Close" ? "text-[#00A896]" : ""}`}
                        >
                          {selectedAction === "Close" && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="mb-2"
                            >
                              <CheckCircle size={24} />
                            </motion.div>
                          )}
                          <span>Close</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-lg">Epic-Ready Note</h3>
                      <div className="flex gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleCopyNote}
                                className="flex items-center gap-1"
                              >
                                {copied ? (
                                  <Check size={16} />
                                ) : (
                                  <Copy size={16} />
                                )}
                                <span>{copied ? "Copied" : "Copy"}</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy note to clipboard</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="min-h-[150px] border-none bg-transparent focus-visible:ring-0 p-0"
                      />
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleResetNote}
                        className="flex items-center gap-1"
                      >
                        <Edit size={16} />
                        <span>Reset to AI</span>
                      </Button>

                      <Button className="bg-[#00A896] hover:bg-[#00A896]/90 flex items-center gap-1">
                        <span>Submit to Epic</span>
                        <ChevronRight size={16} />
                      </Button>
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