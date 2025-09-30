import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const helpTopics = [
    {
      title: "Getting Started",
      description: "Learn the basics of using Denial Intelligence",
      articles: 5,
    },
    {
      title: "Claims Processing",
      description: "Understanding claim statuses and workflows",
      articles: 8,
    },
    {
      title: "Appeals Management",
      description: "How to create and track appeals effectively",
      articles: 6,
    },
    {
      title: "Payer Integration",
      description: "Setting up and managing payer connections",
      articles: 4,
    },
    {
      title: "Reporting & Analytics",
      description: "Generate reports and analyze denial trends",
      articles: 7,
    },
  ];
  return (
    <div className="flex-1 bg-gray-50 p-6">
      {/* Content */}
      <div className="space-y-8">
        {/* General Settings */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Payer Group
                </label>
                <Select defaultValue="medicaid">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medicaid">Medicaid</SelectItem>
                    <SelectItem value="medicare">Medicare</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Export Format
                </label>
                <Select defaultValue="csv">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="xlsx">Excel</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Enable Auto Bot
                  </h3>
                  <p className="text-sm text-gray-600">
                    Run payer bot nightly at 2:00 AM
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Schedule
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Thresholds & SLAs */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Thresholds & SLAs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Follow-up SLA (days)
                </label>
                <Input type="number" defaultValue="7" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appeal Window Warning (days)
                </label>
                <Input type="number" defaultValue="10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timely Filing Risk (days)
                </label>
                <Input type="number" defaultValue="85" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roles & Permissions */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Roles & Permissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { role: "Admin", permissions: "All access", users: "2 users" },
                {
                  role: "Analyst",
                  permissions: "Read + Export + Create Appeals",
                  users: "5 users",
                },
                {
                  role: "Coder",
                  permissions: "Read + Modify Codes",
                  users: "3 users",
                },
              ].map((roleData, index) => (
                <motion.div
                  key={roleData.role}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {roleData.role}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {roleData.permissions}
                    </p>
                    <p className="text-xs text-gray-500">{roleData.users}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Help Center */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Help Center
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {helpTopics.map((topic, index) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <h3 className="font-medium text-gray-900 mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {topic.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {topic.articles} articles
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;