import { useEffect, useState } from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import Image from 'next/image';
import { Text } from '@rewind-ui/core';
import { useSpeechCapture } from '@/hooks/useSpeechCapture';
import { SegmentItem } from './SegmentItem';

export default function TextToSpeech() {
    const { capturedSpeech, isListening, startSpeechCapture, stopSpeechCapture } = useSpeechCapture();
    const [transcript, setTranscript] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const instructions = [
        "To engage with Vicky AI, make sure your microphone is activated.",
        "Initiate the conversation by saying 'hi Vicky.'",
        "When you're finished, remember to close the microphone."
    ];

    const handleClick = () => {
        if (isListening) {
            stopSpeechCapture();
        } else {
            startSpeechCapture();
        }
    };

    useEffect(() => {
        if (capturedSpeech) {
            setTranscript(capturedSpeech);
            setIsProcessing(!isListening);
        }
    }, [capturedSpeech, isListening]);

    return (
        <div className="p-5 flex flex-col">
            <div>
                {isProcessing ? (
                    <div className="flex justify-center items-center my-4">
                        <Spinner size="lg" color="gray.500" />
                    </div>
                ) : (
                    <SegmentItem segment={transcript} />
                )}
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
                    {isListening ? (
                        <Image src="/assets/icons8-off.svg" fill alt="start" />
                    ) : (
                        <Image src="/assets/icons8-on.svg" fill alt="start" />
                    )}
                </Button>
            </div>
            <ol className="">
                <Text
                    className="my-2"
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
    );
}
