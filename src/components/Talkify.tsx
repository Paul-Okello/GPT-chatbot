"use client"

import getBasePath from '@/lib/getBasePath';
import { populateVoiceList } from '@/lib/voiceUtils';
import { useAppDispatch } from '@/redux/hooks';
import { setContent, setError } from '@/redux/slices/content-slice';
import { Box, FormControl, useToast } from '@chakra-ui/react';
import { Card, Text, Textarea, Button } from '@rewind-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { GPTResponse } from './SegmentItem';

const selectValues = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

interface voiceProps {
    voiceURI: string;
    name: string;
    lang: string;
    default: boolean;
}

export default function Talkify() {
    let [textInput, setTextInput] = useState('');
    const [voiceList, setVoiceList] = useState<any>([]);
    const [voiceOptions, setVoiceOptions] = useState([]);
    const [voice, setVoice] = useState('Alex');
    const [pitch, setPitch] = useState<number>(1);
    const [rate, setRate] = useState<number>(1);
    const chakraToast = useToast();
    const dispatch = useAppDispatch();
    const [gptData, setGptData] = useState<GPTResponse>({});

    useEffect(() => {
        const fetchVoices = () => {
            try {
                window.speechSynthesis.onvoiceschanged = () => {
                    const data = populateVoiceList();
                    setVoiceList(data);
                };
            } catch (err) {
                console.log(err);
            }
        };
        fetchVoices();
    }, []);


    useEffect(() => {
        setVoice((prevVoice: any) =>
            voiceList.length > 0
                ? voiceList?.filter((voice: any) => voice.default)[0].name
                : prevVoice
        );
    }, [voiceList]);

    const placeTextInObject = useCallback((text: string) => {
        if (text) {

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

    }, [chakraToast]);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const dataToSend = placeTextInObject(textInput);

        async function getGPTResponse() {
            if (dataToSend) {
                chakraToast({
                    title: 'Vicky is Processing your request',
                    description: 'Please wait for a few seconds',
                    status: 'info',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                });
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
                    chakraToast({
                        title: 'Try Again',
                        description: 'Failed to get the data.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                }

                const GPTdata = await res.json();
                const { content } = GPTdata;
                setGptData({ content });
                dispatch(setContent(GPTdata));
            }
        }

        getGPTResponse();
    };

    return (
        <Card bordered={false}>
            <Card.Body>
                <Text variant="h5" className='my-4'>Write your request to Vicky</Text>
                <form onSubmit={handleSubmit} className="">
                    <FormControl isRequired >
                        <Textarea
                            tone="light"
                            value={textInput}
                            onChange={(event) => setTextInput(event.target.value)}
                            rows={4}
                            color="purple"
                            size="md"
                            radius="xl"
                            shadow="sm"
                            withRing={false}
                            placeholder='Type your request here and Vicky will help..' />
                    </FormControl>
                    <Box my={3} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Button
                            color="purple"
                            tone="outline"
                            shadow="base"
                            shadowColor="purple"
                            radius="base"
                            withRing={false}
                            type='submit'
                        >Submit your Request</Button>
                    </Box>
                </form>
            </Card.Body>
        </Card>
    )
}
