// Derived from example: https://github.com/ipfs/js-ipfs/blob/master/examples/browser-create-react-app/src/hooks/use-ipfs.js
import { useState, useEffect } from 'react';
import dotProp from 'dot-prop';

/*
 * Pass the command you'd like to call on an ipfs instance.
 *
 * Uses setState to capture the response, so your component
 * will re-render when the result turns up.
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useIpfs(ipfs: any, cmd: any, opts: any) {
  const [res, setRes] = useState(null);
  useEffect(() => {
    callIpfs(ipfs, cmd, opts, setRes);
  }, [ipfs, cmd, opts]);
  return res;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function callIpfs(ipfs: any, cmd: any, opts: any, setRes: any) {
  if (!ipfs) return null;
  console.log(`Call ipfs.${cmd}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ipfsCmd: any = dotProp.get(ipfs, cmd);
  const res = await ipfsCmd(opts);
  console.log(`Result ipfs.${cmd}`, res);
  setRes(res);
}
