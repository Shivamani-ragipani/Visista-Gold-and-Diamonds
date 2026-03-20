import React from 'react';
import { FaGem, FaAward, FaHandshake, FaTruck } from 'react-icons/fa';
import './ServiceFeatures.css';

const features = [
  {
    icon: <FaGem />,
    title: 'Certified Jewellery',
    text: 'BIS Hallmarked gold & GIA-certified natural diamonds',
  },
  {
    icon: <FaAward />,
    title: 'Trusted Heritage',
    text: 'Generations of craftsmen delivering heirloom quality',
  },
  {
    icon: <FaHandshake />,
    title: 'Personalised Service',
    text: 'Dedicated staff at all 3 Hyderabad showrooms',
  },
  {
    icon: <FaTruck />,
    title: 'Safe Delivery',
    text: 'Insured & secure home delivery available across India',
  },
];

const ServiceFeatures = () => (
  <section className="service-features">
    <div className="container sf-grid">
      {features.map((f, i) => (
        <div key={i} className="sf-item">
          <div className="sf-icon">{f.icon}</div>
          <div>
            <h4>{f.title}</h4>
            <p>{f.text}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ServiceFeatures;
