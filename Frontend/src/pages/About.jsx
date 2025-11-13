import React from 'react';
import TeamMemberCard from '../components/TeamCard';
import Header from '../components/Header';
import Navigation from '../components/HeaderLink';
import Footer from '../components/Footer';


// You would typically fetch this data from an API
const teamMembers = [
  { name: 'Amber Princess Rosana', role: 'UI/UX Designer' },
  { name: 'Jeremy Ortega', role: 'Project Manager' },
  { name: 'Estela Mae Jalac', role: 'Quality Assurance' },
  { name: 'Lei Ann Judea', role: 'Business Analyst' },
  { name: 'Rolando Majait', role: 'Developer' },
  { name: 'Juan Miguel Ramirez', role: 'UI/UX Designer' },
];

const About  = () => {
  return (
    <>
      <Header />
      <Navigation />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-light text-center text-gray-800 mb-12">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={index}
                name={member.name}
                role={member.role}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default About;
