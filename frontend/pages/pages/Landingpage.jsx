import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Zap, Shield, Brain, Users, Code, Rocket, Check, Menu, X, ChevronRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Import the fucking header component

const HackathonLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const showcaseRef = useRef(null);
  const ctaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

    [heroRef, featuresRef, howItWorksRef, showcaseRef, ctaRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .opacity-0 {
          opacity: 0;
        }

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

        .scroll-indicator {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
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
      `}</style>

      {/* Use the fucking header component */}
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 opacity-0">
        <div className="absolute inset-0 hero-gradient opacity-10"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full blur-xl opacity-60 float-animation"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-300 rounded-full blur-2xl opacity-40 float-animation" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-emerald-400 rounded-full blur-lg opacity-50 float-animation" style={{ animationDelay: '2s' }}></div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full mb-6 border border-emerald-200">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">Powered by Advanced AI Technology</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your Ideas Into
              <span className="text-gradient"> Intelligent Solutions</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Experience the next generation of AI-powered innovation. Build, deploy, and scale intelligent applications that solve real-world problems with unprecedented ease and efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={handleSignUp} className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition-all transform hover:scale-105 flex items-center space-x-2 font-medium text-lg shine shadow-lg">
                <span>Start Building Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-lg hover:bg-emerald-50 transition-all flex items-center space-x-2 font-medium text-lg">
                <span>Watch Demo</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-4xl font-bold text-emerald-600 mb-2">99.9%</div>
                <div className="text-gray-600">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-600 mb-2">10x</div>
                <div className="text-gray-600">Faster Processing</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-600 mb-2">24/7</div>
                <div className="text-gray-600">Availability</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator">
          <div className="w-6 h-10 border-2 border-emerald-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-emerald-600 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 bg-gray-50 opacity-0">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features Built for <span className="text-gradient">Innovation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to build cutting-edge AI applications, all in one comprehensive platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: "Advanced Neural Networks",
                description: "Leverage state-of-the-art deep learning models trained on massive datasets for unparalleled accuracy and performance."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Lightning-Fast Processing",
                description: "Experience real-time AI inference with our optimized infrastructure that delivers results in milliseconds."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Enterprise-Grade Security",
                description: "Your data is protected with end-to-end encryption and compliance with global security standards."
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Simple Integration",
                description: "Get started in minutes with our intuitive APIs and comprehensive SDKs for all major programming languages."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Collaborative Workspace",
                description: "Work seamlessly with your team using built-in collaboration tools and version control features."
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "Scalable Infrastructure",
                description: "From prototype to production, our platform scales automatically to handle any workload size."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-md card-hover border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="py-24 bg-white opacity-0">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform your ideas into powerful AI-driven solutions.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Connect Your Data",
                description: "Upload your datasets or connect to your existing data sources. Our platform supports all major file formats and integrates with popular databases and cloud storage solutions.",
                color: "from-emerald-400 to-emerald-600"
              },
              {
                step: "02",
                title: "Configure Your Model",
                description: "Choose from our pre-trained models or customize your own. Fine-tune parameters, set training objectives, and let our AI handle the heavy lifting with automated optimization.",
                color: "from-emerald-500 to-emerald-700"
              },
              {
                step: "03",
                title: "Deploy & Scale",
                description: "Deploy your AI model with a single click. Our infrastructure automatically scales to meet demand, providing reliable performance and real-time analytics for continuous improvement.",
                color: "from-emerald-600 to-emerald-800"
              }
            ].map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-8 mb-12 last:mb-0">
                <div className="flex-shrink-0">
                  <div className={`w-24 h-24 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform`}>
                    <span className="text-3xl font-bold text-white">{item.step}</span>
                  </div>
                </div>
                <div className="flex-grow bg-gray-50 p-8 rounded-2xl border border-gray-100 card-hover">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section ref={showcaseRef} className="py-24 bg-gray-50 opacity-0">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built for <span className="text-gradient">Every Industry</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform powers AI solutions across diverse sectors, delivering measurable results and transformative impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                industry: "Healthcare",
                useCase: "Diagnostic AI Assistant",
                metric: "95% accuracy in early disease detection",
                description: "Revolutionizing patient care with AI-powered diagnostic tools that assist medical professionals in making faster, more accurate decisions."
              },
              {
                industry: "Finance",
                useCase: "Fraud Detection System",
                metric: "99.7% fraud prevention rate",
                description: "Protecting financial institutions and customers with real-time transaction monitoring and anomaly detection powered by advanced machine learning."
              },
              {
                industry: "Retail",
                useCase: "Personalization Engine",
                metric: "40% increase in conversion rates",
                description: "Delivering hyper-personalized shopping experiences through intelligent recommendation systems that understand customer preferences and behavior."
              },
              {
                industry: "Manufacturing",
                useCase: "Predictive Maintenance",
                metric: "70% reduction in downtime",
                description: "Optimizing production efficiency with AI that predicts equipment failures before they happen, saving costs and maximizing operational uptime."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-md card-hover border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    {item.industry}
                  </span>
                  <Check className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.useCase}</h3>
                <div className="text-3xl font-bold text-emerald-600 mb-4">{item.metric}</div>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-3xl p-12 text-center text-white max-w-4xl mx-auto shadow-xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Trusted by 10,000+ Organizations</h3>
            <p className="text-xl mb-8 opacity-90">Join industry leaders who are transforming their businesses with our AI platform</p>
            <div className="flex flex-wrap justify-center gap-8">
              {["500+ Enterprises", "50+ Countries", "1M+ Users", "99.9% Uptime"].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold">{stat}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-24 bg-white opacity-0">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Ready to Build the <span className="text-gradient">Future</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Start your AI journey today with our platform. No credit card required. Get full access to all features during your free trial.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button onClick={handleSignUp} className="bg-emerald-600 text-white px-10 py-5 rounded-lg hover:bg-emerald-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 font-medium text-lg shine shadow-lg">
                <span>Try it now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-lg hover:border-emerald-600 hover:text-emerald-600 transition-all flex items-center justify-center space-x-2 font-medium text-lg">
                <span>Schedule Demo</span>
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>Cancel anytime</span>
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

export default HackathonLanding;