import { User } from "../models/userModel.js";

const handleGetAllUser = async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).json({allUser});
  } catch (error) {
    res.status(500).json({massage: error})
  }
};

const handleDeleteUser = async (req, res) => {
  try {
    const {targetedEmail} = req.body;
    console.log(targetedEmail)

    const targetedUser = await User.findOne({ _id: targetedEmail });
    
    if(!targetedUser){
      return res.status(404).json({ massage: "Not found targeted email in database" });
    }

    const isDeleted = await User.deleteOne({ _id: targetedUser._id });
    
    if(!isDeleted){
      return res.status(404).json({ massage:` Error in deleting record for ${targetedUser._id}`});
    }

    return res.status(200).json({massage: `Removed ${targetedEmail} from database`});
  } catch (error) {
    res.status(500).json({ massage: error });
  }
};

export {handleGetAllUser, handleDeleteUser}