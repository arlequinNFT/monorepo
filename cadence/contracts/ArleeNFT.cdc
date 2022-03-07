// Arlee NFT Contract
//
// Extends the NonFungibleToken standard with extra metadata for each Arlee's features. 

import NonFungibleToken from "./NonFungibleToken.cdc"
import MetadataViews from "./MetadataViews.cdc"
import ArleeItems from "./ArleeItems.cdc"
import Nimo from "./Nimo.cdc"


pub contract ArleeNFT: NonFungibleToken {

    // Total number of Arlee's in existance
    pub var totalSupply: UInt64 

    // inital max length for Arlee's wardrobe (dictionary of skins/textures ipfs pins)
    pub let initalWardrobeSize : UInt64

    // Total times name can be set.
    pub var maxNameChangeCount : UInt64

    // Events
    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)

    pub event NameChanged(id: UInt64, ownersAddress: Address, oldName: String, newName: String)
    pub event DescriptionChanged(id: UInt64, ownersAddress: Address, oldDescription: String, newDescription: String)

    // Paths
    pub let MinterStoragePath : StoragePath
    pub let AdminStoragePath : StoragePath
    pub let CollectionStoragePath : StoragePath    
    pub let CollectionPublicPath : PublicPath

    // Structures
    //
    pub struct ArleeMeta {
        pub let id: UInt64
        pub let name: String
        pub let species: String
        pub let level: UInt64
        pub let currentSkin: &Skin?
        pub let wardrobe: [Skin]
        pub let maxWardrobeSize: UInt64
        pub let points: UInt64
        pub let items: [ArleeItems.ArleeItemMeta]
        pub let originalArtist: Address

        init(ref: &ArleeNFT.NFT) {
            self.id = ref.id
            self.name = ref.name
            self.species = ref.species
            self.level = ref.level
            self.currentSkin = ref.getCurrentSkin()
            self.wardrobe = ref.wardrobe
            self.maxWardrobeSize = ref.maxWardrobeSize
            self.points= ref.points
            self.items = ref.getItemsMeta()
            self.originalArtist = ref.originalArtist
        }
        
    }

    // Metadata for a skin / scene
    pub struct Skin {
        pub let ipfsCID: String
        pub let artistAddress: Address
        pub let description: String
        pub let isLocked: Bool
        
        init(ipfsCID: String, artistAddress: Address, description: String, isLocked: Bool) {
            self.ipfsCID = ipfsCID
            self.artistAddress = artistAddress
            self.description = description
            self.isLocked = isLocked
        }
    }

    // ArleeOwner Interface 
    //
    // capability to access these functions can be given to other users by linking and sharing a private capability
    //
    pub resource interface ArleeNFTPublic {
        pub fun getCurrentSkin(): &Skin?
        pub fun getItemsMeta(): [ArleeItems.ArleeItemMeta]
        pub fun getMetadata(): ArleeMeta
    }

    pub resource interface ArleeOwner {
        pub fun equip(item: @NonFungibleToken.NFT)
        pub fun updateName(name: String)
        pub fun addToWardrobe(ipfsCID: String, description: String)
        pub fun updateWardrobe(index: UInt64, ipfsCID: String, description: String)
        pub fun removeFromWardrobe(index: UInt64)
        pub fun setCurrentSkin(index: UInt64)
        pub fun withdrawItem( atIndex: UInt64 ) : @NonFungibleToken.NFT
    }

    pub resource NFT: NonFungibleToken.INFT, ArleeOwner, ArleeNFTPublic, MetadataViews.Resolver {
        pub let id: UInt64
        access(contract) var species: String
        access(contract) var name : String
        access(contract) var level: UInt64
        access(contract) var points: UInt64
        access(contract) var originalArtist: Address
        //access(contract) var originalArtistFTReceiverCap: Capability<&{FungibleToken.Receiver}>
        access(contract) var nameChangeCount : UInt64
        access(contract) var maxNameChangeCount: UInt64
        
        // wardrobe dictionary of ipfs pins for each 'outfit' the Arlee owns
        access(contract) let wardrobe: [Skin]
        
        // maximum size of this Arlee's wardrobe.... (could make this upgradeable by spending a fungible token)
        access(contract) var maxWardrobeSize : UInt64

        // Each Arlee can own ArleeItemsNFTs
        access(contract) var itemsCollection : @ArleeItems.Collection

        // updateName
        //
        // saves a new name if number of name changes has not been exceeded 
        //
        pub fun updateName(name: String) {
            pre {
                self.nameChangeCount < self.maxNameChangeCount
            }
            let oldName = self.name
            self.name = name
            self.nameChangeCount = self.nameChangeCount + 1
            emit NameChanged(id: self.id, ownersAddress: self.owner?.address!, oldName: oldName, newName: name)
        }


        // addToWardrobe
        //
        // Adds a new skin to the Arlee's wardrobe 
        // In this version of contract any owner can freely update their wardrobe with no cost
        //
        pub fun addToWardrobe(ipfsCID: String, description: String) {
            pre {
                UInt64(self.wardrobe.length) < self.maxWardrobeSize : "Wardrobe is full!"
                self.owner != nil : "NFT Reference is nil"
                self.owner!.address != nil : "No owners found"
            }
            self.wardrobe.append(
                Skin(ipfsCID: ipfsCID, artistAddress: self.owner?.address!, description: description, isLocked: false)
            )
        }

        pub fun updateWardrobe(index: UInt64, ipfsCID: String, description: String) {
            pre {
                self.wardrobe[index] != nil : "Nothing in that slot"
                self.wardrobe[index].artistAddress == self.owner!.address : "Must be owner to update"
            }
            self.wardrobe[index] = Skin(ipfsCID: ipfsCID, artistAddress: self.owner?.address!, description: description, isLocked: false)
        }

        // removeFromWardrobe
        //
        // Removes a skin from an Arlee's wardrobe
        //
        pub fun removeFromWardrobe( index: UInt64 ) {
            pre {
                self.wardrobe[index].isLocked == false : "Cannot remove original minters artwork!"
                self.wardrobe[index].artistAddress == self.owner!.address : "Can only remove your own creations!"
            }
            self.wardrobe.remove(at: index)
        }

        pub fun setCurrentSkin(index: UInt64) {
            let skin = self.wardrobe.remove(at: index)
            self.wardrobe.insert(at: 0, skin)
        }

        pub fun getCurrentSkin() : &Skin? {
            if self.wardrobe.length > 0 {
                return &self.wardrobe[0] as &Skin
            } else {
                return nil
            }
        }

        // getItemsMeta 
        //
        // returns all the metadata for the items owned by this arlee
        //
        pub fun getItemsMeta(): [ArleeItems.ArleeItemMeta] {
            return self.itemsCollection.getAllItemMetadata()
        }

        // adds an item to the arlee's collection
        pub fun equip( item: @NonFungibleToken.NFT ) {
            self.itemsCollection.deposit(token: <- item )
        }

        // removes items from arlee's collection
        pub fun withdrawItem( atIndex: UInt64 ) : @NonFungibleToken.NFT {
            let item <- self.itemsCollection.withdraw(withdrawID: atIndex) // as! @ArleeItems.NFT
            return <- item
        }

        // returns metadata for this Arlee
        pub fun getMetadata(): ArleeMeta {
            return ArleeMeta(ref: &self as &NFT)
        }

        // Private Functions
        //
        // account level access function can be called by another contract held in the same account 
        // allows to add implmentation later in another contract 
        // Passing the Admin resource a reference to the NFT is another way to call these functions
        //
        // j00lz 2do add events
        //
        access(account) fun increaseMaxWardrobeSizeBy(amount: UInt64) {
            self.maxWardrobeSize = self.maxWardrobeSize + amount
        }

        access(account) fun increaseMaxNameChangeCountBy(amount: UInt64) {
            self.maxNameChangeCount = self.maxNameChangeCount + amount
        }

        access(account) fun increasePointsBy(amount: UInt64) {
            self.points = self.points + amount
        }

        access(account) fun decreasePointsBy(amount:UInt64) {
            self.points = self.points - amount
        }

        access(account) fun increaseLevelBy(amount: UInt64) {
            self.level = self.level + amount
        }
        
        access(account) fun decreaseLevelBy(amount: UInt64) {
            self.level = self.level - amount
        }

        access(account) fun changeSpecies(newSpecies: String) {
            self.species = newSpecies
        }
        
        // MetadataViews
        //
        pub fun getViews(): [Type] {
            return [
                Type<MetadataViews.Display>(),
                Type<ArleeNFT.ArleeMeta>()
            ]
        }

        pub fun resolveView(_ view: Type): AnyStruct? {
            switch view {
                case Type<MetadataViews.Display>():
                    return MetadataViews.Display(
                        name: self.name,
                        description: "This is Arlee #".concat(self.id.toString()).concat(" a ").concat(self.species).concat("!").concat(self.getCurrentSkin()?.description!),
                        thumbnail: MetadataViews.IPFSFile(
                            cid: self.getCurrentSkin()?.ipfsCID!,
                            path: nil
                        )
                    )
                case Type<ArleeMeta>():
                    return self.getMetadata()
            }

            return nil
        }

        // NFT initalization
        //
        // Mints with some default values
        //  these could be passed in to add more flexibility
        //
        init(initID: UInt64, species: String, name: String, originalArtist: Address,
            wardrobeSize: UInt64, maxNameChange: UInt64, points: UInt64, level: UInt64) {
            self.id = initID
            self.species = species
            self.name = name
            self.maxNameChangeCount = maxNameChange // ArleeNFT.maxNameChangeCount
            self.maxWardrobeSize = wardrobeSize // ArleeNFT.initalWardrobeSize


            self.nameChangeCount = 0
            self.points = points
            self.level = level

            self.originalArtist = originalArtist
            
            self.wardrobe = []
            self.itemsCollection <- ArleeItems.createEmptyCollection() as! @ArleeItems.Collection
        }

        destroy() {
            // should withdraw items here and send to an admin address
            destroy self.itemsCollection
        }
    }

    pub resource interface ArleeCollectionPublic {
        pub fun deposit(token: @NonFungibleToken.NFT)
        pub fun batchDeposit(collection: @NonFungibleToken.Collection)
        pub fun getIDs(): [UInt64]
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
        pub fun borrowArlee(id: UInt64): &ArleeNFT.NFT? {
            // If the result isn't nil, the id of the returned reference
            // should be the same as the argument to the function
            post {
                (result == nil) || (result?.id == id): 
                    "Cannot borrow Arlee reference: The ID of the returned reference is incorrect"
            }
        }
        pub fun getArleeMetadata(id: UInt64): ArleeMeta
    }

    // standard implmentation for managing a collection of NFTs
    pub resource Collection: NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, ArleeCollectionPublic {
        // dictionary of NFT conforming tokens
        // NFT is a resource type with an `UInt64` ID field
        // pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}
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
            let collection <- ArleeNFT.createEmptyCollection()
            for id in ids {
                let nft <- self.ownedNFTs.remove(key: id)!
                collection.deposit(token: <- nft) 
            }
            return <- collection
        }

        // deposit takes a NFT and adds it to the collections dictionary
        // and adds the ID to the id array
        pub fun deposit(token: @NonFungibleToken.NFT) {
            let token <- token as! @ArleeNFT.NFT

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
        pub fun borrowArlee(id: UInt64): &ArleeNFT.NFT? {
            if self.ownedNFTs[id] != nil {
                    let ref = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
                    return ref as! &ArleeNFT.NFT
                } else {
                    return nil
            }
        }

        pub fun getArleeMetadata(id: UInt64): ArleeMeta {
            return self.borrowArlee(id: id)!.getMetadata()
        }

        // new style metadata
        pub fun borrowViewResolver(id: UInt64): &AnyResource{MetadataViews.Resolver} {
            let nft = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
            let ArleeNFT = nft as! &ArleeNFT.NFT
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

        pub fun mintNFT(recipient: &{ArleeNFT.ArleeCollectionPublic}, species: String, originalArtist: Address, ipfsCID: String, name: String, description: String,
            wardrobeSize: UInt64, maxNameChange: UInt64, points: UInt64, level: UInt64) {
            var newNFT <- create NFT(initID: ArleeNFT.totalSupply, species: species, name: name, originalArtist: originalArtist,
                wardrobeSize: wardrobeSize, maxNameChange: maxNameChange, points: points, level: level)
            
            newNFT.wardrobe.append(
                Skin(ipfsCID: ipfsCID, artistAddress: self.owner?.address!, description: description, isLocked: true)
            )
            recipient.deposit(token: <-newNFT)
            ArleeNFT.totalSupply = ArleeNFT.totalSupply + 1
        }
    }

    // Admin Resource
    //
    // Contains functions for the admin/backend to 
    //    - spend and replenish points
    //    - update arlee's level
    //    - increase max number of times can change Arlee's name + description
    //    - increase an Arlee's max wardrobe size 
    //    - change an arlee's species
    //    - create new admin
    //
    pub resource Admin {
        pub fun replenishPoints(ref: &ArleeNFT.NFT, amount: UInt64) {
            ref.increasePointsBy(amount: amount)
        }
        pub fun spendPoints(ref: &ArleeNFT.NFT, amount: UInt64) {
            ref.decreasePointsBy(amount: amount)
        }
        pub fun increaseLevel(ref: &ArleeNFT.NFT, amount: UInt64) {
            ref.increaseLevelBy(amount: amount)
        }
        pub fun decreaseLevelBy(ref: &ArleeNFT.NFT, amount: UInt64) {
            ref.decreaseLevelBy(amount: amount)
        }
        pub fun increaseMaxNameChangeCountBy(ref: &ArleeNFT.NFT, amount: UInt64) {
            ref.increaseMaxNameChangeCountBy(amount: amount)
        }
        pub fun increaseMaxWardrobeSizeBy(ref: &ArleeNFT.NFT, amount: UInt64) {
            ref.increaseMaxWardrobeSizeBy(amount: amount)
        }
        pub fun changeSpecies(ref: &ArleeNFT.NFT, newSpecies: String) {
            ref.changeSpecies(newSpecies: newSpecies)
        }


        pub fun createNewAdmin(): @Admin {
            return <- create Admin()
        }
    }

    init() {
        // Initialize the total supply
        self.totalSupply = 0

        // Inital globals for newly minted NFTs
        self.initalWardrobeSize = 1
        self.maxNameChangeCount = 1

        // Initalize paths for scripts and transactions usage
        self.MinterStoragePath = /storage/ArleeNFTMinter
        self.AdminStoragePath = /storage/ArleeNFTAdmin
        self.CollectionStoragePath = /storage/ArleeNFTCollection
        self.CollectionPublicPath = /public/ArleeNFTCollection

        // Create a Collection resource and save it to storage
        let collection <- create Collection()
        self.account.save(<-collection, to: ArleeNFT.CollectionStoragePath)

        // create a public capability for the collection
        self.account.link<&{ArleeNFT.ArleeCollectionPublic}>(
            ArleeNFT.CollectionPublicPath,
            target: ArleeNFT.CollectionStoragePath
        )

        // Create a Minter resource and save it to storage
        self.account.save(<-create NFTMinter(), to: ArleeNFT.MinterStoragePath)
        self.account.save(<-create Admin(), to: ArleeNFT.AdminStoragePath)
        
        emit ContractInitialized()
    }
}
 