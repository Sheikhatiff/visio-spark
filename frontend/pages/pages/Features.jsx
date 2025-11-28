import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, Zap, Shield, Code, Users, Rocket, 
  ArrowRight, Check, Sparkles, Menu, X, 
  BarChart3, Lock, Cpu, Globe, Database, 
  Workflow, Palette, Eye, Clock, Server
} from 'lucide-react';

const Features = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  const features = [
    {
      id: 1,
      title: "Advanced Neural Networks",
      description: "Leverage state-of-the-art deep learning models trained on massive datasets for unparalleled accuracy and performance.",
      icon: <Brain className="w-8 h-8" />,
      category: "ai",
      highlights: ["Multi-layer architectures", "Transfer learning", "Real-time training", "Custom model building"]
    },
    {
      id: 2,
      title: "Lightning-Fast Processing",
      description: "Experience real-time AI inference with our optimized infrastructure that delivers results in milliseconds.",
      icon: <Zap className="w-8 h-8" />,
      category: "performance",
      highlights: ["GPU acceleration", "Edge computing", "Low latency APIs", "Batch processing"]
    },
    {
      id: 3,
      title: "Enterprise-Grade Security",
      description: "Your data is protected with end-to-end encryption and compliance with global security standards.",
      icon: <Shield className="w-8 h-8" />,
      category: "security",
      highlights: ["SOC 2 compliance", "GDPR ready", "Zero-trust architecture", "Data anonymization"]
    },
    {
      id: 4,
      title: "Simple Integration",
      description: "Get started in minutes with our intuitive APIs and comprehensive SDKs for all major programming languages.",
      icon: <Code className="w-8 h-8" />,
      category: "development",
      highlights: ["RESTful APIs", "Python SDK", "JavaScript library", "Webhooks support"]
    },
    {
      id: 5,
      title: "Collaborative Workspace",
      description: "Work seamlessly with your team using built-in collaboration tools and version control features.",
      icon: <Users className="w-8 h-8" />,
      category: "collaboration",
      highlights: ["Role-based access", "Project sharing", "Comment threads", "Activity tracking"]
    },
    {
      id: 6,
      title: "Scalable Infrastructure",
      description: "From prototype to production, our platform scales automatically to handle any workload size.",
      icon: <Rocket className="w-8 h-8" />,
      category: "infrastructure",
      highlights: ["Auto-scaling", "Load balancing", "Global CDN", "99.9% uptime SLA"]
    },
    {
      id: 7,
      title: "Advanced Analytics",
      description: "Gain deep insights into your AI models with comprehensive analytics and performance metrics.",
      icon: <BarChart3 className="w-8 h-8" />,
      category: "analytics",
      highlights: ["Model performance", "Usage statistics", "Cost optimization", "Custom dashboards"]
    },
    {
      id: 8,
      title: "Data Privacy Controls",
      description: "Maintain full control over your data with advanced privacy settings and compliance tools.",
      icon: <Lock className="w-8 h-8" />,
      category: "security",
      highlights: ["Data encryption", "Access logs", "Privacy policies", "Compliance reporting"]
    },
    {
      id: 9,
      title: "High-Performance Computing",
      description: "Access powerful computing resources optimized for AI workloads of any scale.",
      icon: <Cpu className="w-8 h-8" />,
      category: "performance",
      highlights: ["Dedicated GPUs", "TPU support", "Distributed training", "Memory optimization"]
    },
    {
      id: 10,
      title: "Global Deployment",
      description: "Deploy your AI models across global regions for optimal performance and reduced latency.",
      icon: <Globe className="w-8 h-8" />,
      category: "infrastructure",
      highlights: ["Multi-region deployment", "Edge locations", "Geo-routing", "Local compliance"]
    },
    {
      id: 11,
      title: "Data Management",
      description: "Efficiently manage, version, and transform your datasets with our powerful data tools.",
      icon: <Database className="w-8 h-8" />,
      category: "development",
      highlights: ["Data versioning", "ETL pipelines", "Data labeling", "Quality monitoring"]
    },
    {
      id: 12,
      title: "Workflow Automation",
      description: "Automate complex AI workflows with our visual pipeline builder and scheduling tools.",
      icon: <Workflow className="w-8 h-8" />,
      category: "ai",
      highlights: ["Visual pipeline editor", "Scheduled jobs", "Conditional logic", "Error handling"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Features', count: features.length },
    { id: 'ai', name: 'AI & ML', count: features.filter(f => f.category === 'ai').length },
    { id: 'performance', name: 'Performance', count: features.filter(f => f.category === 'performance').length },
    { id: 'security', name: 'Security', count: features.filter(f => f.category === 'security').length },
    { id: 'development', name: 'Development', count: features.filter(f => f.category === 'development').length },
    { id: 'collaboration', name: 'Collaboration', count: features.filter(f => f.category === 'collaboration').length },
    { id: 'infrastructure', name: 'Infrastructure', count: features.filter(f => f.category === 'infrastructure').length },
    { id: 'analytics', name: 'Analytics', count: features.filter(f => f.category === 'analytics').length }
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === activeCategory);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .hero-gradient {
          background: linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%);
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(5, 150, 105, 0.15);
        }

        .glassmorphism {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .text-gradient {
          background: linear-gradient(135deg, #059669, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .shine {
          position: relative;
          overflow: hidden;
        }

        .shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }

        .shine:hover::before {
          left: 100%;
        }

        .feature-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .feature-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 50px rgba(5, 150, 105, 0.15);
        }

        .category-btn {
          transition: all 0.3s ease;
        }

        .category-btn.active {
          background: linear-gradient(135deg, #059669, #10b981);
          color: white;
          box-shadow: 0 4px 15px rgba(5, 150, 105, 0.3);
        }

        .pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .7;
          }
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .stagger-animation > * {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Sticky Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'glassmorphism shadow-lg' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">AI Platform</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigate('/')} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Home</button>
              <button className="text-emerald-600 font-medium border-b-2 border-emerald-600">Features</button>
              <button onClick={() => navigate('/howitworks')} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">How It Works</button>
              <button onClick={() => navigate('/showcase')} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Showcase</button>
              <button onClick={handleSignUp} className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium shine">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-900">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <button onClick={() => navigate('/')} className="block w-full text-left text-gray-700 hover:text-emerald-600 transition-colors font-medium">Home</button>
              <button className="block w-full text-left text-emerald-600 font-medium">Features</button>
              <button onClick={() => navigate('/howitworks')} className="block w-full text-left text-gray-700 hover:text-emerald-600 transition-colors font-medium">How It Works</button>
              <button onClick={() => navigate('/showcase')} className="block w-full text-left text-gray-700 hover:text-emerald-600 transition-colors font-medium">Showcase</button>
              <button onClick={handleSignUp} className="w-full bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                Get Started
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-5"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full blur-xl opacity-60 float-animation"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-300 rounded-full blur-2xl opacity-40 float-animation" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-emerald-400 rounded-full blur-lg opacity-50 float-animation" style={{ animationDelay: '2s' }}></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full mb-6 border border-emerald-200">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Powerful Capabilities</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Platform <span className="text-gradient">Features</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Discover the comprehensive suite of tools and capabilities that make our AI platform the most powerful solution for building intelligent applications.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={handleSignUp} className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition-all transform hover:scale-105 flex items-center space-x-2 font-medium text-lg shine shadow-lg">
                <span>Start Building Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-lg hover:bg-emerald-50 transition-all flex items-center space-x-2 font-medium text-lg">
                <span>Watch Demo</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`category-btn px-6 py-3 rounded-full font-medium transition-all ${
                    activeCategory === category.id 
                      ? 'active' 
                      : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200'
                  }`}
                >
                  {category.name} <span className="ml-2 bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs">{category.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation">
              {filteredFeatures.map((feature, index) => (
                <div 
                  key={feature.id}
                  className="feature-card bg-white p-8 rounded-2xl shadow-md border border-gray-100"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
                  
                  <div className="space-y-2">
                    {feature.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose Our <span className="text-gradient">Platform</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We've built the most comprehensive AI platform with features designed to accelerate your development and deployment process.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Zap className="w-8 h-8" />, title: "Fast Setup", description: "Get started in minutes with our intuitive interface and comprehensive documentation." },
                { icon: <Shield className="w-8 h-8" />, title: "Secure by Design", description: "Enterprise-grade security built into every layer of our platform." },
                { icon: <Server className="w-8 h-8" />, title: "Reliable Infrastructure", description: "99.9% uptime guarantee with automatic failover and backup systems." },
                { icon: <Palette className="w-8 h-8" />, title: "Flexible Customization", description: "Tailor the platform to your specific needs with extensive customization options." }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-3xl p-12 text-white shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience These Features?</h2>
              <p className="text-xl mb-8 opacity-90">Join thousands of developers and organizations building the future with our AI platform.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={handleSignUp} className="bg-white text-emerald-600 px-10 py-5 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 font-medium text-lg shadow-lg">
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-white text-white px-10 py-5 rounded-lg hover:bg-white hover:text-emerald-600 transition-all flex items-center justify-center space-x-2 font-medium text-lg">
                  <span>Schedule Demo</span>
                </button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-6 text-white opacity-90">
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5" />
                  <span>Full feature access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">AI Platform</span>
              </div>
              <p className="text-gray-400">
                Empowering innovation through intelligent automation and cutting-edge AI technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">API Reference</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">License</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AI Platform. All rights reserved. Built with cutting-edge technology for the future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Features;