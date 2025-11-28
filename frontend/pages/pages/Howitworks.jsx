import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, Shield, Code, Rocket, Users, Brain, 
  Target, TrendingUp, Lock, Cloud, Database, 
  Smartphone, Globe, BarChart, Sparkles, 
  ChevronRight, Check, ArrowRight, Menu, X,
  Layers, Box, Activity, Cpu, Webhook
} from 'lucide-react';
import Header from './Header';

const FeaturesPage = () => {
  const [activeTab, setActiveTab] = useState('core');
  const heroRef = useRef(null);
  const coreRef = useRef(null);
  const technicalRef = useRef(null);
  const benefitsRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    [heroRef, coreRef, technicalRef, benefitsRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Customizable content - easily swap these for different hackathon themes
  const theme = {
    primaryColor: 'emerald', // Change to: blue, purple, indigo, rose, amber, etc.
    accentColor: 'teal',
    projectName: 'AI Platform',
    tagline: 'Innovation Made Simple'
  };

  const coreFeatures = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Smart Core Engine",
      description: "Advanced algorithms that power intelligent decision-making and automated workflows with precision.",
      highlight: "AI-Powered"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-Time Processing",
      description: "Lightning-fast data processing and instant responses for seamless user experiences.",
      highlight: "Instant Results"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption and security protocols to protect your sensitive data.",
      highlight: "100% Secure"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud-Native Architecture",
      description: "Scalable infrastructure that grows with your needs, from startup to enterprise.",
      highlight: "Auto-Scaling"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Multi-Platform Support",
      description: "Seamless experience across web, mobile, and desktop with native performance.",
      highlight: "Cross-Platform"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Smart Data Management",
      description: "Intelligent data storage, retrieval, and analytics with automatic optimization.",
      highlight: "Optimized"
    }
  ];

  const technicalFeatures = [
    {
      icon: <Code className="w-7 h-7" />,
      title: "Developer-Friendly APIs",
      description: "RESTful and GraphQL APIs with comprehensive documentation",
      tags: ["REST", "GraphQL", "WebSocket"]
    },
    {
      icon: <Webhook className="w-7 h-7" />,
      title: "Webhooks & Integrations",
      description: "Connect with 100+ third-party services and tools",
      tags: ["Zapier", "Slack", "GitHub"]
    },
    {
      icon: <Layers className="w-7 h-7" />,
      title: "Modular Architecture",
      description: "Plug-and-play components for rapid development",
      tags: ["Microservices", "Scalable", "Flexible"]
    },
    {
      icon: <Activity className="w-7 h-7" />,
      title: "Real-Time Analytics",
      description: "Live monitoring and insights dashboard",
      tags: ["Metrics", "Logs", "Alerts"]
    },
    {
      icon: <Cpu className="w-7 h-7" />,
      title: "High Performance",
      description: "Optimized for speed with edge computing",
      tags: ["CDN", "Caching", "Edge"]
    },
    {
      icon: <Lock className="w-7 h-7" />,
      title: "Advanced Authentication",
      description: "OAuth, SSO, and multi-factor authentication",
      tags: ["OAuth2", "SSO", "2FA"]
    }
  ];

  const benefits = [
    {
      stat: "10x",
      label: "Faster Development",
      description: "Ship products in days, not months"
    },
    {
      stat: "99.9%",
      label: "Uptime Guarantee",
      description: "Always available when you need it"
    },
    {
      stat: "50%",
      label: "Cost Reduction",
      description: "Save on infrastructure and maintenance"
    },
    {
      stat: "24/7",
      label: "Support Available",
      description: "Expert help whenever you need it"
    }
  ];

  const useCases = [
    {
      category: "Healthcare",
      examples: ["Patient Management", "Telemedicine", "Health Analytics"],
      color: "from-rose-500 to-pink-600"
    },
    {
      category: "Finance",
      examples: ["Payment Processing", "Fraud Detection", "Investment Tracking"],
      color: "from-blue-500 to-indigo-600"
    },
    {
      category: "E-Commerce",
      examples: ["Shopping Cart", "Inventory Management", "Order Tracking"],
      color: "from-amber-500 to-orange-600"
    },
    {
      category: "Education",
      examples: ["Learning Platform", "Student Portal", "Assignment Tracking"],
      color: "from-purple-500 to-violet-600"
    },
    {
      category: "Sustainability",
      examples: ["Carbon Tracking", "Resource Management", "Impact Analytics"],
      color: "from-emerald-500 to-teal-600"
    },
    {
      category: "Social Impact",
      examples: ["Community Platform", "Volunteer Management", "Donation Tracking"],
      color: "from-cyan-500 to-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');
        
        .opacity-0 { opacity: 0; }
        
        .animate-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(5, 150, 105, 0.15);
        }

        .text-gradient {
          background: linear-gradient(135deg, #059669, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-border {
          position: relative;
          background: white;
          border-radius: 1rem;
        }

        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          padding: 2px;
          background: linear-gradient(135deg, #059669, #10b981);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      {/* Use the fucking header component */}
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-6 opacity-0 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-200 rounded-full blur-3xl opacity-30 float-animation"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-200 rounded-full blur-3xl opacity-20 float-animation" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full mb-6 border border-emerald-200">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{theme.tagline}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Features That <span className="text-gradient">Empower</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to build, deploy, and scale your solution. Powerful capabilities designed for modern development.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center card-hover">
                <div className="text-4xl font-bold text-emerald-600 mb-2">{benefit.stat}</div>
                <div className="text-sm font-semibold text-gray-900 mb-1">{benefit.label}</div>
                <div className="text-xs text-gray-600">{benefit.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section ref={coreRef} className="py-20 bg-gray-50 opacity-0">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Core <span className="text-gradient">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge technology to deliver exceptional performance and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {coreFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-md card-hover border border-gray-100 relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-0 right-0 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-bl-lg">
                  {feature.highlight}
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section ref={technicalRef} className="py-20 bg-white opacity-0">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Technical <span className="text-gradient">Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Developer-first tools and infrastructure for seamless integration and deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {technicalFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="gradient-border p-8 card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag, i) => (
                    <span key={i} className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Code Example Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-400 text-sm ml-4">Quick Integration Example</span>
              </div>
              <pre className="text-emerald-400 font-mono text-sm overflow-x-auto">
{`// Initialize with your API key
const apiKey = 'your-api-key-here';
const endpoint = 'https://api.yourproject.com';

// Make your first API call
const response = await fetch(endpoint + '/process', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + apiKey,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    data: yourData,
    options: { realtime: true }
  })
});

const result = await response.json();
console.log(result); // That's it!`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built For <span className="text-gradient">Any Domain</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Versatile architecture that adapts to your specific industry needs and requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {useCases.map((useCase, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl overflow-hidden shadow-md card-hover border border-gray-100"
              >
                <div className={`bg-gradient-to-r ${useCase.color} p-6 text-white`}>
                  <h3 className="text-2xl font-bold mb-2">{useCase.category}</h3>
                  <p className="text-sm opacity-90">Perfect for {useCase.category.toLowerCase()} applications</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {useCase.examples.map((example, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-gray-700">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20 bg-white opacity-0">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 md:p-16 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Transform Your Ideas Into Reality?
                </h2>
                <p className="text-xl mb-10 opacity-90 max-w-2xl">
                  Join thousands of developers and teams building the future with our platform. Start your journey today.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 font-bold text-lg shadow-lg">
                    <span>Start Building Free</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-emerald-600 transition-all flex items-center justify-center space-x-2 font-bold text-lg">
                    <span>View Documentation</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">Free Trial</div>
                    <div className="text-sm opacity-75">No credit card needed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">5 Min</div>
                    <div className="text-sm opacity-75">Quick setup time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">24/7</div>
                    <div className="text-sm opacity-75">Expert support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">100%</div>
                    <div className="text-sm opacity-75">Money-back guarantee</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">{theme.projectName}</span>
          </div>
          <p className="text-gray-400 mb-4">
            Built with passion for innovation. Ready for any hackathon challenge.
          </p>
          <div className="border-t border-gray-800 pt-6 mt-6">
            <p className="text-gray-500">&copy; 2025 {theme.projectName}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FeaturesPage;