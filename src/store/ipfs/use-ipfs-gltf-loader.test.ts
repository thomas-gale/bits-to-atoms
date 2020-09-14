import { renderHook } from '@testing-library/react-hooks';
import { useIpfsGltfLoader } from './use-ipfs-gltf-loader';

describe('use-ipfs-gltf-loader hook', () => {
  it('should return basic result for FFFPrinter IFPS content ID', () => {
    const { result } = renderHook(() =>
      useIpfsGltfLoader('QmbdSeJfWsUm5ghb9pp98qwnbTbzKN8BvtarJhRTmTxhCw')
    );
    expect(result).toBeDefined();
  });
});
