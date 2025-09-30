import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Integrations = () => {
  const integrations = [
    {
      name: "Epic Hyperspace Bot",
      description: "Desktop automation (UiPath)",
      status: "active"
    },
    {
      name: "TMHP Portal Bot",
      description: "Nightly scrape 2:00 AM", 
      status: "active"
    },
    {
      name: "Availity (835/837)",
      description: "SFTP pull hourly",
      status: "active"
    },
    {
      name: "SMTP Notifications",
      description: "Email alerts for WQ spikes",
      status: "active"
    }
  ];

  return (
    <div className="flex-1 bg-gray-50 p-6">
      {/* Content */}
      <div>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Integrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {integrations.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{integration.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{integration.description}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Integrations;