import React, { useState, useCallback, useEffect } from 'react'
import gql from 'graphql-tag'
import app from '../firebase'
import { TbPhoto } from 'react-icons/tb'
import { BsLink45Deg } from 'react-icons/bs'
import { useMutation } from '@apollo/client'
import './upload.scss'
import { useDropzone } from 'react-dropzone'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { GET_POSTS } from '../components/AllPost'
type Props = {}

function Upload({ }: Props) {
    const [img, setimg] = useState<any>()
    const [url, setUrl] = useState<any>()
    const [desc, setDesc] = useState<any>()
    const [title, setTitle] = useState<any>()
    const onDrop = useCallback((acceptedFiles: any) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setimg(file) // Pass the dropped file to the parent component
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    const [AddPost] = useMutation(ADD_POST, {
        refetchQueries: [{ query: GET_POSTS }],
        update(proxy, result) {
            console.log(result)
        },
        onError(err) {
            console.log(err)
        },
        variables: { img: url, desc, title },
        
    }
    )
    const Cloud = () => {
        const storage = getStorage(app);
        const storageRef = ref(storage, new Date().getTimezoneOffset().toString());
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL); setUrl(downloadURL);
                });
            }
        );
    }
    console.log(url, img)
    useEffect(()=>{
        if(img) Cloud()
    },[img])
    const NewPost = () => {
        if (url) {
            AddPost()
            setDesc(""); setDesc(""); setUrl(""); setTitle("")
        }
    }
    return (
        <div className='post-container1'>
            <h3>Create Post</h3>
            <div className='inp'>
                <div {...getRootProps()} className='drag'>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ... </p> :
                            <p>Drag and drop image or <span>Upload</span></p>
                    }
                </div>
                <div className='new'>
                    <input placeholder='Enter Title' value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
                </div>
                <div className='new'>
                    <textarea cols={100} placeholder='Create Post' value={desc} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDesc(e.target.value)} />
                </div>
            </div>
            {img ? <button onClick={NewPost}>Submit</button> : <span></span>}
        </div>
    )
}

export default Upload

const ADD_POST = gql`
mutation  CreatePost($desc:String!,$title:String!,$img:String!){
CreatePost (createPost:{
desc:$desc,
title:$title,
img:$img
}){
desc,title,img,userId,id
}
}
`