// Genesis Drop manager Contract 
//
// Admin creates drops with number of packs available.
// Each pack contains any number of Arlee's and items
// 
// A mint vouchers is created with their order details. (species)
//
// User can redeem mint their Arlee buy passing their MintPass and the name + ipfs of their Arlee skin/scene
// 
// Admin can adjust sale parameters 
// Admin can claim a mintpass and can send to a user (comes from total to ensure rarity totals)

import FlowToken from "./FlowToken.cdc"
import FungibleToken from "./FungibleToken.cdc"
import NonFungibleToken from "./NonFungibleToken.cdc"
import ArleeMintPass from "./ArleeMintPass.cdc"
import ArleeNFT from "./ArleeNFT.cdc"
import ArleeItems from "./ArleeItems.cdc"

pub contract ArleeGenesisDrop {
    // Contract Fields
    access(contract) var saleIsOpen : Bool
    access(contract) var redemptionIsOpen : Bool
    access(contract) var dropDetails: {String: VoucherMeta}
    access(contract) var whitelistIsActive : Bool
    access(contract) var whitelist: [Address]

    // Paths
    pub let ArleeGenesisDropVaultStoragePath: StoragePath
    pub let ArleeGenesisDropAdminStoragePath: StoragePath
    pub let PresaleVaultBalancePublicPath: PublicPath

    // Events
    pub event VoucherPurchased( address: Address, species: String )
    pub event VoucherRedeemed( address: Address, species: String, name: String, ipfsCID: String )

    // Structures
    //
    pub struct VoucherMeta {
        pub let species: String
        pub let price: UFix64
        pub let ipfsCID: String
        pub var quantityRemaining: UInt
        pub let wardrobeSize: UInt64
        pub let maxNameChange: UInt64
        pub let points: UInt64
        pub let level: UInt64
        
        access(contract) fun decreaseQuantityRemaining() {
            self.quantityRemaining = self.quantityRemaining - 1
        }
        
        init(species:String, ipfsCID: String, price: UFix64, quantityRemaining: UInt,
            wardrobeSize: UInt64, maxNameChange: UInt64, points: UInt64, level: UInt64) { 
            self.species = species
            self.ipfsCID = ipfsCID
            self.price = price
            self.quantityRemaining = quantityRemaining
            self.wardrobeSize = wardrobeSize
            self.maxNameChange = maxNameChange
            self.points = points
            self.level = level
        }
    }

    // Purchase MintPass function
    //
    // User calls function with the species they wish to mint
    // if they have pass correct funds and their are passes left
    // they will receive a mint pass nft to their supplied mpReceiverCap
    //
    pub fun purchaseMintPass( species: String, funds: @FlowToken.Vault, mpReceiverCap: Capability<&{ArleeMintPass.ArleeMintPassCollectionPublic}>) {
        pre {
            self.saleIsOpen || self.whitelistIsActive : "Sale is currently closed"
            mpReceiverCap.check() : "Invalid MintPass NFT Receiver"
            self.dropDetails.containsKey(species) : "Species requested not available"  
            self.dropDetails[species]?.quantityRemaining! >= 1 : "Species requested, already sold out!"
            self.dropDetails[species]?.price == funds.balance : "Incorrect amount of funds provided."
        }
        // when the whitelist is active and the sale isn't open yet we check the address in the whitelist 
        if self.whitelistIsActive && !self.saleIsOpen {
            assert(self.whitelist.contains(mpReceiverCap.address) , message: "Address not found in whitelist!")
        }

        let presaleVaultRef = self.account.borrow<&FlowToken.Vault>(from: ArleeGenesisDrop.ArleeGenesisDropVaultStoragePath)!
        presaleVaultRef.deposit(from: <- funds )

        self.mintAndDeliverMP(species: species, mpReceiverCap: mpReceiverCap)
        emit VoucherPurchased(address: mpReceiverCap.address, species: species)
    }

    // Redeem MintPass Function
    // 
    // Public function to claim a voucher and mint an Arlee.
    // Passing the ipfsCID for the Skin as well as a name and description.
    //
    pub fun redeemMintPass(mintpass: @ArleeMintPass.NFT, arleeReceiverCap: Capability<&{ArleeNFT.ArleeCollectionPublic}>, ipfsCID: String, name: String, description: String) {
        pre {
            self.redemptionIsOpen : "Redemption is currently paused!"
            name.length >= 3 : "Name must be at least 3 characters!"
            description.length >= 30 : "Description must be at least 30 characters!"
        }
        let minterRef = ArleeGenesisDrop.account.borrow<&ArleeNFT.NFTMinter>(from: ArleeNFT.MinterStoragePath)!
        let itemsMinterRef = ArleeGenesisDrop.account.borrow<&ArleeItems.NFTMinter>(from: ArleeItems.MinterStoragePath)!
        let arleeReceiver = arleeReceiverCap.borrow()

        let wardrobeSize = ArleeGenesisDrop.dropDetails[mintpass.species]?.wardrobeSize!
        let maxNameChange = ArleeGenesisDrop.dropDetails[mintpass.species]?.maxNameChange!
        let points = ArleeGenesisDrop.dropDetails[mintpass.species]?.points!
        let level = ArleeGenesisDrop.dropDetails[mintpass.species]?.level!


        minterRef.mintNFT(recipient: arleeReceiver!, species: mintpass.species, originalArtist: arleeReceiverCap.address, ipfsCID: ipfsCID, name: name, description: description, 
            wardrobeSize: wardrobeSize, maxNameChange: maxNameChange, points: points, level: level)
        
        emit VoucherRedeemed(address: arleeReceiverCap.address, species: mintpass.species, name: name, ipfsCID: ipfsCID )
        
        destroy mintpass
    }

    pub fun getSaleStatus() : {String:VoucherMeta} {
        return self.dropDetails
    }

    pub fun getVoucherPrice(species: String) : UFix64 {
        pre {
            self.dropDetails[species] != nil : "Species not found: ".concat(species)
        }
        return self.dropDetails[species]!.price
    }

    // Mint and Deliver MP function
    // 
    // Internal function to mint and deliver the mintpass nft 
    // called by public purchase function and admin resource
    //
    access(contract) fun mintAndDeliverMP(species: String, mpReceiverCap: Capability<&{ArleeMintPass.ArleeMintPassCollectionPublic}>) {
         pre {
            mpReceiverCap.check() : "Invalid MintPass NFT Receiver"
            self.dropDetails.containsKey(species) : "Species requested not available"  
            self.dropDetails[species]?.quantityRemaining! >= 1 : "Species requested, already sold out!"
        }
        let mpMinter = self.account.borrow<&ArleeMintPass.NFTMinter>(from: ArleeMintPass.MinterStoragePath)!
        mpMinter.mintNFT(recipient: mpReceiverCap.borrow()!, species: species, ipfsCID: self.dropDetails[species]?.ipfsCID!)
        self.dropDetails[species]?.decreaseQuantityRemaining()
    }



    // Admin resource for handling the sale and redemption 
    //
    pub resource Admin {
        pub fun addSpecies(name: String, ipfsCID: String, price: UFix64, quantity: UInt, wardrobeSize: UInt64, maxNameChange: UInt64, points: UInt64, level: UInt64) {
            let packDetails = VoucherMeta(species: name, ipfsCID: ipfsCID, price: price, quantityRemaining: UInt(quantity), wardrobeSize: wardrobeSize, maxNameChange: maxNameChange, points: points, level: level)
            ArleeGenesisDrop.dropDetails.insert(key: name, packDetails)
        }
        pub fun removeSpecies( name: String ) {
            ArleeGenesisDrop.dropDetails.remove(key: name)
        } 
        pub fun toggleSaleIsActive() {
            ArleeGenesisDrop.saleIsOpen = !ArleeGenesisDrop.saleIsOpen
        }        
        pub fun toggleWhitelistIsActive() {
            ArleeGenesisDrop.whitelistIsActive = !ArleeGenesisDrop.whitelistIsActive
        }
        pub fun replaceWhitelist(addresses: [Address]) {
            ArleeGenesisDrop.whitelist = addresses
        }
        pub fun appendToWhitelist(addresses: [Address]) {
            ArleeGenesisDrop.whitelist.appendAll(addresses)
        }
        pub fun toggleRedemptionIsActive() {
            ArleeGenesisDrop.redemptionIsOpen = !ArleeGenesisDrop.redemptionIsOpen
        }
        pub fun giftMintPass(species: String, mpReceiverCap: Capability<&{ArleeMintPass.ArleeMintPassCollectionPublic}>) {
            ArleeGenesisDrop.mintAndDeliverMP(species: species, mpReceiverCap: mpReceiverCap)
        }
    }

    // Contract Initalization
    //
    init() {
        self.ArleeGenesisDropAdminStoragePath = /storage/ArleeGenesisDropAdmin
        self.ArleeGenesisDropVaultStoragePath = /storage/ArleeGenesisDropFlowVault
        self.PresaleVaultBalancePublicPath = /public/ArleeGenesisDropVaultBalance
        self.dropDetails = {}
        self.whitelist = []
        self.whitelistIsActive = false
        self.saleIsOpen = false
        self.redemptionIsOpen = false
       
        let adminResource <- create Admin()

        // common
        adminResource.addSpecies(name: "Pig", ipfsCID: "pigVoucherThumbanil.png", 
            price: 80.0, quantity: 2000, wardrobeSize: 1, maxNameChange: 1, points: 100, level: 1) // 100 points ~= 15 votes a day

        adminResource.addSpecies(name: "Turtle", ipfsCID: "turtleVoucherThumbnail.jpg", 
            price: 80.0, quantity: 2000, wardrobeSize: 1, maxNameChange: 1, points: 100, level: 1)

        adminResource.addSpecies(name: "Elephant", ipfsCID: "elephantVoucherThumbnail.jpg", 
            price: 80.0, quantity: 2000, wardrobeSize: 1, maxNameChange: 1, points: 100, level: 1)

        // rare
        adminResource.addSpecies(name: "Deer", ipfsCID: "deerVoucherThumbnail.jpg", 
            price: 150.0, quantity: 1000, wardrobeSize: 2, maxNameChange: 2, points: 200, level: 1) // 200 points ~= 30 votes a day

        // epic
        adminResource.addSpecies(name: "Bird", ipfsCID: "birdVoucherThumbnail.jpg", 
            price: 250.0, quantity: 500, wardrobeSize: 3, maxNameChange: 3, points: 100, level: 1) // 300 points ~= 45 votes a day
        
        // legendary
        adminResource.addSpecies(name: "Shiba", ipfsCID: "shibaVoucherThumbnail.jpg",
            price: 400.0, quantity: 250, wardrobeSize: 5, maxNameChange: 10, points: 100, level: 1) // 500 points ~= 75 votes a day

        // remove old admin if updating contract
        if let oldAdmin <- self.account.load<@Admin>(from: self.ArleeGenesisDropAdminStoragePath) {
            destroy oldAdmin       
        }
        self.account.save(<- adminResource, to: self.ArleeGenesisDropAdminStoragePath)

        // setup genesis vault (checks old vault in case of updating contract)
        if let oldVault <- self.account.load<@FungibleToken.Vault>(from: self.ArleeGenesisDropVaultStoragePath) {
            self.account.save(<- oldVault, to: self.ArleeGenesisDropVaultStoragePath)
        } else {
            self.account.save(<- FlowToken.createEmptyVault(), to: self.ArleeGenesisDropVaultStoragePath)
        }

         self.account.link<&FlowToken.Vault{FungibleToken.Balance}>(
            self.PresaleVaultBalancePublicPath,
            target: self.ArleeGenesisDropVaultStoragePath
        )
        
    }
}
 