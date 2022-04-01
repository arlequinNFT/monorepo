import NonFungibleToken from "./NonFungibleToken.cdc"
import MetadataViews from "./MetadataViews.cdc"

pub contract ArleeSceneNFT: NonFungibleToken {

    // Total number of ArleeScene in existance
    pub var totalSupply: UInt64

    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)

    // Paths
    pub let MinterStoragePath : StoragePath
    pub let AdminStoragePath : StoragePath
    pub let CollectionStoragePath : StoragePath
    pub let CollectionPublicPath : PublicPath

    access(contract) let arleeDataByID: {UInt64: ArleeData}

    pub struct ArleeData {
        pub var points: UInt64
        pub var level: UInt64
        pub var metadata: {String: String}

        init(points: UInt64, level: UInt64, metadata: {String: String}) {
            self.points = points
            self.level = level
            self.metadata = metadata
        }
    }

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
        pub let royalties: [Royalty]

        init(ref: &ArleeNFT.NFT) {
            self.id = ref.id
            self.name = ref.name
            self.species = ref.species
            self.level = ArleeNFT.arleeDataByID[ref.id]?.level!
            self.currentSkin = ref.getCurrentSkin()
            self.wardrobe = ref.wardrobe
            self.maxWardrobeSize = ref.maxWardrobeSize
            self.points= ArleeNFT.arleeDataByID[ref.id]?.points!
            self.items = ref.getItemsMeta()
            self.originalArtist = ref.originalArtist
            self.royalties = ref.getRoyalties()
        }

    }

    pub struct Texture {
        pub let cid: String
        pub let artistAddress: Address

        init(cid: String, artistAddress: Address) {
            self.cid = cid
            self.artistAddress = artistAddress
        }
    }

    pub struct Royalty {
        pub let address: Address
        pub let cut: UFix64

        init(address: Address, cut: UFix64) {
            self.address = address
            self.cut = cut
        }
    }

    // ArleeOwner Interface
    //
    // capability to access these functions can be given to other users by linking and sharing a private capability
    //
    pub resource interface ArleeNFTPublic {
        pub fun getCurrentTexture(): &Texture?
        pub fun getItemsMeta(): [ArleeItems.ArleeItemMeta]
        pub fun getMetadata(): ArleeMeta
        pub fun getRoyalties(): [Royalty]
    }


    pub resource NFT: NonFungibleToken.INFT,  ArleeNFTPublic, MetadataViews.Resolver {
        pub let id: UInt64
        access(contract) var species: String
        access(contract) var name : String
        access(contract) var originalArtist: Address
        access(contract) let texture: Texture

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



        // returns metadata for this Arlee
        pub fun getMetadata(): ArleeMeta {
            return ArleeMeta(ref: &self as &NFT)
        }

        pub fun getRoyalties(): [Royalty] {
            let royalties:[Royalty] = []
            var amount = 0.02
            royalties.append(Royalty( address: self.originalArtist, cut: amount))
            for skin in self.wardrobe {
                amount = amount / 2.0
                royalties.append(Royalty(address: skin.artistAddress, cut: amount))
            }
            return royalties
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
        //
        init(initID: UInt64, species: String, name: String, originalArtist: Address) {
            self.id = initID
            self.species = species
            self.name = name

            ArleeNFT.arleeDataByID[self.id] = ArleeData(
                points: points,
                level: level,
                metadata: {}
            )
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

        pub fun mintNFT(recipient: &{ArleeNFT.ArleeCollectionPublic}, species: String, originalArtist: Address, cid: String, name: String) {
            var newNFT <- create NFT(initID: ArleeNFT.totalSupply, species: species, name: name, originalArtist: originalArtist)

            newNFT.wardrobe.append(
                Texture(cid: cid, artistAddress: self.owner?.address!, description: description, isLocked: true)
            )
            recipient.deposit(token: <-newNFT)
            ArleeNFT.totalSupply = ArleeNFT.totalSupply + 1
        }
    }

    pub resource Admin {
        pub fun createNewAdmin(): @Admin {
            return <- create Admin()
        }
    }

    init() {
        // Initialize the total supply
        self.totalSupply = 0

        self.arleeDataByID = {}

        // Initalize paths for scripts and transactions usage
        self.MinterStoragePath = /storage/ArleeNFTMinter
        self.AdminStoragePath = /storage/ArleeNFTAdmin
        self.CollectionStoragePath = /storage/ArleeNFTCollection
        self.CollectionPublicPath = /public/ArleeNFTCollection

        // Create a Collection resource and save it to storage
        let collection <- create Collection()

        if let oldCollection <- self.account.load<@Collection>(from: ArleeNFT.CollectionStoragePath) { destroy oldCollection }
        self.account.save(<-collection, to: ArleeNFT.CollectionStoragePath)

        // create a public capability for the collection
        self.account.link<&{ArleeNFT.ArleeCollectionPublic}>(
            ArleeNFT.CollectionPublicPath,
            target: ArleeNFT.CollectionStoragePath
        )

        // Create a Minter resource and save it to storage
        if let oldMinter <- self.account.load<@NFTMinter>(from: ArleeNFT.MinterStoragePath) { destroy oldMinter }
        self.account.save(<-create NFTMinter(), to: ArleeNFT.MinterStoragePath)

        if let oldAdmin <- self.account.load<@Admin>(from: ArleeNFT.AdminStoragePath) { destroy oldAdmin }
        self.account.save(<-create Admin(), to: ArleeNFT.AdminStoragePath)

        emit ContractInitialized()
    }
}
