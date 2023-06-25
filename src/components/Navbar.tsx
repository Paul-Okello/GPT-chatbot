"use client"

import {
    Box,
    Flex,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Text,
    Link, useColorModeValue, useDisclosure, Avatar, useToast
} from '@chakra-ui/react';
import {
    Bars3Icon as HamburgerIcon, XCircleIcon as CloseIcon, ChevronRightIcon
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
    const { isOpen, onToggle } = useDisclosure();
    const { data: session, status } = useSession()
    const chakraToast = useToast()
    const router = useRouter();
    const pathname = usePathname()

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

    async function handleLogout() {
        await signOut();
        chakraToast({
            title: "Sign Out",
            description: "You are now signing out",
            status: "info",
            duration: 6000,
            isClosable: true,
            position: "top-right"
        });
    }
    return (
        <motion.nav className='bg-purple-primary' initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}>
            <Flex
                // bg={useColorModeValue('white', 'gray.800')}
                // color={useColorModeValue('gray.600', 'white')}
                minH={'20px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                // borderBottom={1}
                // borderStyle={'solid'}
                // borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
                maxW={"7xl"}
                mx={"auto"}
            >
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon className='w-5 h-8 text-white' /> : <HamburgerIcon className='w-5 h-8 text-white' />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Text>Vicky AI</Text>
                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>
                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={3}>
                    {status === "authenticated" ? (
                        <div
                            className='cursor-pointer flex justify-center items-center'
                        >
                            <Avatar src={session.user?.image as string} size={"sm"} />
                            <Text className='text-base'>{session.user?.name as string}</Text>
                            <Button
                                variant={"solid"}
                                onClick={() => {
                                    handleLogout()
                                    if (pathname === "/vicky") {
                                        router.push("/");
                                    }
                                }}
                                colorScheme='gray'
                            >
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <Button
                            as={'a'}
                            fontSize={'sm'}
                            colorScheme='gray'
                            className='text-white hover:text-zinc-200 flex justify-between items-center'
                            fontWeight={400}
                            variant={'outline'}
                            onClick={() => {
                                handleLogin()
                                router.push("/vicky")
                            }}
                        >
                            Sign In
                        </Button>
                    )}
                </Stack>
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </motion.nav>
    );


}

const DesktopNav = () => {
    const linkColor = useColorModeValue('white', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.300', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Link
                        p={2}
                        href={navItem.href ?? '#'}
                        fontSize={'sm'}
                        fontWeight={500}
                        color={linkColor}
                        _hover={{
                            textDecoration: 'none',
                            color: linkHoverColor,
                        }}>
                        {navItem.label}
                    </Link>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href }: NavItem) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, href }: NavItem) => {

    return (
        <Stack spacing={4}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
            </Flex>
        </Stack>
    );
};

interface NavItem {
    label: string;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Home',
        href: '/',
    }
];