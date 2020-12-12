import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import { MdCameraAlt } from 'react-icons/md'

import styles from '../styles/index.module.scss'
import defaultPic from '../assets/img/user14b9a23c.png'
import UserCard from './UserCard'

const API_URL = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json'


const Index = () => {
    const [users, setUsers] = useState()
    const [selected, setSelected] = useState([])
    const [groupPhoto, setGroupPhoto] = useState(defaultPic)
    const [groupName, setGroupName] = useState()
    const [groupDescription, setGroupDescription] = useState()

    const inputImage = useRef()

    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL)
            if (response.status === 200) {
                setUsers(response.data)
            }
        }
        catch (error) {
            throw error
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleSelection = (id) => {
        const index = selected.findIndex(el => el === id)
        if (index !== -1) {
            setSelected(selected.filter(el => el !== id))
        } else {
            setSelected([...selected, id])
        }
    }

    const isSelected = (id) => {
        const index = selected.findIndex(el => el === id)
        if (index === -1) return false;
        return true
    }

    const handleGrpPhotoChangeProxy = () => {
        inputImage.current.click()
    }

    const handleGrpPhotoChange = (e) => {
        console.log(e)
        const file = e.target.files[0]
        setGroupPhoto(URL.createObjectURL(file))

    }

    const compare = (item1, item2) => {
        if (item1.name < item2.name) {
            return -1
        }
        if (item1.name > item2.name) {
            return 1
        }
        return 0
    }

    const handleSort = (e) => {
        if (e.target.value === 'asc') {
            const sortedUsers = [...users].sort(compare)
            setUsers(sortedUsers)
        } else {
            const sortedReversed = [...users].sort(compare).reverse()
            setUsers(sortedReversed)
        }
    }

    return (
        <div className="flex-center">
            <div>
                <h1>Create Group</h1>
            </div>
            <div className={styles.groupDetails}>
                <div className={styles.groupPhoto}>
                    <img className={styles.defaultPic} src={groupPhoto} alt="groupPhoto" />
                    <p onClick={handleGrpPhotoChangeProxy}>
                        <MdCameraAlt /> Change Group Photo
                        <input
                            ref={inputImage}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleGrpPhotoChange}
                        />
                    </p>
                </div>
                <div className={styles.groupInfo}>
                    <div className={styles.groupItem}>
                        <label>Name</label>
                        <input
                            placeholder="Group Name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </div>
                    <div className={styles.groupItem}>
                        <label>Description</label>
                        <input
                            placeholder="Group Description"
                            value={groupDescription}
                            onChange={(e) => setGroupDescription(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.filters}>
                <p>Sort by name</p>
                <select onChange={(e) => handleSort(e)}>
                    <option>-----</option>
                    <option value="asc">Ascending</option>
                    <option value="dsc">Descending</option>
                </select>
            </div>

            {
                users && (
                    <div>
                        <p>{selected.length} of {users.length} selected</p>
                    </div>
                )
            }

            <UserCard
                users={users}
                handleSelection={handleSelection}
                isSelected={isSelected}
            />

            <div className={styles.actions}>
                <button className={styles.update}>Update</button>
                <button className={styles.remove}>Remove</button>
            </div>
        </div>
    )
}

export default Index