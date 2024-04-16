const Comment = require('../models/comment');
const User = require('../models/userModel');

exports.create =  (req, res, next) => {
   
   
         User.create(req.body).then((result)=>{
            console.log(req.body); 
            res.status(201).json(result); 
         }).catch((err)=>{
            console.error("Error creating user:", err);
            res.status(500).json({ message: "Internal server error" });
         })
        
       
    
};

exports.getAll = (req, res, next) => {
  
        
        User.findAll().then((result)=>{
            res.status(200).json(result);
        }).
       
        
    catch ((error) =>{
        
        console.error("Error retrieving appointments:", error);
        res.status(500).json({ message: "Internal server error" });
    })
};

/*exports.addComment = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const comment = req.body.comment;
  
      // Find the user by ID
      const user = await User.findByPk(userId);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Add the comment to the user's comments array
      user.comments.push(comment);
  
      // Save the updated user object
      await user.save();
  
      res.status(201).json({ message: "Comment added successfully" });
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };*/

  exports.addComment = (req, res) => {
    console.log(req.body)
    const { postId } = req.params;
    console.log(postId);
    const { comment } = req.body;
  
    
       User.findByPk(postId).then((result) =>{
        if (!result) {
          return res.status(404).json({ error: 'Blog post not found' });
        }
         const newComment = Comment.create({
          comment: comment,
          blogId: postId 
        });
    
        return res.status(201).json({ message: 'Comment added successfully', comment: newComment });
       }).catch ((error) =>{
        console.error('Error adding comment:', error);
        return res.status(500).json({ error: 'Internal server error' });
      })
        
  };
  
  exports.getCommentsForBlog = async (req, res) => {
    const { postId } = req.params;
  
    try {
    
      const comments = await Comment.findAll({ where: { blogId: postId } });
      if (!comments || comments.length === 0) {
        return [];
      }
  
      return res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.delete = (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    console.log(commentId);

  Comment.findOne({ where: { blogId: postId, id: commentId } })
    .then((comment) => {
     
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      // Delete the comment
      return comment.destroy();
    })
    .then(() => {
      res.status(200).json({ message: 'Comment deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
  }