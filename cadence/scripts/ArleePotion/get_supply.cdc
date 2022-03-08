import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleePotion from "../../contracts/ArleePotion.cdc"

// This transaction returns a UInt64 

pub fun main(): UInt64 {
    return ArleePotion.totalSupply
}
