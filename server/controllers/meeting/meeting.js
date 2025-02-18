const MeetingHistory = require('../../model/schema/meeting');
const mongoose = require('mongoose');

const add = async (req, res) => {
    try {
        const meeting = new MeetingHistory(req.body);
        await meeting.save();
        res.status(201).json({ message: "Meeting added successfully", meeting });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
   
// List all meetings


const index = async (req, res) => {
    try {
        const meetings = await MeetingHistory.find({ deleted: false });
        res.status(200).json(meetings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const view = async (req, res) => {
    try {
        const meeting = await MeetingHistory.findById(req.params.id)
        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }
        res.status(200).json(meeting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 //Soft delete a meeting

const deleteData = async (req, res) => {
    try {
        const meeting = await MeetingHistory.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }
        res.status(200).json({ message: "Meeting deleted successfully", meeting });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteMany = async (req, res) => {
    try {
        const { ids } = req.body;
        if (!ids || ids.length === 0) {
            return res.status(400).json({ message: "No meeting IDs provided" });
        }

        const result = await MeetingHistory.updateMany(
            { _id: { $in: ids } },
            { $set: { deleted: true } }
        );
        res.status(200).json({
            message: `${result.modifiedCount} meetings deleted successfully`,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { add, index, view, deleteData, deleteMany }