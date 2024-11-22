// components/WhyChooseUs.tsx
import React from 'react';
import {FaCogs, FaGem, FaHandsHelping, FaLightbulb, FaRegSmile} from 'react-icons/fa';

interface ReasonType {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    description: string;
    number: string;
}

interface ContentType {
    sectionTitle: string;
    reasons: ReasonType[];
}

const content: ContentType = {
    sectionTitle: "Why Choose IIT Volunteer Hub",
    reasons: [
        {
            icon: <FaLightbulb className="text-4xl text-orange-500"/>,
            title: "Diverse Opportunities",
            subtitle: "Multiple Causes",
            description: "Wide range of volunteer opportunities from education to environmental protection, allowing you to choose projects that match your interests and skills.",
            number: "01"
        },
        {
            icon: <FaGem className="text-4xl text-orange-500"/>,
            title: "Local Impact",
            subtitle: "Chicago Community",
            description: "Direct engagement with Chicago communities, creating meaningful connections and making a real difference in our neighborhood.",
            number: "02"
        },
        {
            icon: <FaCogs className="text-4xl text-orange-500"/>,
            title: "Flexible Schedule",
            subtitle: "Student-Friendly",
            description: "Projects designed to accommodate student schedules, with both short-term and long-term commitment options available.",
            number: "03"
        },
        {
            icon: <FaRegSmile className="text-4xl text-orange-500"/>,
            title: "Personal Growth",
            subtitle: "Skill Development",
            description: "Opportunities to develop leadership, communication, and project management skills while making a positive impact.",
            number: "04"
        },
        {
            icon: <FaHandsHelping className="text-4xl text-orange-500"/>,
            title: "Full Support",
            subtitle: "Comprehensive Guidance",
            description: "Complete volunteer support including orientation, training, transportation assistance, and ongoing mentorship.",
            number: "05"
        }
    ]
};

const WhyChooseUs: React.FC = () => {

    return (
        <div className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16">{content.sectionTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {content.reasons.map((reason, index) => (
                        <div key={index}
                             className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                {reason.icon}
                                <span className="text-gray-300 text-2xl font-bold">{reason.number}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                            <p className="text-gray-500 text-sm mb-2">{reason.subtitle}</p>
                            <p className="text-gray-600 text-sm">{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
