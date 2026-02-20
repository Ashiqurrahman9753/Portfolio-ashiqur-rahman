import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, CheckCircle, Zap, Server, Code, Database, Mail, Github, FileText, BookOpen, GraduationCap, HeartHandshake, Megaphone, ExternalLink, Briefcase, MapPin, Copy, Star, GitFork, Loader2, Calendar, Send, Rss } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// --- DATA: EDUCATION ---
const educationData = [
    {
        degree: "Master of Science in Computer Science",
        field: "Future Network Systems",
        school: "Trinity College Dublin",
        period: "Sep 2023 - Feb 2025",
        grade: "2.1",
        modules: ["Privacy & Security", "Artificial Intelligence", "Software Engineering", "Distributed Systems", "P2P Networking"]
    },
    {
        degree: "Bachelor of Technology",
        field: "Electronics & Communication (Biomedical Specialization)",
        school: "SRM Institute of Technology and Science",
        period: "Jul 2019 - May 2023",
        grade: "1.1 (First Class Distinction)",
        modules: ["Machine Learning", "Computer Networks", "Wireless Communication", "Signal Processing", "Control Systems"]
    }
];

// --- DATA: TECHNICAL STACK ---
const skillsData = [
    {
        title: "Backend & Systems",
        icon: Database,
        skills: ["Python (Django/Flask)", "PostgreSQL / SQL", "RESTful API Design", "System Architecture", "Shell Scripting"]
    },
    {
        title: "Frontend & Interfaces",
        icon: Code,
        skills: ["React.js / JSX", "JavaScript (ES6+)", "HTML5 & CSS3", "Tailwind CSS", "JSON / Data Parsing"]
    },
    {
        title: "DevOps & Infrastructure",
        icon: Server,
        skills: ["Git & GitHub", "Docker & Containers", "Linux Administration", "AWS Fundamentals", "CI/CD Concepts"]
    }
];

// --- DATA: EXPERIENCE ---
const experienceData = [
    { 
        title: "Systems Integration Engineer", 
        company: "Millennia Global Soft", 
        url: "https://millennia.in/",
        period: "2023 - 2024", 
        desc: "Reduced hardware downtime by 30% through Python-based industrial automation and SQL optimization. Orchestrated REST API integrations for data synchronization." 
    },
    { 
        title: "Technical Analyst Intern", 
        company: "Digival Solutions", 
        url: "https://www.digi-val.com/who-we-are",
        period: "2022 - 2023", 
        desc: "Managed LMS platform onboarding and device troubleshooting, documenting bugs in JIRA to improve cross-functional support workflows." 
    }
];

// --- DATA: PROJECTS ---
const projectsData = [
    {
        id: 1,
        title: "Disaster Response Orchestrator",
        desc: "A high-availability Django platform for real-time disaster response. Integrated 5+ external APIs (weather/telemetry) and optimized database indexing to reduce dashboard load times by 20%.",
        tech: ["Django", "Python", "MySQL", "Rest APIs"],
        image: "/project1.jpg", 
        repo: "https://github.com/Ashiqurrahman9753"
    },
    {
        id: 2,
        title: "Smart Pet Guardian (IoT)",
        desc: "An automated IoT access system using ESP32, RFID, and GPS. Built a serverless backend with AWS Lambda and DynamoDB, enabling real-time pet tracking via a React dashboard.",
        tech: ["IoT", "AWS Lambda", "React", "DynamoDB"],
        image: "/project2.jpg",
        repo: "https://github.com/Ashiqurrahman9753"
    },
    {
        id: 3,
        title: "WADA (World Anti-Doping Agency) Distributed Service",
        desc: "Designed a globally accessible, GDPR-compliant distributed system for athlete tracking. Leveraged Kubernetes and Docker for auto-scaling to support 10,000+ concurrent users.",
        tech: ["Kubernetes", "Docker", "AWS EC2", "System Design"],
        image: "/project3.jpg",
        repo: "https://github.com/Ashiqurrahman9753"
    },
    {
        id: 4,
        title: "EEG Cognitive Analysis",
        desc: "Developed a Brain-Computer Interface (BCI) pipeline using Python and MATLAB. Trained SVM and Random Forest models to classify cognitive states from raw EEG signals.",
        tech: ["Machine Learning", "Python", "MATLAB", "Scikit-learn"],
        image: "/project4.jpg",
        repo: "https://github.com/Ashiqurrahman9753"
    },
    {
        id: 5,
        title: "Dublin Ghost Bus Dashboard (Coming Soon)",
        desc: "Placeholder for the upcoming IoT dashboard project visualizing real-time Dublin bus data.",
        tech: ["TBD"],
        image: "", 
        repo: "#"
    }
];

// --- DATA: PUBLICATIONS ---
const publicationsData = [
    {
        id: 1,
        title: "Event Analysis of Functional Near-Infrared Spectroscopy Brain Signals Using Machine Learning and Generative Adversarial Networks",
        authors: "Ashiqur Rahman, et al.",
        date: "May 30, 2023",
        conference: "ResearchGate",
        abstract: "The findings of this study may improve the diagnosis and treatment of neurological disorders and contribute to the development of more precise and efficient brain-computer interfaces.",
        researchGateUrl: "https://www.researchgate.net/publication/400849188_Event_Analysis_of_Functional_Near-Infrared_Spectroscopy_Brain_Signals_Using_Machine_Learning_and_Generative_Adversarial_Networks",
        pdfUrl: "/papers/fnirs-brain-signals.pdf",
        tags: ["Machine Learning", "Deep Learning", "Neuroscience", "GANs"]
    },
    {
        id: 2,
        title: "Real-Time Driver Drowsiness Detection System Using YOLOv5 and Haar Cascade Classifiers",
        authors: "Ashiqur Rahman, et al.",
        date: "May 15, 2023",
        conference: "ResearchGate",
        abstract: "The proposed system captures video frames through an in-vehicle camera, applies cascaded classifiers for face and eye region localization, and employs a custom-trained YOLOv5 model to classify driver states as 'awake' or 'drowsy.'",
        researchGateUrl: "https://www.researchgate.net/publication/400849151_Real-Time_Driver_Drowsiness_Detection_System_Using_YOLOv5_and_Haar_Cascade_Classifiers",
        pdfUrl: "/papers/driver-drowsiness-detection.pdf",
        tags: ["Computer Vision", "YOLOv5", "Safety Systems", "Deep Learning"]
    },
    {
        id: 3,
        title: "Analysis of the Relationship Between University Strategy Plans and University Rankings",
        authors: "Ashiqur Rahman, et al.",
        date: "Apr 15, 2024",
        conference: "ResearchGate",
        abstract: "This study analyses the relationship between the strategic plans of universities and their external rankings.",
        researchGateUrl: "https://www.researchgate.net/publication/400848876_An_Analysis_of_the_Relationship_Between_University_Strategy_Plans_and_University_Rankings",
        pdfUrl: "/papers/university-rankings.pdf",
        tags: ["Data Analysis", "Education", "Research"]
    },
    {
        id: 4,
        title: "AWS IoT Infrastructure: Reliability & Scalability Analysis",
        authors: "Ashiqur Rahman, et al.",
        date: "Mar 10, 2024",
        conference: "ResearchGate",
        abstract: "A technical analysis of leveraging AWS (IoT Core, Lambda) to bridge the reliability gap in smart systems.",
        researchGateUrl: "https://www.researchgate.net/publication/400836218_Leveraging_Cloud_for_IoT_solutions_An_Analysis_of_AWS_cloud_Services_in_Smart_Pet_Guardian_Project",
        pdfUrl: "/papers/aws-iot-analysis.pdf",
        tags: ["AWS", "IoT", "Cloud Computing", "System Design"]
    }
];

// --- DATA: BLOG / ARTICLES ---
const blogData = [
    {
        id: 1,
        title: "IPL 2024: When Cricket Meets Data Science",
        excerpt: "Breaking down how strategic data analysis and decision-making shaped IPL 2024 outcomes — from player selection to in-game tactics. Recognised by Ira Akers, Co-Founder of CUE.",
        date: "May 2024",
        category: "Data Analysis",
        tags: ["Data Science", "Cricket", "Analytics", "Sports Tech"],
        url: "https://www.linkedin.com/in/ashiqur-rahman-ire",
        icon: "chart"
    },
    {
        id: 2,
        title: "Event Analysis of Brain Signals Using ML & GANs",
        excerpt: "A deep dive into fNIRS brain signal classification using machine learning models and Generative Adversarial Networks — presented at ICREACT 2023.",
        date: "May 2023",
        category: "Research",
        tags: ["Machine Learning", "Neuroscience", "GANs", "BCI"],
        url: "https://www.researchgate.net/publication/400849188",
        icon: "brain"
    },
    {
        id: 3,
        title: "Striking a Chord with Annets — Rotary News",
        excerpt: "A feature article published in Rotary News Online covering social impact initiatives and youth leadership programs with Rotary International's District Annette's Club.",
        date: "2022",
        category: "Community",
        tags: ["Leadership", "Community Impact", "Rotary", "Social Impact"],
        url: "https://www.linkedin.com/in/ashiqur-rahman-ire",
        icon: "community"
    },
    {
        id: 4,
        title: "Building Resilient IoT Architectures on AWS",
        excerpt: "Exploring design patterns for fault-tolerant IoT pipelines using AWS Lambda, DynamoDB, and IoT Core — lessons learned from the Smart Pet Guardian project.",
        date: "2024",
        category: "Technical",
        tags: ["AWS", "IoT", "Cloud", "Architecture"],
        url: "https://www.linkedin.com/in/ashiqur-rahman-ire",
        icon: "cloud"
    }
];

// --- COMPONENTS ---

const CursorBlink = () => (
    <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "steps(2)" }}
        className="text-cyan-400 font-bold ml-1"
    >
        _
    </motion.span>
);

const Typewriter = ({ text, delay = 100, pauseTime = 3000, className = "" }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isWaiting, setIsWaiting] = useState(false);

    useEffect(() => {
        if (currentIndex < text.length && !isWaiting) {
            // Typing phase
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, delay);
            return () => clearTimeout(timeout);
        } else if (currentIndex === text.length && !isWaiting) {
            // Just finished typing, wait before restarting
            setIsWaiting(true);
            const waitTimeout = setTimeout(() => {
                setDisplayedText('');
                setCurrentIndex(0);
                setIsWaiting(false);
            }, pauseTime);
            return () => clearTimeout(waitTimeout);
        }
    }, [currentIndex, text, delay, pauseTime, isWaiting]);

    return (
        <span className={className}>
            {displayedText}
            <CursorBlink />
        </span>
    );
};

const Nav = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success | error
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');
        try {
            const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setFormStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setFormStatus('error');
            }
        } catch {
            setFormStatus('error');
        }
    };

    const navLinks = [
        { label: "About", href: "#about" },
        { label: "Education", href: "#education" },
        { label: "Stack", href: "#skills" },
        { label: "Career", href: "#experience" },
        { label: "Featured", href: "#featured" }
    ];

    const handleSectionLink = (e, hash) => {
        e.preventDefault();
        const isHome = window.location.pathname === '/';
        if (isHome) {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/' + hash);
        }
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to hash after navigating to home page
    useEffect(() => {
        if (window.location.hash) {
            const el = document.querySelector(window.location.hash);
            if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
        }
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
            isScrolled ? 'bg-[#020617]/90 backdrop-blur-md border-slate-800' : 'bg-transparent border-transparent'
        }`}>
            {/* Scroll Progress Bar */}
            <div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-[width] duration-75 z-10"
                style={{ width: `${scrollProgress}%` }}
            />

            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* LOGO: >_ ASHIQUR RAHMAN_ */}
                <a href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-white group font-mono">
                    <span className="text-cyan-400 font-extrabold">{">"}</span>
                    <Typewriter text="ASHIQUR RAHMAN" delay={100} className="tracking-wide" />
                </a>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, idx) => (
                        <a key={idx} href={link.href} onClick={(e) => handleSectionLink(e, link.href)} className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">{link.label}</a>
                    ))}
                    <Link to="/projects" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">
                        Projects
                    </Link>
                    <Link to="/publications" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">
                        Publications
                    </Link>
                    <Link to="/blog" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">
                        Blog
                    </Link>
                    <button
                        onClick={() => setContactModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-[#020617] bg-white rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    >
                        <Mail size={16} /> Contact
                    </button>
                </div>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-300">
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden bg-[#020617] border-b border-slate-800 overflow-hidden">
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link, idx) => (
                                <a key={idx} href={link.href} onClick={(e) => handleSectionLink(e, link.href)} className="text-slate-300 hover:text-cyan-400 font-semibold">{link.label}</a>
                            ))}
                            <Link to="/projects" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-cyan-400 font-semibold">
                                Projects
                            </Link>
                            <Link to="/publications" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-cyan-400 font-semibold">
                                Publications
                            </Link>
                            <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-cyan-400 font-semibold">
                                Blog
                            </Link>
                            <button
                                onClick={() => { setContactModalOpen(true); setMobileMenuOpen(false); }}
                                className="text-left text-slate-300 hover:text-cyan-400 font-semibold"
                            >
                                Contact
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Contact Modal */}
            <AnimatePresence>
                {contactModalOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setContactModalOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md"
                        >
                            <div className="bg-gradient-to-b from-slate-900 to-[#020617] border border-cyan-500/30 rounded-3xl p-8 shadow-2xl relative">
                                <button
                                    onClick={() => setContactModalOpen(false)}
                                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                <h3 className="text-3xl font-extrabold text-white mb-6 tracking-tight">
                                    Let's <span className="text-cyan-400">Connect</span>
                                </h3>

                                {/* Contact Form */}
                                {formStatus === 'success' ? (
                                    <div className="text-center py-8">
                                        <CheckCircle className="text-green-400 mx-auto mb-3" size={48} />
                                        <p className="text-white font-bold text-lg">Message sent!</p>
                                        <p className="text-slate-400 text-sm mt-1">I'll get back to you soon.</p>
                                        <button onClick={() => setFormStatus('idle')} className="mt-4 text-cyan-400 text-sm hover:underline">Send another</button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleFormSubmit} className="space-y-3 mb-5">
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                            className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 outline-none transition-colors"
                                        />
                                        <input
                                            type="email"
                                            required
                                            placeholder="Your email"
                                            value={formData.email}
                                            onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                                            className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 outline-none transition-colors"
                                        />
                                        <textarea
                                            required
                                            rows={3}
                                            placeholder="Your message..."
                                            value={formData.message}
                                            onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                                            className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 outline-none transition-colors resize-none"
                                        />
                                        {formStatus === 'error' && (
                                            <p className="text-red-400 text-xs">Something went wrong. Try emailing directly.</p>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={formStatus === 'sending'}
                                            className="w-full flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-[#020617] font-bold py-3 rounded-xl transition-all disabled:opacity-60"
                                        >
                                            {formStatus === 'sending' ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                            {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </form>
                                )}

                                {/* Quick links */}
                                <div className="flex gap-3 pt-2 border-t border-slate-800">
                                    <a href="https://www.linkedin.com/in/ashiqur-rahman-ire" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-blue-600/30 rounded-xl transition-all text-slate-400 hover:text-white text-xs font-bold">
                                        <Linkedin size={16} /> LinkedIn
                                    </a>
                                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-purple-600/30 rounded-xl transition-all text-slate-400 hover:text-white text-xs font-bold">
                                        <FileText size={16} /> CV
                                    </a>
                                    <a href="mailto:ashiqurrahman09.jobs@gmail.com" className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-pink-600/30 rounded-xl transition-all text-slate-400 hover:text-white text-xs font-bold">
                                        <Mail size={16} /> Email
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

const HeroSection = () => (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center z-10">
            
            {/* Left Column: Text Content */}
            <div className="text-center md:text-left order-2 md:order-1">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-600/30 text-slate-300 text-xs font-bold tracking-wide uppercase backdrop-blur-sm"><MapPin size={12} /> Based in Dublin</span>
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 tracking-tighter leading-[0.9]">
                    Ashiqur <br /> Rahman.
                </h1>

                <p className="text-lg text-slate-400 max-w-lg mx-auto md:mx-0 leading-relaxed mb-10">
                    Architecting robust, scalable applications by bridging backend logic with modern infrastructure and intuitive front-end designs.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                    <a href="#projects" className="inline-flex justify-center items-center gap-2 bg-white text-[#020617] px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        View Projects <ArrowRight size={18} />
                    </a>
                    <a href="https://www.linkedin.com/in/ashiqur-rahman-ire" target="_blank" className="inline-flex justify-center items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-bold transition-all border border-slate-700">
                        <Linkedin size={18} /> LinkedIn
                    </a>
                </div>
            </div>

            {/* Right Column: Profile Image */}
            <div className="order-1 md:order-2 flex justify-center relative">
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                    {/* Glowing Effect behind image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl scale-110"></div>
                    
                    {/* Image Container - OBJECT-TOP Fix */}
                    <img 
                        src="/profile.jpg" 
                        alt="Ashiqur Rahman" 
                        className="relative w-full h-full rounded-2xl md:rounded-[2rem] border border-slate-700/50 shadow-2xl object-cover object-top z-10 rotate-3 hover:rotate-0 transition-all duration-500"
                    />
                </div>
            </div>
        </div>
    </section>
);

const AboutSection = () => (
    <section id="about" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-4xl font-extrabold text-white mb-8 tracking-tight">From Hardware <span className="text-slate-500">to Software.</span></h2>
                <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                    <p>
                        My journey began with a <span className="text-white font-semibold">Bachelor's in Electronics & Communication</span>. I was fascinated by how physical systems connect, but I realized the real magic happens in the logic that drives them.
                    </p>
                    <p>
                        This curiosity led me to pivot into software. I moved to Dublin to pursue an <span className="text-white font-semibold">MSc in Computer Science (Future Networked Systems)</span> at Trinity College Dublin.
                    </p>
                    <p>
                        Today, I combine that deep low-level understanding with modern high-level software architecture to build systems that are not just functional, but resilient and scalable.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Level 9 MSc card */}
                <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-all hover:-translate-y-1">
                    <h3 className="text-xl font-bold text-white mb-2">Level 9 MSc</h3>
                    <p className="text-sm font-mono text-slate-400">Trinity College Dublin</p>
                </div>
                {/* Open to Work card with pulse */}
                <div className="relative p-8 rounded-3xl bg-slate-900/50 border border-green-500/40 hover:border-green-400/60 transition-all hover:-translate-y-1 overflow-hidden">
                    {/* Pulsing glow ring */}
                    <span className="absolute inset-0 rounded-3xl animate-ping bg-green-500/10 pointer-events-none" style={{ animationDuration: '2s' }} />
                    <div className="relative flex items-center gap-3 mb-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" style={{ animationDuration: '1.5s' }} />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400" />
                        </span>
                        <h3 className="text-xl font-bold text-white">Open to Work</h3>
                    </div>
                    <p className="text-sm font-mono text-slate-400">Hybrid / On-site Dublin</p>
                </div>
            </div>
        </div>
    </section>
);

const EducationSection = () => (
    <section id="education" className="py-32 px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-extrabold text-white mb-16 tracking-tight flex items-center gap-4">
                <GraduationCap className="text-cyan-400" size={36} /> Education
            </h2>
            
            <div className="space-y-8">
                {educationData.map((edu, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group p-8 md:p-10 rounded-3xl bg-[#020617] border border-slate-800 hover:border-cyan-500/30 transition-all"
                    >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                                <div className="text-lg text-cyan-400 font-medium mb-2">{edu.field}</div>
                                <div className="text-slate-400 flex items-center gap-2">
                                    <BookOpen size={16} /> {edu.school}
                                </div>
                            </div>
                            <div className="mt-6 md:mt-0 text-right">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-slate-900 text-slate-300 font-mono text-sm border border-slate-700">
                                    {edu.period}
                                </span>
                                <div className="text-slate-500 text-sm mt-3 font-semibold">Grade: {edu.grade}</div>
                            </div>
                        </div>
                        
                        <div className="border-t border-slate-800/50 pt-6">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Key Modules</h4>
                            <div className="flex flex-wrap gap-2">
                                {edu.modules.map((mod, i) => (
                                    <span key={i} className="px-3 py-1.5 text-sm rounded-lg bg-slate-900 text-slate-300 border border-slate-800 group-hover:border-slate-700 transition-colors">
                                        {mod}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const ExperienceSection = () => (
    <section id="experience" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-extrabold text-white mb-16 tracking-tight flex items-center gap-4">
                 <Briefcase className="text-cyan-400" size={36} /> Career History
            </h2>
            <div className="relative border-l border-slate-800 ml-4 space-y-16">
                {experienceData.map((job, idx) => (
                    <div key={idx} className="relative pl-10 group">
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-cyan-500 ring-4 ring-[#020617]" />
                        
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{job.title}</h3>
                            <span className="text-sm font-mono text-slate-500">{job.period}</span>
                        </div>
                        
                        <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-lg text-slate-400 font-medium mb-4 inline-flex items-center gap-1 hover:text-white transition-colors">
                            {job.company} <ExternalLink size={14} />
                        </a>
                        
                        <p className="text-slate-400 leading-relaxed text-lg max-w-2xl">
                            {job.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const CommunityImpactSection = () => (
    <section id="contributions" className="py-32 px-6 bg-slate-900/20">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-extrabold text-white mb-16 tracking-tight flex items-center gap-4">
                <HeartHandshake className="text-purple-500" size={36} /> Leadership & Impact
            </h2>
            
            <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 p-10 rounded-[2rem] bg-gradient-to-br from-[#0B1120] to-[#111827] border border-slate-800 hover:border-purple-500/30 transition-all group">
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-4">
                             <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400">
                                <Zap size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Rotary Club Project</h3>
                                <p className="text-purple-400 text-sm font-medium">Technical Lead</p>
                            </div>
                        </div>
                        <span className="text-sm font-mono text-slate-500">2022 - 2023</span>
                    </div>
                    
                    <p className="text-slate-300 text-lg leading-relaxed mb-8">
                        Led technical operations for a public health initiative. I designed the HMI interfaces and configured PLCs for automated sanitary pad vending machines, directly improving accessibility in underserved rural areas.
                    </p>
                    
                    <div className="flex gap-3">
                         <span className="px-4 py-2 rounded-full bg-slate-900 text-purple-300 text-xs font-bold border border-slate-700">PLC Automation</span>
                         <span className="px-4 py-2 rounded-full bg-slate-900 text-purple-300 text-xs font-bold border border-slate-700">Public Health</span>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="p-8 rounded-[2rem] bg-[#020617] border border-slate-800 hover:border-cyan-500/30 transition-all h-full">
                        <div className="flex items-center gap-3 mb-4">
                            <Megaphone className="text-cyan-400" size={24} />
                             <h3 className="text-xl font-bold text-white">Annette Secretary</h3>
                        </div>
                        <p className="text-slate-400 leading-relaxed mb-4">
                            Coordinated social service initiatives with the District Annette's Club. Launched community engagement programs supported by Rotary International.
                        </p>
                        <a href="#featured" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors">
                            View Featured Article <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const ProjectsSection = () => (
    <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold text-white mb-16 tracking-tight flex items-center gap-4">
                <Code className="text-cyan-400" size={36} /> Selected Work
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map((project) => (
                    <motion.div 
                        key={project.id}
                        whileHover={{ y: -10 }}
                        className={`group rounded-3xl bg-[#020617] border border-slate-800 overflow-hidden flex flex-col ${project.image === "" ? 'border-dashed border-slate-700' : 'hover:border-slate-600'} transition-all duration-300`}
                    >
                        {project.image ? (
                            <div className="h-56 bg-slate-900 relative overflow-hidden">
                                 <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                    style={{ backgroundImage: `url(${project.image})` }}
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent" />
                            </div>
                        ) : (
                            <div className="h-56 bg-slate-900/30 flex items-center justify-center text-slate-600 border-b border-slate-800">
                                <span className="font-mono text-sm tracking-widest uppercase">Coming Soon</span>
                            </div>
                        )}

                        <div className="p-8 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
                                    {project.title}
                                </h3>
                                {project.repo !== "#" && (
                                    <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                                        <Github size={20} />
                                    </a>
                                )}
                            </div>

                            <p className="text-slate-400 mb-8 line-clamp-3 text-sm leading-relaxed">
                                {project.desc}
                            </p>

                            <div className="mt-auto flex flex-wrap gap-2">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-slate-800 text-slate-300">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const FeaturedPostsSection = () => (
    <section id="featured" className="py-32 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-extrabold text-white mb-16 tracking-tight flex items-center gap-4">
                <Megaphone className="text-cyan-400" size={36} /> Featured Posts & Publications
            </h2>

            <div className="grid md:grid-cols-1 gap-8">
                {/* LinkedIn Post - IPL Analysis */}
                <motion.a
                    href="https://www.linkedin.com/posts/ashiqur-rahman-ire_whistlepodu-ipl2024-cskvrcb-activity-7311227809648037889-EGiM"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="group relative rounded-3xl bg-gradient-to-br from-slate-900 to-[#020617] border border-slate-800 hover:border-cyan-500/50 overflow-hidden p-8 md:p-12 transition-all duration-300"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-xl">
                                <BookOpen className="text-white" size={32} />
                            </div>
                        </div>

                        <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wide">
                                    Community Recognition
                                </span>
                                <Linkedin className="text-blue-400" size={20} />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors leading-tight">
                                IPL 2024 Analysis: CSK vs RCB Strategic Breakdown
                            </h3>

                            <p className="text-slate-400 text-lg leading-relaxed mb-6">
                                Shared an in-depth analysis of cricket strategy and data insights during IPL 2024.
                                This post received appreciation from <span className="text-white font-semibold">Ira Akers</span>,
                                Co-Founder of <span className="text-cyan-400 font-semibold">CUE</span>, highlighting the intersection of sports analytics and technology.
                            </p>

                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-2">
                                    <HeartHandshake size={16} className="text-pink-400" />
                                    Recognized by Industry Leaders
                                </span>
                                <span className="flex items-center gap-2">
                                    <ExternalLink size={16} className="text-cyan-400" />
                                    View on LinkedIn
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.a>

                {/* Academic Publication - ICREACT 2023 */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="group relative rounded-3xl bg-gradient-to-br from-slate-900 to-[#020617] border border-slate-800 hover:border-purple-500/50 overflow-hidden p-8 md:p-12 transition-all duration-300"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-xl">
                                <GraduationCap className="text-white" size={32} />
                            </div>
                        </div>

                        <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wide">
                                    Academic Publication
                                </span>
                                <span className="text-xs text-slate-500 font-mono">Jan 2023 - May 2023</span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors leading-tight">
                                Event Analysis of Brain Signals Using Machine & Deep Learning
                            </h3>

                            <p className="text-slate-400 text-lg leading-relaxed mb-6">
                                Bachelor's final year thesis published in <span className="text-white font-semibold">ICREACT 2023</span> (International Conference in Research in Electronics Engineering and Communication Techniques).
                                Focused on classifying brain events for cognitive processes with applications in brain-computer interfaces, neuroscience, and clinical diagnosis.
                                <span className="block mt-2 text-purple-400 font-medium">Associated with SRM IST Vadapalani Campus</span>
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-slate-800 text-slate-300">
                                    Logistic Regression
                                </span>
                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-slate-800 text-slate-300">
                                    Deep Learning
                                </span>
                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-slate-800 text-slate-300">
                                    EEG Analysis
                                </span>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-purple-400" />
                                    Conference Presentation
                                </span>
                                <span className="flex items-center gap-2">
                                    <BookOpen size={16} className="text-purple-400" />
                                    Published Research
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Rotary News Article */}
                <motion.a
                    href="https://rotarynewsonline.org/striking-a-chord-with-annets/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="group relative rounded-3xl bg-gradient-to-br from-slate-900 to-[#020617] border border-slate-800 hover:border-pink-500/50 overflow-hidden p-8 md:p-12 transition-all duration-300"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-600 flex items-center justify-center shadow-xl">
                                <HeartHandshake className="text-white" size={32} />
                            </div>
                        </div>

                        <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-pink-900/30 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wide">
                                    Community Leadership
                                </span>
                                <Megaphone className="text-pink-400" size={20} />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-pink-400 transition-colors leading-tight">
                                Striking a Chord with Annets
                            </h3>

                            <p className="text-slate-400 text-lg leading-relaxed mb-6">
                                Featured article in <span className="text-white font-semibold">Rotary News Online</span> highlighting leadership role as Annette Secretary,
                                coordinating social service initiatives with District Annette's Club and launching community engagement programs supported by Rotary International.
                            </p>

                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-2">
                                    <HeartHandshake size={16} className="text-pink-400" />
                                    Social Impact
                                </span>
                                <span className="flex items-center gap-2">
                                    <ExternalLink size={16} className="text-pink-400" />
                                    Read Full Article
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.a>
            </div>
        </div>
    </section>
);

const FooterCTA = () => (
    <section id="contact" className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-16">

            {/* Why Me - Value Proposition */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-3 text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        Why <span className="text-cyan-400">Work With Me</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-3xl mx-auto">
                        I bring a unique perspective that combines hardware fundamentals with modern software architecture.
                    </p>
                </div>

                <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-900/20 to-slate-900/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6">
                        <Zap className="text-cyan-400" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Fast Learner</h3>
                    <p className="text-slate-400 leading-relaxed">
                        Transitioned from electronics to software engineering, mastering full-stack development, network systems, and cloud infrastructure in record time.
                    </p>
                </div>

                <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900/20 to-slate-900/50 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
                        <Server className="text-purple-400" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Systems Thinker</h3>
                    <p className="text-slate-400 leading-relaxed">
                        I don't just write code—I architect solutions. My electronics background helps me optimize at both hardware and software levels.
                    </p>
                </div>

                <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-900/20 to-slate-900/50 border border-pink-500/20 hover:border-pink-500/40 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-6">
                        <HeartHandshake className="text-pink-400" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Team Player</h3>
                    <p className="text-slate-400 leading-relaxed">
                        Led technical initiatives in community projects and collaborated on research publications. I thrive in cross-functional teams.
                    </p>
                </div>
            </div>

            {/* What I Solve - Problem Statement */}
            <div className="relative rounded-[3rem] bg-gradient-to-b from-slate-900/80 to-[#020617] border border-slate-800 overflow-hidden p-12 md:p-16">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight text-center">
                        Problems I <span className="text-cyan-400">Solve</span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                    <CheckCircle className="text-cyan-400" size={20} />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Legacy System Modernization</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Bridging old infrastructure with modern tech stacks without disrupting operations.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                    <CheckCircle className="text-purple-400" size={20} />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Network Performance Issues</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Optimizing distributed systems and resolving bottlenecks with network-level insights.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                                    <CheckCircle className="text-pink-400" size={20} />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Scalability Challenges</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Designing systems that grow with your business, from startup MVP to enterprise scale.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                    <CheckCircle className="text-orange-400" size={20} />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Full-Stack Integration</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Seamlessly connecting frontend experiences with robust backend architectures.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Let's Connect - CTA */}
            <div className="relative rounded-[3rem] bg-gradient-to-b from-cyan-900/20 to-slate-900/50 border border-cyan-500/30 overflow-hidden p-12 md:p-16 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />

                <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                        Let's <span className="text-cyan-400">Connect</span>
                    </h2>

                    <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Currently seeking full-time opportunities in Dublin or remote-hybrid roles.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                        <a href="mailto:ashiqurrahman09.jobs@gmail.com" className="inline-flex justify-center items-center gap-2 bg-white text-[#020617] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                            <Mail size={20} /> Get In Touch
                        </a>
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center gap-2 bg-slate-800 hover:bg-cyan-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all border border-slate-700">
                            <FileText size={20} /> Download CV
                        </a>
                    </div>

                    <div className="flex justify-center gap-4 mb-12">
                        <a href="https://www.linkedin.com/in/ashiqur-rahman-ire" target="_blank" className="p-4 bg-slate-800 rounded-full text-white hover:bg-cyan-600 transition-all group">
                            <Linkedin size={24} className="group-hover:scale-110 transition-transform" />
                        </a>
                        <a href="https://github.com/Ashiqurrahman9753" target="_blank" className="p-4 bg-slate-800 rounded-full text-white hover:bg-slate-700 transition-all group">
                            <Github size={24} className="group-hover:scale-110 transition-transform" />
                        </a>
                    </div>

                    <div className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm gap-4">
                        <p>© 2026 Ashiqur Rahman · Crafted with precision in Dublin, Ireland</p>
                        <p className="font-mono text-cyan-400/60">{'</>'} Built with React + Vite</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);


// --- PAGE COMPONENTS ---

const HomePage = () => (
    <>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <CommunityImpactSection />
        <FeaturedPostsSection />
        <FooterCTA />
    </>
);

const RepoSkeleton = () => (
    <div className="animate-pulse p-6 rounded-2xl bg-[#020617] border border-slate-800 flex flex-col gap-3">
        <div className="flex justify-between items-start">
            <div className="h-5 bg-slate-700 rounded w-3/5" />
            <div className="h-4 w-4 bg-slate-700 rounded" />
        </div>
        <div className="h-3 bg-slate-800 rounded w-full" />
        <div className="h-3 bg-slate-800 rounded w-4/5" />
        <div className="flex gap-3 mt-2">
            <div className="h-3 bg-slate-700 rounded w-16" />
            <div className="h-3 bg-slate-700 rounded w-10" />
        </div>
        <div className="flex gap-2 mt-1">
            <div className="h-4 bg-slate-800 rounded w-14" />
            <div className="h-4 bg-slate-800 rounded w-16" />
            <div className="h-4 bg-slate-800 rounded w-12" />
        </div>
    </div>
);

const ProjectsPage = () => {
    const [githubRepos, setGithubRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        fetch('https://api.github.com/users/Ashiqurrahman9753/repos?sort=updated&per_page=30')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch repos');
                return res.json();
            })
            .then(data => {
                const filtered = data.filter(repo => !repo.fork);
                setGithubRepos(filtered);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8">
                        <ArrowRight size={20} className="rotate-180" /> Back to Home
                    </Link>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                        All <span className="text-cyan-400">Projects</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl">
                        A collection of my work spanning IoT, distributed systems, machine learning, and full-stack development — fetched live from GitHub.
                    </p>
                </div>

                {/* Featured / Curated Projects */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <Star className="text-yellow-400" size={24} /> Featured Projects
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projectsData.map((project) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -10 }}
                                className={`group rounded-3xl bg-[#020617] border border-slate-800 overflow-hidden flex flex-col ${project.image === "" ? 'border-dashed border-slate-700' : 'hover:border-slate-600'} transition-all duration-300`}
                            >
                                {project.image ? (
                                    <div className="h-56 bg-slate-900 relative overflow-hidden">
                                         <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                            style={{ backgroundImage: `url(${project.image})` }}
                                         />
                                         <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent" />
                                    </div>
                                ) : (
                                    <div className="h-56 bg-slate-900/30 flex items-center justify-center text-slate-600 border-b border-slate-800">
                                        <span className="font-mono text-sm tracking-widest uppercase">Coming Soon</span>
                                    </div>
                                )}

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
                                            {project.title}
                                        </h3>
                                        {project.repo !== "#" && (
                                            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                                                <Github size={20} />
                                            </a>
                                        )}
                                    </div>

                                    <p className="text-slate-400 mb-8 line-clamp-3 text-sm leading-relaxed">
                                        {project.desc}
                                    </p>

                                    <div className="mt-auto flex flex-wrap gap-2">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-slate-800 text-slate-300">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* GitHub Repos - Live from API */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Github className="text-slate-400" size={24} /> GitHub Repositories
                    </h2>

                    {/* Filter Pills */}
                    {!loading && !error && githubRepos.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {['All', ...Array.from(new Set(githubRepos.map(r => r.language).filter(Boolean)))].map(lang => (
                                <button
                                    key={lang}
                                    onClick={() => setActiveFilter(lang)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                                        activeFilter === lang
                                            ? 'bg-cyan-400 text-[#020617]'
                                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                                    }`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    )}

                    {loading && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array(6).fill(0).map((_, i) => <RepoSkeleton key={i} />)}
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-20">
                            <p className="text-slate-400 text-lg mb-4">Couldn't load GitHub repos right now.</p>
                            <p className="text-slate-500 text-sm font-mono">{error}</p>
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {githubRepos.filter(r => activeFilter === 'All' || r.language === activeFilter).map((repo, idx) => (
                                <motion.a
                                    key={repo.id}
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileHover={{ y: -5 }}
                                    className="group p-6 rounded-2xl bg-[#020617] border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
                                            {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
                                        </h3>
                                        <ExternalLink size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0 mt-1" />
                                    </div>

                                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                                        {repo.description || 'No description available.'}
                                    </p>

                                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                                        {repo.language && (
                                            <span className="flex items-center gap-1.5">
                                                <span className={`w-2.5 h-2.5 rounded-full ${
                                                    repo.language === 'Python' ? 'bg-blue-400' :
                                                    repo.language === 'JavaScript' ? 'bg-yellow-400' :
                                                    repo.language === 'TypeScript' ? 'bg-blue-500' :
                                                    repo.language === 'HTML' ? 'bg-orange-400' :
                                                    repo.language === 'CSS' ? 'bg-purple-400' :
                                                    repo.language === 'Java' ? 'bg-red-400' :
                                                    'bg-slate-400'
                                                }`} />
                                                {repo.language}
                                            </span>
                                        )}
                                        {repo.stargazers_count > 0 && (
                                            <span className="flex items-center gap-1">
                                                <Star size={12} className="text-yellow-400" /> {repo.stargazers_count}
                                            </span>
                                        )}
                                        {repo.forks_count > 0 && (
                                            <span className="flex items-center gap-1">
                                                <GitFork size={12} /> {repo.forks_count}
                                            </span>
                                        )}
                                    </div>

                                    {repo.topics && repo.topics.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {repo.topics.slice(0, 4).map((topic, i) => (
                                                <span key={i} className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-cyan-900/20 text-cyan-300 border border-cyan-500/20">
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </motion.a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// PDF Thumbnail Component
const PDFThumbnail = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState(null);

    return (
        <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={
                <div className="w-full h-full flex items-center justify-center bg-slate-800">
                    <Loader2 className="text-cyan-400 animate-spin" size={32} />
                </div>
            }
            error={
                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                    <FileText size={48} />
                </div>
            }
        >
            <Page
                pageNumber={1}
                width={400}
                renderTextLayer={false}
                renderAnnotationLayer={false}
            />
        </Document>
    );
};

const PublicationsPage = () => {
    return (
        <div className="pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8">
                        <ArrowRight size={20} className="rotate-180" /> Back to Home
                    </Link>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                        Research <span className="text-cyan-400">Publications</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl">
                        Academic research spanning machine learning, computer vision, IoT systems, and data analysis. Click any paper to view on ResearchGate.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {publicationsData.map((paper, idx) => (
                        <motion.a
                            key={paper.id}
                            href={paper.researchGateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group relative rounded-3xl bg-gradient-to-br from-slate-900 to-[#020617] border border-slate-800 hover:border-purple-500/50 overflow-hidden transition-all duration-300 cursor-pointer"
                        >
                            {/* PDF Thumbnail */}
                            <div className="relative h-80 bg-slate-900 overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <PDFThumbnail pdfUrl={paper.pdfUrl} />
                                </div>

                                {/* Gradient overlay at bottom */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />

                                {/* Hover overlay with "View on ResearchGate" */}
                                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="text-center">
                                        <ExternalLink className="text-cyan-400 mx-auto mb-3" size={48} />
                                        <p className="text-white font-bold text-lg">View on ResearchGate</p>
                                        <p className="text-slate-300 text-sm mt-2">Click to read the full paper</p>
                                    </div>
                                </div>
                            </div>

                            {/* Paper Info */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-[10px] font-bold uppercase tracking-wide">
                                        Research Paper
                                    </span>
                                    <span className="text-[10px] text-slate-500 font-mono">{paper.date}</span>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-400 transition-colors leading-tight line-clamp-2">
                                    {paper.title}
                                </h3>

                                <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                                    {paper.abstract}
                                </p>

                                <div className="flex flex-wrap gap-1.5">
                                    {paper.tags.slice(0, 3).map((tag, i) => (
                                        <span key={i} className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-slate-800 text-slate-300">
                                            {tag}
                                        </span>
                                    ))}
                                    {paper.tags.length > 3 && (
                                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-slate-800 text-slate-400">
                                            +{paper.tags.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
};

const BlogPage = () => {
    const iconMap = {
        chart: <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"><Megaphone className="text-white" size={28} /></div>,
        brain: <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center"><BookOpen className="text-white" size={28} /></div>,
        community: <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center"><HeartHandshake className="text-white" size={28} /></div>,
        cloud: <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center"><Server className="text-white" size={28} /></div>,
    };

    const categoryColor = {
        'Data Analysis': 'bg-cyan-900/30 border-cyan-500/30 text-cyan-300',
        'Research': 'bg-purple-900/30 border-purple-500/30 text-purple-300',
        'Community': 'bg-green-900/30 border-green-500/30 text-green-300',
        'Technical': 'bg-orange-900/30 border-orange-500/30 text-orange-300',
    };

    return (
        <div className="pt-32 pb-16">
            <div className="max-w-5xl mx-auto px-6">
                <div className="mb-16">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8">
                        <ArrowRight size={20} className="rotate-180" /> Back to Home
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <Rss className="text-cyan-400" size={36} />
                        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                            Blog & <span className="text-cyan-400">Articles</span>
                        </h1>
                    </div>
                    <p className="text-xl text-slate-400 max-w-3xl">
                        Thoughts on technology, research, data science, and community impact. Click any article to read the full piece.
                    </p>
                </div>

                <div className="space-y-6">
                    {blogData.map((post, idx) => (
                        <motion.a
                            key={post.id}
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.08 }}
                            whileHover={{ y: -4 }}
                            className="group flex flex-col md:flex-row gap-6 p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-[#020617] border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative flex-shrink-0">
                                {iconMap[post.icon]}
                            </div>

                            <div className="relative flex-grow">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <span className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wide ${categoryColor[post.category] || 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                                        <Calendar size={12} /> {post.date}
                                    </span>
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors leading-tight">
                                    {post.title}
                                </h3>

                                <p className="text-slate-400 leading-relaxed mb-4 text-sm md:text-base">
                                    {post.excerpt}
                                </p>

                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex flex-wrap gap-1.5">
                                        {post.tags.map((tag, i) => (
                                            <span key={i} className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-slate-800 text-slate-400">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="ml-auto flex items-center gap-1.5 text-xs text-slate-500 group-hover:text-cyan-400 transition-colors font-semibold">
                                        Read article <ExternalLink size={12} />
                                    </span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---

function App() {
  return (
    <Router>
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">
        
        {/* FONT IMPORT - INTER */}
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
            body { font-family: 'Inter', sans-serif; }
        `}</style>

        {/* --- BACKGROUND IMAGE LOGIC --- */}
        <div className="fixed inset-0 z-0">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/bg.jpg')" }}
            />
            {/* Lighter overlay so background image is more visible */}
            <div className="absolute inset-0 bg-[#020617]/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/70 via-[#020617]/50 to-[#020617]" />
        </div>

        <div className="relative z-10">
            <Nav />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/publications" element={<PublicationsPage />} />
                <Route path="/blog" element={<BlogPage />} />
            </Routes>
        </div>
    </div>
    </Router>
  );
}

export default App;