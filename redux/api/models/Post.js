const mongoose  = require("mongoose");

const PostSchema = new mongoose.Schema({
  
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title : {
        type: String,
        required: true,
        unique: true,
    },
    desc : {
        type: String,
        required: true,
    },
    photo : {
        type: String,
        required: false,
    },
    categories : {
        type: String,
        required: false,
    },

},   
{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);