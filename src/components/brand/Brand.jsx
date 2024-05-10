import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { VscRequestChanges } from "react-icons/vsc";
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

function Brand() {
    const [brand, setbrand] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [addbrand,setAddbrand] = useState({
        name:"",
        website:"",
    })

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch(`http://localhost:8000/api/brand/addbrand`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(addbrand),
    //         });
    //         const responseData = await response.json();
    
    //         if (response.ok) {
    //             // Update the brand state with the newly added brand
    //             setbrand([...brand, responseData]); // Assuming the responseData is the new brand object
    //             setAddbrand({ // Clear the addbrand state after adding the brand
    //                 name: "",
    //                 website: ""
    //             });
    //             handleClose(); // Close the modal after successful addition
    //             alert('Brand added successfully');
    //             navigate('/brand', { replace: true });
    //         } else {
    //             throw new Error(responseData.message || 'Failed to add brand');
    //         }
    //     } catch (error) {
    //         console.error('Error adding brand:', error.message);
    //     }
    // };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/brand/addbrand`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(addbrand),
            });
            const responseData = await response.json();
    
            if (response.ok) {
                // Update the brand state with the newly added brand
                setbrand([...brand, responseData]); // Assuming the responseData is the new brand object
                setAddbrand({ // Clear the addbrand state after adding the brand
                    name: "",
                    website: ""
                });
                handleClose(); 
                alert('Brand added successfully');
            } else {
                throw new Error(responseData.message || 'Failed to add brand');
            }
        } catch (error) {
            console.error('Error adding brand:', error.message);
        }
    };
    

    const handleInput = (e) => {
        const { name, value } = e.target;

        setAddbrand({ ...addbrand, [name]: value });
      
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
            console.log(":::::",data);
            setbrand(data.response);
        } catch (error) {
            console.error("Error getting brand", error);
        }
    };

    const deleteBrand = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/brand/${productId}/deletebrand`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error('Failed to DELETE brand');
            }

            const data = await response.json();
            console.log(":::::",data);
            getbrand();
        } catch (error) {
            console.error("Error Deleting brand", error);
        }
    };

    useEffect(() => {
        getbrand();
    }, [addbrand]);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Brand
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Brand</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="">Name:</label>
                        <input type="text" name="name" id="name" onChange={handleInput} value={addbrand.name} className='m-3'/>
                        <br />
                        <label htmlFor="">website:</label>
                        <input type="text" name="website" id="website" onChange={handleInput} value={addbrand.website} className='m-3' />

                        <button type='submit'  className="btn btn-primary">Add brand</button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button type='submit' variant="primary" onClick={handleClose}>
                        Add Brand
                    </Button> */}
                </Modal.Footer>
            </Modal>

            <h1 className='text-center m-3'>All Brands</h1>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Brand Name</th>
                    <th>Website</th>
                    <th>Update</th>
                    <th>Delete</th>

                </tr>
                </thead>
                <tbody>
                { brand.map((brand, index) => (
                    <tr key={index}>
                        <td>{brand.name}</td>
                        <td>{brand.website}</td>
                        <td>
                            <Link to={`/brand/${brand._id}/updatebrand`} className="btn btn-primary">
                                <VscRequestChanges className='icon text-light'/>
                            </Link>
                        </td>
                        <td>
                            <Button className='btn btn-danger' onClick={() => deleteBrand(brand._id)}>
                                <MdDeleteForever className='icon text-light' />
                            </Button>
                        </td>

                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    )
}

export default Brand;
