import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/AboutUs.css';

function AboutUs() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const stats = [
    { value: '20+', label: 'Years of Excellence' },
    { value: '100+', label: 'Expert Doctors' },
    { value: '50k+', label: 'Satisfied Patients' },
    { value: '24/7', label: 'Emergency Service' }
  ];

  const services = [
    {
      title: 'Emergency Care',
      description: '24/7 emergency medical services with state-of-the-art facilities and experienced staff.',
      icon: '🚑'
    },
    {
      title: 'Specialized Treatment',
      description: 'Expert care across multiple specialties including cardiology, neurology, and orthopedics.',
      icon: '👨‍⚕️'
    },
    {
      title: 'Modern Technology',
      description: 'Latest medical equipment and technology for accurate diagnosis and treatment.',
      icon: '🔬'
    },
    {
      title: 'Patient Care',
      description: 'Dedicated nursing staff providing compassionate and personalized care.',
      icon: '💉'
    }
  ];

  const team = [
    {
      name: 'Dr. John Smith',
      role: 'Chief Medical Officer',
      specialty: 'Cardiology',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500'
    },
    {
      name: 'Dr. Sarah Johnson',
      role: 'Head of Surgery',
      specialty: 'Neurosurgery',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Head of Research',
      specialty: 'Oncology',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500'
    }
  ];

  return (
    <div className="about-us">
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <h1>Leading the Way in Medical Excellence</h1>
          <p>
            Providing quality healthcare services with cutting-edge technology
            and compassionate care for over two decades.
          </p>
        </div>
      </motion.section>

      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <h2>{stat.value}</h2>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mission-section" data-aos="fade-up">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            To provide exceptional healthcare services that improve the quality of life
            for our patients and their families through innovative medical practices,
            research, and compassionate care.
          </p>
        </div>
      </section>

      <section className="services-section">
        <h2 data-aos="fade-up">Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="service-icon">{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="team-section">
        <h2 data-aos="fade-up">Our Leadership Team</h2>
        <div className="team-grid">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="team-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              whileHover={{ y: -10 }}
            >
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="specialty">{member.specialty}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="values-section">
        <h2 data-aos="fade-up">Our Values</h2>
        <div className="values-grid">
          <motion.div className="value-card" data-aos="fade-right" whileHover={{ scale: 1.05 }}>
            <h3>Excellence</h3>
            <p>Striving for the highest standards in healthcare delivery</p>
          </motion.div>
          <motion.div className="value-card" data-aos="fade-right" data-aos-delay="100" whileHover={{ scale: 1.05 }}>
            <h3>Compassion</h3>
            <p>Treating every patient with care, dignity, and respect</p>
          </motion.div>
          <motion.div className="value-card" data-aos="fade-right" data-aos-delay="200" whileHover={{ scale: 1.05 }}>
            <h3>Innovation</h3>
            <p>Embracing new technologies and medical advancements</p>
          </motion.div>
          <motion.div className="value-card" data-aos="fade-right" data-aos-delay="300" whileHover={{ scale: 1.05 }}>
            <h3>Integrity</h3>
            <p>Maintaining the highest ethical standards in all our practices</p>
          </motion.div>
        </div>
      </section>

      <section className="contact-section" data-aos="fade-up">
        <div className="contact-content">
          <h2>Get in Touch</h2>
          <div className="contact-info">
            <motion.div 
              className="contact-item"
              whileHover={{ scale: 1.05 }}
            >
              <span className="icon">📍</span>
              <p>123 Medical Center Drive, Healthcare City</p>
            </motion.div>
            <motion.div 
              className="contact-item"
              whileHover={{ scale: 1.05 }}
            >
              <span className="icon">📞</span>
              <p>Emergency: +1 (555) 911-0000</p>
            </motion.div>
            <motion.div 
              className="contact-item"
              whileHover={{ scale: 1.05 }}
            >
              <span className="icon">📧</span>
              <p>info@cityhospital.com</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;