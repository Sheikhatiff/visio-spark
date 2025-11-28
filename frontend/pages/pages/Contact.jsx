import React, { useState } from 'react';
import Header from './Header';
const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            alert('Message sent successfully! We\'ll get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 2000);
    };

    const contactInfo = [
        {
            icon: '📞',
            title: 'Phone',
            details: '+92 331 5821144',
            subtitle: 'Mon-Fri from 8am to 5pm',
        },
        {
            icon: '✉️',
            title: 'Email',
            details: 'ininsico@gmail.com',
            subtitle: 'We\'ll reply within 24 hours',
        },
        {
            icon: '📍',
            title: 'Address',
            details: 'SF Boys Hostel',
            subtitle: 'Comsat Abbottabad',
        },
        {
            icon: '🕒',
            title: 'Office Hours',
            details: '8:00 AM - 4:00 PM',
            subtitle: 'Monday to Friday',
        }
    ];

    // Email animation styles with emerald theme
    const emailStyles = {
        container: {
            background: 'transparent',
            height: '300px',
            position: 'relative',
            marginBottom: '2rem'
        },
        letterImage: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '200px',
            height: '200px',
            transform: `translate(-50%, -50%) ${isHovered ? 'translateY(20px)' : ''}`,
            cursor: 'pointer',
            transition: 'transform 0.4s'
        },
        animatedMail: {
            position: 'absolute',
            height: '150px',
            width: '200px',
            transition: '0.4s',
            transform: isHovered ? 'translateY(20px)' : 'translateY(0)'
        },
        body: {
            position: 'absolute',
            bottom: 0,
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '0 0 100px 200px',
            borderColor: 'transparent transparent #059669 transparent',
            zIndex: 2
        },
        topFold: {
            position: 'absolute',
            top: '50px',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '50px 100px 0 100px',
            transformOrigin: '50% 0%',
            transition: `transform 0.4s ${isHovered ? '0s' : '0.4s'}, z-index 0.2s ${isHovered ? '0s' : '0.4s'}`,
            borderColor: '#047857 transparent transparent transparent',
            zIndex: isHovered ? 0 : 2,
            transform: isHovered ? 'rotateX(180deg)' : 'rotateX(0deg)'
        },
        backFold: {
            position: 'absolute',
            bottom: 0,
            width: '200px',
            height: '100px',
            background: '#047857',
            zIndex: 0
        },
        leftFold: {
            position: 'absolute',
            bottom: 0,
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '50px 0 50px 100px',
            borderColor: 'transparent transparent transparent #065f46',
            zIndex: 2
        },
        letter: {
            left: '20px',
            bottom: '0px',
            position: 'absolute',
            width: '160px',
            height: isHovered ? '180px' : '60px',
            background: 'white',
            zIndex: 1,
            overflow: 'hidden',
            transition: '0.4s 0.2s',
            border: '1px solid #059669'
        },
        letterBorder: {
            height: '10px',
            width: '100%',
            background: `repeating-linear-gradient(
                -45deg,
                #059669,
                #059669 8px,
                transparent 8px,
                transparent 18px
            )`
        },
        letterTitle: {
            marginTop: '10px',
            marginLeft: '5px',
            height: '10px',
            width: '40%',
            background: '#059669'
        },
        letterContext: {
            marginTop: '10px',
            marginLeft: '5px',
            height: '10px',
            width: '20%',
            background: '#059669'
        },
        letterStamp: {
            marginTop: '30px',
            marginLeft: '120px',
            borderRadius: '100%',
            height: '30px',
            width: '30px',
            background: '#059669',
            opacity: 0.3
        },
        shadow: {
            position: 'absolute',
            top: '200px',
            left: '50%',
            width: isHovered ? '250px' : '400px',
            height: '30px',
            transition: '0.4s',
            transform: 'translateX(-50%)',
            borderRadius: '100%',
            background: 'radial-gradient(rgba(5,150,105,0.3), rgba(5,150,105,0.1), rgba(5,150,105,0.0))'
        }
    };

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    GET IN <span className="text-gradient bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">TOUCH</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Have questions? We're here to help. Reach out to us and we'll respond as soon as possible.
                </p>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information with Email Animation */}
                    <div className="space-y-8">
                        {/* Email Animation */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">SEND US A MESSAGE</h2>
                            <div 
                                style={emailStyles.container}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div style={emailStyles.letterImage}>
                                    <div style={emailStyles.animatedMail}>
                                        <div style={emailStyles.backFold}></div>
                                        <div style={emailStyles.letter}>
                                            <div style={emailStyles.letterBorder}></div>
                                            <div style={emailStyles.letterTitle}></div>
                                            <div style={emailStyles.letterContext}></div>
                                            <div style={emailStyles.letterStamp}></div>
                                        </div>
                                        <div style={emailStyles.topFold}></div>
                                        <div style={emailStyles.body}></div>
                                        <div style={emailStyles.leftFold}></div>
                                    </div>
                                    <div style={emailStyles.shadow}></div>
                                </div>
                            </div>
                            <p className="text-center text-gray-600 mt-4">Hover over the envelope to open</p>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">CONTACT INFORMATION</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {contactInfo.map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-6 rounded-xl border border-gray-200 bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:border-emerald-300 cursor-pointer group"
                                    >
                                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-900 font-medium">{item.details}</p>
                                        <p className="text-gray-600 text-sm mt-1">{item.subtitle}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">CONTACT FORM</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        FULL NAME *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none bg-white"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        EMAIL ADDRESS *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none bg-white"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    SUBJECT *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none bg-white"
                                    placeholder="What's this about?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    MESSAGE *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none resize-none bg-white"
                                    placeholder="Tell us how we can help you..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
                                    isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 hover:shadow-xl'
                                }`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        SENDING...
                                    </div>
                                ) : (
                                    'SEND MESSAGE →'
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Emergency Contact Banner */}
                <div className="mt-12 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-8 text-center text-white shadow-xl">
                    <div className="flex items-center justify-center mb-3">
                        <span className="text-2xl mr-3">🚨</span>
                        <h3 className="text-xl font-semibold">EMERGENCY CONTACT</h3>
                    </div>
                    <p className="text-emerald-50">
                        For urgent matters outside office hours, please call our emergency line:{' '}
                        <strong className="text-white text-lg">+92 331 5821144</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

const Contact = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <ContactPage />
        </div>
    );
}

export default Contact;