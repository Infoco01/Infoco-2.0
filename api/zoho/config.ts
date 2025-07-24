// /api/zoho/config.ts

// É CRUCIAL que estas variáveis de ambiente estejam definidas nas configurações do seu projeto Vercel.
// ZOHO_CLIENT_ID: O Client ID do seu aplicativo OAuth no Zoho.
// ZOHO_CLIENT_SECRET: O Client Secret do seu aplicativo OAuth no Zoho.
// NEXT_PUBLIC_APP_URL: A URL base da sua aplicação (ex: https://seu-app.vercel.app), usada para construir a Redirect URI.

const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID;
const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5173';

// As contas do Zoho podem estar em diferentes data centers (.com, .eu, .in, etc.)
// Certifique-se de que este corresponde à sua conta.
const ZOHO_ACCOUNTS_URL = 'https://accounts.zoho.com';
const ZOHO_API_BASE_URL = 'https://mail.zoho.com/api';

const ZOHO_REDIRECT_URI = `${APP_URL}`; // O app irá lidar com o hash na URL base

const ZOHO_SCOPES = [
    'ZohoMail.accounts.READ',
    'ZohoMail.messages.ALL', // READ, CREATE, UPDATE, DELETE
].join(',');

export const zohoConfig = {
    clientId: ZOHO_CLIENT_ID,
    clientSecret: ZOHO_CLIENT_SECRET,
    redirectUri: ZOHO_REDIRECT_URI,
    scopes: ZOHO_SCOPES,
    accountsUrl: ZOHO_ACCOUNTS_URL,
    apiBaseUrl: ZOHO_API_BASE_URL,
};

export function checkZohoCredentials() {
    if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET) {
        console.error("ERRO CRÍTICO: As variáveis de ambiente ZOHO_CLIENT_ID e ZOHO_CLIENT_SECRET não estão definidas.");
        throw new Error("A integração com o Zoho Mail não está configurada corretamente no servidor.");
    }
}
