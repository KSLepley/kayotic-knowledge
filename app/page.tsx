'use client'

import { useState } from "react"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Calculator, Beaker, Book, Globe, Languages, Lightbulb, Users, Calendar, Video, GraduationCap as UserGraduate, Mail, Phone, Clock, CheckCircle } from "lucide-react"

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    subject: '',
    message: '',
    package: 'undecided' // Added package preference
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{success: boolean, message: string} | null>(null)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simple Formspree submission - no API keys needed!
    const formspreeUrl = 'https://formspree.io/f/xnnzkyjn'
    
    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          subject: formData.subject,
          message: formData.message,
          package: formData.package, // Added package to form data
          _replyto: formData.email, // This ensures replies go to the person who submitted
        }),
      })

      if (response.ok) {
        setSubmitStatus({ 
          success: true, 
          message: 'Thank you! Your message has been sent to Kaylie. She\'ll get back to you within 24 hours.' 
        })
        setFormData({ name: '', email: '', phone: '', service: '', subject: '', message: '', package: 'undecided' })
      } else {
        setSubmitStatus({ success: false, message: 'Something went wrong. Please try again.' })
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-blue-600">Kayotic Tutoring</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                <a href="#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Services</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Pricing</a>
                <a href="#payment" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Payment</a>
                <a href="#schedule" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Schedule</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Book Now Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 py-3 text-lg font-semibold"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          📚 Book Now!
        </Button>
      </div>
      {/* Force Vercel deployment with latest Book Now buttons */}

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Unlock Your Academic Potential
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Expert tutoring for middle school and high school students in all subjects. 
                Personalized learning plans, flexible scheduling, and proven results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-6" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                  View Pricing
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                  Our Services
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img 
                    src="/images/profile-selfie.jpg" 
                    alt="Kaylie - Your Tutor" 
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/256x256?text=Photo' }}
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">A+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Your Tutor</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The story behind the success - from student athlete to academic mentor
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-gray-900">Hi, I'm Kaylie! 👋</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  I'm not just another tutor - I'm a <span className="font-semibold text-blue-600">UC Santa Cruz graduate</span> with a 
                  <span className="font-semibold text-purple-600"> Bachelor's in Computer Science</span> and a 
                  <span className="font-semibold text-green-600">3.7 GPA</span> that proves I know how to balance academics with life!
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                    <div className="text-2xl font-bold text-blue-600">3.7</div>
                    <div className="text-sm text-gray-600">College GPA</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                    <div className="text-2xl font-bold text-green-600">4.4</div>
                    <div className="text-sm text-gray-600">High School GPA</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-900">🏀 Student Athlete Life</h4>
                <p className="text-gray-700">
                  I played <span className="font-semibold text-orange-600">women's basketball</span> at UCSC while maintaining my grades. 
                  Talk about time management skills! I know what it's like to juggle sports, academics, and social life.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-900">💻 From Student to Teacher</h4>
                <p className="text-gray-700">
                  I've been in your shoes! I was a <span className="font-semibold text-indigo-600">CS tutor for college courses</span>, 
                  helping fellow students understand complex programming concepts. Now I'm bringing that same energy to middle and high school students.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-900">🎯 Why I'm Different</h4>
                <p className="text-gray-700">
                  I combine <span className="font-semibold text-purple-600">academic excellence</span> with 
                  <span className="font-semibold text-orange-600"> real-world experience</span>. I've walked the path from private school 
                  to college athlete to professional tutor. I get the challenges students face because I've lived them!
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Graduation Achievement */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl text-white text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 mx-auto mb-4">
                    <img 
                      src="/images/graduation-photo.jpg" 
                      alt="Kaylie's UCSC Graduation" 
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/96x96?text=Photo' }}
                    />
                  </div>
                  <h4 className="text-lg font-bold">UC Santa Cruz Graduate</h4>
                  <p className="text-blue-100 text-sm">Bachelor of Science in Computer Science</p>
                  <div className="flex justify-center space-x-2 pt-3">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                      CS Major
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                      Basketball
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                      Tutor
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Personal Connection */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-200 mx-auto mb-4">
                  <img
                    src="/images/profile-selfie.jpg"
                    alt="Kaylie - Your Tutor"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/80x80?text=Photo' }}
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Ready to Help You Succeed!</h4>
                <p className="text-gray-600 text-sm">Friendly, approachable, and here to support your academic journey</p>
              </div>
              
              <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg text-center">
                Available Now!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tutoring for all academic levels and subjects
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Calculator className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Mathematics</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Algebra, Geometry, Calculus, Statistics, and more. Build confidence and master problem-solving skills.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <Beaker className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Science</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Biology, Chemistry, Physics, Environmental Science. Hands-on learning and conceptual understanding.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Book className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>English & Literature</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Reading comprehension, writing skills, grammar, and literary analysis. Develop strong communication skills.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                  <Globe className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle>Social Studies</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  History, Geography, Government, Economics. Connect past events to present understanding.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors">
                  <GraduationCap className="w-8 h-8 text-yellow-600" />
                </div>
                <CardTitle>Computer Science & Critical Thinking</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Programming fundamentals, problem-solving, algorithms, and logical reasoning. Develop computational thinking skills.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                  <Lightbulb className="w-8 h-8 text-indigo-600" />
                </div>
                <CardTitle>Study Skills</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Test preparation, time management, note-taking, and organization. Learn how to learn effectively.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Kayotic Tutoring?</h2>
              <div className="space-y-4">
                {[
                  "Personalized Approach: Customized learning plans for each student's unique needs",
                  "Expert Tutors: Experienced educators with proven track records",
                  "Flexible Scheduling: Virtual and in-person sessions available",
                  "Progress Tracking: Regular assessments and feedback",
                  "All Subjects: Comprehensive coverage from middle school through high school",
                  "Affordable Rates: Competitive pricing for quality education"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-40 h-40 text-blue-600" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-orange-500 text-white px-6 py-3 rounded-full">
                  <span className="font-semibold">500+ Students Helped</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Students & Parents Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from families who've experienced the Kayotic Tutoring difference
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold text-lg">A</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Aubrey Esqueda</h4>
                  <p className="text-sm text-gray-600">High School Junior</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Kaylie helped me finally understand calculus! Her explanations are so clear and she's really patient. 
                My grade went from a C to an A- in just a few weeks."
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-semibold text-lg">H</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Harold Jayden</h4>
                  <p className="text-sm text-gray-600">Middle School Student</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "I was struggling with science, but Kaylie made it fun and easy to understand. 
                She uses real examples that actually make sense. Now I love learning!"
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-semibold text-lg">S</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Chen</h4>
                  <p className="text-sm text-gray-600">Parent</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Kaylie has been amazing with my daughter's English studies. She's not only improved her grades 
                but also her confidence. Highly recommend!"
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Schedule Your Session</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Book a free consultation or schedule your first tutoring session
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-600">Free Consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  15-minute session to discuss your needs and create a personalized learning plan.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => window.open('https://calendly.com/kayoticknowledge/consultation', '_blank')}>
                  Book Free Consultation
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Video className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-600">Virtual Tutoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Online sessions from anywhere. Interactive whiteboard and screen sharing available.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Book Now!
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <UserGraduate className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-600">In-Person Tutoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Face-to-face sessions for hands-on learning and immediate feedback.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Book Now!
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pricing & Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent, competitive pricing for quality tutoring services. Choose the package that fits your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Single Session Package */}
            <Card className="relative hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Most Popular</span>
                </div>
                <CardTitle className="text-2xl text-blue-600">Single Session</CardTitle>
                <div className="text-4xl font-bold text-gray-900">$45</div>
                <div className="text-gray-600">per hour</div>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>1-hour tutoring session</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Any subject</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Virtual or in-person</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Flexible scheduling</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Book Here!
                </Button>
              </CardContent>
            </Card>

            {/* Package Deal */}
            <Card className="relative hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-orange-500">
              <CardHeader className="text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Best Value</span>
                </div>
                <CardTitle className="text-2xl text-orange-600">5-Session Package</CardTitle>
                <div className="text-4xl font-bold text-gray-900">$200</div>
                <div className="text-gray-600">$40 per hour (save $25!)</div>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>5 one-hour sessions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Any subject or mix</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Progress tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Valid for 3 months</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Priority scheduling</span>
                  </li>
                </ul>
                <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Book Here!
                </Button>
              </CardContent>
            </Card>

            {/* Monthly Plan */}
            <Card className="relative hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-purple-600">Monthly Plan</CardTitle>
                <div className="text-4xl font-bold text-gray-900">$150</div>
                <div className="text-gray-600">per month</div>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>4 one-hour sessions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Consistent weekly support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Long-term progress</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Monthly assessment</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Parent progress reports</span>
                  </li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Book Here!
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Services */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Additional Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">$25</div>
                <div className="text-gray-700 font-semibold">Test Prep</div>
                <div className="text-sm text-gray-600">SAT, ACT, AP exams</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-green-600 mb-2">$30</div>
                <div className="text-gray-700 font-semibold">Essay Review</div>
                <div className="text-sm text-gray-600">College applications</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-purple-600 mb-2">$35</div>
                <div className="text-gray-700 font-semibold">Study Skills</div>
                <div className="text-sm text-gray-600">Organization & time management</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-orange-600 mb-2">$40</div>
                <div className="text-gray-700 font-semibold">Group Sessions</div>
                <div className="text-sm text-gray-600">2-3 students, per person</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section id="payment" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Payment & Booking Policy</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, secure payment options with clear policies to ensure smooth scheduling for everyone.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Payment Methods */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Accepted Payment Methods</h3>
              
              {/* Zelle */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">Z</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-900">Zelle</h4>
                    <p className="text-blue-700 text-sm">Fast & Free Bank Transfers</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600 mb-2">Send payment to:</p>
                  <p className="font-mono text-lg font-bold text-blue-600">kayoticknowledge@gmail.com</p>
                </div>
                <div className="mt-3 text-sm text-blue-700">
                  <p>✓ No fees • Instant transfer • Use your bank app</p>
                </div>
              </div>

              {/* PayPal */}
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">P</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-900">PayPal</h4>
                    <p className="text-yellow-700 text-sm">Secure & Widely Accepted</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <p className="text-sm text-gray-600 mb-2">Send payment to:</p>
                  <p className="font-mono text-lg font-bold text-yellow-600">kayoticknowledge@gmail.com</p>
                </div>
                <div className="mt-3 text-sm text-yellow-700">
                  <p>✓ Secure • Instant • Use PayPal app or website</p>
                </div>
              </div>
            </div>

            {/* Payment Policy */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Important Payment Policy</h3>
              
              {/* 12-Hour Window */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-orange-900">12-Hour Payment Window</h4>
                    <p className="text-orange-700 text-sm">Secure your booking quickly</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <p className="text-sm text-gray-600 mb-2">After booking your session:</p>
                  <p className="font-semibold text-orange-700">You have 12 hours to complete payment</p>
                  <p className="text-xs text-orange-600 mt-2">Sessions without payment within 12 hours will be automatically cancelled</p>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-red-900">Cancellation Policy</h4>
                    <p className="text-red-700 text-sm">Fair policies for everyone</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                      <span><strong>No payment within 12 hours:</strong> Session cancelled</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                      <span><strong>24+ hours notice:</strong> Full refund or reschedule</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                      <span><strong>Less than 24 hours:</strong> 50% refund or reschedule</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-2xl border border-purple-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-3">Book Your Session</h4>
                  <p className="text-gray-600 text-sm">Schedule through Calendly and receive confirmation</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-3">Send Payment</h4>
                  <p className="text-gray-600 text-sm">Pay via Zelle or PayPal within 12 hours</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-3">Start Learning</h4>
                  <p className="text-gray-600 text-sm">Begin your tutoring session with confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Your Session</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your academic journey? Send us an inquiry and we'll get back to you within 24 hours to schedule your session!
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">kayoticknowledge@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Hours</h4>
                  <p className="text-gray-600">Mon-Fri: 9AM-8PM<br />Sat-Sun: 10AM-6PM</p>
                </div>
              </div>
            </div>
            
            <Card className="p-8">
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">How Our Booking Process Works:</h4>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Send us your inquiry below (we'll see your service & package preference)</li>
                  <li>2. We'll reply within 24 hours with available times</li>
                  <li>3. You'll receive a Calendly link to choose your preferred time</li>
                  <li>4. Complete payment via Zelle or PayPal</li>
                  <li>5. Start your learning journey!</li>
                </ol>
              </div>
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <Input 
                      placeholder="Your Name" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input 
                      type="email" 
                      placeholder="Your Email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <Input 
                      type="tel" 
                      placeholder="Your Phone" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                    <Select onValueChange={(value) => setFormData({...formData, service: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Free Consultation</SelectItem>
                        <SelectItem value="virtual">Virtual Tutoring</SelectItem>
                        <SelectItem value="in-person">In-Person Tutoring</SelectItem>
                        <SelectItem value="other">Other Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Package Preference</label>
                    <Select onValueChange={(value) => setFormData({...formData, package: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Package (Optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single Session ($45/hour)</SelectItem>
                        <SelectItem value="package">5-Session Package ($200)</SelectItem>
                        <SelectItem value="monthly">Monthly Plan ($150/month)</SelectItem>
                        <SelectItem value="undecided">Not Sure Yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <Select onValueChange={(value) => setFormData({...formData, subject: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject (Optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English & Literature</SelectItem>
                      <SelectItem value="social-studies">Social Studies</SelectItem>
                      <SelectItem value="foreign-language">Foreign Language</SelectItem>
                      <SelectItem value="study-skills">Study Skills</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <Textarea 
                    placeholder="Tell us about your needs..." 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Booking Inquiry'}
                </Button>
                
                {submitStatus && (
                  <div className={`p-4 rounded-lg ${
                    submitStatus.success 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <GraduationCap className="h-8 w-8 text-blue-400 mr-3" />
                <h3 className="text-2xl font-bold text-blue-400">Kayotic Tutoring</h3>
              </div>
              <p className="text-gray-300">
                Empowering students to reach their full academic potential through personalized, expert tutoring.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#schedule" className="text-gray-300 hover:text-white transition-colors">Schedule</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <p className="text-gray-300">Email: kayoticknowledge@gmail.com</p>
              <p className="text-gray-300">Phone: (555) 123-4567</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Kayotic Tutoring. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 