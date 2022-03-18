import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeItems from "../../contracts/ArleeItems.cdc"

// This transaction returns a UInt64 

pub fun main(): UInt64 {
    return ArleeItems.totalSupply
}
