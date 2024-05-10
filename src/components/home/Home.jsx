import React, { useEffect, useState } from 'react';
import { Button, Table, Pagination } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { VscRequestChanges } from "react-icons/vsc";
// import Pagination from 'react-bootstrap/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import '@mantine/core/styles.css';
import { TagsInput } from '@mantine/core';

function Home() {
  const [products, setProducts] = useState([]);

  const [sortOption, setSortOption] = useState('name_asc'); // Default sorting option

  const [selectedGender, setSelectedGender] = useState(''); // Selected gender option

  const [occasion, setOccasion] = useState('')

  const [discountRange, setDiscountRange] = useState('');
  const [maxprice, setMaxprice] = useState('');

  const [priceRange, setPriceRange] = useState('');

  const [brand, setBrand] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);


  const [category, setCategory] = useState('');

  const [options, setOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Change this value to adjust the number of items per page

  // Calculate index of the first and last item on the current page
  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Calculate index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);


  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  const getProducts = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/product/search?sort=${sortOption}&gender=${selectedGender}&discount=${discountRange}&maxPrice=${priceRange}&brands=${selectedBrands}&occasion=${occasion}&category=${category}`, {
        method: "GET"
      });
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      console.log("data----------=====", data);

      // setProducts(filteredProducts);
      setProducts(data);
    } catch (error) {
      console.error("Error getting products", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/category/getcategory`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      console.log('OPtions', data.response);
      setOptions(data.response);
    } catch (error) {
      console.error("Error getting categories", error);
    }
  };


  const getMaxprice = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/product/minmax`, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setMaxprice(data.mostCostlyProduct.new_price);
      console.log('max-----------', data.mostCostlyProduct.new_price);
    } catch (error) {
      console.error("Error getting products", error);
    }
  };


  const getbrand = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/brand/getbrand`, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error('Failed to fetch brand');
      }

      const data = await response.json();
      console.log(":::::", data);
      setBrand(data.response);
    } catch (error) {
      console.error("Error getting brand", error);
    }
  };


  // const getProducts = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/api/product/getproduct`, {
  //       method: "GET"
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch products');
  //     }

  //     const data = await response.json();
  //     console.log(":::::", data);
  //     setProducts(data.response);
  //   } catch (error) {
  //     console.error("Error getting products", error);
  //   }
  // };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/product/${productId}/deleteproduct`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error('Failed to DELETE product');
      }

      const data = await response.json();
      console.log(":::::", data);
      getProducts(); // Refresh product list after deletion
    } catch (error) {
      console.error("Error Deleting product", error);
    }
  };


  //onchangessss

  const handleDiscountRangeChange = (event) => {
    setDiscountRange(event.target.value);
  };
  const handleOccasionChange = (event) => {
    setOccasion(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const countDiscount = (old_price, discount) => {
    const discountedPrice = old_price - (old_price * (discount / 100));
    return discountedPrice;
  };


  const handleBrandChange = (selected) => {
    setSelectedBrands(selected.join(','));
  };


  const handlePriceRangeChange = (event) => {
    const selectedPriceRange = parseInt(event.target.value);
    setPriceRange(selectedPriceRange);

    const filteredProducts = products.filter(
      (product) => product.new_price <= selectedPriceRange
    );
    setProducts(filteredProducts);
  };


  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Boy', value: 'Boy' },
    { label: 'Girl', value: 'Girl' }
  ];

  const occasionOptions = [
    'Casual Wear',
    'Formal Wear',
    'Party Wear',
    'Athletic Wear',
    'Beachwear',
    'Wedding Attire',
    'Travel Wear',
    'Maternity Wear',
    'Nightwear',
    'Seasonal Wear'
  ];


  useEffect(() => {
    getProducts();
  }, [sortOption, selectedGender, discountRange, priceRange, selectedBrands, occasion, category]);


  useEffect(() => {
    getMaxprice();
    getbrand();
    getCategories();
  }, []);



  return (
    <>
<div className="main-container">


      <div className=" justify-content-center">
        <h3>Sort By:</h3>
        <select value={sortOption} onChange={handleSortChange} className='form-control'>
          <option value="">None</option>
          <option value="name_asc">Sort by Name (A-Z)</option>
          <option value="name_desc">Sort by Name (Z-A)</option>
          <option value="rating_asc">Sort by Rating (Asc)</option>
          <option value="rating_desc">Sort by Rating (Desc)</option>
          <option value="date_newest">Sort by Date (Newest)</option>
          <option value="date_oldest">Sort by Date (Oldest)</option>
        </select>
      </div>

      <hr />

      <h3>Filter By Gender:</h3>
      {genderOptions.map((option) => (
        <div key={option.value} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id={option.value}
            value={option.value}
            checked={selectedGender === option.value}
            onChange={() => handleGenderChange(option.value)}
          />
          <label className="form-check-label" htmlFor={option.value}>{option.label}</label>
        </div>
      ))}


      <hr />

      <div className=" justify-content-center">
        <h3>Discount Filter:</h3>
        <select value={discountRange} onChange={handleDiscountRangeChange} className='form-control'>
          <option value="0-9">none</option>
          <option value="10-15">10-15%</option>
          <option value="15-20">16-20%</option>
          <option value="20-25">21-25%</option>
          <option value="25-30">26-30%</option>

        </select>
      </div>

      <hr />


      {/* price range  */}
      {/* which is not working properly */}

      {/* <input type="range" min={0} max={maxprice} value={priceRange} step={1} onChange={handlePriceRangeChange} /> */}
      {/* <h4>Price Range:{priceRange}</h4>

      <input
        type="range"
        min={1}
        max={maxprice}
        value={priceRange}
        onChange={handlePriceRangeChange}
      />

      <hr /> */}

      <h3>Brands:</h3>
      <TagsInput

        placeholder="Pick brand from list"
        data={brand.map(brand => brand.name)}
        onChange={handleBrandChange}
        multiple
      />



      <hr />

      <div className=" justify-content-center">
        <h3>Occasion:</h3>

        <select value={occasion} onChange={handleOccasionChange} className='form-control'>
          <option value={''}>
            None
          </option>
          {occasionOptions.map((wear, index) => (
            <option key={index} value={wear}>
              {wear}
            </option>
          ))}
        </select>

      </div>


      <hr />

      <h3>Category</h3>

      <select value={category} onChange={handleCategoryChange} className='form-control'>
        <option value={''}>
          None
        </option>
        {options.map((currEle, index) => (
          <option key={index} value={currEle.category}>
            {currEle.category}
          </option>
        ))}
      </select>

      <hr />

      </div>
      <h1 className='text-center m-3'>All Products</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Old Price</th>
            <th>Discount</th>
            <th>Color</th>
            <th>Gender</th>
            <th>Brands</th>
            <th>Occasion</th>
            <th >Rating</th>
            <th>Category</th>
            <th>Image</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="13" className="text-center">No products found</td>
            </tr>
          ) : (
            currentItems.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.decsription}</td>
                <td><s>{product.old_price}</s>  {countDiscount(product.old_price, product.discount)}</td>
                <td>{product.discount}%</td>
                <td>{product.color}</td>
                <td>{product.gender}</td>
                <td>{product.brands.join(', ')}</td>
                <td>{product.occasion.join(', ')}</td>
                <td>{product.rating}</td>
                <td>{product.category.join(', ')}</td>
                <td><img src={`http://localhost:8000/uploads/${product.image}`} alt="Product" style={{ maxWidth: '100px' }} /></td>
                <td>
                  <Link to={`/product/${product._id}/updateproduct`} className="btn btn-primary">
                    <VscRequestChanges className='icon text-light' />
                  </Link>
                </td>
                <td><Button className='btn btn-danger' onClick={() => deleteProduct(product._id)}>
                  <MdDeleteForever className='icon text-light' />
                </Button></td>
              </tr>
            )))}



        </tbody>
      </Table>

      <Pagination className='text-center pagination'>
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
}

export default Home;
