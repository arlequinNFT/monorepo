// ArleeItems NFT Contract
//
// Extends the NonFungibleToken standard with extra metadata for each ArleeItem.
//
// Each Arlee Item NFT has an ipfsCID for the model and a metadata dictionary 

import NonFungibleToken from "./NonFungibleToken.cdc"
import MetadataViews from "./MetadataViews.cdc"

pub contract ArleeItems: NonFungibleToken {

    // Total number of Arlee's in existance
    pub var totalSupply: UInt64 

    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)

    // Paths
    pub let MinterStoragePath : StoragePath
    pub let CollectionStoragePath : StoragePath
    pub let CollectionPublicPath : PublicPath

    // Metadata structure
    pub struct ArleeItemMeta {
        pub let id: UInt64
        pub let name: String
        pub let description: String
        pub let ipfsCID: String
        init(id: UInt64, name: String, description: String, ipfsCID: String) {
            self.id = id
            self.name = name
            self.description = description
            self.ipfsCID = ipfsCID
        }
    }

    // ArleeItem.NFT
    pub resource NFT: NonFungibleToken.INFT, MetadataViews.Resolver {
        pub let id: UInt64
        pub let name: String
        pub let description: String
        pub let ipfsCID: String

        // MetadataViews
        //
        pub fun getViews(): [Type] {
            return [
                Type<MetadataViews.Display>(),
                Type<ArleeItems.ArleeItemMeta>()
            ]
        }

        pub fun getMetadata() :ArleeItemMeta {
            return ArleeItemMeta(id: self.id, name: self.name, description: self.description, ipfsCID: self.ipfsCID)
        }

        pub fun resolveView(_ view: Type): AnyStruct? {
            switch view {
                case Type<MetadataViews.Display>():
                    return MetadataViews.Display(
                        name: self.name,
                        description: self.description,
                        thumbnail: MetadataViews.IPFSFile(
                            cid: self.ipfsCID,
                            path: nil
                        )
                    )
                case Type<ArleeItems.ArleeItemMeta>():
                    return ArleeItems.ArleeItemMeta(
                        id: self.id,
                        name: self.name,
                        description: self.description,
                        ipfsCID: self.ipfsCID
                    )
            }

            return nil
        }

        init(initID: UInt64, name: String, description: String, ipfsCID: String) {
            self.id = initID
            self.name = name
            self.description = description
            self.ipfsCID = ipfsCID
        }
    }

    // Public Interface for ArleeItemss Collection to expose metadata as required.
    // Can change this to return a structure custom rather than key value pairs  
    pub resource interface ArleeItemsCollectionPublic {
        pub fun deposit(token: @NonFungibleToken.NFT)
        pub fun batchDeposit(collection: @NonFungibleToken.Collection)
        pub fun getIDs(): [UInt64]
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
        pub fun getArleeItemMetadata(id: UInt64 ) : ArleeItemMeta
        pub fun borrowArleeItem(id:UInt64) : &ArleeItems.NFT?
    }

    // standard implmentation for managing a collection of NFTs
    pub resource Collection: NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, ArleeItemsCollectionPublic {
        // dictionary of NFT conforming tokens
        // NFT is a resource type with an `UInt64` ID field
        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        init () {
            self.ownedNFTs <- {}
        }

        // withdraw removes an NFT from the collection and moves it to the caller
        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing NFT")

            emit Withdraw(id: token.id, from: self.owner?.address)

            return <-token
        }

        pub fun batchWithdraw(ids: [UInt64]): @NonFungibleToken.Collection {
            let collection <- ArleeItems.createEmptyCollection()
            for id in ids {
                let nft <- self.ownedNFTs.remove(key: id)!
                collection.deposit(token: <- nft) 
            }
            return <- collection
        }

        // deposit takes a NFT and adds it to the collections dictionary
        // and adds the ID to the id array
        pub fun deposit(token: @NonFungibleToken.NFT) {
            let token <- token as! @ArleeItems.NFT

            let id: UInt64 = token.id

            // add the new token to the dictionary which removes the old one
            let oldToken <- self.ownedNFTs[id] <- token

            emit Deposit(id: id, to: self.owner?.address)

            destroy oldToken
        }

        pub fun batchDeposit(collection: @NonFungibleToken.Collection) {
            for id in collection.getIDs() {
                let token <- collection.withdraw(withdrawID: id)
                self.deposit(token: <- token)
            }
            destroy collection
        }

        // getIDs returns an array of the IDs that are in the collection
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        // borrowNFT gets a reference to an NFT in the collection
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return &self.ownedNFTs[id] as &NonFungibleToken.NFT
        }

        // borrowArlee gets a reference to an Arlee from the collection
        // so the caller can read the NFT's extended information
        pub fun borrowArleeItem(id: UInt64): &ArleeItems.NFT? {
            if self.ownedNFTs[id] != nil {
                    let ref = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
                    return ref as! &ArleeItems.NFT
                } else {
                    return nil
            }
        }

        pub fun getArleeItemMetadata(id: UInt64): ArleeItemMeta {
            return self.borrowArleeItem(id: id)!.getMetadata()
        }

        pub fun getAllItemMetadata(): [ArleeItemMeta] {
            var itemsMetadata: [ArleeItemMeta] = []
            for key in self.ownedNFTs.keys {
                itemsMetadata.append( self.getArleeItemMetadata(id: key))
            }
            return itemsMetadata
        } 

        // MetadataViews 
        //
        pub fun borrowViewResolver(id: UInt64): &AnyResource{MetadataViews.Resolver} {
            let nft = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
            let ArleeNFT = nft as! &ArleeItems.NFT
            return ArleeNFT // as &AnyResource{MetadataViews.Resolver}
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }

    // public function that anyone can call to create a new empty collection
    pub fun createEmptyCollection(): @NonFungibleToken.Collection {
        return <- create Collection()
    }

    // Resource that an admin or something similar would own to be
    // able to mint new NFTs
    //
    pub resource NFTMinter {

        // mintNFT mints a new NFT with a new ID
        // and deposit it in the recipients collection using their collection reference
        pub fun mintNFT(recipient: &{ArleeItems.ArleeItemsCollectionPublic}, name: String, description:String, ipfsCID: String) {

            // create a new NFT
            var newNFT <- create NFT(initID: ArleeItems.totalSupply, name: name, description: description, ipfsCID: ipfsCID)

            // deposit it in the recipient's account using their reference
            recipient.deposit(token: <-newNFT)

            ArleeItems.totalSupply = ArleeItems.totalSupply + 1
        }
    }

    init() {
        // Initialize the total supply
        self.totalSupply = 0

        // Initalize paths for scripts and transactions usage
        self.MinterStoragePath = /storage/ArleeItemsMinter
        self.CollectionStoragePath = /storage/ArleeItemsCollection
        self.CollectionPublicPath = /public/ArleeItemsCollection

        // Create a Collection resource and save it to storage
        let collection <- create Collection()
        self.account.save(<-collection, to: ArleeItems.CollectionStoragePath)

        // create a public capability for the collection
        self.account.link<&{ArleeItems.ArleeItemsCollectionPublic}>(
            ArleeItems.CollectionPublicPath,
            target: ArleeItems.CollectionStoragePath
        )

        // Create a Minter resource and save it to storage
        let minter <- create NFTMinter()

        self.account.save(<-minter, to: ArleeItems.MinterStoragePath)

        emit ContractInitialized()
    }
}
 