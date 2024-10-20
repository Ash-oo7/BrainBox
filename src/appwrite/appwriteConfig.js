import { Client, Account } from 'appwrite';

const client = new Client();
client
    .setEndpoint(import.meta.env.VITE_ENDPOINT)
    .setProject(import.meta.env.VITE_PROJECT_ID)

export const account = new Account(client);

export default client