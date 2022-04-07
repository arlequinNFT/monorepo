import { NFTStorage } from 'nft.storage/dist/bundle.esm.min.js';

export const nftstorageClient = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
});
