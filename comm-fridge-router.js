const e = require('express');
const express = require('express');
const path = require('path');
let router = express.Router();
const app = express();

app.use(express.json());
const Afridge = require("./comm-fridge-ex.js");

router.get("/", function(req, res, next){

    if(req.accepts('html')) {
          res.sendFile(path.join(__dirname, './view_pickup.html'));
          res.status(200);
    }else if(req.accepts('json')){
        let allfridges = Afridge.getFridges();
        if(allfridges !== undefined){    
            console.log(allfridges);
		    res.status(200);
            res.set("Content-Type", "application/json");
            res.json(allfridges);
        }
        else{
            res.status(404);
        }
    }else{
        res.status(500)
    }
});

router.get("/addFridge", function(req, res, next){
    if(req.accepts('html')) {    
            res.sendFile(path.join(__dirname, './addFridge.html'));
            res.status(200)
            console.log("Success!");
    }else{
        res.status(500);
    }
});

router.get("/editFridge", function(req, res, next){
    if(req.accepts('html')) {    
        res.sendFile(path.join(__dirname, './editFridge.html'));
        res.status(200);
        console.log("Success!");
    }
});

router.post("/", express.json(), function(req,res,next){
    console.log("Doing /POST request");
	let name = req.body.name;

	if(name === undefined){
		res.status(500).send("#undefined");
	}
    let result = Afridge.createFridge(name);
		if(result === undefined){
			res.status(400).send("TRY AGAIN");
		}
		else{ 
			res.status(200).set("Content-Type", "application/json").json(result);
		}
});

router.get("/:fridgeID", function(req, res, next){
    fid = req.params.fridgeID;
    if(req.accepts('json')){
        fid = req.params.fridgeID;
        let allfridges = Afridge.findFridge(fid);
        if(allfridges !== undefined){
			console.log(allfridges);
			res.status(200).set("Content-Type", "application/json").json(allfridges);
		}
		else{
			res.status(500).send();
		}
  }
});

router.put("/:fridgeID", express.json(), function(req,res,next){
    console.log("Doing /PUT request");
	let name = req.body.name;
    let count = req.body.can_accept_items
    let id = req.params.fridgeID;

	if(name === undefined || count === undefined){
		res.status(500).send("#undefined");
	}
    else{
        let result = Afridge.updateFridge(id,req.body);
		if(result === undefined){
			res.status(400).send("TRY AGAIN");
		}
		else{ 
			res.status(200).set("Content-Type", "application/json").json(result);
		}
    }
});

router.post("/:fridgeID/items", express.json(), function(req,res,next){
    console.log("Doing /POST request for a new item");
	let id = req.params.fridgeID;
    let item = req.body.items.id;

        fid = req.params.fridgeID;
        let allfridges = Afridge.findFridge(fid);
        if(allfridges !== undefined){
			let result = Afridge.createItem(fid,item);
		    if(result === undefined){
			    res.status(400).send("TRY AGAIN");
		    }
		    else{ 
			    res.status(200).set("Content-Type", "application/json").json(result);
		    }
	    }

		else{
			res.status(500).send();
		}
});
router.delete("/:fridgeID/items",express.json(), function(req, res, next){
    let query = req.query;
    let fid = req.params.fridgeID;

    if(Object.keys(query).length === 0){
		let result = Afridge.deleteFridge(fid);

		if(result === undefined){ // category does not exist
			res.status(404).send("#undefinedddd");
		}
		else{ // category successfully deleted
			res.status(200).send("The category was successfully deleted.");
		}
	}else{
        let itemIds = Object.keys(query);
		let result = "";

        for(iid of itemIds){
            let result = Afridge.deleteItem(fid,iid);
            if(result === undefined){break}
            
        }
        if(result === undefined){ // item does not exist
			res.status(404).send("#undefined2");
		}
		else{ 
			res.status(200).send("The items were successfully deleted.");
		}
	}
});

router.delete("/:fridgeID/:itemID", express.json(), function(req, res, next){
    let fid = req.params.fridgeID;
    let iid = req.params.itemID;
    let result = Afridge.deleteItem(fid,iid);

    if(result === undefined){ 
		res.status(500).send("#undefined");
        console.log("isn't working");
	}
	else{ 
		res.status(200).send();
	}
});



module.exports = router;

