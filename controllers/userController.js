const User = require('../models/user');
const { updateStatus } = require('./orderController');

const methods = {
    setStatus: async (req, res) => {
        try {
            const {status} = req.body;
            const id = req.params.id;
    
            await User.setStatus(id, status); 
        } catch(error) {
            console.error('Set status error:', error);
            return res.status(500).json({ success: false, message: 'An error occured.' });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { role, status } = req.body;
            const id = req.params.id;
    
            // Log the values to check if they are valid
            console.log('Updating user:', { id, role, status });
    
            // Validate the input
            if (!role || !status || !id) {
                return res.status(400).json({ success: false, message: 'Invalid input data.' });
            }
    
            await User.updateUser(id, role, status);
            return res.status(200).json({ success: true, message: 'Successfully updated the user' });
    
        } catch (error) {
            console.error('Update error:', error);
            return res.status(500).json({ success: false, message: 'An error occurred.' });
        }
    },
    
    setRole: async (req, res) => {
        try {
            const {role} = req.body;
            const id = req.params.id;

            await User.setRole(id, role);

            return res.status(200).json({ success: true, message: 'Role has been set!' });
        } catch(error) {
            console.error('Set status error:', error);
            return res.status(500).json({ success: false, message: 'An error occured.' });
        }
    },
    removeUser: async(req, res) => {
        try {
            const id = req.params.id;
            await User.removeUser(id);
            return res.status(200).json({success: true, message: 'User has been removed.'})
        } catch (error) {
            console.error('Removing user error: ', error);
            return res.status(500).json( { success: false, message: 'An error occured.'});
        }
    },
    displayAllUser: async(req, res) => {
        try {
            const users = await User.findAll();
            res.render('users', {
                users,
                title: 'User manager'
            })
        } catch (error) {
            console.error('Error displaying users: ', error);
            return res.status(500).json({success:false, message: 'An error occured.'})
        }
    }
}

module.exports = methods;