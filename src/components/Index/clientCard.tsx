import React from 'react';
import { addressesInterface } from '../../interfaces/user-url-interface';

interface UserCardProps {
    email: string;
    name: string;
    lastname: string;
    addresses: addressesInterface[];
    onEdit: () => void;
    onDelete: () => void;
}

const UserCard = ({ email, name, lastname, addresses, onEdit, onDelete }: UserCardProps) => {
    return (
        <div className="max-w-sm h-fit rounded-[25px] overflow-hidden shadow-lg  bg-white p-6">
            <div className="font-bold text-xl mb-2">{name} {lastname}</div>
            <p className="text-gray-700 text-base">{email}</p>
            <div className="mt-4">
                <h3 className="font-semibold text-lg">Addresses:</h3>
                <ul className="list-disc list-inside text-gray-700 h-[150px] overflow-y-scroll">
                    {addresses.map((address, index) => (
                        <li key={index}>{address.street}, {address.city}, {address.state}, {address.country}</li>
                    ))}
                </ul>
            </div>
            <div className='flex text-white gap-4 mt-4'>
                <button type='button' onClick={onDelete} className=' bg-red-500 w-full rounded-[25px]'>Delete</button>
                <button type='button' onClick={onEdit} className=' bg-blue-400 w-full rounded-[25px] '>Edit</button>
            </div>
        </div>
    );
};

export default UserCard;