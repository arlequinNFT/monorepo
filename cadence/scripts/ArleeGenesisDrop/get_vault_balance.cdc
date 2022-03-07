import FungibleToken from "../../contracts/FungibleToken.cdc"
import FUSD from "../../contracts/FUSD.cdc"
import ArleeGenesisDrop from "../../contracts/ArleeGenesisDrop.cdc"

pub fun main(address: Address): UFix64 {
    let account = getAccount(address)
    let vaultRef = account.getCapability(ArleeGenesisDrop.PresaleVaultBalancePublicPath).borrow<&FUSD.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance 
} 