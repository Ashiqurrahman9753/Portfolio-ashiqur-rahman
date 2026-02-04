import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, CheckCircle, Zap, Server, Code, Database, Mail, Linkedin, Github, FileText, BookOpen, GraduationCap, HeartHandshake, Megaphone, ExternalLink, Briefcase, MapPin, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        title: "WADA Distributed Service",
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

    const navLinks = [
        { label: "About", href: "#about" },
        { label: "Education", href: "#education" },
        { label: "Stack", href: "#skills" },
        { label: "Career", href: "#experience" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" }
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
            isScrolled ? 'bg-[#020617]/90 backdrop-blur-md border-slate-800' : 'bg-transparent border-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                
                {/* LOGO: >_ ASHIQUR RAHMAN_ */}
                <a href="#home" className="flex items-center gap-2 font-bold text-lg tracking-tight text-white group font-mono">
                    <span className="text-cyan-400 font-extrabold">{">"}</span>
                    <Typewriter text="ASHIQUR RAHMAN" delay={100} className="tracking-wide" />
                </a>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, idx) => (
                        <a key={idx} href={link.href} className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">{link.label}</a>
                    ))}
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-[#020617] bg-white rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <FileText size={16} /> CV
                    </a>
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
                                <a key={idx} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-cyan-400 font-semibold">{link.label}</a>
                            ))}
                            <a href="/resume.pdf" target="_blank" className="text-cyan-400 font-bold">Download CV</a>
                        </div>
                    </motion.div>
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
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide uppercase backdrop-blur-sm shadow-sm"><CheckCircle size={12} /> Holding Stamp 1G Graduate Visa</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-600/30 text-slate-300 text-xs font-bold tracking-wide uppercase backdrop-blur-sm"><MapPin size={12} /> Based in Dublin</span>
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tighter leading-[0.9]">
                    Ashiqur <br /> Rahman.
                </h1>
                
                <h2 className="text-2xl md:text-3xl text-slate-300 font-medium mb-6 tracking-tight">
                    Graduate Software Engineer
                </h2>
                
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
                {[
                    { label: "Level 9 MSc", sub: "Trinity College Dublin" }, 
                    { label: "Stamp 1G", sub: "Graduate Visa Holder" }, 
                    { label: "Web3 & IoT", sub: "Open Source Contributor" }, 
                    { label: "Open to Work", sub: "Hybrid / On-site Dublin" }
                ].map((stat, idx) => (
                    <div key={idx} className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-all hover:-translate-y-1">
                        <h3 className="text-xl font-bold text-white mb-2">{stat.label}</h3>
                        <p className="text-sm font-mono text-slate-400">{stat.sub}</p>
                    </div>
                ))}
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

                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="p-8 rounded-[2rem] bg-[#020617] border border-slate-800 hover:border-cyan-500/30 transition-all flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <Megaphone className="text-cyan-400" size={24} />
                             <h3 className="text-xl font-bold text-white">Annette Secretary</h3>
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            Coordinated social service initiatives with the District Annette's Club. Launched community engagement programs supported by Rotary International.
                        </p>
                    </div>
                    
                    <a href="https://rotarynewsonline.org/striking-a-chord-with-annets/" target="_blank" rel="noopener noreferrer" className="p-8 rounded-[2rem] bg-purple-900/10 border border-purple-500/20 hover:bg-purple-900/20 transition-all group flex items-center justify-between">
                         <div>
                             <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">Read Article</h4>
                             <p className="text-purple-300/60 text-sm">Rotary News Online</p>
                         </div>
                         <ExternalLink className="text-purple-400" size={20} />
                    </a>
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

const FooterCTA = () => (
    <section id="contact" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
            <div className="relative rounded-[3rem] bg-gradient-to-b from-slate-900 to-[#020617] border border-slate-800 overflow-hidden p-12 md:p-24 text-center">
                
                {/* Glow Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-cyan-500/10 blur-[100px] pointer-events-none" />
                
                <h2 className="relative z-10 text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tighter">
                    Let's Build Something <br className="hidden md:block" /> <span className="text-cyan-400">Exceptional.</span>
                </h2>
                
                <p className="relative z-10 text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                    I'm currently available for full-time roles. If you're looking for a developer who understands both the hardware and software side of things, let's talk.
                </p>
                
                <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
                    <a href="mailto:ashiqurrahman09.jobs@gmail.com" className="inline-flex justify-center items-center gap-2 bg-white text-[#020617] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        <Mail size={20} /> Say Hello
                    </a>
                    <div className="flex justify-center gap-4">
                        <a href="https://www.linkedin.com/in/ashiqur-rahman-ire" target="_blank" className="p-4 bg-slate-800 rounded-full text-white hover:bg-cyan-600 transition-all">
                            <Linkedin size={24} />
                        </a>
                        <a href="https://github.com/Ashiqurrahman9753" target="_blank" className="p-4 bg-slate-800 rounded-full text-white hover:bg-slate-700 transition-all">
                            <Github size={24} />
                        </a>
                    </div>
                </div>

                <div className="relative z-10 mt-20 pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
                    <p>© 2026 Ashiqur Rahman. Crafted in Dublin.</p>
                    <p className="mt-2 md:mt-0 font-mono">System.exit(0)</p>
                </div>
            </div>
        </div>
    </section>
);


// --- MAIN APP COMPONENT ---

function App() {
  return (
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
            <HeroSection />
            <AboutSection />
            <EducationSection />
            <ExperienceSection />
            <CommunityImpactSection />
            <ProjectsSection />
            <FooterCTA />
        </div>
    </div>
  );
}

export default App;