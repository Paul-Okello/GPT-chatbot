"use client"
import { useSpeechContext } from '@speechly/react-client';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { SegmentItem } from './SegmentItem';
import Image from 'next/image';
import { Text } from '@rewind-ui/core';
import Talkify from './Talkify';

export default function TextToSpeech() {
    const { segment, listening, attachMicrophone, start, stop } = useSpeechContext();
    type SegmentProps = typeof segment
    const [transcripts, setTranscripts] = useState<SegmentProps[]>([])
    const [tentative, setTentative] = useState<string>('')

    const instructions = [
        "To engage with Vicky AI, make sure your microphone is activated.",
        "Initiate the conversation by saying 'hi Vicky.'",
        "When you're finished, remember to close the microphone."
    ];


    const handleClick = async () => {
        if (listening) {
            await stop();
        } else {
            await attachMicrophone();
            await start();
        }
    };

    useEffect(() => {
        if (segment) {
            const transcript = segment.words.map((word) => word.value).join(' ');
            setTentative(transcript);
            if (segment.isFinal) {
                setTentative('');
                setTranscripts((current) => [...current, segment]);
            }
        }
    }, [segment])

    return (
        <div className="p-5 flex flex-col">
            <div>
                {segment && <SegmentItem segment={segment} />}
            </div>
            <div className="flex justify-center items-center my-4">
                <Button
                    px={4}
                    fontSize={'sm'}
                    size={"lg"}
                    rounded={'full'}
                    bg={'transparent'}
                    color={'black'}
                    boxShadow={
                        '0px 1px 25px -5px rgba(104, 65, 132, 0.48), 0 10px 10px -5px rgba(104, 65, 132, 0.73)'
                    }
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                    }}
                    onClick={handleClick}
                >
                    {listening ? (
                        <Image
                            src="/assets/icons8-off.svg" fill alt="start"
                        />
                    ) : (
                        <Image
                            src="/assets/icons8-on.svg" fill alt="start"
                        />)
                    }
                </Button>
            </div>
            <ol className="">
                <Text className='my-2'
                    color="black"
                    leading="loose"
                    size="lg"
                    tracking="tight"
                    weight="semiBold"
                >
                    Instructions
                </Text>
                {instructions.map((instruction, index) => (
                    <li className="" key={index}>
                        <Text weight="normal">{instruction}</Text>
                    </li>
                ))}
            </ol>
        </div>
    )
}
