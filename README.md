
# GPT Personal Assistant

VICKY is an Artificial Intelligence personal assistant aimed at improving mental health and professional development. This project is built using Next.js 13, Redux for state management, Chakra UI for React components, and Tailwind CSS for utility CSS classes. It also utilizes the OpenAI Chat Completion API for generating prompts.

## Features

- AI-powered personal assistant for mental health and professional development
- Chat interface for interacting with VICKY
- State management with Redux
- Responsive UI design with Chakra UI and Tailwind CSS

## Prerequisites

Before running the project, make sure you have the following environment variables set:

- `OPEN_AI_API_KEY`: Your OpenAI API key for accessing the Chat Completion API.
- `NEXTAUTH_SECRET`: Secret key for NextAuth authentication.
- `NEXT_PUBLIC_SPEECHLY_APP_ID`: Speechly app ID for voice input .
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Google OAuth client ID and secret for authentication .

## Getting Started

To run the VICKY project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Paul-Okello/GPT-chatbot.git
   ```

2. Navigate to the project directory:

   ```bash
   cd vicky-project
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the required environment variables by creating a `.env` file in the root directory of the project and adding the necessary values:

   ```plaintext
   OPEN_AI_API_KEY=<your-openai-api-key>
   NEXTAUTH_SECRET=<your-nextauth-secret>
   NEXT_PUBLIC_SPEECHLY_APP_ID=<your-speechly-app-id>
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your web browser and access the project at `http://localhost:3000`.

## Usage

Once the project is running, you can interact with VICKY through the chat interface. You can ask questions, seek advice, or have general conversations to improve your mental health and professional development.

VICKY will provide responses based on the AI models and prompts used in the project. Feel free to experiment and explore different topics and prompts to get personalized assistance.

## Feedback and Contributions

We welcome any feedback or contributions to enhance the VICKY project. If you encounter any issues or have suggestions for improvement, please open an issue on the GitHub repository.

We hope that VICKY will be a helpful companion on your journey towards improved mental health and professional growth.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).