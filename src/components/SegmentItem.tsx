"use client"

import React, { useEffect, useState, useCallback } from 'react';
import { Spinner, useToast } from '@chakra-ui/react';
import getBasePath from '@/lib/getBasePath';
import { useAppDispatch } from '@/redux/hooks';
import { setContent, setError } from '@/redux/slices/content-slice';
import { useSpeechCapture } from '@/hooks/useSpeechCapture';
import { Text } from '@rewind-ui/core';

interface Props {
    segment: string;
}

export interface GPTResponse {
    role?: string;
    content?: string;
}

export const SegmentItem: React.FC<Props> = ({ segment }) => {
    const text = segment;
    const [gptData, setGptData] = useState<GPTResponse>({});
    const dispatch = useAppDispatch();
    const { capturedSpeech, isListening } = useSpeechCapture();
    const [isProcessing, setIsProcessing] = useState(false);
    const toast = useToast();

    const placeTextInObject = useCallback(
        (text: string) => {
            const words = text.split(' ');

            if (!isListening) {
                if (words.length >= 5) {
                    setIsProcessing(true);
                    return { text };
                }
            }
        },
        [isListening]
    );

    useEffect(() => {
        const dataToSend = placeTextInObject(text);

        async function getGPTResponse() {
            if (dataToSend) {
                toast({
                    title: 'Sending...',
                    status: 'info',
                    duration: 6000,
                    isClosable: true,
                    position: 'top-right',
                    description: 'Vicky is working on your request.',
                });

                const res = await fetch(`${getBasePath()}/api/getTherapySummary`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: dataToSend.text,
                    }),
                });

                if (!res.ok) {
                    dispatch(setError('Failed to connect to the server. Please try again later.'));
                }

                const GPTdata = await res.json();
                const { content } = GPTdata;
                setGptData({ content });
                dispatch(setContent(GPTdata));
                setIsProcessing(false);

                toast({
                    title: 'Response sent!',
                    description: 'Your request has been worked on.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                });
            }
        }

        getGPTResponse();
    }, [text, dispatch, placeTextInObject, toast]);

    return (
        <div className="segment border rounded-md p-3 flex justify-start items-center">
            <Text className="text-indigo-700/80" leading="relaxed" size="lg" tracking="tight" weight="semiBold">
                {text}
            </Text>
            {isListening && <Spinner size="sm" ml={2} />}
            {!isListening && capturedSpeech && !isProcessing && (
                <Text className="text-indigo-700/80" leading="relaxed" size="lg" tracking="tight" weight="semiBold">
                    {capturedSpeech}
                </Text>
            )}
        </div>
    );
};
