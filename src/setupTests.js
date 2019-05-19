import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

/**
 * Workaround if test throws error 
 */
if (global.document) {
    document.createRange = () => ({
        setStart: () => {},
        setEnd: () => {},
        commonAncestorContainer: {
            nodeName: 'BODY',
            ownerDocument: document,
        },
    });
}