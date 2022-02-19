// Arlequin NFT Contract
//
// Extends the NonFungibleToken standard with extra metadata for each Arlequin's features. 

import NonFungibleToken from "./NonFungibleToken.cdc"
import MetadataViews from "./MetadataViews.cdc"
import ArlequinItems from "./ArlequinItems.cdc"
import Nimo from "./Nimo.cdc"

pub contract ArlequinNFT: NonFungibleToken {

    // Total number of Arlequin's in existance
    pub var totalSupply: UInt64 

    // inital max length for Arlequin's wardrobe (dictionary of skins/textures ipfs pins)
    pub let initalWardrobeSize : UInt64

    // Total times name can be set.
    pub var maxNameChangeCount : UInt64

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

    /*
        interface Arlee {
            order: number; // refering to the minting order
            species: string; // should we type that better? like 'dog | turtle | deer'...
            painting: Painting[]; // there might be a better english word instead of "painting"
            currentPainting: Painting;
            owner: address;
            votes: {
                maximum: number;
                remaining: number;
            };
            accessories: Accessories; // as you said this should be an information added here
            originalArtist: Artist; // we could also name that "contestArtist" or something
            name: string; // an Arlee could maybe have a name the first owner choose then the arlee could be rename by spending NIMO
            level: number; // you level up by spending NIMO. When you level up, you got a new slot and more voting points. One user can level up multiple time if he wants
        }

        interface Painting {
            cid: string; // I'll use that to fetch the texture and thumbnail
            name: string; // why not giving the possibility to name their painting
            artist: Artist;
        }

        interface Artist {
            address: address;
            username: string;
        }
    */

    pub struct ArleeMeta {
        pub let id: UInt64
        pub let name: String
        pub let description: String
        pub let species: String
        pub let level: UInt64
        pub let currentSkin: &Skin
        pub let wardrobe: [Skin]
        pub let maxWardrobeSize: UInt64
        pub let points: UInt64
        pub let items: [ArlequinItems.ArleeItemMeta]
        pub let originalArtist: Address

        init(ref: &ArlequinNFT.NFT) {
            self.id = ref.id
            self.name = ref.name
            self.description = ref.description
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

    pub struct Skin {
        pub let ipfsCID: String
        pub let artistAddress: Address
        pub let name: String
        pub let description: String
        
        init(ipfsCID: String, artistAddress: Address, name: String, description: String) {
            self.ipfsCID = ipfsCID
            self.artistAddress = artistAddress
            self.name = name
            self.description = description
        }
    }

    pub resource interface ArleeCollectionPublic {
        pub fun borrowArlee(id: UInt64): &NFT
        pub fun getArleeMetadata(id: UInt64): ArleeMeta
    }

    // ArlequinOwner Interface 
    //
    // capability to access these functions can be given to other users by linking and sharing a private capability
    //
    pub resource interface ArlequinOwner {
        pub fun updateName(name: String)
        pub fun updateDescription(newDescription: String)
        pub fun addToWardrobe(ipfsCID: String, name: String, description: String)
        pub fun removeFromWardrobe( index: UInt64 )
        pub fun setCurrentSkin(index: UInt64)
        pub fun getCurrentSkin(): &Skin
        pub fun getItemsMeta(): [ArlequinItems.ArleeItemMeta]
        pub fun equip( item: @ArlequinItems.NFT)
        pub fun withdrawItem( atIndex: UInt64 ) : @ArlequinItems.NFT
        pub fun getMetadata(): ArleeMeta

    }

    pub resource NFT: NonFungibleToken.INFT, ArlequinOwner, MetadataViews.Resolver {
        pub let id: UInt64
        access(contract) var species: String
        // open question should name and description come from the skin?
        access(contract) var name : String          
        access(contract) var description : String
        access(contract) var level: UInt64
        access(contract) var points: UInt64
        access(contract) var originalArtist: Address
        access(contract) var maxNameChangeCount: UInt64
        
        // can limit number of times name has been set
        pub var nameChangeCount : UInt64

        // wardrobe dictionary of ipfs pins for each 'outfit' the Arlequin owns
        access(contract) let wardrobe: [Skin]
        
        // maximum size of this Arlequin's wardrobe.... (could make this upgradeable by spending a fungible token)
        access(contract) var maxWardrobeSize : UInt64

        // Each Arlequin can own ArlequinItemsNFTs
        access(contract) var itemsCollection : @ArlequinItems.Collection

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

        // updateDescription
        //
        // saves a new description if number of name changes has not been exceeded 
        //
        pub fun updateDescription(newDescription: String) {
            pre {
                self.nameChangeCount < self.maxNameChangeCount
            }
            let oldDescription = self.description
            self.description = newDescription
            self.nameChangeCount = self.nameChangeCount + 1
            emit DescriptionChanged(id: self.id, ownersAddress: self.owner?.address!, oldDescription: oldDescription, newDescription: newDescription)
        }

        // addToWardrobe
        //
        // Adds a new skin to the Arlequin's wardrobe 
        // In this version of contract any owner can freely update their wardrobe with no cost
        //
        pub fun addToWardrobe(ipfsCID: String, name: String, description: String) {
            pre {
                UInt64(self.wardrobe.length) < self.maxWardrobeSize : "Wardrobe is full!"
            }
            self.wardrobe.append(
                Skin(ipfsCID: ipfsCID, artistAddress: self.owner?.address!, name: name, description: description)
            )
        }

        // removeFromWardrobe
        //
        // Removes a skin from an Arlequin's wardrobe
        //
        pub fun removeFromWardrobe( index: UInt64 ) {
            self.wardrobe.remove(at: index)
        }

        pub fun setCurrentSkin(index: UInt64) {
            let skin = self.wardrobe.remove(at: index)
            self.wardrobe.insert(at: 0, skin)
        }

        pub fun getCurrentSkin() : &Skin {
            return &self.wardrobe[0] as &Skin
        }

        // getItemsMeta 
        //
        // returns all the metadata for the items owned by this arlee
        //
        pub fun getItemsMeta(): [ArlequinItems.ArleeItemMeta] {
            return self.itemsCollection.getAllItemMetadata()
        }

        // adds an item to the arlee's collection
        pub fun equip( item: @ArlequinItems.NFT ) { 
            self.itemsCollection.deposit(token: <- item )
        }

        // removes items from arlee's collection
        pub fun withdrawItem( atIndex: UInt64 ) : @ArlequinItems.NFT {
            let item <- self.itemsCollection.withdraw(withdrawID: atIndex) as! @ArlequinItems.NFT
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
                Type<ArlequinNFT.ArleeMeta>()
            ]
        }

        pub fun resolveView(_ view: Type): AnyStruct? {
            switch view {
                case Type<MetadataViews.Display>():
                    return MetadataViews.Display(
                        name: self.name,
                        description: self.description,
                        thumbnail: MetadataViews.IPFSFile(
                            cid: self.getCurrentSkin().ipfsCID,
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
        init(initID: UInt64, species: String, originalArtist: Address) {
            self.id = initID
            self.species = species
            self.name = "Arlee #".concat(initID.toString())
            self.description = "Freshly minted Arle #".concat(initID.toString())
            self.maxNameChangeCount = ArlequinNFT.maxNameChangeCount
            self.maxWardrobeSize = ArlequinNFT.initalWardrobeSize

            self.nameChangeCount = 0
            self.level = 0
            self.points = 100 
            self.originalArtist = originalArtist
            
            self.wardrobe = []
            self.itemsCollection <- ArlequinItems.createEmptyCollection() as! @ArlequinItems.Collection
        }

        destroy() {
            // should withdraw items here and send to an admin address
            destroy self.itemsCollection
        }
    }

    // Public Interface for ArlequinNFTs Collection to expose metadata as required.
    // Can change this to return a structure custom rather than key value pairs  
    pub resource interface CollectionPublic {
        pub fun getArlequinMetadata(id: UInt64): ArleeMeta
    }

    // standard implmentation for managing a collection of NFTs
    pub resource Collection: NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, CollectionPublic {
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

        // deposit takes a NFT and adds it to the collections dictionary
        // and adds the ID to the id array
        pub fun deposit(token: @NonFungibleToken.NFT) {
            let token <- token as! @ArlequinNFT.NFT

            let id: UInt64 = token.id

            // add the new token to the dictionary which removes the old one
            let oldToken <- self.ownedNFTs[id] <- token

            emit Deposit(id: id, to: self.owner?.address)

            destroy oldToken
        }

        // getIDs returns an array of the IDs that are in the collection
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        // borrowNFT gets a reference to an NFT in the collection
        // so that the caller can read its metadata and call its methods
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return &self.ownedNFTs[id] as &NonFungibleToken.NFT
        }

        // borrowArlee gets a reference to an Arlequin from the collection
        // so the caller can read the NFT's extended information
        pub fun borrowArlee(id: UInt64): &ArlequinNFT.NFT? {
            if self.ownedNFTs[id] != nil {
                    let ref = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
                    return ref as! &ArlequinNFT.NFT
                } else {
                    return nil
            }
        }

        pub fun getArlequinMetadata(id: UInt64): ArleeMeta {
            return self.borrowArlee(id: id)!.getMetadata()
        }

        // new style metadata
        pub fun borrowViewResolver(id: UInt64): &AnyResource{MetadataViews.Resolver} {
            let nft = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
            let ArlequinNFT = nft as! &ArlequinNFT.NFT
            return ArlequinNFT // as &AnyResource{MetadataViews.Resolver}
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
        //
        pub fun mintNFT(recipient: &{NonFungibleToken.CollectionPublic}, species: String, originalArtist: Address) {

            // create a new NFT
            var newNFT <- create NFT(initID: ArlequinNFT.totalSupply, species: species, originalArtist: originalArtist)

            // deposit it in the recipient's account using their reference
            recipient.deposit(token: <-newNFT)

            ArlequinNFT.totalSupply = ArlequinNFT.totalSupply + 1
        }

        pub fun mintNFTWithSkin(recipient: &{NonFungibleToken.CollectionPublic}, species: String, originalArtist: Address, ipfsCID: String, name: String, description: String) {
            var newNFT <- create NFT(initID: ArlequinNFT.totalSupply, species: species, originalArtist: originalArtist)
            newNFT.addToWardrobe(ipfsCID: ipfsCID, name: name, description: description)
            recipient.deposit(token: <-newNFT)
            ArlequinNFT.totalSupply = ArlequinNFT.totalSupply + 1
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
        pub fun replenishPoints(ref: &ArlequinNFT.NFT, amount: UInt64) {
            ref.increasePointsBy(amount: amount)
        }
        pub fun spendPoints(ref: &ArlequinNFT.NFT, amount: UInt64) {
            ref.decreasePointsBy(amount: amount)
        }
        pub fun increaseLevel(ref: &ArlequinNFT.NFT, amount: UInt64) {
            ref.increaseLevelBy(amount: amount)
        }
        pub fun decreaseLevelBy(ref: &ArlequinNFT.NFT, amount: UInt64) {
            ref.decreaseLevelBy(amount: amount)
        }
        pub fun increaseMaxNameChangeCountBy(ref: &ArlequinNFT.NFT, amount: UInt64) {
            ref.increaseMaxNameChangeCountBy(amount: amount)
        }
        pub fun increaseMaxWardrobeSizeBy(ref: &ArlequinNFT.NFT, amount: UInt64) {
            ref.increaseMaxWardrobeSizeBy(amount: amount)
        }
        pub fun changeSpecies(ref: &ArlequinNFT.NFT, newSpecies: String) {
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
        self.initalWardrobeSize = 3 
        self.maxNameChangeCount = 1

        // Initalize paths for scripts and transactions usage
        self.MinterStoragePath = /storage/ArlequinMinter
        self.AdminStoragePath = /storage/ArlequinAdmin
        self.CollectionStoragePath = /storage/ArlequinNFTCollection
        self.CollectionPublicPath = /public/ArlequinNFTCollection

        // Create a Collection resource and save it to storage
        let collection <- create Collection()
        self.account.save(<-collection, to: ArlequinNFT.CollectionStoragePath)

        // create a public capability for the collection
        self.account.link<&{NonFungibleToken.CollectionPublic}>(
            ArlequinNFT.CollectionPublicPath,
            target: ArlequinNFT.CollectionStoragePath
        )

        // Create a Minter resource and save it to storage
        self.account.save(<-create NFTMinter(), to: ArlequinNFT.MinterStoragePath)
        self.account.save(<-create Admin(), to: ArlequinNFT.AdminStoragePath)
        
        emit ContractInitialized()
    }
}
 