import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Help = () => {
  const helpTopics = [
    {
      title: "Getting Started",
      description: "Learn the basics of using Denial Intelligence",
      articles: 5
    },
    {
      title: "Claims Processing",
      description: "Understanding claim statuses and workflows", 
      articles: 8
    },
    {
      title: "Appeals Management",
      description: "How to create and track appeals effectively",
      articles: 6
    },
    {
      title: "Payer Integration",
      description: "Setting up and managing payer connections",
      articles: 4
    },
    {
      title: "Reporting & Analytics", 
      description: "Generate reports and analyze denial trends",
      articles: 7
    }
  ];

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Help</h1>
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
                  <h3 className="font-medium text-gray-900 mb-2">{topic.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
                  <p className="text-xs text-gray-500">{topic.articles} articles</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;