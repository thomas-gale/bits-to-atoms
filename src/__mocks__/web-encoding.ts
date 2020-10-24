import { TextEncoder, TextDecoder } from 'util';

// https://jestjs.io/docs/en/manual-mocks#mocking-node-modules
// Mock TextEncoding/Decoder in web-encoding module.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const webenc: any = jest.createMockFromModule('web-encoding');
webenc.TextEncoder = TextEncoder;
webenc.TextDecoder = TextDecoder;
module.exports = webenc;
