import { config } from '@onflow/fcl';

config({
  'accessNode.api': process.env.NEXT_PUBLIC_ACCESS_NODE_API,
  'discovery.wallet': process.env.NEXT_PUBLIC_DISCOVERY_WALLET,
  '0xArlequin': process.env.NEXT_PUBLIC_ARLEQUIN_ADMIN_ACCOUNT,
  '0xFlowToken': process.env.NEXT_PUBLIC_FLOW_TOKEN_ADDRESS,
  '0xNonFungibleToken': process.env.NEXT_PUBLIC_NON_FUNGIBLE_TOKEN_ADDRESS,
  '0xFungibleToken': process.env.NEXT_PUBLIC_FUNGIBLE_TOKEN_ADDRESS,
  '0xMetadataViews': process.env.NEXT_PUBLIC_METADATA_VIEWS,
});
