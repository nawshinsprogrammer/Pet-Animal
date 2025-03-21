import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import {MdOutlineSecurityUpdate }from "react-icons/md";
import Swal from 'sweetalert2'

const AllPet = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/pets')
            .then(res => res.json())
            .then(data => setPets(data))
    }, []);

    const handleDelete=_id=>{
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed){
                    fetch(`http://localhost:5000/pets/${_id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if(data.deletedCount > 0){
    
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your Pet has been deleted.",
                                    icon: "success"
                                });
                        
                              
                                        }
                                    })
                
                
                            }
                        });

                    }





    return (
        <div>
            <h2 className="text-4xl font-bold script text-center my-7 text-gray-600">This is AllPet Page;{pets.length} </h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="mt-10">
                                Serial Number
                            </th>
                            <div className="flex mt-2"><th>Image</th>
                                <th>Name</th>
                            </div>
                            <th>Pet Age</th>
                            
                            <th>Buttons</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            pets.map((pet, index) => <tr key={pet._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={pet.petImage}
                                                    alt="petImage" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{pet.petName}</div>
                                            <div className="text-sm opacity-50">{pet.petLocation}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {pet.petAge}
                                    <br />
                                    {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                </td>
                             
                                <th>
                                    <div className="flex">
                                        <button onClick={() => handleDelete(pet._id)} className="btn btn-ghost btn-xs"><MdDelete /> Delete</button>
                                        <Link to={`/updataPet/${pet._id}`}> <button className="btn btn-ghost btn-xs"><MdOutlineSecurityUpdate /> Update</button></Link>
                                        <button className="btn btn-ghost btn-xs">Adopt</button>
                                    </div>
                                </th>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>


        </div>
    );
};

export default AllPet;
