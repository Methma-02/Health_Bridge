import { useState } from 'react';
import './DonationForm.css';

const DonationForm = ({ onSubmit, onCancel, defaultItemImg }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    condition: 'New',
    description: '',
    pickupLocation: '',
    contactDetails: '',
    imageFile: null
  });
  
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData({
        ...formData,
        imageFile: file
      });
    } else {
      setImagePreview(null);
      setFormData({
        ...formData,
        imageFile: null
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="donation-form-container">
      <h2>Donate an Item</h2>
      <p className="form-intro">
      Your generous donation can make a difference in someone else's life.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="itemName">Item Name*</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
            placeholder="E.g., Baby Crib, Breast Pump, etc."
          />
        </div>

        <div className="form-group">
          <label htmlFor="condition">Condition*</label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Gently Used">Gently Used</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description*</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Please provide details about the item, including age, any damage, etc."
            rows="4"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="pickupLocation">Pickup Location*</label>
          <input
            type="text"
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            required
            placeholder="Neighborhood, nearby landmark, etc."
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactDetails">Contact Details*</label>
          <textarea
            id="contactDetails"
            name="contactDetails"
            value={formData.contactDetails}
            onChange={handleChange}
            required
            placeholder="Phone number, email, preferred contact method, etc."
            rows="2"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="imageUpload">Upload Image (Recommended)</label>
          <input
            type="file"
            id="imageUpload"
            name="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
          />
          <p className="file-help-text">Upload a clear image of the item you're donating</p>
          
          {/* Image preview section */}
          <div className="image-preview-container">
            {imagePreview ? (
              <div className="image-preview">
                <img src={imagePreview} alt="Item preview" />
              </div>
            ) : (
              <div className="no-image-preview">
                <img src={defaultItemImg} alt="Default item" />
                <div className="overlay-text">
                  <p>No image uploaded</p>
                  <p>Upload an image to help others see your donation</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Post Donation
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonationForm;