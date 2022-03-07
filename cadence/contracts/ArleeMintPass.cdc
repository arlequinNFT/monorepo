// ArleeMintPass NFT Contract
//
// 

import NonFungibleToken from "./NonFungibleToken.cdc"
import MetadataViews from "./MetadataViews.cdc"

pub contract ArleeMintPass: NonFungibleToken {

    // Total number of ArleeMintPasses in existance
    pub var totalSupply: UInt64 

    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)

    // Paths
    pub let MinterStoragePath : StoragePath
    pub let CollectionStoragePath : StoragePath
    pub let CollectionPublicPath : PublicPath

    // ArleeMintPass.NFT
    pub resource NFT: NonFungibleToken.INFT, MetadataViews.Resolver {
        pub let id: UInt64
        pub let species: String
        pub let ipfsCID: String

        // MetadataViews
        //
        pub fun getViews(): [Type] {
            return [
                Type<MetadataViews.Display>()
            ]
        }

        pub fun resolveView(_ view: Type): AnyStruct? {
            switch view {
                case Type<MetadataViews.Display>():
                    return MetadataViews.Display(
                        name: "Arleeverse Mintpass: 1 x ".concat(self.species),
                        description: "A Mint pass for the Arleeverse! Allows the user to claim 1 x ".concat(self.species),
                        thumbnail: MetadataViews.IPFSFile(
                            cid: self.ipfsCID,
                            path: nil
                        )
                    )
            }
            return nil
        }

        init(initID: UInt64, species: String, ipfsCID: String) {
            self.id = initID
            self.species = species
            self.ipfsCID = ipfsCID
        }
    }

    // resource interface
    pub resource interface ArleeMintPassCollectionPublic {
        pub fun deposit(token: @NonFungibleToken.NFT)
        pub fun batchDeposit(collection: @NonFungibleToken.Collection)
        pub fun getIDs(): [UInt64]
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
        pub fun borrowArleeMintPass(id:UInt64) : &ArleeMintPass.NFT?
    }

    // standard implmentation for managing a collection of NFTs
    pub resource Collection: NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, ArleeMintPassCollectionPublic {
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

        pub fun withdrawMP(withdrawID: UInt64): @NFT {
            let nft <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing NFT")
            let token <- nft as! @NFT 
            emit Withdraw(id: token.id, from: self.owner?.address)
            return <- token
        }

        pub fun batchWithdraw(ids: [UInt64]): @NonFungibleToken.Collection {
            let collection <- ArleeMintPass.createEmptyCollection()
            for id in ids {
                let nft <- self.ownedNFTs.remove(key: id)!
                collection.deposit(token: <- nft) 
            }
            return <- collection
        }

        // deposit takes a NFT and adds it to the collections dictionary
        // and adds the ID to the id array
        pub fun deposit(token: @NonFungibleToken.NFT) {
            let token <- token as! @ArleeMintPass.NFT

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
        pub fun borrowArleeMintPass(id: UInt64): &ArleeMintPass.NFT? {
            if self.ownedNFTs[id] != nil {
                    let ref = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
                    return ref as! &ArleeMintPass.NFT
                } else {
                    return nil
            }
        }

        // MetadataViews 
        //
        pub fun borrowViewResolver(id: UInt64): &AnyResource{MetadataViews.Resolver} {
            let nft = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
            let ArleeNFT = nft as! &ArleeMintPass.NFT
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
        pub fun mintNFT(recipient: &{ArleeMintPass.ArleeMintPassCollectionPublic}, species: String, ipfsCID: String) {
            // create a new NFT
            var newNFT <- create NFT(initID: ArleeMintPass.totalSupply, species: species, ipfsCID: ipfsCID)

            // deposit it in the recipient's account using their reference
            recipient.deposit(token: <-newNFT)

            ArleeMintPass.totalSupply = ArleeMintPass.totalSupply + 1
        }
    }

    init() {
        // Initialize the total supply
        self.totalSupply = 0

        // Initalize paths for scripts and transactions usage
        self.MinterStoragePath = /storage/ArleeMintPassMinter
        self.CollectionStoragePath = /storage/ArleeMintPassCollection
        self.CollectionPublicPath = /public/ArleeMintPassCollection

        // Create a Collection resource and save it to storage
        let collection <- create Collection()
        self.account.save(<-collection, to: ArleeMintPass.CollectionStoragePath)

        // create a public capability for the collection
        self.account.link<&{ArleeMintPass.ArleeMintPassCollectionPublic}>(
            ArleeMintPass.CollectionPublicPath,
            target: ArleeMintPass.CollectionStoragePath
        )

        // Create a Minter resource and save it to storage
        let minter <- create NFTMinter()

        self.account.save(<-minter, to: ArleeMintPass.MinterStoragePath)

        emit ContractInitialized()
    }
}
 