"use client";
import React, { useState, useEffect } from "react";
import {
  Video,
  Code,
  Users,
  Zap,
  Shield,
  Play,
  ArrowRight,
  Check,
  Star,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  Monitor,
  Smartphone,
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";

function Page() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Video,
      title: "HD Video Chat",
      description:
        "Crystal clear video calls with low latency for seamless communication",
    },
    {
      icon: Code,
      title: "Live Code Editor",
      description:
        "Real-time collaborative coding with syntax highlighting and auto-completion",
    },
    {
      icon: Users,
      title: "Screen Sharing",
      description:
        "Share your screen instantly to demonstrate concepts and debug together",
    },
    {
      icon: Zap,
      title: "Instant Sync",
      description:
        "Changes appear in real-time across all connected users with zero delay",
    },
    {
      icon: Shield,
      title: "Secure Sessions",
      description:
        "End-to-end encrypted sessions ensure your code and conversations stay private",
    },
    {
      icon: Globe,
      title: "Global Access",
      description:
        "Connect with developers worldwide with optimized global infrastructure",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Room",
      description: "Start a new coding session and get a shareable link",
    },
    {
      number: "02",
      title: "Invite Partner",
      description: "Share the room link with your coding partner",
    },
    {
      number: "03",
      title: "Code Together",
      description: "Start video chat and collaborate on code in real-time",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer at TechCorp",
      content:
        "This tool has revolutionized how we conduct technical interviews. The seamless integration of video and code editing is perfect.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Freelance Developer",
      content:
        "I use this daily for pair programming sessions with clients. The low latency and clean interface make it feel like we're in the same room.",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      role: "Coding Bootcamp Instructor",
      content:
        "My students love using this for group projects. It's intuitive and keeps everyone engaged during collaborative coding sessions.",
      rating: 5,
    },
  ];

  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">CodeMeet</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-300 hover:text-white transition-colors"
              >
                How it works
              </a>
              <a
                href="#testimonials"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Reviews
              </a>
            </div>
            <div className="flex space-x-4">
              {/* <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
                Sign In
              </button> */}
              <button
                className="px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-lg font-medium transition-all transform hover:scale-105"
                onClick={() => router.push("/home")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Code Together,
                <br />
                <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
                  Face to Face
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                The ultimate platform for pair programming, technical
                interviews, and collaborative coding sessions with seamless
                video chat integration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  className="px-8 py-4 bg-gradient-to-r from-white to-gray-200 text-black font-semibold rounded-lg hover:from-gray-100 hover:to-gray-300 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                  onClick={() => router.push("/home")}
                >
                  <Play className="h-5 w-5" />
                  <span>Start Coding Now</span>
                </button>
                {/* <button className="px-8 py-4 bg-transparent border-2 border-gray-600 hover:border-gray-400 font-semibold rounded-lg transition-all flex items-center justify-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Watch Demo</span>
                </button> */}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative max-w-5xl mx-auto">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Video Chat Mockup */}
                  <div className="bg-black rounded-lg p-4 border border-gray-600">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <Video className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-6 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-2"></div>
                          <p className="text-xs text-gray-300">You</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-6 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mx-auto mb-2"></div>
                          <p className="text-xs text-gray-300">Partner</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Code Editor Mockup */}
                  <div className="bg-black rounded-lg p-4 border border-gray-600">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <Code className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-2 text-left">
                      <div className="text-xs font-mono">
                        <span className="text-purple-400">function</span>{" "}
                        <span className="text-blue-400">sortArray</span>
                        <span className="text-gray-300">(arr) {"{"} </span>
                      </div>
                      <div className="text-xs font-mono pl-4">
                        <span className="text-orange-400">return</span>{" "}
                        <span className="text-gray-300">arr.sort();</span>
                      </div>
                      <div className="text-xs font-mono">
                        <span className="text-gray-300">{"}"}</span>
                      </div>
                      <div className="w-2 h-4 bg-white animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-6 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
                Collaborate
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powerful features designed to make remote pair programming as
              seamless as sitting side by side.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all transform hover:scale-105"
              >
                <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg w-fit mb-6">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      {/* <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get Started in{' '}
              <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
                3 Simple Steps
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From idea to implementation in minutes. No setup required, just pure collaboration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-gray-600 to-transparent transform translate-x-4"></div>
                )}
                <div className="bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-full w-24 h-24 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-white to-gray-200 text-black font-semibold rounded-lg hover:from-gray-100 hover:to-gray-300 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto">
              <span>Try It Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Loved by{" "}
              <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
                Developers
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of developers who have transformed their
              collaboration workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to{' '}
            <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
              Transform
            </span>{' '}
            Your Coding Sessions?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already collaborating more effectively with CodeMeet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="px-8 py-4 bg-gradient-to-r from-white to-gray-200 text-black font-semibold rounded-lg hover:from-gray-100 hover:to-gray-300 transition-all transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-gray-600 hover:border-gray-400 font-semibold rounded-lg transition-all">
              Schedule Demo
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Free 14-day trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">CodeMeet</span>
              </div>
              <p className="text-gray-400">
                The future of collaborative coding and remote pair programming.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 CodeMeet. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Page;
