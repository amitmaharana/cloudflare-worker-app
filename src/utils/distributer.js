// Set up an A/B test by controlling what URL will be fetched
export const distributeVariant = variants => {
    const randomChoice = Math.random() < 0.5 ? 0 : 1
    return variants[randomChoice]
}