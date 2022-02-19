// Presale manager Contract 
//
// Pack availablilty is tracked here and the fulfillment server monitors Purchased events to actually mint and deliver the pack contents. 

import FUSD from "./FUSD.cdc"

pub contract ArlequinPresale {

    pub let ArlequinPresaleVaultStoragePath: StoragePath

    access(contract) var saleIsOpen : Bool
    
    access(contract) var packs : {String:PackDetails}

    // used to rate limit purchases
    access(contract) var addressInQueue : {Address : Bool}

    access(contract) var nextOrderID : UInt64
    
    pub event Purchased( orderNumber: UInt64, address: Address, packType: String )

    pub let ArlequinPresaleAdminStoragePath : StoragePath

    pub fun purchaseArlee( packType: String, funds: @FUSD.Vault, userAddress: Address ) {
        pre {
            self.saleIsOpen == true : "Sale is currently closed"
            self.packs.containsKey(packType) : "Pack type requested not available"  
            !self.addressInQueue.containsKey(userAddress) : "Address has purchase in process please wait until delivered!"
        }

        let packPrice = self.packs[packType]!.price
        let packsRemaining = self.packs[packType]!.quantity

        assert( packsRemaining > 0, message: "No more packs of requested type remaining")   
        assert( funds.balance >= packPrice, message: "Insufficent funds received for purchase")
        
        let presaleVaultRef = self.account.borrow<&FUSD.Vault>(from: ArlequinPresale.ArlequinPresaleVaultStoragePath)!
        presaleVaultRef.deposit( from: <- funds )

        let updatedPackDetails = PackDetails( price: packPrice, quantity: UInt(packsRemaining - 1)
)        
        self.packs[packType] = updatedPackDetails

        self.nextOrderID = self.nextOrderID + 1
        
        self.addressInQueue.insert( key: userAddress, true ) 

        emit Purchased( orderNumber: self.nextOrderID, address: userAddress, packType: packType )
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

    pub fun getQueue() : {Address:Bool} {
        return self.addressInQueue
    }

    pub struct PackDetails {
        pub let price : UFix64
        pub var quantity: UInt

        init(price: UFix64, quantity: UInt) {
            self.price = price
            self.quantity = quantity
        }
    }

    pub resource Admin {
        pub fun addPack( name: String, price: UFix64, quantity: UInt) {
            let packDetails = PackDetails(price: price, quantity: UInt(quantity))
            ArlequinPresale.packs.insert( key: name, packDetails)
        }
        pub fun removePack( name: String ) {
            ArlequinPresale.packs.remove(key: name)
        } 
        pub fun updatePack( name: String, price: UFix64, quantity: UInt) {
            ArlequinPresale.packs[name] = PackDetails(price: price, quantity: quantity)
        }
        pub fun activateSale() {
            ArlequinPresale.saleIsOpen = true
        }
        pub fun deactivateSale() {
            ArlequinPresale.saleIsOpen = false
        }

        // Called once Arlequin is minted and pack purchase is completed
        pub fun purchaseComplete(userAddress: Address) {
            ArlequinPresale.addressInQueue.remove( key: userAddress ) 
        }

    }


    init() {
        self.ArlequinPresaleAdminStoragePath = /storage/ArlequinPresaleAdmin
        self.ArlequinPresaleVaultStoragePath = /storage/PresaleFUSDVault
        self.saleIsOpen = false
        self.packs = {}
        self.nextOrderID = (0 as UInt64)
        self.addressInQueue = {}

        let adminResource <- create Admin()
        adminResource.addPack( name: "Diamond", price: 100.0, quantity: 300)
        adminResource.addPack( name: "Gold",    price:  50.0, quantity: 600)
        adminResource.addPack( name: "Silver",  price:  10.0, quantity: 900)

        self.account.save( <- adminResource, to: self.ArlequinPresaleAdminStoragePath)

        self.account.save( <- FUSD.createEmptyVault(), to: self.ArlequinPresaleVaultStoragePath )
        
    }
}