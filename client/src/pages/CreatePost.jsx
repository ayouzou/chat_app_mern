import React, { useState } from 'react';
import './CreatePost.css'
function CreatePost() {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e) => {
        // Handle image upload here and set the 'image' state
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle post creation (e.g., sending data to a server) here
    };

    return (
        <div className="create-post-container">
            <h1 className="create-post-heading">Create a New Post</h1>
            <form onSubmit={handleSubmit} className="create-post-form">
                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image" className="form-label">Image:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="create-post-button">Create Post</button>
            </form>
        </div>
    );
}

export default CreatePost;
