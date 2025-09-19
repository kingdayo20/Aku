import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PayerOption {
  id: string;
  name: string;
  administrators?: {
    id: string;
    name: string;
    fullName: string;
  }[];
}

interface PayerDropdownProps {
  selectedPayer?: string;
  selectedAdmin?: string;
  onPayerChange?: (payer: string, admin?: string) => void;
  className?: string;
}

const PayerDropdown = ({
  selectedPayer = "",
  selectedAdmin = "",
  onPayerChange = () => {},
  className = "",
}: PayerDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const payerOptions: PayerOption[] = [
    {
      id: "medicaid",
      name: "Medicaid",
      administrators: [
        { id: "tmhp", name: "TMHP", fullName: "Texas Medicaid Health Partnership" },
        { id: "uhc-medicaid", name: "UHC Medicaid", fullName: "UnitedHealthcare Community Plan" },
        { id: "molina", name: "Molina", fullName: "Molina Healthcare" },
        { id: "superior", name: "Superior", fullName: "Superior HealthPlan" },
        { id: "amerigroup", name: "Amerigroup", fullName: "Amerigroup Texas" },
      ],
    },
    {
      id: "medicare",
      name: "Medicare",
      administrators: [
        { id: "fiss", name: "FISS", fullName: "Fiscal Intermediary Standard System" },
        { id: "novitas", name: "Novitas", fullName: "Novitas Solutions" },
        { id: "palmetto", name: "Palmetto", fullName: "Palmetto GBA" },
        { id: "wps", name: "WPS", fullName: "Wisconsin Physicians Service" },
        { id: "cgsmedicare", name: "CGS Medicare", fullName: "CGS Administrators" },
      ],
    },
    {
      id: "commercial",
      name: "Commercial Payer",
      administrators: [
        { id: "aetna", name: "Aetna", fullName: "Aetna Inc." },
        { id: "bcbs", name: "BCBS", fullName: "Blue Cross Blue Shield" },
        { id: "cigna", name: "Cigna", fullName: "Cigna Healthcare" },
        { id: "humana", name: "Humana", fullName: "Humana Inc." },
        { id: "uhc-commercial", name: "UHC", fullName: "UnitedHealthcare" },
        { id: "availity", name: "Availity", fullName: "Availity LLC" },
        { id: "anthem", name: "Anthem", fullName: "Anthem Inc." },
      ],
    },
  ];

  const getDisplayText = () => {
    if (!selectedPayer) return "Select Payer";
    
    const payer = payerOptions.find(p => p.id === selectedPayer);
    if (!payer) return "Select Payer";
    
    if (selectedAdmin) {
      const admin = payer.administrators?.find(a => a.id === selectedAdmin);
      return admin ? `${admin.name} (${payer.name})` : payer.name;
    }
    
    return payer.name;
  };

  const handlePayerSelect = (payerId: string, adminId?: string) => {
    onPayerChange(payerId, adminId);
    setIsOpen(false);
  };

  return (
    <div className={className}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between text-left font-normal"
          >
            <span className="truncate">{getDisplayText()}</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 opacity-50" />
            </motion.div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" align="start">
          {payerOptions.map((payer) => (
            <div key={payer.id}>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center justify-between">
                  <span className="font-medium text-[#0F2C5D]">{payer.name}</span>
                  <ChevronRight className="h-4 w-4" />
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-72">
                  <DropdownMenuItem
                    onClick={() => handlePayerSelect(payer.id)}
                    className="font-medium text-[#0F2C5D] bg-slate-50"
                  >
                    {payer.name} (General)
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {payer.administrators?.map((admin) => (
                    <DropdownMenuItem
                      key={admin.id}
                      onClick={() => handlePayerSelect(payer.id, admin.id)}
                      className="flex flex-col items-start py-3"
                    >
                      <div className="font-medium text-[#00A896]">
                        {admin.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {admin.fullName}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              {payer.id !== payerOptions[payerOptions.length - 1].id && (
                <DropdownMenuSeparator />
              )}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PayerDropdown;