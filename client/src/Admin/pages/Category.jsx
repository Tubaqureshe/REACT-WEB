import React, { useEffect, useState } from 'react'
import CategoryModal from '../components/CategoryModal'
import axios from '../utils/axios'
import { BsFillPencilFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
export default function Category() {

    useEffect(() => {
        getAllCategories()
    }, []);

    const getAllCategories = async () => {
        try {
            const { data: { category } } = await axios.get('/get-all-categories');
            setCategory(category);
        } catch (error) {
            console.error(error)
        }
    }

    const [category, setCategory] = useState([])

    const deleteCategory = async (categoryName) => {
        try {
            await axios.delete(`/delete-category/${categoryName}`);
            getAllCategories(); // Fetch updated categories after deletion
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center bg-danger p-2 my-3 rounded">
                <span className='fs-4 fw-bold text-black'>Categories</span>
                <CategoryModal recallData={setCategory} />
            </div>

            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Category Name</th>
                            <th scope="col">Category Image</th>
                            <th scope="col">Actions</th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            category?.map((val, key) =>
                                <tr key={key}>
                                    <td>{val.categoryName}</td>
                                    <td><img src={val.categoryImage} className='img-fluid' style={{ height: '15vh', objectFit: 'contain' }} alt="" srcSet="" /></td>
                                    <td>
                                        <button className="btn btn-dark mx-1"><BsFillPencilFill /></button>
                                        <button className="btn btn-dark mx-1" onClick={() => deleteCategory(val.categoryName)}><AiFillDelete /></button>
                                    </td>
                                </tr>)
                        }



                    </tbody>
                </table>

            </div>
        </div>
    )
}