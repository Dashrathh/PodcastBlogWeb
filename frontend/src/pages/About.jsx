import React from "react";

const AboutPage = () => {
    return (
        <div className="p-6 bg-gray-100 text-gray-800 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">
                    About Us
                </h1>
                <p className="text-lg leading-relaxed mb-6">
                    Welcome to <span className="font-bold">PodcastBlog</span>, your go-to platform for thought-provoking ideas, engaging stories, and inspiring voices.
                    Our mission is to bring together a diverse community of listeners and readers, offering a space where knowledge meets creativity.
                </p>

                <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Who We Are</h2>
                <p className="text-lg leading-relaxed mb-6">
                    At PodcastBlog, we believe in the power of storytelling and meaningful conversations. From trending topics to timeless wisdom, we cover
                    a variety of subjects to keep you informed, entertained, and inspired. Our team is a passionate group of creators, thinkers, and dreamers
                    dedicated to sharing content that matters.
                </p>

                <h2 className="text-2xl font-semibold text-indigo-500 mb-4">What We Offer</h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>
                        <span className="font-bold">Podcasts:</span> Listen to expert interviews, insightful discussions, and audio journeys that expand your horizons.
                    </li>
                    <li>
                        <span className="font-bold">Blogs:</span> Read articles that dive deep into culture, technology, lifestyle, and more, carefully curated to spark curiosity and engagement.
                    </li>
                    <li>
                        <span className="font-bold">Community:</span> Join our growing community of like-minded individuals who love to explore, learn, and share their perspectives.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Our Vision</h2>
                <p className="text-lg leading-relaxed mb-6">
                    We aim to create a hub where voices can be heard, ideas can flourish, and connections can be built. PodcastBlog is more than just a platform—it’s
                    a movement to inspire change, ignite passion, and empower individuals to think beyond boundaries.
                </p>

                <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Join Us on This Journey</h2>
                <p className="text-lg leading-relaxed mb-6">
                    Whether you’re here to listen, read, or share your story, we welcome you with open arms. Together, let’s build a platform that celebrates diversity,
                    fosters creativity, and encourages lifelong learning.
                </p>

                <p className="text-center font-medium text-gray-700">
                    Thank you for being a part of <span className="font-bold text-indigo-600">PodcastBlog</span>. Let’s embark on this journey of discovery and growth together.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
