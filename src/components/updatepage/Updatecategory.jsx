import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Updatecategory() {
  
  const { id } = useParams(); // Get the ID from the URL
  const [Category, setCategory] = useState('');
  const navigate = useNavigate();

//   const [existingData, setExistingData] = useState({
//     name: '',
//     website: ''
// });


  useEffect(() => {
      // Fetch category data based on the ID
      const fetchCategory = async () => {
          try {
              const response = await fetch(`http://localhost:8000/api/category/${id}`, {
                  method: 'GET'
              });
              if (!response.ok) {
                  throw new Error('Failed to fetch category');
              }
              const data = await response.json();
              setCategory(data.response[0]); // Set the category data
              console.log(data);
                // setExistingData(data.response[0]);
          } catch (error) {
              console.error('Error fetching category:', error);
          }
      };

      fetchCategory(); // Call the fetchcategory function when the component mounts
  }, [id]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch(`http://localhost:8000/api/category/${id}/updatecategory`, {
              method: "PUT", // Use PUT method for updating
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({category:Category}), // Sending the updated category data
          });
          const responseData = await response.json();

          if (response.ok) {
              // Optionally, you can handle success feedback here (e.g., show a success message)
              alert('Successfully Updated')
              // setCategory('')
              console.log('category updated successfully:', responseData);
              navigate('/category');
          } else {
              throw new Error(responseData.message || 'Failed to update category');
          }
      } catch (error) {
          console.error("Error updating category", error);
      }
  };

  const handleChange = (e) => {
    setCategory(e.target.value)
  };

  return (
    <>
    <div>
            <h1 className='text-center'>Update Category</h1>
            <div className="main-container">

            <form onSubmit={handleSubmit} className='updatebrand'>
                <label htmlFor="category">category:</label>
                <input type="text" name="category" value={Category.category} onChange={handleChange} />
                
                <button type="submit"  className="btn btn-primary">Update</button>
            </form>
        </div>
            </div>
    </>
  )
}

export default Updatecategory