export const getYouTubeVideoId = (url) => {
    if (!url || typeof url !== 'string') return null;

    const cleanUrl = url.trim();

    if (cleanUrl.includes('youtu.be/')) {
        return cleanUrl.split('youtu.be/')[1]?.split(/[?&]/)[0];
    }

    if (cleanUrl.includes('/shorts/')) {
        return cleanUrl.split('/shorts/')[1]?.split(/[?&]/)[0];
    }

    if (cleanUrl.includes('/embed/')) {
        return cleanUrl.split('/embed/')[1]?.split(/[?&]/)[0];
    }

    if (cleanUrl.includes('watch?v=')) {
        return cleanUrl.split('watch?v=')[1]?.split('&')[0];
    }

    return null;
};
