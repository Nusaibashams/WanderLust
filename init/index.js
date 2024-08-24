const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../Model/listing.js");

//conntion with mongodb
main().then(()=>{
    console.log("connection successfull")
})
.catch((err) => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/WanderLust');
}

const initDB = async()=>{
   await Listing.deleteMany({});
   initData.data =initData.data.map((ob)=>({...ob,owner:"66c7ec9a1f2b5572da5c4d32"}));
   await Listing.insertMany(initData.data);
   console.log("data was initialized");
}
initDB();