export const getNumberOfColumns = (width) => {
    switch (width) {
        case 'xs':
            return 3
        case 'sm':
            return 4
        case 'md':
            return 7
        default:
            return 10
    }
}