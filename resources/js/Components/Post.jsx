import React, {useState} from 'react'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Dropdown from './Dropdown';
import InputError from './InputError';
import PrimaryButton from './PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';
dayjs.extend(relativeTime)

const Post = ({post}) => {

    const {auth} = usePage().props
    const [editing, setEditing] = useState(false)
    const {data, setData, patch, processing, reset, errors } = useForm({
        title: post.title,
        body: post.body
    })

    const submit = (e) => {
        e.preventDefault()
        patch(route('posts.update', post.id), {onSuccess: () => setEditing(false)})
    }

    return (
        <div className="p-5 flex space-x-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-6 w-6 text-gray-500 -scale-x-100"
            >
                <title>circle-edit-outline</title>
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12H20A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4V2M18.78,3C18.61,3 18.43,3.07 18.3,3.2L17.08,4.41L19.58,6.91L20.8,5.7C21.06,5.44 21.06,5 20.8,4.75L19.25,3.2C19.12,3.07 18.95,3 18.78,3M16.37,5.12L9,12.5V15H11.5L18.87,7.62L16.37,5.12Z" />
            </svg>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-white">{post.user.name}</span>
                        <small className="ml-2 text-sm text-white">
                            {dayjs(post.created_at).fromNow()}
                        </small>
                        {post.created_at !== post.updated_at && (
                            <small className="text-sm text-gray-600">
                                &middot; edited
                            </small>
                        )}
                    </div>
                    {post.user.id == auth.user.id && (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="h-6 w-6 text-gray-200 -scale-x-100"
                                    >
                                        <title>dots-vertical</title>
                                        <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button
                                    className="block w-full px-4 py-2 text-left
                                    text-sm leading-5 text-gray-700
                                    hover:bg-gray-200 focus:bg-gray-100
                                    transition duration-150 ease-in-out"
                                    onClick={() => setEditing(true)}
                                >
                                    Edit
                                </button>

                                <Dropdown.Link as="button" href={route('posts.destroy', post.id)} method="delete">
                                  Delete
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    )}
                </div>
                {editing ? (
                    <form onSubmit={submit}>
                        <input
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            type="text"
                            className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            autoFocus
                        />
                        <InputError message={errors.title} className="mt-2" />
                        <textarea
                            value={data.body}
                            onChange={(e) => setData("body", e.target.value)}
                            className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        ></textarea>
                        <InputError message={errors.body} className="mt-2" />
                        <InputError message={errors.message} className="mt-2" />
                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Save</PrimaryButton>
                            <button
                                className="inline-flex items-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs  uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                onClick={() => setEditing(false) && reset()}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <p className="mt-4 text-lg text-white">{post.title}</p>
                        <p className="mt-4 text-lg text-white">{post.body}</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Post