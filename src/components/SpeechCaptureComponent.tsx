import { useSpeechCapture } from "@/hooks/useSpeechCapture";
import { Button, Box, Heading, Text } from "@chakra-ui/react";

const SpeechCaptureComponent = () => {
    const { capturedSpeech, startSpeechCapture, stopSpeechCapture } = useSpeechCapture();

    return (
        <Box p={4} maxW="md" mx="auto">
            <Heading as="h1" mb={4}>
                Speech Capture
            </Heading>
            <Box display="flex" justifyContent="space-between" mb={4}>
                <Button colorScheme="teal" onClick={startSpeechCapture}>
                    Start Capture
                </Button>
                <Button colorScheme="teal" onClick={stopSpeechCapture}>
                    Stop Capture
                </Button>
            </Box>
            <Text color="gray.800">Captured Speech: {capturedSpeech}</Text>
        </Box>
    );
};

export default SpeechCaptureComponent;
