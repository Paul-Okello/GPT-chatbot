"use client"

import { Card } from '@rewind-ui/core';
import { TextToSpeech } from "@/components";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Text, Ribbon } from '@rewind-ui/core';
import { useSpeechContext } from '@speechly/react-client';
import { useAppSelector } from '@/redux/hooks';
import { RotateLoader } from 'react-spinners';

export default function Vicky() {
    const { data: session, status } = useSession()
    const { listening } = useSpeechContext();
    const contentData = useAppSelector((state) => state.content);
    return (
        <div className="bg-slate-100 min-h-screen">
            <main className="max-w-7xl mx-auto py-6">
                <div className="mx-auto p-3">
                    <Card className="relative p-5  gap-2">
                        <div className="w-4/5">
                            {status === "authenticated" && (
                                <Text variant="h2" className="text-2xl md:text-5xl text-slate-900/80 font-medium mb-4">
                                    Welcome, {session?.user?.name}
                                </Text>)}
                            <Text
                                leading="relaxed"
                                variant='p'
                                className="text-base text-slate-700/75 space-y-2">
                                Welcome to the Future of Mental Health Care with Vicky AI! Vicky is a unique blend of artificial intelligence and empathy, providing 24/7 emotional and mental support. We are revolutionizing mental health care by making personalized therapy accessible to all, regardless of financial constraints. Vicky is an adaptable AI, constantly learning and growing to offer unique and effective support. She is the compassionate companion and accessible resource that contributes to a healthier and more balanced world. Join us on this transformative journey towards a brighter future with Vicky AI. Your well-being is our priority.
                            </Text>
                        </div>
                        <div className="absolute bottom-4 right-3 hover:rotate-1 duration-500 cursor-pointer transition-all ease-in-out w-1/5">
                            <Image
                                src="/assets/pale-mental-health.svg"
                                width={200}
                                className="hidden lg:block"
                                height={350}
                                alt="Vicky"
                            />
                        </div>
                    </Card>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-3 p-3 auto-cols-max">
                    <Card className='w-full'>
                        <Card.Header className='relative'>
                            <Ribbon color={`${listening ? "purple" : "gray"}`} radius="md" shadow="none">
                                {listening ? "Listening" : "Not Listening"}
                            </Ribbon>
                            <Text variant="h3">Try out Vicky</Text>
                        </Card.Header>
                        <Card.Body>
                            <TextToSpeech />
                        </Card.Body>
                    </Card>
                    <Card className='col-span-2'>
                        <Card.Header className='relative'>
                            <Ribbon color={`${contentData.loading ? "gray" : "purple"}`} radius="md" shadow="none">
                                {contentData.loading ? "AWAITING THE DATA" : "PROFESSIONAL THERAPY CENTER"}
                            </Ribbon>
                            <Text variant="h3">Therapy center</Text>
                        </Card.Header>
                        <Card.Body>
                            {contentData.loading ? (
                                <div className="flex justify-center items-center flex-col">
                                    <RotateLoader color="#684184" />
                                    <Text
                                        weight="semiBold"
                                        size="3xl"
                                        color="purple"
                                        className='animate-pulse mt-8'
                                    >Awaiting data...
                                    </Text>
                                </div>
                            ) : (
                                <Card bordered={false} radius="none" shadow="none" withDivider={false} size="sm">
                                    <Card.Body>
                                        <Text variant="p" weight="medium" className="text-slate-900/80" leading="relaxed">
                                            {contentData.content}
                                        </Text>
                                    </Card.Body>
                                </Card>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            </main>
        </div>
    )
}

