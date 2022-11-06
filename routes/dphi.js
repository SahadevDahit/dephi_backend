const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Dphi = require("../model/DPhi");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    let challenges = new Dphi({
      challengeName: req.body.challengeName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      levelType: req.body.levelType,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    await challenges.save();
    res.json({
      status: 200
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let data = await Dphi.find();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    // Find user by id
    let challenges = await Dphi.findById(req.params._id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(challenges.cloudinary_id);
    // Delete user from db
    await challenges.remove();
    res.json(challenges);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:_id", upload.single("image"), async (req, res) => {
  try {


    let challenges = await Dphi.findById(req.params._id);
    //Delete image from cloudinary
    //Upload image to cloudinary
    let result;
    let dataUpdate;
    if (req.file) {
      await cloudinary.uploader.destroy(challenges.cloudinary_id);
      result = await cloudinary.uploader.upload(req.file.path);
      dataUpdate = {
        challengeName: req.body.challengeName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        levelType: req.body.levelType,
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
      };
    } else {
      dataUpdate = {
        challengeName: req.body.challengeName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        levelType: req.body.levelType,
      };
    }

    await Dphi.findByIdAndUpdate(req.params._id, dataUpdate, {
      new: true
    });
    res.json({
      status: 200
    });
  } catch (err) {
    console.log(err);
  }
});


router.get("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await Dphi.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;