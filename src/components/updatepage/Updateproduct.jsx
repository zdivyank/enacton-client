import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '@mantine/core/styles.css';
import { TagsInput } from '@mantine/core';

function Updateproduct() {

  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [productData, setProductData] = useState({
      // Initialize with empty values
      name: '',
      description: '',
      old_price: '',
      discount: '',
      color: '',
      gender: '',
      brands: [],
      occasion: [],
      rating: '',
      category: [],
      image: null
  });

  useEffect(() => {
      // Fetch existing product data when the component mounts
      const fetchProductData = async () => {
          try {
              const response = await fetch(`http://localhost:8000/api/product/${id}`);
              if (!response.ok) {
                  throw new Error('Failed to fetch product data');
              }
              const data = await response.json();
              
              setProductData(data.response[0]);
              console.log("This product Data::::",data.response[0]);
          } catch (error) {
              console.error('Error fetching product data:', error);
          }
      };
      fetchProductData();
  }, []);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setProductData({ ...productData, [name]: value });
  };

  const handleOccasionChange = (value) => {
      setProductData({ ...productData, occasion: value });
  };

  const handleFileChange = (event) => {
      setFile(event.target.files[0]);
  };

  const uploadImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append('image', file);

        const uploadResponse = await fetch(`http://localhost:8000/upload`, {
            method: 'POST',
            body: formData,
        });
        const uploadData = await uploadResponse.json();

        if (uploadResponse.ok) {
            const fileURL = uploadData.fileURL;
            console.log('Uploaded File', uploadData);
            console.log('Image uploaded successfully:', uploadData);
            return uploadData;
        } else {
            console.error('Failed to upload image:', uploadResponse.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
};


const handleSubmit = async (e) => {
  e.preventDefault();
  let updatedCoverImg = null;
  try {
      // Update the image separately if a new file is selected
      if (file) {
          updatedCoverImg = await uploadImage(file);
          if (!updatedCoverImg) {
              return;
          }
      }

      // Prepare the updated product data
      const updatedProductData = { ...productData };

      // Set the image field only if a new image was uploaded
      if (updatedCoverImg) {
          updatedProductData.image = updatedCoverImg.imagePath;
      }

      // Send the updated product data to the backend
      const response = await fetch(`http://localhost:8000/api/product/${id}/updateproduct`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProductData)
      });

      if (response.ok) {
          const updatedProduct = await response.json();
          console.log('Product updated successfully:', updatedProduct);
          alert('Product updated successfully');
          navigate('/');
      } else {
          console.error('Failed to update product:', response.statusText);
      }
  } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again later.');
  }
};



  // Fetch brand and category data when the component mounts
  useEffect(() => {
    const getbrand = async () => {
      try {
          const response = await fetch(`http://localhost:8000/api/brand/getbrand`, {
              method: "GET"
          });

          if (!response.ok) {
              throw new Error('Failed to fetch brand');
          }

          const data = await response.json();
          console.log(":::::",data);
          setBrand(data.response);
      } catch (error) {
          console.error("Error getting brand", error);
      }
  };

  const getCategories = async () => {
    try {
        const response = await fetch(`http://localhost:8000/api/category/getcategory`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategory(data.response);
    } catch (error) {
        console.error("Error getting categories", error);
    }
};

  getbrand();
  getCategories();
  }, []);

  return (
   <>
    <h1 className='text-center'>Update Product</h1>
            <div className='main-container'> 
                <form className="product_form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder='Enter Product name' className='form-control' />

                    <label htmlFor="decsription">Description:</label>
                    <textarea name="decsription" value={productData.decsription} onChange={handleChange} placeholder='Enter Product Description' className='form-control' />

                    <label htmlFor="old_price">Old Amount:</label>
                    <input type='number' name="old_price" value={productData.old_price} onChange={handleChange} placeholder='Enter Old amount' className='form-control' />

                    <label htmlFor="discount">Discount:</label>
                    <input type='number' name="discount" value={productData.discount} onChange={handleChange} placeholder='Enter discount' className='form-control' />

                    <label htmlFor="color">Color:</label>
                    <input type='color' name="color" value={productData.color} onChange={handleChange} className='form-control'/>

                    <label htmlFor="gender">Gender:</label>
                    <select name="gender" value={productData.gender} onChange={handleChange}  className='form-control' >
                        <option value="">Please select one…</option>
                        <option value="Female">female</option>
                        <option value="Male">male</option>
                        <option value="Boy">boy</option>
                        <option value="Girl">girl</option>
                    </select>

                    <label htmlFor="brand">Brand:</label>
                    {/* <select name="brand" value={productData.brand} onChange={handleChange} >
                        <option value="">Please select one…</option>
                        {brand.map((brand, index) => (
                            <option key={index} value={brand.name}>{brand.name}</option>
                        ))}
                    </select> */}

                    <select name="brands" value={productData.brands} onChange={handleChange}  className='form-control'>
                        <option value="">Please select one…</option>
                        {brand.map((brand, index) => (
                            <option key={index} value={brand.name}>{brand.name}</option>
                        ))}
                    </select>


                    <label htmlFor="occasion">Occasion:</label>
                    <TagsInput
                        label="Press Enter to submit a tag"
                        placeholder="Pick tag from list"
                        value={productData.occasion}
                        onChange={handleOccasionChange}
                        data={['Casual Wear', 'Formal Wear', 'Party Wear', 'Athletic Wear', 'Beachwear', 'Wedding Attire', 'Travel Wear', 'Maternity Wear', 'Nightwear', 'Seasonal Wear']}
                    />

                    <label htmlFor="rating">Rating:</label>
                    <input type='number' name="rating" value={productData.rating} onChange={handleChange} placeholder='Enter Rating out of 5' className='form-control' min={0} max={5} />

                    <label htmlFor="category">Category:</label>
                    <select name="category" value={productData.category} onChange={handleChange} className='form-control'>
                        <option value="">Please select one…</option>
                        {category.map((category, index) => (
                            <option key={index} value={category.category}>{category.category}</option>
                        ))}
                    </select>

                    <label htmlFor="image">Product Image:</label>
                    <input type='file' name="image" onChange={handleFileChange} className='form-control' />

                    <br />
                    <button type='submit' className='text-center m-5 btn btn-success'>Update Product</button>
                </form>
            </div>
   
   </>
  )
}

export default Updateproduct