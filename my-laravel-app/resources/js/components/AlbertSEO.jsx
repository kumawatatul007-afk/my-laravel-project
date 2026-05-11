import React from 'react';
import { Head, usePage } from '@inertiajs/react';

/**
 * AlbertSEO Component
 * A comprehensive SEO optimization component for React/Inertia.js
 */
const AlbertSEO = ({ 
    title, 
    description, 
    keywords, 
    canonical, 
    ogImage, 
    ogTitle, 
    ogDescription,
    twitterTitle,
    twitterDescription,
    twitterImage,
    schemaMarkup,
    type = 'website'
}) => {
    const { url, props } = usePage();
    const siteName = "MORA"; // Can be dynamic from settings
    const currentUrl = window.location.origin + url;

    // Use passed props or fall back to page props if available
    const seo = props.seo || {};
    
    const finalTitle = title || seo.meta_title || siteName;
    const finalDescription = description || seo.meta_description;
    const finalKeywords = keywords || seo.meta_keyword;
    const finalCanonical = canonical || seo.canonical_url || currentUrl;
    
    const finalOgTitle = ogTitle || seo.og_title || finalTitle;
    const finalOgDescription = ogDescription || seo.og_description || finalDescription;
    const finalOgImage = ogImage || seo.og_image || (window.location.origin + '/default-og-image.jpg');
    
    const finalTwitterTitle = twitterTitle || seo.twitter_title || finalOgTitle;
    const finalTwitterDescription = twitterDescription || seo.twitter_description || finalOgDescription;
    const finalTwitterImage = twitterImage || seo.twitter_image || finalOgImage;

    const finalSchema = schemaMarkup || seo.schema_markup;

    return (
        <Head>
            {/* Standard Meta Tags */}
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={finalKeywords} />
            <link rel="canonical" href={finalCanonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={finalCanonical} />
            <meta property="og:title" content={finalOgTitle} />
            <meta property="og:description" content={finalOgDescription} />
            <meta property="og:image" content={finalOgImage} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={finalCanonical} />
            <meta name="twitter:title" content={finalTwitterTitle} />
            <meta name="twitter:description" content={finalTwitterDescription} />
            <meta name="twitter:image" content={finalTwitterImage} />

            {/* Schema Markup */}
            {finalSchema && (
                <script type="application/ld+json">
                    {typeof finalSchema === 'string' ? finalSchema : JSON.stringify(finalSchema)}
                </script>
            )}
        </Head>
    );
};

export default AlbertSEO;
