import React from "react";
import { FaUsers, FaRocket, FaHeart } from "react-icons/fa";
import me3 from "../Images/me3.jpg";

const About = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About ShopSphere
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover who we are, what drives us, and how we’re transforming the
            world of online shopping.
          </p>
        </section>

        {/* Company Overview */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Team working"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Story
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Founded in 2025, ShopSphere started with a simple mission: to
                make online shopping accessible, enjoyable, and affordable for
                everyone. From humble beginnings, we’ve grown into a trusted
                platform offering a wide range of products, from fashion to
                electronics, all backed by exceptional customer service.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaRocket className="text-blue-600 w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                We’re committed to pushing the boundaries of e-commerce with
                cutting-edge technology.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaUsers className="text-blue-600 w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Community
              </h3>
              <p className="text-gray-600">
                Building a community of happy shoppers and dedicated sellers is
                at our core.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaHeart className="text-blue-600 w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Passion
              </h3>
              <p className="text-gray-600">
                We love what we do, and we pour that passion into every product
                and experience.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Meet Our Team
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {" "}
            {[
              {
                name: "Abhishek Chahar",
                role: "Founder & CEO",
                image: me3,
              },
              // {
              //   name: "John Smith",
              //   role: "Head of Product",
              //   image: me3,
              // },
              // {
              //   name: "Emily Johnson",
              //   role: "Marketing Lead",
              //   image: me3,
              // },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-lg shadow-md overflow-hidden text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
