// Presale manager Contract 
//

import FUSD from "./FUSD.cdc"
import FungibleToken from "./FungibleToken.cdc"
import NonFungibleToken from "./NonFungibleToken.cdc"
import ArleeNFT from "./ArleeNFT.cdc"
import ArleeItems from "./ArleeItems.cdc"

pub contract ArleePresale {

    pub let ArleePresaleVaultStoragePath: StoragePath

    access(contract) var saleIsOpen : Bool
    
    access(contract) var packs : {String:PackDetails}

    access(contract) var items: {String: ArleeItems.ArleeItemMeta}
    
    pub event Purchased( address: Address, packType: String )

    pub let ArleePresaleAdminStoragePath: StoragePath
    pub let PresaleVaultBalancePublicPath: PublicPath

    pub struct PackDetails {
        pub let name: String
        pub let price : UFix64
        pub var quantity: UInt
        pub var contents: {String: UInt64}
        pub var items: {String: UInt64}

        init(name: String, price: UFix64, quantity: UInt, contents: {String: UInt64}, items: {String:UInt64}) {
            self.name = name
            self.price = price
            self.quantity = quantity
            self.contents = contents
            self.items = items
        }
    }

    pub fun purchasePack( packType: String, funds: @FUSD.Vault, arleeReceiverCap: Capability<&{ArleeNFT.ArleeCollectionPublic}>, itemsReceiverCap: Capability<&{ArleeItems.ArleeItemsCollectionPublic}> ) {
        pre {
            arleeReceiverCap.check() : "Arlee NFT Receiver failed check."
            itemsReceiverCap.check() : "ArleeItems NFT Receiver failed check."
            self.saleIsOpen == true : "Sale is currently closed"
            self.packs.containsKey(packType) : "Pack type requested not available"  
        }

        let packName = self.packs[packType]!.name
        let packPrice = self.packs[packType]!.price
        let packsRemaining = self.packs[packType]!.quantity
        let packContents = self.packs[packType]!.contents
        let packItems = self.packs[packType]!.items

        assert( packsRemaining > 0, message: "No more packs of requested type remaining")   
        assert( funds.balance == packPrice, message: "Insufficent funds received for purchase")
        
        let presaleVaultRef = self.account.borrow<&FUSD.Vault>(from: ArleePresale.ArleePresaleVaultStoragePath)!
        presaleVaultRef.deposit( from: <- funds )

        let updatedPackDetails = PackDetails( name: packName, price: packPrice, quantity: UInt(packsRemaining - 1), contents: packContents, items: packItems)   
        self.packs[packType] = updatedPackDetails

        self.fulfillPack(arleeReceiverCap: arleeReceiverCap, itemsReceiverCap: itemsReceiverCap, packDetails: updatedPackDetails)
        
        emit Purchased( address: arleeReceiverCap.address, packType: packType )
    }

    access(contract) fun fulfillPack(arleeReceiverCap: Capability<&{ArleeNFT.ArleeCollectionPublic}>, itemsReceiverCap: Capability<&{ArleeItems.ArleeItemsCollectionPublic}>, packDetails: PackDetails) {
        let minterRef = ArleePresale.account.borrow<&ArleeNFT.NFTMinter>(from: ArleeNFT.MinterStoragePath)!
        let itemsMinterRef = ArleePresale.account.borrow<&ArleeItems.NFTMinter>(from: ArleeItems.MinterStoragePath)!
        let arleeReceiver = arleeReceiverCap.borrow()
        let itemsReceiver = itemsReceiverCap.borrow()

        for key in packDetails.contents.keys {
            let species = key
            var quantityToMint = packDetails.contents[key]!
            while quantityToMint > 0 {
                minterRef.mintNFT(recipient: arleeReceiver!, species: species, originalArtist: arleeReceiverCap.address)
                quantityToMint = quantityToMint - 1
            }
        }

        for key in packDetails.items.keys {
            var quantityToMint = packDetails.items[key]!
            let itemDetails = ArleePresale.items[key] ?? panic("invalid item!")
            while quantityToMint > 0 {
                itemsMinterRef.mintNFT(recipient: itemsReceiver!, name: key, description: itemDetails.description, ipfsCID: itemDetails.ipfsCID)
                quantityToMint = quantityToMint - 1
            }
        }
    }

    pub fun getSaleStatus() : {String:PackDetails} {
        return self.packs
    }

    pub fun getPackPrice( packName: String ) : UFix64 {
        pre {
            self.packs[packName] != nil
        }
        return self.packs[packName]!.price
    }



    pub resource Admin {
        pub fun addPack( name: String, price: UFix64, quantity: UInt, contents: {String:UInt64}, items: {String:UInt64}) {
            let packDetails = PackDetails(name: name, price: price, quantity: UInt(quantity), contents: contents, items: items)
            ArleePresale.packs.insert( key: name, packDetails)
        }
        pub fun removePack( name: String ) {
            ArleePresale.packs.remove(key: name)
        } 
        pub fun updatePack( name: String, price: UFix64, quantity: UInt, contents: {String:UInt64}, items: {String:UInt64}) {
            ArleePresale.packs[name] = PackDetails(name: name, price: price, quantity: quantity, contents: contents, items: items)
        }

        pub fun addItem(name: String, desciption: String, ipfsCID: String) {
            ArleePresale.items.insert(key: name, ArleeItems.ArleeItemMeta(id: 0, name: name, desciption: desciption, ipfsCID: ipfsCID))
        }
        pub fun updateItem() {

        }
        pub fun removeItem() {

        }

        pub fun activateSale() {
            ArleePresale.saleIsOpen = true
        }
        pub fun deactivateSale() {
            ArleePresale.saleIsOpen = false
        }
    }


    init() {
        self.ArleePresaleAdminStoragePath = /storage/ArleePresaleAdmin
        self.ArleePresaleVaultStoragePath = /storage/PresaleFUSDVault
        self.PresaleVaultBalancePublicPath = /public/presaleVaultBalance

        self.saleIsOpen = false
        self.packs = {}
        self.items = {}
       
        let adminResource <- create Admin()

        adminResource.addItem(name: "Wand", desciption: "A magic wand!", ipfsCID: "0x1234")
        adminResource.addItem(name: "Spray Can", desciption: "A spray can!", ipfsCID: "0x23fjj")

        adminResource.addPack( name: "Diamond", price: 100.0, quantity: 100, contents: {
            "Shiba Inu": 1,
            "Turtle": 2,
            "Parrot": 3
        }, items: {
            "Wand": 1,
            "Spray Can": 2
        })
        adminResource.addPack( name: "Gold", price: 50.0, quantity: 500, contents: {
            "Turtle": 1,
            "Parrot": 2
        }, items: {
            "Wand": 1,
            "Spray Can": 2
        })
       
        self.account.save( <- adminResource, to: self.ArleePresaleAdminStoragePath)

        self.account.save( <- FUSD.createEmptyVault(), to: self.ArleePresaleVaultStoragePath )
         self.account.link<&FUSD.Vault{FungibleToken.Balance}>(
            self.PresaleVaultBalancePublicPath,
            target: self.ArleePresaleVaultStoragePath
        )
        
    }
}