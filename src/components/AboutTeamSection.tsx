import React from 'react';
import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

export const AboutTeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Ayush Sarkar",
      role: "Project Lead & Hardware Engineer",
      description: "Leading the prosthetic hand development with expertise in ESP32 programming and sensor integration. Specializes in real-time signal processing and wireless communication systems.",
      image: "/images/team/ayush.jpg",
      linkedin: "#",
      github: "#",
      email: "ayush@neuroxolabs.in"
    },
    {
      name: "Prakhar Singh",
      role: "AI/ML Engineer",
      description: "Expert in MediaPipe integration and computer vision. Develops real-time hand tracking algorithms and gesture recognition systems for intuitive prosthetic control.",
      image: "/images/team/prakhar.jpg",
      linkedin: "#",
      github: "#",
      email: "prakhar@neuroxolabs.in"
    },
    {
      name: "Ratna Priya",
      role: "Software Developer",
      description: "Full-stack developer specializing in Python, React, and embedded systems. Creates user interfaces and backend systems for seamless prosthetic operation.",
      image: "/images/team/ratna.jpg",
      linkedin: "#",
      github: "#",
      email: "ratna@neuroxolabs.in"
    },
    {
      name: "Arnav Sharma",
      role: "3D Design & Manufacturing",
      description: "Expert in 3D modeling, CAD design, and additive manufacturing. Creates sustainable, affordable prosthetic components using recycled materials.",
      image: "/images/team/arnav.jpg",
      linkedin: "#",
      github: "#",
      email: "arnav@neuroxolabs.in"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const memberVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about-team" className="section-padding bg-gradient-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(245, 245, 245, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(245, 245, 245, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: '200px 200px'
        }} />
      </div>

      <div className="container-fluid relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 md:mb-8">
            <span className="text-gradient">
              Meet Our Team
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            The brilliant minds behind Pros Hand V1.0. Our diverse team combines expertise in 
            hardware engineering, AI/ML, software development, and 3D manufacturing.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={memberVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Team Member Card */}
              <div className="bg-secondary-black/80 backdrop-blur-md border border-border-color rounded-2xl p-6 md:p-8 h-full transition-all duration-300 group-hover:border-accent-color/50 group-hover:shadow-2xl group-hover:shadow-accent-color/20">
                
                {/* Avatar */}
                <motion.div
                  className="text-6xl md:text-8xl mb-6 text-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {member.image.startsWith('/') ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mx-auto"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <div className={`text-6xl md:text-8xl ${member.image.startsWith('/') ? 'hidden' : ''}`}>
                    {member.image}
                  </div>
                </motion.div>

                {/* Member Info */}
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-accent-color mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm md:text-base text-text-secondary mb-4 font-medium">
                    {member.role}
                  </p>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    {member.description}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-border-color">
                  {member.linkedin && (
                    <motion.a
                      href={member.linkedin}
                      className="text-text-secondary hover:text-accent-color transition-colors duration-200"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </motion.a>
                  )}
                  {member.github && (
                    <motion.a
                      href={member.github}
                      className="text-text-secondary hover:text-accent-color transition-colors duration-200"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </motion.a>
                  )}
                  {member.email && (
                    <motion.a
                      href={`mailto:${member.email}`}
                      className="text-text-secondary hover:text-accent-color transition-colors duration-200"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h20.728c.904 0 1.636.732 1.636 1.636zM12 13.5L1.636 4.909h20.728L12 13.5z"/>
                      </svg>
                    </motion.a>
                  )}
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-accent-color/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Stats */}
        <motion.div
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Years Experience", value: "5+" },
            { label: "Projects Completed", value: "12" },
            { label: "Technologies", value: "15+" },
            { label: "Innovation Awards", value: "3" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 md:p-6 bg-secondary-black/60 backdrop-blur-sm border border-border-color rounded-xl"
              whileHover={{ scale: 1.05, borderColor: "#f5f5f5" }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-accent-color mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-text-secondary">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-lg md:text-xl text-text-secondary mb-8">
            Ready to collaborate on the future of affordable prosthetics?
          </p>
          <motion.button
            className="px-8 py-4 bg-accent-color text-primary-black font-semibold rounded-lg hover:bg-white transition-all duration-300 hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Mission
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}; 