import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  TrendingUp, 
  Clock, 
  Shield, 
  Zap, 
  BarChart3,
  Users,
  DollarSign,
  ArrowRight,
  Star
} from "lucide-react";

interface LandingPageProps {
  onLogin?: () => void;
  onSignUp?: () => void;
}

const LandingPage = ({ onLogin, onSignUp }: LandingPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      alert("Please fill in all required fields");
      return;
    }
    
    if (!isLogin && !name) {
      alert("Please enter your full name");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful authentication
    if (isLogin) {
      console.log("Logging in user:", email);
      if (onLogin) onLogin();
    } else {
      console.log("Signing up user:", { name, email });
      if (onSignUp) onSignUp();
    }

    setIsLoading(false);
    navigate("/");
  };

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-[#00A896]" />,
      title: "AI-Powered Automation",
      description: "Leverage advanced AI to automatically classify and resolve denials, reducing manual work by up to 80%."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[#00A896]" />,
      title: "Revenue Recovery",
      description: "Recover lost revenue faster with intelligent denial analysis and automated appeal generation."
    },
    {
      icon: <Clock className="h-8 w-8 text-[#00A896]" />,
      title: "Real-Time Processing",
      description: "Process claims in real-time with instant notifications and status updates across all payers."
    },
    {
      icon: <Shield className="h-8 w-8 text-[#00A896]" />,
      title: "Compliance & Security",
      description: "HIPAA-compliant platform with enterprise-grade security to protect sensitive healthcare data."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-[#00A896]" />,
      title: "Advanced Analytics",
      description: "Comprehensive reporting and analytics to track performance and identify revenue opportunities."
    },
    {
      icon: <Users className="h-8 w-8 text-[#00A896]" />,
      title: "Team Collaboration",
      description: "Streamlined workflows for AR teams with role-based access and collaborative tools."
    }
  ];

  const stats = [
    { value: "80%", label: "Reduction in Manual Work" },
    { value: "45%", label: "Faster Denial Resolution" },
    { value: "$2.3M", label: "Average Revenue Recovered" },
    { value: "99.9%", label: "Platform Uptime" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-white">
      {/* Header */}
      <motion.header
        className="bg-white shadow-sm border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            className="text-3xl font-bold text-[#0F2C5D]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Akuvera
            <span className="text-[#00A896] text-sm ml-2">AI</span>
          </motion.div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-[#0F2C5D]">
              About
            </Button>
            <Button variant="ghost" className="text-[#0F2C5D]">
              Features
            </Button>
            <Button variant="ghost" className="text-[#0F2C5D]">
              Contact
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="mb-4 bg-[#00A896] text-white">
              AI-Powered Denial Resolution
            </Badge>
            <h1 className="text-5xl font-bold text-[#0F2C5D] mb-6 leading-tight">
              Transform Your
              <span className="text-[#00A896]"> Revenue Cycle </span>
              with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Akuvera's AI Denial Resolution Assistant helps healthcare revenue cycle teams 
              automate denial resolution, recover lost revenue faster, and reduce manual workload 
              by up to 80%.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-[#00A896] hover:bg-[#008A7B] text-white px-8"
                onClick={() => setIsLogin(false)}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#0F2C5D] text-[#0F2C5D] hover:bg-[#0F2C5D] hover:text-white px-8"
              >
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#00A896]" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#00A896]" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#00A896]" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card className="shadow-2xl border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-[#0F2C5D]">
                  {isLogin ? "Welcome Back" : "Get Started Today"}
                </CardTitle>
                <p className="text-gray-600">
                  {isLogin 
                    ? "Sign in to your Akuvera account" 
                    : "Create your free account in seconds"
                  }
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="mt-1"
                        required
                        autoComplete="name"
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="mt-1"
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="mt-1"
                      required
                      autoComplete="current-password"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-[#0F2C5D] hover:bg-[#0A1F47] text-white"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
                  </Button>
                </form>
                
                <Separator className="my-6" />
                
                <div className="text-center">
                  <p className="text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <Button
                      variant="link"
                      className="text-[#00A896] hover:text-[#008A7B] p-1 ml-1"
                      onClick={() => setIsLogin(!isLogin)}
                    >
                      {isLogin ? "Sign up" : "Sign in"}
                    </Button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        className="bg-[#0F2C5D] py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-[#00A896] mb-2">
                  {stat.value}
                </div>
                <div className="text-white text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-[#0F2C5D] mb-4">
            Why Choose Akuvera?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform transforms how healthcare organizations handle denial resolution,
            making it faster, smarter, and more profitable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#0F2C5D] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="bg-gradient-to-r from-[#0F2C5D] to-[#00A896] py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Revenue Cycle?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of healthcare organizations already using Akuvera to recover millions in lost revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-[#0F2C5D] hover:bg-gray-100 px-8"
              onClick={() => setIsLogin(false)}
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-[#0F2C5D] px-8"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold text-[#0F2C5D] mb-4 md:mb-0">
              Akuvera
              <span className="text-[#00A896] text-sm ml-2">AI</span>
            </div>
            <div className="flex items-center gap-6 text-gray-600">
              <span>© 2024 Akuvera. All rights reserved.</span>
              <Button variant="link" className="text-gray-600 p-0">
                Privacy Policy
              </Button>
              <Button variant="link" className="text-gray-600 p-0">
                Terms of Service
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;