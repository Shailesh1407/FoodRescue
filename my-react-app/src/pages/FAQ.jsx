import { Card } from "../component/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../component/ui/accordion";
import { Button } from "../component/ui/button";
import { HelpCircle, Users, Building2, Heart, MapPin, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqCategories = [
    {
      icon: Users,
      title: "General Questions",
      items: [
        {
          question: "What is FoodRescue AI?",
          answer: "FoodRescue AI is an innovative platform that uses artificial intelligence to predict food waste, coordinate food rescue operations, and track environmental impact. We connect donors, NGOs, and volunteers to create a more sustainable food ecosystem."
        },
        {
          question: "How does the AI prediction work?",
          answer: "Our AI algorithms analyze historical data, seasonal patterns, weather conditions, and local events to predict when and where food surplus or waste is likely to occur. This enables proactive rescue operations before food goes bad."
        },
        {
          question: "Is the platform free to use?",
          answer: "Yes! Our platform is free for NGOs, volunteers, and donors. Premium features for large organizations help fund free services."
        }
      ]
    },
    {
      icon: Building2,
      title: "For NGOs",
      items: [
        {
          question: "How can my NGO join the platform?",
          answer: "NGOs can register through our NGO Dashboard. Provide organizational info, documents, and service areas. Applications are reviewed within 48 hours."
        },
        {
          question: "What types of food donations can we receive?",
          answer: "We facilitate donations of fresh produce, prepared meals, packaged goods, and bulk ingredients that meet safety standards."
        },
        {
          question: "How do we track and report our impact?",
          answer: "The platform automatically tracks rescue operations, meals saved, CO2 reduced, and beneficiaries served. Reports can be generated for stakeholders."
        }
      ]
    },
    {
      icon: Heart,
      title: "For Donors",
      items: [
        {
          question: "What can I donate through the platform?",
          answer: "You can donate surplus food from restaurants, grocery stores, events, or home kitchens. We accept fresh produce, prepared meals, packaged goods, and bulk ingredients that meet safety standards."
        },
        {
          question: "How do I schedule a pickup?",
          answer: "Use the Donor Dashboard to create a donation listing. The system notifies nearby NGOs and volunteers who can collect the donation."
        },
        {
          question: "Are there any liability concerns?",
          answer: "We operate under Good Samaritan laws that protect food donors. Guidance on safety standards and best practices is provided."
        }
      ]
    },
    {
      icon: MapPin,
      title: "Volunteer Program",
      items: [
        {
          question: "How can I volunteer for food rescue?",
          answer: "Register via the Volunteer page. Receive notifications for opportunities near you. Training and support are provided."
        },
        {
          question: "What equipment do I need as a volunteer?",
          answer: "Basic requirements: reliable transport, insulated bags/containers. Additional equipment may be provided for regular volunteers."
        },
        {
          question: "How much time commitment is required?",
          answer: "Volunteer commitment is flexible! Pickups typically take 30-60 minutes, and you choose opportunities to accept."
        }
      ]
    }
  ];

  const quickStats = [
    { label: "Questions Answered", value: "500+" },
    { label: "Average Response Time", value: "< 2 hours" },
    { label: "User Satisfaction", value: "98%" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-green-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Frequently Asked <span className="text-green-600">Questions</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Find answers to common questions about our platform, food rescue process, and how you can make a difference.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickStats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="p-6 bg-white shadow-lg rounded-xl text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300"
              >
                <div className="text-3xl font-bold text-green-500 mb-2">{stat.value}</div>
                <div className="text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center shadow-md">
                  <category.icon className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
              </div>
              
              <Accordion type="single" collapsible className="space-y-4">
                {category.items.map((faq, faqIndex) => (
                  <AccordionItem 
                    key={faqIndex} 
                    value={`${categoryIndex}-${faqIndex}`}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <AccordionTrigger className="text-left py-5 px-6 hover:bg-green-50 transition-colors rounded-xl">
                      <span className="font-medium text-gray-900 no-underline">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 px-6 bg-white/50 backdrop-blur-sm transition-colors">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-gradient-to-tr from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help you get started with food rescue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="min-w-[200px] bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg transition-all">
              Contact Support
            </Button>
            <Button variant="outline" size="lg" className="min-w-[200px] border-green-600 text-green-600 hover:bg-green-50">
              Join Community
            </Button>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BarChart3, title: "Impact Reports", text: "Learn how food rescue creates measurable environmental and social impact.", button: "View Reports" },
              { icon: Users, title: "Community Guide", text: "Best practices for successful food rescue operations and community building.", button: "Read Guide" },
              { icon: Building2, title: "API Documentation", text: "Technical documentation for developers integrating with our platform.", button: "View Docs" }
            ].map((res, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="p-6 bg-white shadow-lg rounded-xl text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300"
              >
                <res.icon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{res.title}</h3>
                <p className="text-gray-600 mb-4">{res.text}</p>
                <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">{res.button}</Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default FAQ;
