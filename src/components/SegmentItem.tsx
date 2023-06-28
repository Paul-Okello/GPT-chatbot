"use client"

import React, { useEffect, useState, useCallback } from 'react';
import { SpeechSegment } from '@speechly/react-client';
import formatDuration from 'format-duration';
import { Text } from '@rewind-ui/core';
import { useToast } from '@chakra-ui/react';
import getBasePath from '@/lib/getBasePath';
import { useAppDispatch } from '@/redux/hooks';
import { setContent, setError } from '@/redux/slices/content-slice';

interface Props {
    segment: SpeechSegment;
}

export interface GPTResponse {
    role?: string;
    content?: string;
}

export const SegmentItem: React.FC<Props> = ({ segment }) => {
    const text = segment.words.map((w) => w.value).join(' ');
    const timestamp = formatDuration(segment.words[segment.words.length - 1].endTimestamp);
    const chakraToast = useToast();
    const [gptData, setGptData] = useState<GPTResponse>({});
    const dispatch = useAppDispatch();

    const placeTextInObject = useCallback((text: string) => {
        const words = text.split(' ');

        if (segment.isFinal) {
            if (words.length >= 5) {
                chakraToast({
                    title: 'Vicky is Processing your request',
                    description: 'Please wait for a few seconds',
                    status: 'info',
                    duration: 5000,
                    isClosable: true,
                });
                return { text };
            } else {
                chakraToast({
                    title: 'Try Again',
                    description: 'Text must contain at least 5 words.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    }, [chakraToast, segment.isFinal]);

    useEffect(() => {
        const dataToSend = placeTextInObject(text);

        async function getGPTResponse() {
            if (dataToSend) {
                const res = await fetch(`${getBasePath()}/api/getTherapySummary`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: dataToSend,
                    }),
                });

                if (!res.ok) {
                    dispatch(setError('Failed to connect to the server. Please try again later.'));
                }

                const GPTdata = await res.json();
                const { content } = GPTdata;
                setGptData({ content });
                dispatch(setContent(GPTdata));
            }
        }

        getGPTResponse();
    }, [segment, text, dispatch, placeTextInObject]);

    return (
        <div className="segment border rounded-md p-3 flex justify-start items-center">
            <Text className="text-indigo-700/80 mx-2" size="base">
                {timestamp}
            </Text>
            <Text className="text-indigo-700/80" leading="relaxed" size="lg" tracking="tight" weight="semiBold">
                {text}
            </Text>
        </div>
    );
};
