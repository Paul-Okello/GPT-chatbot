"use client"

import { Card } from '@chakra-ui/react';
import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

const FAQSection = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '-100px 0px', // Adjust the root margin as needed
    });

    useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1 });
        }
    }, [controls, inView]);

    const advantages = [
        "An accessible and personalized reality for everyone",
        "Always available, learning, and adapting to individual needs",
        "Provides tailored emotional and mental support",
        "A constant companion on your wellness journey",
        "Interprets emotions through micro-signals in the face, voice, and text",
        "Provides answers and advice adapted to your emotional state",
        "Equipped to help you navigate through any challenge",
        "Guides you to a human specialist if deeper support is needed",
        "A trusted counselor and therapist all rolled into one",
        "Helps achieve a better emotional balance",
        "Reduces anxiety and depression",
        "Improves resilience in the face of life's adversities",
        "Integrates into society at all levels, from schools to businesses and healthcare organizations",
        "Accessible, easy to use, and adaptable",
        "Provides real-time support when needed, for teens and adults alike"
    ];

    return (
        <motion.div
            ref={ref}
            className="max-w-7xl lg:mx-auto mx-4 my-5 lg:min-h-[60vh]"
            initial={{ opacity: 0 }}
            animate={controls}
            transition={{
                duration: 0.5,
                ease: "easeIn"
            }}
        >
            <div className="text-center">
                <h1
                    className='text-slate-950 font-semibold text-3xl  sm:text-4xl   lg:text-6xl' >
                    Advantages
                </h1>
            </div>
            <Card bg={"white"} className='p-4 grid grid-cols-1 lg:grid-cols-2 my-4'>
                {advantages.map((advantage, index) => (
                    <div className="flex justify-start items-center" key={index}>
                        <CheckBadgeIcon className='text-[#684184] h-7 w-7' />
                        <p key={index} className="text-slate-800 text-lg">
                            {advantage}
                        </p>
                    </div>

                ))}
            </Card>
        </motion.div >
    );
};

export default FAQSection;
