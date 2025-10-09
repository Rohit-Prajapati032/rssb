import React from "react";

const servicesData = [
  {
    title: "Web Development",
    description: "Build responsive and high-performance websites using React, Node.js, and modern web technologies.",
    icon: "🌐",
  },
  {
    title: "Mobile App Development",
    description: "Create cross-platform mobile apps using React Native or Flutter for iOS and Android.",
    icon: "📱",
  },
  {
    title: "UI/UX Design",
    description: "Design intuitive user interfaces and engaging experiences for web and mobile apps.",
    icon: "🎨",
  },
  {
    title: "Backend API Development",
    description: "Develop robust and scalable RESTful APIs using Node.js, Express, and MongoDB.",
    icon: "🛠️",
  },
  {
    title: "E-commerce Solutions",
    description: "Build custom e-commerce platforms with secure payment integration and product management.",
    icon: "🛒",
  },
  {
    title: "Maintenance & Support",
    description: "Provide ongoing support, bug fixes, and updates to keep your applications running smoothly.",
    icon: "⚙️",
  },
];

const ServicesPage = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Our Developer Services</h1>
      <div className="row g-4">
        {servicesData.map((service, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <div className="display-4 mb-3">{service.icon}</div>
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
                <button className="btn btn-primary">Learn More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
