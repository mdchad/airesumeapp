import { Metadata } from 'next';

type SiteConfig = {
	name: string;
	description: string;
	url: string;
};

export const siteConfig: SiteConfig = {
	name: 'AI Resume APP',
	description:
		'An AI service for all your resume needs',
	url: process.env.NEXT_PUBLIC_URL as string,
};

export const metaConfig: Metadata = {
	metadataBase: new URL(`${siteConfig.url}`),
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: [
		'Resume',
		'Cover letter',
		'Job link',
		'Job description',
	],
	creator: 'AI Resume App',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: `${siteConfig.url}/og.png`,
				width: 1200,
				height: 630,
				alt: siteConfig.name,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.name,
		description: siteConfig.description,
		images: [`${siteConfig.url}/og.png`],
		creator: '@airesumeapp',
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
	manifest: `${siteConfig.url}/manifest.json`,
};
