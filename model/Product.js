const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
      title : {type : String, required : true, unique : true},
      description : {type : String, required : true},
      price : {type : Number, min: [1,'Please Provide a greater number in Price'],max:[10000,'Please Provide a less number in Price'],required : true},
      discountPercentage : {type : Number, min: [1,'Please Provide a greater number in discount'],max:[100,'Please Provide a less number in discount']},
      rating : {type : Number, min: [0,'Please Provide a greater number in rating'],max:[5,'Please Provide a less number in rating'],default : 0},
      stock : {type : Number, min: [0,'Please Provide a greater number in rating'],default : 0},
      category : {type : String, required : true},
      brand : {type : String, required : true},
      thumbnail : {type : String, required : true},
      images : [String],
      isDeleted : {type : Boolean, default : false},
})

const virtual = productSchema.virtual('id');

virtual.get(function(){
    return this._id;
})

productSchema.set('toJSON',{
    virtuals : true,
    versionKey : false,
    transform : function(doc,ret) { delete ret._id}
})

exports.Product = mongoose.model('Product',productSchema)
