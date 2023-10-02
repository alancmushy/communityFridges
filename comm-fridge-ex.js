var file = require("fs");

function readFridges() {
    let filePath = "js/comm-fridge-data.json";
    if (file.existsSync(filePath)) {
      let content = file.readFileSync(filePath);
      let commfridge = JSON.parse(content);
      return commfridge;
     }
   return undefined;
}

exports.createFridge = function(fridgeName){
    let allthefridges = readFridges();
    let commfridge = allthefridges.find(
        function findCommFridge(comm) {
          return comm.name === fridgeName;
        });
      if(commfridge !== undefined){
        console.log("fridge already exists");
        return undefined;
      }else{
        let newID = parseInt(allthefridges[allthefridges.length - 1].id) + 1;
        console.log(newID);
        let newFridge = {"name": fridgeName, "can_accept_items": 0, "accepted_types": [, ], "contact_person": " ","contact_phone": " ","address": {"street": " ","postal_code": " ","city": " ", "province": " "}};
      allthefridges.push(newFridge);
      let result = writeFridge(allthefridges);
      return newFridge;
    }
}

exports.createItem = function(fridgeID, itemID){
    let allthefridges = readFridges();
    let commfridge = allthefridges.find(
        function findCommFridge(comm) {
          return comm.id === fridgeID;
        });
    let newItem = {
        "id": itemID, "quantity": 0
    }

    commfridge.items.push(newItem);
    let result = writeFridge(allthefridges);
    return newItem;
}

function writeFridge(allthefridges) {
    let filePath = "js/comm-fridge-data.json";
    let result = undefined;
 
    if(file.existsSync(filePath)) {
      result = file.writeFileSync(filePath, JSON.stringify(allthefridges));
    }
   return result;
 }

 


 exports.getFridges = function() {
    console.log("Returning all categories...");
    let allthefridges = readFridges();
    if (allthefridges !== undefined) {
        return allthefridges;
    }
 }

 exports.findFridge = function(id,name){
    console.log(id);
    let allthefridges = readFridges();
    if(allthefridges !== undefined){
        for(let onefridge of allthefridges){
            if(onefridge.id === id){
                return onefridge;
            }
        }
  }
    return undefined;
}


exports.updateFridge = function(id,fridgeData){
    let allthefridges = readFridges();
    let fridges = allthefridges.find(
        function findCommFridge(comm) {
          return comm.id === id;
        });
    if(fridges != undefined){
        fridges.name = fridgeData.name;
        fridges.can_accept_items = fridgeData.can_accept_items;

        let newdata = writeFridge(allthefridges);
        return fridges;
    }
    return undefined;
}

exports.deleteItem = function(fridgeID,itemID){
    let allthefridges = readFridges();
    let commfridge = allthefridges.find(
        function findCommFridge(comm) {
          return comm.id === fridgeID;
        });
    let fridgeItem = commfridge.items.find(
    function findItem(anItem) {
        return anItem.id === itemID;
    }
  );
  if(commfridge !== undefined && fridgeItem !== undefined){
    // remove the item
    let fItems = commfridge.items;
	let itemIndex = fItems.indexOf(fridgeItem);
    console.log(fItems);
    console.log("_______________________");

    if (itemIndex !== -1) {
		    fItems.splice(itemIndex, 1);
		}
		console.log(fItems);
    commfridge.items = fItems;

    let result = writeFridge(allthefridges);
    return commfridge;
  }
  return undefined;

}
exports.deleteFridge = function(fridgeID){
    let allthefridges = readFridges();
    let commfridge = allthefridges.find(
        function findCommFridge(comm) {
          return comm.id === fridgeID;
        });
    console.log(allthefridges.name);
    if(commfridge !== undefined){
        fridgestheall = allthefridges;
        let findex = fridgestheall.indexOf(commfridge);
        if(findex != -1){
            fridgestheall.splice(findex, 1);
        }
        console.log(fridgestheall);
        allthefridges = fridgestheall;
        let result = writeFridge(allthefridges);
        return allthefridges;
    }
    return undefined;
}
