import { useNavigate } from 'react-router-dom'
import ResponsiveHeroBanner from '../components/ui/ResponsiveHeroBanner'
import { BentoCard, BentoGrid } from '../components/ui/BentoGrid'
import { TrendingUp, Shield, Brain, Target, Zap } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  const features = [
    {
      Icon: TrendingUp,
      name: "Personal Impact Score",
      description: "See how news affects your finances, career, and life decisions with AI-powered impact analysis.",
      href: "#",
      cta: "Learn more",
      background: (
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop" 
          alt=""
          className="w-full h-full object-cover"
        />
      ),
      className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
    },
    {
      Icon: Brain,
      name: "AI-Powered Insights",
      description: "Get personalized recommendations and deep analysis tailored to your interests and goals.",
      href: "#",
      cta: "Learn more",
      background: (
        <img 
          src="https://i.pinimg.com/1200x/fc/ad/49/fcad49cb8ead60292e88a5281db96c29.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      ),
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-4",
    },
    {
      Icon: Shield,
      name: "Trust & Transparency",
      description: "Data-driven impact scores with transparent methodology you can trust and verify.",
      href: "#",
      cta: "Learn more",
      background: (
        <img 
          src="https://i.pinimg.com/736x/aa/a1/45/aaa145f70cbe692ee7e45ad0cbc8de69.jpg" 
          alt=""
          className="w-full h-full object-cover"
        />
      ),
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: Target,
      name: "Future Scenarios",
      description: "Explore potential outcomes and prepare for what's ahead with scenario planning tools.",
      href: "#",
      cta: "Learn more",
      background: (
        <img 
          src="https://i.pinimg.com/736x/c8/9a/a0/c89aa0ce14a7c634d329a0617b3a951b.jpg" 
          alt=""
          className="w-full h-full object-cover"
        />
      ),
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: Zap,
      name: "Real-Time Updates",
      description: "Stay informed with instant notifications about news that matters to you most.",
      href: "#",
      cta: "Learn more",
      background: (
        <img 
          src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop" 
          alt=""
          className="w-full h-full object-cover"
        />
      ),
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      <ResponsiveHeroBanner
        logoText="ImpactFlow"
        backgroundImageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop"
        navLinks={[]}
        showAuthLinks={true}
        onLoginClick={() => navigate('/login')}
        onSignupClick={() => navigate('/signup')}
        badgeLabel="New"
        badgeText="Transform headlines into personal impact"
        title="News you understand,"
        titleLine2="not just consume."
        description="Experience news like never before. Our AI-powered platform makes understanding complex headlines simple, helping you make informed decisions about your finances and life."
        primaryButtonText="Start Your Journey"
        primaryButtonHref="#"
        onPrimaryClick={() => navigate('/signup')}
        secondaryButtonText="Learn More"
        secondaryButtonHref="#features"
      />

      {/* Features Section */}
      <section id="features" className="relative py-12 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-16 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-3 sm:mb-4">
              Powerful Features for Informed Decisions
            </h2>
            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Everything you need to understand how news impacts your life
            </p>
          </div>

          <BentoGrid className="lg:grid-rows-3">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 bg-neutral-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-white/50">© 2026 ImpactFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
