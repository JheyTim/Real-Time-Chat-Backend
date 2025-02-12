const Group = require('../models/Group');

exports.createGroup = async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: 'Group name is required.' });
      }
  
      // Create the group, setting the creator as a member too
      const newGroup = await Group.create({
        name,
        createdBy: req.user.id,         // from your auth middleware (JWT)
        members: [req.user.id],         // include creator by default
      });
  
      return res.status(201).json({
        message: 'Group created successfully.',
        group: newGroup,
      });
    } catch (error) {
      console.error('Error creating group:', error);
      return res.status(500).json({ message: 'Failed to create group.' });
    }
  };
  
  // Join an existing group
  exports.joinGroup = async (req, res) => {
    try {
      const { groupId } = req.body;
      if (!groupId) {
        return res.status(400).json({ message: 'Group ID is required.' });
      }
  
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ message: 'Group not found.' });
      }
  
      // Check if user is already a member
      const isAlreadyMember = group.members.some(
        (memberId) => memberId.toString() === req.user.id
      );
  
      if (isAlreadyMember) {
        return res.status(400).json({ message: 'User is already a member of this group.' });
      }
  
      // Add user to the group
      group.members.push(req.user.id);
      await group.save();
  
      return res.status(200).json({
        message: 'Successfully joined the group.',
        group,
      });
    } catch (error) {
      console.error('Error joining group:', error);
      return res.status(500).json({ message: 'Failed to join group.' });
    }
  };