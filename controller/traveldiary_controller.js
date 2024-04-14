const TravelDiary = require('../modal/travel_model');
const User = require('../modal/user_modal');
const jwt = require('jsonwebtoken');


class TravelDiaryController {
    travel_diary = async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'your_secret_key');
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const { title, description, date, location } = req.body;
            const newTravelEntry = new TravelDiary({
                user: user._id,
                title,
                description,
                date,
                location
            });
    
            await newTravelEntry.save();
    
            res.status(201).json({ message: 'Travel entry created successfully', travelEntry: newTravelEntry });
        } catch (error) {
            console.error('Error creating travel entry:', error);
            res.status(500).json({ message: 'An error occurred while creating the travel entry' });
        }
    }

    getTravelDiariesByUserId = async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'your_secret_key');
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const travelEntries = await TravelDiary.find({ user: user._id });
            res.status(200).json(travelEntries);
        } catch (error) {
            console.error('Error getting travel entries by user ID:', error);
            res.status(500).json({ message: 'An error occurred while getting travel entries by user ID' });
        }
    }

    deleteTravelEntry = async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'your_secret_key');
            const userId = decoded.id;
            
            const { id } = req.params;
            
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const travelEntry = await TravelDiary.findById(id);
            if (!travelEntry) {
                return res.status(404).json({ message: 'Travel entry not found' });
            }

            if (travelEntry.user.toString() !== userId) {
                return res.status(403).json({ message: 'Unauthorized: Travel entry does not belong to the user' });
            }

            await TravelDiary.deleteOne({ _id: id });

            res.status(200).json({ message: 'Travel entry deleted successfully' });
        } catch (error) {
            console.error('Error deleting travel entry:', error);
            res.status(500).json({ message: 'An error occurred while deleting the travel entry' });
        }
    }


    updateTravelEntry = async (req, res) => {
        try {
            // Decode user ID from authorization header
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'your_secret_key');
            const userId = decoded.id;
            
            // Extract travel entry ID from request parameters
            const { id } = req.params;
            
            // Check if the user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the travel entry exists
            const travelEntry = await TravelDiary.findById(id);
            if (!travelEntry) {
                return res.status(404).json({ message: 'Travel entry not found' });
            }

            // Check if the travel entry belongs to the user
            if (travelEntry.user.toString() !== userId) {
                return res.status(403).json({ message: 'Unauthorized: Travel entry does not belong to the user' });
            }

            // Extract updated fields from request body
            const { title, description, date, location } = req.body;
            
            // Update the travel entry
            travelEntry.title = title;
            travelEntry.description = description;
            travelEntry.date = date;
            travelEntry.location = location;
            
            // Save the updated travel entry
            await travelEntry.save();

            res.status(200).json({ message: 'Travel entry updated successfully', updatedTravelEntry: travelEntry });
        } catch (error) {
            console.error('Error updating travel entry:', error);
            res.status(500).json({ message: 'An error occurred while updating the travel entry' });
        }
    }
}

module.exports = new TravelDiaryController();
