import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateBrand() {
    const { id } = useParams(); // Get the ID from the URL
    const [brand, setBrand] = useState({
        name: '',
        website: ''
    });
    const navigate = useNavigate();

  //   const [existingData, setExistingData] = useState({
  //     name: '',
  //     website: ''
  // });


    useEffect(() => {
        // Fetch brand data based on the ID
        const fetchBrand = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/brand/${id}`, {
                    method: 'GET'
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch brand');
                }
                const data = await response.json();
                setBrand(data.response[0]); // Set the brand data
                console.log(data.response[0]);
                  // setExistingData(data.response[0]);
            } catch (error) {
                console.error('Error fetching brand:', error);
            }
        };

        fetchBrand(); // Call the fetchBrand function when the component mounts
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/brand/${id}/updatebrand`, {
                method: "PUT", // Use PUT method for updating
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(brand), // Sending the updated brand data
            });
            const responseData = await response.json();

            if (response.ok) {
                // Optionally, you can handle success feedback here (e.g., show a success message)
                alert('Successfully Updated')
                setBrand({
                  name: '',
                  website: ''
                })
                console.log('Brand updated successfully:', responseData);
                // alert('Brand updated successfully')
                // navigate('/brand');
                navigate('/brand', { replace: true });
            } else {
                throw new Error(responseData.message || 'Failed to update brand');
            }
        } catch (error) {
            console.error("Error updating brand", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBrand({ ...brand, [name]: value });
    };

    return (
        <div>
            <h1 className='text-center'>Update Brand</h1>
            <div className="main-container">

            <form onSubmit={handleSubmit} className='updatebrand'>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" value={brand.name} onChange={handleChange} />
                <label htmlFor="website">Website:</label>
                <input type="text" name="website" value={brand.website} onChange={handleChange} />
                <button type="submit"  className="btn btn-primary">Update</button>
            </form>
            </div>
        </div>
    );
}

export default UpdateBrand;
