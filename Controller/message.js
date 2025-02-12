const express = require('express');
const mongoose = require('mongoose');
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const { getRecieverSocketId, io } = require('../Socket');

module.exports.sendmsg = async (req, res) => {
  console.log("msg send", req.body);
  const { id: receiverId } = req.params;
  const senderId = req.user.id;

  if (!req.body) {
    return res.json({ msg: "server error", success: false });
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [receiverId, senderId] }
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [receiverId, senderId]
    });
  }

  try {
    const newMsg = new Message({
      senderId,
      receiverId,
      messages: req.body.data
    });
    await newMsg.save();
    console.log(newMsg);

    conversation.messages.push(newMsg._id);
    await conversation.save();

    const receiverSocketId = getRecieverSocketId(receiverId);
    console.log("receiverSocketId", receiverSocketId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMsgs", newMsg);
    }

    const senderSocketId = getRecieverSocketId(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMsg", newMsg);
    }

    return res.json({ msg: newMsg, success: true });

  } catch (error) {
    return res.json({ msg: "Error in sending msg", success: false });
  }
};

module.exports.getmsg = async (req, res) => {
  const { id: receiverId } = req.params;
  const senderId = req.user.id;

  if (!req.body) {
    return res.json({ msg: "server error", success: false });
  }

  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId] }
    }).populate("messages");

    if (conversation) {
      if (conversation.messages.length > 0) {
        return res.json({ msgs: conversation.messages, success: true });
      } else {
        return res.json({ msgs: [], success: true }); // Explicitly return an empty array
      }
    } else {
      return res.json({ msgs: [], success: true }); // No conversation, return empty array
    }
  } catch (error) {
    return res.json({ msg: "Error in sending msg", success: false });
  }
};
