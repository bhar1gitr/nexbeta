import { ArrowRight, Users, ShoppingBag, CreditCard, Star, Check, Menu, X } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import Cookies from "js-cookie"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const jwtUserToken = Cookies.get("token");
  const isUserLoggedIn = jwtUserToken ? true : false;

  const logout = async () => {
    Cookies.remove('token');
    window.location.href = '/login';
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img className="w-10" src={logo} />
              <span className="ml-2 text-2xl font-bold text-gray-900">NexBeta</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
                Pricing
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {
                isUserLoggedIn ? (

                  <button onClick={logout} className="text-gray-700 hover:text-blue-600 transition-colors">Logout</button>
                ) : (
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">Sign In</Link>
                )
              }
              {
                isUserLoggedIn ? (
                  <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Get Started
                  </Link>
                )
              }
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
                  How It Works
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Pricing
                </a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Contact
                </a>
                <div className="flex flex-col space-y-2 pt-4">
                  <button className="text-gray-700 hover:text-blue-600 transition-colors text-left">Sign In</button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Get Started
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Create Your Digital
              <span className="text-blue-600"> Business Card</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Build your online presence, showcase your products, and connect with customers. Just like Amazon, but for
              your personal brand and business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {
                isUserLoggedIn ? (
                  <Link to="/dashboard" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center" >Dashboard</Link>
                ) : (
                  <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                )
              }
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed Online</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to create a professional online presence and grow your
              business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Digital Business Cards</h3>
              <p className="text-gray-600">
                Create stunning digital cards that showcase your brand, contact info, and professional details.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Showcase</h3>
              <p className="text-gray-600">
                List and manage your products with detailed descriptions, images, and pricing information.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Connection</h3>
              <p className="text-gray-600">
                Connect with customers, receive inquiries, and build lasting business relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in just three simple steps and begin building your online presence today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Your Account</h3>
              <p className="text-gray-600">
                Sign up for free and create your unique business profile with your personal information and branding.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Design Your Card</h3>
              <p className="text-gray-600">
                Customize your digital business card with your logo, colors, and add your products or services.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Share & Grow</h3>
              <p className="text-gray-600">
                Share your card with customers, collect leads, and watch your business grow online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "NexBeta helped me showcase my handmade jewelry business online. I've connected with so many new
                customers!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Jewelry Designer</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "As a freelance photographer, this platform is perfect for showcasing my portfolio and getting new
                clients."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Mike Chen</p>
                  <p className="text-sm text-gray-600">Photographer</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Simple, effective, and professional. My digital card has helped me land several new consulting
                contracts."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Alex Rivera</p>
                  <p className="text-sm text-gray-600">Business Consultant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 justify-items-center">
            {/* Empty div for spacing */}
            <div className="hidden md:block" />

            {/* Starter Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm border w-full max-w-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Starter</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">0 INR</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">1 Digital Card</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Up to 5 Products</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Basic Analytics</span>
                </li>
              </ul>
              {
                isUserLoggedIn ? (
                  <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    <Link to="/dashboard">Dahboard</Link>
                  </button>) : (
                  <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    <Link to="/login">Get Started</Link>
                  </button>
                )
              }
            </div>

            {/* Empty div for spacing */}
            <div className="hidden md:block" />

            {/* <div className="bg-white p-8 rounded-xl shadow-sm border-2 border-blue-600 relative">
    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
      <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
        Most Popular
      </span>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional</h3>
    <div className="mb-4">
      <span className="text-3xl font-bold text-gray-900">$19</span>
      <span className="text-gray-600">/month</span>
    </div>
    <ul className="space-y-3 mb-8">
      <li className="flex items-center">
        <Check className="h-5 w-5 text-green-500 mr-2" />
        <span className="text-gray-600">3 Digital Cards</span>
      </li>
      <li className="flex items-center">
        <Check className="h-5 w-5 text-green-500 mr-2" />
        <span className="text-gray-600">Unlimited Products</span>
      </li>
      <li className="flex items-center">
        <Check className="h-5 w-5 text-green-500 mr-2" />
        <span className="text-gray-600">Advanced Analytics</span>
      </li>
      <li className="flex items-center">
        <Check className="h-5 w-5 text-green-500 mr-2" />
        <span className="text-gray-600">Custom Domain</span>
      </li>
    </ul>
    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
      Start Free Trial
    </button>
  </div> */}

            {/* <div className="bg-white p-8 rounded-xl shadow-sm border">
    <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise</h3>
    <div className="mb-4">
      <span className="text-3xl font-bold text-gray-900">$49</span>
      <span className="text-gray-600">/month</span>
    </div>
    <ul className="space-y-3 mb-8">
      <li className="flex items-center">
        <Check className="h-5 w-5 text-green-500 mr-2" />
        <span className="text-gray-600">Unlimited Cards</span>
      </li>
      <li className="flex items-center">
        <Check className="h-5 w-5 text-green-500 mr-2" />
        <span className="text-gray-600">Unlimited Products</span>
      </li>
      <li className="flex items-center">
        <Check className="h-5 w-5 text-green-500 mr-2" />
        <span className="text-gray-600">Premium Analytics</span>
      </li>
      <li className="flex items-center">
        <Check className="h-5 w-5 text-green-500 mr-2" />
        <span className="text-gray-600">Priority Support</span>
      </li>
    </ul>
    <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
      Contact Sales
    </button>
  </div> */}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Build Your Online Presence?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs and professionals who are already growing their business with NexBeta.
          </p>

          {
            isUserLoggedIn ? (
              <Link to="/dashboard" className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>)
              : (
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              )
          }
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img className="w-10" src={logo} />
                <span className="ml-2 text-2xl font-bold">NexBeta</span>
              </div>
              <p className="text-gray-400">
                Empowering entrepreneurs to build their online presence and grow their business.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
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
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
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
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 NexBeta. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
