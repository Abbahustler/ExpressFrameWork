const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const members = require("../../Members");

//get all members
router.get("/", (req, res) => res.json({ members }));

//Get some members
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.sendStatus(403).json({
      message: `No member with the id ${req.params.id}`
    });
  }
});

//Create members
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  } else {
    members.push(newMember);
    res.redirect("/");
  }
});

//Update members
router.put("/:id", (req, res) => {
  const found = members.some(member => (member.id = parseInt(req.params.id)));
  updMember = req.body;
  if (found) {
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: "Member Updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No user with ${req.params.id}` });
  }
});

//Delete Member
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "Members Deleted",
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.sendStatus(403).json({
      message: `No member with the id ${req.params.id}`
    });
  }
});

module.exports = router;
