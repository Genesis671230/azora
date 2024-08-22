const express = require("express");
const user = require("./userAuth");
const auth = require("../../middelwares/auth");

const router = express.Router();

router.post("/admin-register", user.adminRegister);
router.get("/", auth, user.index);


router.post(
  "/register",
  user.upload.fields([
    {
      name: "profilePicture",
      maxCount: 1,
    },
   
  ]),
  user.register
);
router.post("/login", user.login);
router.post("/deleteMany", auth, user.deleteMany);
router.get("/view/:id", auth, user.view);
router.delete("/delete/:id", auth, user.deleteData);
router.put(
  "/edit/:id",
  auth,
  user.upload.fields([
    {
      name: "profilePicture",
      maxCount: 1,
    },
   
  ]),
  user.edit
);
router.use("/user-documents", express.static("uploads/User/UserDocuments"));
module.exports = router;
