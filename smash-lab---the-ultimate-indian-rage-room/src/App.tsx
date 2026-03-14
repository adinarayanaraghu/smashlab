import React, { useEffect, useState } from 'react';
import { useScroll, useTransform, useMotionValue, LazyMotion, domAnimation, m } from 'motion/react';
import { Hammer, Zap, Flame, Skull, AlertTriangle, ArrowRight, Star, EyeOff, Dumbbell, Brain, FlaskConical, Shield, Coffee, Axe, Music, Sparkles, Camera } from 'lucide-react';

const Marquee = ({ text, bgColor, textColor, reverse = false }: { text: string, bgColor: string, textColor: string, reverse?: boolean }) => {
  const items = [...Array(5)].map((_, i) => (
    <span key={i} className="text-4xl md:text-6xl font-display uppercase px-8 flex items-center gap-4 whitespace-nowrap">
      {text} <AlertTriangle size={40} className="inline-block" />
    </span>
  ));

  return (
    <div className={`marquee-container py-4 border-y-4 border-ink ${bgColor} ${textColor} transform ${reverse ? 'rotate-2' : '-rotate-2'} scale-110 z-10 relative`}>
      <div className={`marquee-content ${reverse ? 'reverse' : ''}`}>
        {items}
      </div>
      <div className={`marquee-content ${reverse ? 'reverse' : ''}`} aria-hidden="true">
        {items}
      </div>
    </div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '10:00 AM',
    package: 'Silk Board Jam'
  });

  const timeSlots: string[] = [];
  for (let i = 10; i <= 22; i++) {
    for (let j = 0; j < 60; j += 30) {
      if (i === 22 && j === 30) continue;
      const hour = i > 12 ? i - 12 : i;
      const ampm = i >= 12 ? 'PM' : 'AM';
      const mins = j === 0 ? '00' : '30';
      timeSlots.push(`${hour}:${mins} ${ampm}`);
    }
  }

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Namaskara! I want to book a Smash Lab session.\n\n*Name:* ${formData.name}\n*Date:* ${formData.date}\n*Time:* ${formData.time}\n*Package:* ${formData.package}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/917996080080?text=${encodedText}`, '_blank');
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 64);
      mouseY.set(e.clientY - 64);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-ink text-white overflow-hidden selection:bg-neon-pink selection:text-white">
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <m.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-bright-yellow p-6 md:p-8 brutal-border w-full max-w-md relative max-h-[90vh] overflow-y-auto"
            >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-4 md:top-4 md:right-4 text-ink font-bold text-2xl hover:text-deep-red"
            >
              ✕
            </button>
            <h2 className="font-display text-3xl md:text-4xl uppercase text-ink mb-6 mt-2 md:mt-0">Book Your Session</h2>
            <form onSubmit={handleBook} className="flex flex-col gap-4">
              <div>
                <label className="block font-sans font-bold text-ink mb-1 uppercase text-sm">Full Name</label>
                <input required type="text" className="w-full p-3 brutal-border bg-white text-ink font-sans" 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block font-sans font-bold text-ink mb-1 uppercase text-sm">Date</label>
                <input required type="date" className="w-full p-3 brutal-border bg-white text-ink font-sans" 
                  value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
              <div>
                <label className="block font-sans font-bold text-ink mb-1 uppercase text-sm">Time</label>
                <select className="w-full p-3 brutal-border bg-white text-ink font-sans"
                  value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})}>
                  {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-sans font-bold text-ink mb-1 uppercase text-sm">Package</label>
                <select className="w-full p-3 brutal-border bg-white text-ink font-sans"
                  value={formData.package} onChange={e => setFormData({...formData, package: e.target.value})}>
                  <option value="Silk Board Jam">Silk Board Jam (₹999)</option>
                  <option value="Prod Crash">Prod Crash (₹1999)</option>
                  <option value="Manager's Cabin">Manager's Cabin (₹4999)</option>
                </select>
              </div>
              <button type="submit" className="mt-4 bg-cyan text-ink font-display text-xl md:text-2xl px-6 py-4 brutal-border shake-hover uppercase">
                Continue to WhatsApp
              </button>
            </form>
          </m.div>
        </div>
      )}

      {/* Custom Cursor Effect */}
      <m.div 
        className="hidden md:block fixed w-32 h-32 rounded-full bg-cyan mix-blend-difference pointer-events-none z-50 blur-xl opacity-50"
        style={{ x: mouseX, y: mouseY }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-50">
        <div className="text-xl md:text-3xl font-display uppercase tracking-widest text-deep-red bg-bright-yellow px-3 py-1.5 md:px-4 md:py-2 brutal-border">SMASH LAB</div>
        <button onClick={() => setIsModalOpen(true)} className="bg-bright-yellow text-ink font-display text-sm md:text-xl px-4 py-1.5 md:px-6 md:py-2 brutal-border shake-hover uppercase">
          Book Maadu
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-pattern-dots bg-deep-red">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink/80 z-0"></div>
        
        <m.div 
          className="absolute top-1/4 left-10 text-bright-yellow opacity-80 z-0"
          style={{ y: y1, rotate }}
        >
          <Hammer size={120} strokeWidth={1} />
        </m.div>
        
        <m.div 
          className="absolute bottom-1/4 right-10 text-cyan opacity-80 z-0"
          style={{ y: y2, rotate: useTransform(scrollYProgress, [0, 1], [360, 0]) }}
        >
          <Zap size={150} strokeWidth={1} />
        </m.div>

        <div className="relative z-10 text-center w-full max-w-7xl mx-auto px-4 flex flex-col items-center">
          <m.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
            className="relative flex flex-col gap-4 md:gap-8"
          >
            <h1 className="font-display text-[20vw] sm:text-[18vw] md:text-[14vw] lg:text-[12vw] xl:text-[10vw] leading-none uppercase text-bright-yellow drop-shadow-[10px_10px_0px_#FF007F]">
              FULL
            </h1>
            <h1 className="font-display text-[20vw] sm:text-[18vw] md:text-[14vw] lg:text-[12vw] xl:text-[10vw] leading-none uppercase text-cyan drop-shadow-[-10px_10px_0px_#D90429]">
              TENSION
            </h1>
            <h1 className="font-display text-[20vw] sm:text-[18vw] md:text-[14vw] lg:text-[12vw] xl:text-[10vw] leading-none uppercase text-white text-stroke-yellow">
              MACHA?
            </h1>
          </m.div>

          <m.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 md:mt-12 text-sm sm:text-lg md:text-3xl font-sans font-bold bg-ink text-white p-3 md:p-4 brutal-border-white inline-block transform rotate-2"
          >
            NAMMA BENGALURU'S CRAZIEST RAGE ROOM
          </m.p>
        </div>
      </section>

      <Marquee text="ELLA ODI BAA GURU" bgColor="bg-neon-pink" textColor="text-ink" />
      <Marquee text="TENSION BEDA, HODI MAGA" bgColor="bg-cyan" textColor="text-ink" reverse={true} />

      {/* What to Smash Section */}
      <section className="py-20 md:py-32 px-4 relative bg-ink">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-5xl sm:text-7xl md:text-9xl text-white mb-12 md:mb-20 text-center uppercase">
            Yen Odiyona <span className="text-deep-red">Guru?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Dead Laptop", desc: "Prod deployment failed on Friday evening? Take it out here.", color: "bg-bright-yellow", icon: <Zap size={60} /> },
              { title: "Empty KF Bottles", desc: "Satisfying shatter sounds. 100% local destruction.", color: "bg-cyan", icon: <Flame size={60} /> },
              { title: "Office Printer", desc: "Paper jam again? Show it who's the real boss macha.", color: "bg-neon-pink", icon: <Hammer size={60} /> }
            ].map((item, i) => (
              <m.div 
                key={i}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`${item.color} text-ink p-8 brutal-border transform transition-transform hover:scale-105 hover:-rotate-2`}
              >
                <div className="mb-6">{item.icon}</div>
                <h3 className="font-display text-5xl uppercase mb-4">{item.title}</h3>
                <p className="font-sans text-xl font-bold">{item.desc}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 md:py-32 px-4 bg-neon-pink text-ink relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-5xl sm:text-6xl md:text-8xl mb-12 md:mb-20 uppercase text-center text-white drop-shadow-[4px_4px_0px_#141414] md:drop-shadow-[6px_6px_0px_#141414]">
            Yaake Smash Lab?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Zero Judgemental Zone", desc: "Scream, cry, or laugh like a maniac. Nobody is watching, nobody is judging. Full privacy macha.", icon: <EyeOff size={48} />, color: "bg-white text-ink" },
              { title: "Better Than Gym", desc: "Burn 400+ calories per full session. Skip the treadmill, grab a sledgehammer. Cardio has never been this fun.", icon: <Dumbbell size={48} />, color: "bg-bright-yellow text-ink" },
              { title: "Instant Stress Relief", desc: "Watch your cortisol levels drop in real-time. One good smash is cheaper and faster than a month of therapy.", icon: <Brain size={48} />, color: "bg-cyan text-ink" },
              { title: "Science Backed", desc: "Cathartic relief therapy is real. Physical destruction safely releases pent-up frustration and anger.", icon: <FlaskConical size={48} />, color: "bg-deep-red text-white" }
            ].map((adv, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${adv.color} p-8 md:p-10 brutal-border transform transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0px_rgba(20,20,20,1)]`}
              >
                <div className="mb-6">{adv.icon}</div>
                <h3 className="font-display text-4xl md:text-5xl uppercase mb-4">{adv.title}</h3>
                <p className="font-sans text-xl font-bold opacity-90">{adv.desc}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Everything Provided Section */}
      <section className="pt-20 pb-10 md:pt-32 md:pb-16 px-4 bg-ink text-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20 text-center md:text-left flex flex-col md:flex-row gap-8 items-end justify-between">
            <div className="max-w-4xl">
              <h2 className="font-display text-5xl sm:text-6xl md:text-8xl uppercase text-cyan drop-shadow-[4px_4px_0px_#D90429] mb-6">
                Everything Provided
              </h2>
              <h3 className="font-display text-4xl md:text-5xl uppercase text-white mb-4">
                Show up in jeans. <br className="hidden md:block" /> We handle the rest.
              </h3>
              <p className="font-sans text-xl md:text-2xl font-bold text-gray-300">
                Zero prep. Zero cleanup. Every session comes fully equipped — no hidden fees, no extra charges.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Full Safety Gear", subtitle: "HEAD-TO-TOE PROTECTION", desc: "Jumpsuit, helmet with full visor, heavy-duty gloves, steel-toe boots.", icon: <Shield size={40} />, color: "bg-bright-yellow text-ink" },
              { title: "Breakable Items", subtitle: "20–50 ITEMS PER SESSION", desc: "Plates, mugs, bottles, electronics, and furniture. Add more anytime.", icon: <Coffee size={40} />, color: "bg-neon-pink text-ink" },
              { title: "Weapon Rack", subtitle: "6 WEAPONS TO CHOOSE FROM", desc: "Baseball bat, sledgehammer, crowbar, golf club, and more.", icon: <Axe size={40} />, color: "bg-cyan text-ink" },
              { title: "Private Room", subtitle: "100% YOURS FOR THE SESSION", desc: "Soundproofed, fully enclosed. Bring your own playlist or use ours.", icon: <Music size={40} />, color: "bg-white text-ink" },
              { title: "Full Cleanup", subtitle: "LEAVE THE MESS TO US", desc: "We sweep, sort, and sanitize after every session. You walk out clean.", icon: <Sparkles size={40} />, color: "bg-deep-red text-white" },
              { title: "Photo Booth", subtitle: "CAPTURE THE DESTRUCTION", desc: "Built-in camera captures your best moments. Share-ready in 60 seconds.", icon: <Camera size={40} />, color: "bg-bright-yellow text-ink" }
            ].map((item, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${item.color} p-8 brutal-border transform transition-transform hover:scale-105 hover:rotate-1 flex flex-col group`}
              >
                <div className="mb-6 bg-ink text-white w-16 h-16 flex items-center justify-center brutal-border-white rounded-full shrink-0 transition-all duration-300 group-hover:animate-bounce">{item.icon}</div>
                <h4 className="font-display text-3xl uppercase mb-1">{item.title}</h4>
                <div className="font-sans text-sm font-black tracking-widest uppercase mb-4 opacity-80">{item.subtitle}</div>
                <p className="font-sans text-lg font-bold">{item.desc}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="pt-10 pb-20 md:pt-16 md:pb-32 px-4 bg-pattern-stripes bg-bright-yellow text-ink relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="font-display text-6xl sm:text-8xl md:text-[10rem] leading-none mb-12 md:mb-20 uppercase text-center text-stroke">
            Packages Nodappa
          </h2>

          <div className="flex flex-col gap-12">
            {[
              { name: "Silk Board Jam", price: "₹999", time: "15 Mins", items: "15 Glass Items, 1 Small Electronic", desc: "For that auto-wala who said 'One and Half agatte'." },
              { name: "Prod Crash", price: "₹1999", time: "30 Mins", items: "30 Glass Items, 2 Medium Electronics, 1 Furniture", desc: "Server down? Funding delayed? Full tod fod." },
              { name: "Manager's Cabin", price: "₹4999", time: "60 Mins", items: "Unlimited Glass, 5 Electronics, 3 Furniture, 1 Printer", desc: "Appraisal alli 'Meet the expectations' antidara? Banni illi." }
            ].map((pkg, i) => (
              <m.div 
                key={i}
                initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-12 brutal-border flex flex-col md:flex-row justify-between items-center gap-8 group hover:bg-ink hover:text-white transition-colors duration-300"
              >
                <div className="flex-1">
                  <h3 className="font-display text-5xl md:text-7xl uppercase mb-2 group-hover:text-neon-pink transition-colors">{pkg.name}</h3>
                  <p className="font-sans text-2xl font-bold mb-4">{pkg.desc}</p>
                  <div className="flex flex-wrap gap-4 font-sans font-bold text-sm uppercase">
                    <span className="bg-cyan text-ink px-4 py-2 brutal-border">{pkg.time}</span>
                    <span className="bg-neon-pink text-white px-4 py-2 brutal-border">{pkg.items}</span>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="font-display text-6xl md:text-8xl text-deep-red group-hover:text-bright-yellow transition-colors">{pkg.price}</div>
                  <button onClick={() => { setFormData({ ...formData, package: pkg.name }); setIsModalOpen(true); }} className="mt-6 bg-ink text-white group-hover:bg-white group-hover:text-ink font-display text-2xl px-8 py-4 brutal-border uppercase flex items-center gap-2 mx-auto md:ml-auto md:mr-0 shake-hover">
                    Smash It <ArrowRight />
                  </button>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Rules Section */}
      <section className="py-12 md:py-20 px-4 bg-ink text-white relative border-y-4 border-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-stretch justify-center">
          <m.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-deep-red p-8 brutal-border-white flex-1 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 transform md:-rotate-1 hover:rotate-0 transition-transform"
          >
            <AlertTriangle size={64} className="text-bright-yellow shrink-0" />
            <div>
              <h3 className="font-display text-3xl uppercase text-bright-yellow mb-2">Age Restrictions</h3>
              <p className="font-sans font-bold text-xl">18+ can freely enter. Anyone above 15 should come under parents supervision.</p>
            </div>
          </m.div>
          
          <m.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-cyan text-ink p-8 brutal-border flex-1 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 transform md:rotate-1 hover:rotate-0 transition-transform"
          >
            <Shield size={64} className="text-ink shrink-0" />
            <div>
              <h3 className="font-display text-3xl uppercase mb-2">Safety First</h3>
              <p className="font-sans font-bold text-xl">Safety gear is a must to enter inside.</p>
            </div>
          </m.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 px-4 bg-deep-red text-white relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-5xl sm:text-6xl md:text-8xl mb-12 md:mb-20 uppercase text-center">
            Public Review Guru
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-ink p-8 brutal-border-white transform -rotate-2">
              <div className="flex text-bright-yellow mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" />)}
              </div>
              <p className="font-sans text-2xl md:text-3xl font-bold mb-6">"Smashed a monitor into 100 pieces. Full peace of mind macha. 10/10 would recommend."</p>
              <p className="font-display text-xl uppercase text-cyan">- Techie from Whitefield</p>
            </div>
            
            <div className="bg-neon-pink text-ink p-8 brutal-border transform rotate-2 mt-10 md:mt-20">
              <div className="flex text-ink mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" />)}
              </div>
              <p className="font-sans text-2xl md:text-3xl font-bold mb-6">"ORR traffic alli full thale bisi agittu. Came here, smashed 20 plates. Sakkath feeling."</p>
              <p className="font-display text-xl uppercase">- Anjali from HSR Layout</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="pt-24 pb-0 md:pt-40 md:pb-0 bg-ink relative overflow-hidden flex flex-col items-center justify-center text-center">
        <m.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none"
        >
          <Skull size={800} className="w-[150vw] h-[150vw] md:w-auto md:h-auto" />
        </m.div>

        <h2 className="font-display text-5xl sm:text-7xl md:text-[12rem] leading-none uppercase text-white mb-6 md:mb-10 relative z-10 mix-blend-difference px-4">
          Phone Yaak <br/> <span className="text-neon-pink">Odithiya?</span>
        </h2>
        
        <p className="font-sans text-xl sm:text-2xl md:text-3xl font-bold text-bright-yellow mb-10 md:mb-12 relative z-10 max-w-2xl px-4">
          Namma items odi. Book your slot before you lose your mind guru.
        </p>

        <button onClick={() => setIsModalOpen(true)} className="relative z-10 bg-cyan text-ink font-display text-2xl sm:text-3xl md:text-6xl px-8 py-4 md:px-12 md:py-6 brutal-border shake-hover uppercase group mx-4">
          <span className="relative z-10">Book Maadu Guru</span>
          <div className="absolute inset-0 bg-neon-pink transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-0"></div>
          <span className="relative z-10 group-hover:text-white transition-colors hidden group-hover:inline-block absolute inset-0 flex items-center justify-center">Book Maadu Guru</span>
        </button>
        
        <div className="mt-20 md:mt-32 mb-12 font-sans font-bold text-gray-500 text-xs md:text-sm tracking-widest relative z-10 px-4">
          COPYRIGHT 2026, SMASH LAB (ANGER MANAGEMENT RAGE ROOM) ALL RIGHTS RESERVED.
        </div>

        {/* Scrolling Ticker */}
        <div className="w-full bg-bright-yellow text-ink py-4 border-t-4 border-ink relative z-20">
          <div className="marquee-container">
            <div className="marquee-content font-display text-2xl md:text-3xl uppercase tracking-wider">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="mx-8 whitespace-nowrap">
                  INDIA'S SPACE RENTAL FRANCHISING, POWERED BY <span className="text-deep-red">STREET SIDE INDIA</span> •
                </span>
              ))}
            </div>
            <div className="marquee-content font-display text-2xl md:text-3xl uppercase tracking-wider" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="mx-8 whitespace-nowrap">
                  INDIA'S SPACE RENTAL FRANCHISING, POWERED BY <span className="text-deep-red">STREET SIDE INDIA</span> •
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
    </LazyMotion>
  );
}
