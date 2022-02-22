import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeNFT from "../../contracts/ArleeNFT.cdc"

// This transaction returns a UInt64 

pub fun main(): UInt64 {
    return ArleeNFT.totalSupply
}
