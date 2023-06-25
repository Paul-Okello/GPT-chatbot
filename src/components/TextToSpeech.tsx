"use client"
import { useSpeechContext } from '@speechly/react-client';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { SegmentItem } from './SegmentItem';
import Image from 'next/image';
import { Text } from '@rewind-ui/core';

export default function TextToSpeech() {
    const { segment, listening, attachMicrophone, start, stop } = useSpeechContext();
    type SegmentProps = typeof segment
    const [transcripts, setTranscripts] = useState<SegmentProps[]>([])
    const [tentative, setTentative] = useState<string>('')

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
            <div className="text-center">
                <Text weight="light">Ensure you switch off the microphone once you are done to capture your speech</Text>
            </div>
        </div>
    )
}
