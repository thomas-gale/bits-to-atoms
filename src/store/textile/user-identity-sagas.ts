import { PrivateKey } from '@textile/hub';

const generateIdentity = async (): Promise<void> => {
  /** Random new identity */
  const identity = await PrivateKey.fromRandom();

  /** Convert to string. */
  const identityString = identity.toString();

  /** Restore an identity object from a string */
  const restored = PrivateKey.fromString(identityString);

  console.log(restored);
};

export { generateIdentity };
