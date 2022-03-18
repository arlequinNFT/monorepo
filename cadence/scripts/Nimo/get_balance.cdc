import Nimo from "../../contracts/Nimo.cdc"
import FungibleToken from "../../contracts/FungibleToken.cdc"

// This script returns an account's Nimo balance.

pub fun main(address: Address): UFix64 {
    let account = getAccount(address)
    
    let vaultRef = account.getCapability(Nimo.BalancePublicPath)!.borrow<&Nimo.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
}
