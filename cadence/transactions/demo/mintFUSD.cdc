// Demo transaction to setup demo accounts 

// 1. Creates a Flow minter and saves in emulator account storage
// 2. Mints 2x1000 tokens
// 3. Transfers to (hardcoded) demo user address 

import FungibleToken from "../../contracts/FungibleToken.cdc" 
import FUSD from "../../contracts/FUSD.cdc"

transaction() {
  prepare(signer: AuthAccount) {

    let fusdTokenAdmin = signer.borrow<&FUSD.Administrator>(from: FUSD.AdminStoragePath) ?? panic("no flow token administrator found in storage")

    let minter <- fusdTokenAdmin.createNewMinter()

    let tokens1 <- minter.mintTokens(amount: 1000000.0)
    let tokens2 <- minter.mintTokens(amount: 1000000.0)
  
    destroy minter
    
    let user_account1 = getAccount(0x179b6b1cb6755e31)
          .getCapability(/public/fusdReceiver)
          .borrow<&{FungibleToken.Receiver}>()  
          ?? panic("Cannot borrow account: 0x179b6b1cb6755e31 fusdTokenReceiver Cap")

    let user_account2 = getAccount(0xf3fcd2c1a78f5eee)
          .getCapability(/public/fusdReceiver)
          .borrow<&FUSD.Vault{FungibleToken.Receiver}>()  
          ?? panic("Cannot borrow account: 0xf3fcd2c1a78f5eee fusdTokenReceiver Cap")
   
    user_account1.deposit( from: <- tokens1  )
    user_account2.deposit( from: <- tokens2  )
  }
}