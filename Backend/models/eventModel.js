import mongoose from "mongoose"

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  

},{timestamps:true});

const Event = mongoose.model('Event',userSchema);
export {Event}