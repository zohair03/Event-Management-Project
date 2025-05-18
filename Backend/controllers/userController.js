import { User } from "../models/userModel.js";

const handleGetAllUser = async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).json({ allUser });
  } catch (error) {
    res.status(500).json({ massage: error });
  }
};

const handleUpdateUser = async (req, res) => {
  try {
    const user = req.body;
    if (!user) {
      return res.status(401).json({ massege: "Provide user details" });
    }

    const isUpdatedUser = await User.updateOne({ _id: user._id }, { $set: user });
    if (!isUpdatedUser) {
      return res.status(400).json({ massege: "Error in updating user" });
    }

    const newUser = await User.findOne({_id: user._id})
    if(!newUser){
      return res.status(400).json({ massege: "Error in updating user" });
    }

    res.status(200).json({ massege: `Updated user ${user.email}`, newUser });
  } catch (err) {
    cosole.log("error in update user api: ", err);
    res.status(500).json({ massege: "Server site error" });
  }
};

const handleDeleteUser = async (req, res) => {
  try {
    const { targetedEmail } = req.body;
    console.log(targetedEmail);

    const targetedUser = await User.findOne({ _id: targetedEmail });

    if (!targetedUser) {
      return res
        .status(404)
        .json({ massage: "Not found targeted email in database" });
    }

    const isDeleted = await User.deleteOne({ _id: targetedUser._id });

    if (!isDeleted) {
      return res
        .status(404)
        .json({ massage: ` Error in deleting record for ${targetedUser._id}` });
    }

    return res
      .status(200)
      .json({ massage: `Removed ${targetedEmail} from database` });
  } catch (error) {
    res.status(500).json({ massage: error });
  }
};

export { handleGetAllUser, handleDeleteUser, handleUpdateUser };
