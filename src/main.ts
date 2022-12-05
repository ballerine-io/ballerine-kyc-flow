// src/main.ts
import { flows } from '@ballerine/web-sdk';

flows
    .init({
        // Add translations.
        translations: {
            overrides: {
                // Can be any locale as long as it is matched in endUserInfo.language below.
                fr: {
                    // Translations for the welcome step.
                    welcome: {
                        title: 'Vérifiez Votre Identité',
                        button: 'Choisissez le type de document',
                        description:
                            'Nous avons besoin de certaines informations pour nous aider à confirmer votre identité.',
                        tip: 'La vérification prend généralement quelques secondes.',
                    },
                },
            },
        },
        endUserInfo: {
            id: 'test',
            // Specify the locale (should exist in the overrides).
            language: 'fr',
        },
        uiConfig: {
            // Change the color and font of the flow.
            general: {
                colors: {
                    primary: '#1F9F31',
                },
                fonts: {
                    name: 'Roboto',
                    link: 'https://fonts.googleapis.com/css2?family=Roboto:wght@500;700&display=swap',
                    weight: [500, 700],
                },
            },
            // Specify the steps you want to include in the flow.
            flows: {
                // Same name as the argument passed into mount.
                'my-kyc-flow': {
                    steps: [
                        {
                            name: 'welcome',
                            id: 'welcome',
                        },
                        // Let the user choose verification by passport, license, etc.
                        {
                            name: 'document-selection',
                            id: 'document-selection',
                            documentOptions: ['id_card'],
                        },
                        {
                            name: 'document-photo',
                            id: 'document-photo',
                        },
                        // Let the user confirm if the document photo is okay.
                        {
                            name: 'check-document',
                            id: 'check-document',
                        },
                        {
                            name: 'loading',
                            id: 'loading',
                        },
                        {
                            name: 'final',
                            id: 'final',
                        },
                    ],
                },
            },
        },
    })
    .then(() => {
        // mount(flowName: string, elementId: string);
        // flowName matches the flow name specified in uiConfig.
        // elementId is the id of the element to mount the flow into, the id of the div we've added in index.html.
        flows.mount('my-kyc-flow', 'kyc-container', {}).then();
    });