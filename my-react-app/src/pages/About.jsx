import { Card } from "../component/ui/card";
import { Brain, Users, Globe, TrendingUp } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Predictions",
      description: "Advanced machine learning algorithms predict food waste patterns to optimize rescue operations."
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Connecting NGOs, donors, and volunteers in a unified platform for maximum impact."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Scaling food rescue operations worldwide to reduce waste and fight hunger."
    },
    {
      icon: TrendingUp,
      title: "Impact Tracking",
      description: "Real-time analytics and reporting to measure environmental and social impact."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-green-600">FoodRescue AI</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-8">
            We're on a mission to eliminate food waste and hunger through AI, community collaboration, and sustainable technology.
          </p>
          <div className="space-x-4">
            <button className="inline-block px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 shadow-lg hover:scale-105 hover:from-green-600 hover:to-green-500 transition-all duration-300">
              Get Started
            </button>
            <button className="inline-block px-6 py-3 rounded-lg font-semibold text-green-600 border-2 border-green-500 hover:bg-green-500 hover:text-white transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Global Food Crisis</h2>
              <div className="space-y-4">
                <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded-r-lg">
                  <p className="text-lg font-semibold text-gray-900">1.3 billion tons</p>
                  <p className="text-gray-500">of food is wasted globally each year</p>
                </div>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <p className="text-lg font-semibold text-gray-900">828 million people</p>
                  <p className="text-gray-500">face acute food insecurity worldwide</p>
                </div>
                <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-lg font-semibold text-gray-900">8-10%</p>
                  <p className="text-gray-500">of global greenhouse gas emissions come from food waste</p>
                </div>
              </div>
            </div>
            <div>
              <Card className="p-8 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Our Solution</h3>
                <p className="text-lg">
                  FoodRescue AI bridges the gap between food surplus and food insecurity using predictive analytics, 
                  real-time coordination, and impact measurement to create a sustainable food ecosystem.
                </p>
                <button className="mt-6 inline-block px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-700 to-green-500 shadow-lg hover:scale-105 hover:from-green-500 hover:to-green-700 transition-all duration-300">
                  Join Us
                </button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How We're Making a Difference</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Our three-step approach combines cutting-edge technology with human compassion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((step) => (
              <Card key={step} className="p-8 text-center hover:shadow-lg transition-shadow bg-white rounded-lg">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className={`${step === 2 ? "text-accent-foreground" : "text-white"} text-2xl font-bold`}>{step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step === 1 ? "Predict" : step === 2 ? "Rescue" : "Track Impact"}
                </h3>
                <p className="text-gray-500 text-sm">
                  {step === 1 
                    ? "AI algorithms analyze patterns to predict food surplus and waste hotspots before they happen."
                    : step === 2
                    ? "Connect donors with NGOs and volunteers for efficient food rescue and redistribution operations."
                    : "Measure and visualize environmental and social impact with comprehensive analytics and reporting."}
                </p>
                <button className="mt-6 inline-block px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 shadow-lg hover:scale-105 hover:from-green-600 hover:to-green-500 transition-all duration-300">
                  Learn More
                </button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow bg-white rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-500 mb-4">{feature.description}</p>
                    <button className="inline-block px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 shadow-lg hover:scale-105 hover:from-green-600 hover:to-green-500 transition-all duration-300">
                      Explore
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-500 text-lg">
                To eliminate food waste and hunger by creating an intelligent, collaborative ecosystem that 
                connects surplus food with those who need it most, while measuring and maximizing positive 
                environmental impact.
              </p>
            </Card>

            <Card className="p-8 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-500 text-lg">
                A world where no food goes to waste and no one goes hungry. Through AI-driven insights and 
                community collaboration, we envision sustainable food systems that benefit both people and planet.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
