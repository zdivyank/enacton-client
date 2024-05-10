import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { VscRequestChanges } from "react-icons/vsc";
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

function Category() {
    const [categoryList, setCategoryList] = useState([]);
    const [addCategory, setAddCategory] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const getCategories = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/category/getcategory`);
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategoryList(data.response);
        } catch (error) {
            console.error("Error getting categories", error);
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/category/${categoryId}/deletecategory`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error('Failed to delete category');
            }
            getCategories();
        } catch (error) {
            console.error("Error deleting category", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/category/addcategory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ category: addCategory }),
            });
            if (!response.ok) {
                throw new Error('Failed to add category');
            }
            setAddCategory('');
            handleCloseModal();
            getCategories();
        } catch (error) {
            setErrorMessage(error.message || 'Failed to add category');
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <Button variant="primary" onClick={handleShowModal}>Add Category</Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="category">Category:</label>
                        <input type="text" name="category" id="category" onChange={(e) => setAddCategory(e.target.value)} value={addCategory} className='m-3' />
                        <br />
                        <button type='submit'  className="btn btn-primary">Add Category</button>
                    </form>
                    {errorMessage && <p>{errorMessage}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>

            <h1 className='text-center m-3'>All Categories</h1>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryList.map((category, index) => (
                        <tr key={index}>
                            <td>{category.category}</td>
                            <td>
                            <Link to={`/category/${category._id}/updatecategory`} className="btn btn-primary">
                                <VscRequestChanges className='icon text-light'/>
                            </Link>
                        </td>
                            <td>
                                <Button className='btn btn-danger' onClick={() => deleteCategory(category._id)}>
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

export default Category;
