import urlRegex from 'url-regex';


export const validateUrl = (url: any): string[] => {
    const errors: string[] = []

    if (!url) {
        errors.push('URL is required')
        return errors
    }

    if (typeof url !== 'string') {
        errors.push('URL shortening must be of text type')
        return errors
    }

    if (!urlRegex({ exact: true }).test(url)) {
        errors.push('Invalid URL')
        return errors
    }

    if (!urlRegex({ exact: true }).test(url)) {
        errors.push(
            urlRegex({ exact: true, strict: false }).test(url)
                ? 'Protocol is missing or TLD is unknown'
                : 'Invalid URL'
        )
        return errors
    }

    return errors
}


export const validateShortUrl = (url: any): string[] => {
    const errors: string[] = []

    if (!url) {
        errors.push('URL shortening is required')
        return errors
    }

    if (typeof url !== 'string') {
        errors.push('URL shortening must be of text type')
        return errors
    }

    if (!/^[a-zA-Z0-9-_]+$/.test(url)) {
        errors.push('Only alphanumeric symbols, dash and underscore are permitted')
        return errors
    }

    return errors
}
