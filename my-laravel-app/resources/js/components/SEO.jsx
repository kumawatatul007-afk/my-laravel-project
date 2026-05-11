import React from 'react';
import { Helmet } from 'react-helmet-async';
import { usePage } from '@inertiajs/react';

/**
 * Professional SEO Component using react-helmet-async
 * This component provides full meta data in the head tag.
 * It also falls back to data provided by Inertia props if available.
 */
const SEO = ({
    title: propTitle,
    description: propDescription,
    keywords: propKeywords,
    author: propAuthor,
    canonical: propCanonical,
    ogType = 'website',
    ogImage: propOgImage,
    twitterHandle = '@nikhil_dev',
    robots: propRobots,
    structuredData: propStructuredData = [],
    locale = 'en_IN',
    noindex = false
}) => {
    const { props } = usePage();
    const seoData = props.seo || {};

    const siteName = 'Nikhil Sharma';
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://thenikhilsharma.in';
    const defaultAuthor = 'Developer Nikhil Sharma';
    
    // Dynamic Title Formatting
    const title = propTitle || seoData.title || siteName;
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
    
    const defaultDescription = 'Freelance Website Designer and developer. Offering high Quality Software, Mobile App development service at affordable prices.';
    const description = propDescription || seoData.description || defaultDescription;
    
    const keywords = propKeywords || seoData.keywords || 'Nikhil Sharma, Software Developer, PHP Developer, React Js Developer, Website Developer';
    
    const currentUrl = typeof window !== 'undefined' ? window.location.href : siteUrl;
    const canonical = propCanonical || seoData.canonical || currentUrl;
    
    const ogImage = propOgImage || seoData.og_image || `${siteUrl}/public/front/logo.png`;
    const author = propAuthor || seoData.author || defaultAuthor;
    const robots = noindex ? 'noindex, nofollow' : (propRobots || seoData.robots || 'index, follow');

    // Structured Data
    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": fullTitle,
        "description": description,
        "url": currentUrl,
        "author": {
            "@type": "Person",
            "name": author
        }
    };

    const allSchemas = [defaultSchema, ...(seoData.structured_data ? (Array.isArray(seoData.structured_data) ? seoData.structured_data : [seoData.structured_data]) : []), ...propStructuredData];

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content={robots} />
            <link rel="canonical" href={canonical} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            
            {/* Icons matching user image */}
            <link rel="shortcut icon" href={`${siteUrl}/public/front/logo.png`} type="image/x-icon" />
            <link rel="icon" href={`${siteUrl}/public/front/logo.png`} type="image/x-icon" />
            <meta name="publish_date" property="og:publish_date" content="2020-05-04" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content={locale} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={twitterHandle} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Structured Data */}
            {allSchemas.map((schema, index) => (
                <script key={index} type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            ))}
        </Helmet>
    );
};

export default SEO;
