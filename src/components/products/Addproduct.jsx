import React, { useEffect, useState } from 'react';
import '@mantine/core/styles.css';
import { TagsInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function Addproduct() {
    const [brand, setBrand] = useState([]);
    const [category, setCategory] = useState([]);
    const [file, setFile] = useState(null);
    const [productData, setProductData] = useState({
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
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Special handling for color and brand inputs
        if (name === 'color' || name === 'brands') {
            setProductData({ ...productData, [name]: value });
        } else {
            setProductData({ ...productData, [name]: value });
        }
    };



    const handleOccasionChange = (value) => {
        setProductData({ ...productData, occasion: value });
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const imgData = new FormData();
            imgData.append('image', file);

            const uploadResponse = await fetch(`http://localhost:8000/upload`, {
                method: 'POST',
                body: imgData,
            });
            const uploadData = await uploadResponse.json();
            const imagePath = uploadData.imagePath;
            console.log(imagePath);

            const response = await fetch(`http://localhost:8000/api/product/addproduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...productData,
                    image: imagePath,
                }),
            });
            const responseData = await response.json();

            if (response.ok) {
                setProductData({
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
                alert('Product added successfully');
                navigate('/')
            } else {
                throw new Error(responseData.message || 'Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error.message);
            alert('Failed to add product. Please try again later.');
        }
    };

    const getBrand = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/brand/getbrand');
            if (!response.ok) {
                throw new Error('Failed to fetch brands');
            }
            const data = await response.json();
            setBrand(data.response);
        } catch (error) {
            console.error('Error getting brands', error);
        }
    };

    const getCategory = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/category/getcategory');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategory(data.response);
        } catch (error) {
            console.error('Error getting categories', error);
        }
    };

    useEffect(() => {
        getBrand();
        getCategory();
    }, []);
    return (
        <>
            <h1 className='text-center'>Add Product</h1>
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
                    <input type='color' name="color" value={productData.color} onChange={handleChange} defaultValue={'#000000'} className='form-control'/>

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
                    <button type='submit' className='text-center m-5 btn btn-success'>Add Product</button>
                </form>
            </div>
        </>
    );
}

export default Addproduct;
