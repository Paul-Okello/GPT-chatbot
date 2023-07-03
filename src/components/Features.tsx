"use client"

import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Stack,
    Text
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function Features() {
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


    return (
        <Container
            as={motion.div}
            ref={ref}
            initial={{ opacity: 0 }}
            animate={controls}
            transition="all 0.5s ease-out"
            maxW={'7xl'}
            py={12}
            className='h-full md:min-h-[60vh] lg:min-h-[70vh] mx-auto'
        >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Stack spacing={4}>
                    <Text
                        as={motion.p}
                        textTransform={'uppercase'}
                        color={'white'}
                        fontWeight={600}
                        fontSize={'sm'}
                        // bg={useColorModeValue('purple.700', 'purple.900')}
                        className='bg-[#684184] hover:bg-[#705b7e] cursor-pointer text-white'
                        p={2}
                        alignSelf={'flex-start'}
                        rounded={'md'}
                    >
                        Our Story
                    </Text>
                    <Heading
                        as={motion.h1}
                        lineHeight={1.1}
                        fontWeight={600}
                        mb={4}
                        fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
                        className="text-slate-800"
                    >
                        OUR COMPANY
                    </Heading>
                    <Text
                        as={motion.p}
                        className="text-slate-500 font-normal"
                        fontSize={'lg'}
                    >
                        IMAGINE A WORLD WHERE MENTAL HEALTH IS A PRIORITY AND
                        AVAILABLE TO EVERYONE.
                    </Text>
                    <Text
                        as={motion.p}
                        className="text-slate-500 font-normal"
                        fontSize={'md'}
                        fontWeight={500}
                    >
                        We want to transform lives and bring well-being
                        to <span className='underline decoration-wavy decoration-indigo-500 decoration-2'>all corners</span>  of South America.We are dedicated to building innovative systems that seek to
                        strengthen the mental, physical and spiritual
                        health of each individual.
                        We offer you a transforming experience, where personal and
                        professional growth merge into a path of self-discovery towards a full
                        and balanced life.
                    </Text>
                </Stack>
                <Flex>
                    <Image
                        rounded={'md'}
                        alt={'feature image'}
                        src={'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}
                        objectFit={'cover'}
                        border={'1px solid'}
                        className='rounded-3xl shadow-2xl'
                    />
                </Flex>
            </SimpleGrid>
        </Container>
    );
}
