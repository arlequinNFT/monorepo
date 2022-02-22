#!/bin/sh

# create accounts
echo "Creating Admin account: 0x01cf0e2f2f715450"
flow accounts create --key="2921bbc5acf75417b09ef1cc7981f2a57cc7ee00df71afaddde94991b6f26fb4da66a4b9bea1ee8a555dbba62626ba7c0437e4c6800d25203c915161bed6e4f2"

echo "Creating User1 account 0x179b6b1cb6755e31"
flow accounts create --key="e5b78d3e1d28ecccaa62bbf869df5b6b06a3f0330a46651b2e29c5a0e53b4cd9659f2a0a0555c6de55caedc08475a81e6670ec62c93acbcfe62a45a20226a323"

echo "Creating User2 account 0xf3fcd2c1a78f5eee"
flow accounts create --key="62410c9c523d7a04f8b5c1b478cbada16d70125be9c8e137baa843a16a430da70d215fb6d6fc9ca68d4b7b3f2e7624db8785006b3fe977e25ca459612178723a"


# Flow tokens required for admin-account to be able to deploy contracts
flow transactions send "./transactions/demo/mintFlowTokens.cdc"

# Deploy Project
echo "Deploy project to emulator (as per flow.json config)"
#read -p "Press key to continue ..."
flow project deploy --network=emulator


# Test Purchase Animo Transaction

flow transactions send "./transactions/FUSD/setup.cdc" --signer "user-account1"
flow transactions send "./transactions/FUSD/setup.cdc" --signer "user-account2"

# Mint FUSD for testing
flow transactions send "./transactions/demo/mintFUSD.cdc"


# Arlee Items
flow transactions send "./transactions/ArleeItems/setup_account.cdc" 0x01cf0e2f2f715450
flow transactions send "./transactions/ArleeItems/setup_account.cdc" 0x179b6b1cb6755e31
flow transactions send "./transactions/ArleeItems/setup_account.cdc" 0xf3fcd2c1a78f5eee



# Open Sale
flow transactions send ./transactions/ArleePresale/sale_open.cdc --signer admin-account

flow scripts execute ./scripts/ArleePresale/get_packs.cdc

# purchase with account1
flow transactions send "./transactions/ArleePresale/purchase.cdc" --signer "user-account1" "Diamond"

flow scripts execute ./scripts/ArleePresale/get_packs.cdc

echo "purchase with account1 (SHOULD FAIL)"
flow transactions send "./transactions/ArleePresale/purchase.cdc" --signer "user-account1" "Diamond"

flow scripts execute ./scripts/ArleePresale/get_packs.cdc

echo "purchase with account1 (SHOULD WORK!)"
flow transactions send "./transactions/ArleePresale/purchase.cdc" --signer "user-account1" "Diamond"

# purchase with 
flow transactions send "./transactions/ArleePresale/purchase.cdc" --signer "user-account2" "Diamond"

flow transactions send "./transactions/ArleeNFT/update_name.cdc" --signer "user-account2" 19 "Diggwedy"

flow transactions send "./transactions/ArleeNFT/add_to_wardrobe.cdc" --signer "user-account2" 19 ipfs://23d23d "Mr Ah Lee" "Ah Lee from Malaysia"
flow transactions send "./transactions/ArleeNFT/add_to_wardrobe.cdc" --signer "user-account2" 19 ipfs://23dhi2u3hd "~j00lz~" "j00lz-art!"
flow transactions send "./transactions/ArleeNFT/set_current_skin.cdc" --signer "user-account2" 19 0
flow transactions send "./transactions/ArleeNFT/add_to_wardrobe.cdc" --signer "user-account2" 19 ipfs://23d23d "Mr Ah Lee" "Ah Lee from Malaysia"

flow transactions send "./transactions/ArleeNFT/update_wardrobe.cdc" --signer "user-account2" 19 0 ipfs://jfoi3412d "Mr Ah Lee" "Ah Lee from Malaysia"
flow transactions send "./transactions/ArleeNFT/update_wardrobe.cdc" --signer "user-account2" 19 0 ipfs://jfoi3412d "Mr Ah Lee" "Ah Lee from Kuala Lumpur"

flow transactions send "./transactions/ArleeNFT/remove_from_wardrobe.cdc" --signer "user-account2" 19 0

flow scripts execute ./scripts/ArleePresale/get_packs.cdc

flow scripts execute ./scripts/ArleeNFT/read_collection_ids.cdc 0x01cf0e2f2f715450 
flow scripts execute ./scripts/ArleeNFT/read_collection_ids.cdc 0x179b6b1cb6755e31
flow scripts execute ./scripts/ArleeNFT/read_collection_ids.cdc 0xf3fcd2c1a78f5eee

flow scripts execute ./scripts/ArleeNFT/get_metadata.cdc 0xf3fcd2c1a78f5eee 0
flow scripts execute ./scripts/ArleeNFT/get_metadata.cdc 0x179b6b1cb6755e31 17 
flow scripts execute ./scripts/ArleeNFT/get_metadata.cdc 0xf3fcd2c1a78f5eee 19

flow scripts execute ./scripts/ArleeNFT/get_collection_metadata.cdc 0x01cf0e2f2f715450 
flow scripts execute ./scripts/ArleeNFT/get_collection_metadata.cdc 0x179b6b1cb6755e31
flow scripts execute ./scripts/ArleeNFT/get_collection_metadata.cdc 0xf3fcd2c1a78f5eee

flow scripts execute ./scripts/ArleePresale/get_vault_balance.cdc 0x01cf0e2f2f715450

# Arlee Items
flow transactions send "./transactions/ArleeItems/setup_account.cdc" --signer "admin-account"
flow transactions send "./transactions/ArleeItems/setup_account.cdc" --signer "user-account1"
flow transactions send "./transactions/ArleeItems/setup_account.cdc" --signer "user-account2"

# mint an item to each account
flow transactions send "./transactions/ArleeItems/mint_nft.cdc" 0x01cf0e2f2f715450 ItemName1 itemDescription1 0x1234 --signer "admin-account"
flow transactions send "./transactions/ArleeItems/mint_nft.cdc" 0x179b6b1cb6755e31 ItemName2 itemDescription2 0x2345 --signer "admin-account"
flow transactions send "./transactions/ArleeItems/mint_nft.cdc" 0xf3fcd2c1a78f5eee ItemName3 itemDescription3 0x4567 --signer "admin-account"

flow scripts execute ./scripts/ArleeItems/read_collection_ids.cdc 0x01cf0e2f2f715450 
flow scripts execute ./scripts/ArleeItems/read_collection_ids.cdc 0x179b6b1cb6755e31
flow scripts execute ./scripts/ArleeItems/read_collection_ids.cdc 0xf3fcd2c1a78f5eee

flow scripts execute ./scripts/ArleeItems/get_collection_metadata.cdc 0x01cf0e2f2f715450 
flow scripts execute ./scripts/ArleeItems/get_collection_metadata.cdc 0x179b6b1cb6755e31
flow scripts execute ./scripts/ArleeItems/get_collection_metadata.cdc 0xf3fcd2c1a78f5eee

flow transactions send "./transactions/ArleeNFT/equip.cdc" 17 1 --signer "user-account1"
flow transactions send "./transactions/ArleeNFT/equip.cdc" 19 2 --signer "user-account2"

flow scripts execute ./scripts/ArleeNFT/get_metadata.cdc 0x179b6b1cb6755e31 17 
flow scripts execute ./scripts/ArleeNFT/get_metadata.cdc 0xf3fcd2c1a78f5eee 19