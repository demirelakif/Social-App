var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var PostSchema = new Schema({
    title: { type: String},
    description: { type: String},
    imagePath:{type:String},
    owner: { type: String, required: true,ref: 'User'},
    createdAt: {type: Date,default: Date.now,},
    likes: [{ type: Schema.Types.Number,default:0 }]
},
    { timestamps: true }
);



module.exports = mongoose.model('Post', PostSchema);