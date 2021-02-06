var db = new PouchDB('IMSDB');

// Get data call from database
function GetDataSet (values){
	return new Promise(resolve => { 		
		var result = db.find({
			  selector: values,			
			});
		resolve(result);			
})};