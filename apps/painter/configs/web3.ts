import { Web3Storage } from 'web3.storage';

export const web3Client = new Web3Storage({
  token: process.env.NEXT_PUBLIC_WEB3_TOKEN,
});
