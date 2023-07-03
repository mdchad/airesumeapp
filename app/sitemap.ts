import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://airesumeapp.com',
			lastModified: new Date(),
		},
		{
			url: 'https://airesumeapp.com/terms',
			lastModified: new Date(),
		},
		{
			url: 'https://airesumeapp.com/privacy',
			lastModified: new Date(),
		},
	];
}
