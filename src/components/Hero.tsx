"use client"

import { Button, Heading, Text, useToast } from "@chakra-ui/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

function Hero() {
    const sections = [
        {
            headline: "Manage Stress and Anxiety",
            copy: "For an executive facing intense work pressures, Vicky can be a valuable tool in managing stress and anxiety. She provides meditation techniques, productivity tips, and, if necessary, facilitates a referral to a human specialist.",
        },
        {
            headline: "Balance Responsibilities and Reduce Stress",
            copy: "Consider a single mother who feels overburdened with parenting, work, and household chores. Vicky can provide a safe space to express emotions, offering advice on how to balance responsibilities, reduce stress, and, if necessary, connect with support groups and local resources.",
        },
        {
            headline: "Manage Exam Stress and Improve Concentration",
            copy: "Imagine a teenager struggling with the stress of exams. You can open the app and talk to Vicky, who will not only detect stress in your voice and face but also offer personalized stress management techniques, recommendations for better sleep, and strategies to improve concentration and study performance.",
        },
    ];
    const [randomHeadline, setRandomHeadline] = useState("");
    const [randomCopy, setRandomCopy] = useState("");
    const chakraToast = useToast()
    const router = useRouter();
    const { status } = useSession()


    async function handleLogin() {
        await signIn()
        chakraToast({
            title: "Sign In",
            description: "You are being signed in",
            status: "success",
            duration: 6000,
            isClosable: true,
            position: "top-right"
        })
    }

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * sections.length);
        setRandomHeadline(sections[randomIndex].headline);
        setRandomCopy(sections[randomIndex].copy);
    });

    return (
        <motion.main
            className='bg-gray-50 min-h-screen flex justify-center items-center mb-3 md:mb-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
            <div className='max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-4 place-content-center mx-auto p-5 h-full'>
                {/* Left */}
                <div className='flex flex-col w-full justify-start items-center mx-4 h-full order-2 md:order-1'>
                    <div className='mb-4'>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            mb={4}
                            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
                            className='text-slate-800'>
                            {randomHeadline}
                        </Heading>
                    </div>
                    <div className=''>
                        <Text fontSize='lg' className='text-slate-500 font-normal '>
                            {randomCopy}
                        </Text>
                    </div>
                    <div className='flex justify-start items-center rounded-full w-full mt-5'>
                        {status === "authenticated" ? (
                            <Link href='/vicky'>
                                <Button
                                    onClick={() => {
                                        handleLogin()
                                        router.push("/vicky")
                                    }}
                                    variant='solid'
                                    size='lg'
                                    className='bg-[#684184] hover:bg-[#705b7e] text-white'>
                                    Start now
                                </Button>
                            </Link>
                        ) : (<Button
                            onClick={() => {
                                handleLogin()
                                router.push("/vicky")
                            }}
                            variant='solid'
                            size='lg'
                            className='bg-[#684184] hover:bg-[#705b7e] text-white'>
                            Sign in to start now
                        </Button>)}

                    </div>
                </div>
                {/* Right */}
                <div className='relative w-full flex items-center justify-center px-16 order-1 md:order-2'>
                    <div className='absolute top-0 -left-4 w-48 h-48 bg-[#684184] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob' />
                    <div className='absolute top-0 -right-4 w-48 h-48 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000' />
                    <div className='absolute -bottom-8 left-20 w-48 h-48 bg-rose-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000' />

                    <Image
                        src='/assets/client-hero.jpeg'
                        width={700}
                        height={500}
                        alt='hero image'
                        className='rounded-3xl shadow-2xl hover:grayscale transition-all ease-in-out duration-500 hover:scale-105 cursor-pointer'
                    />
                </div>
            </div>
        </motion.main>
    );
}

export default Hero;
