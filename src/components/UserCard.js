import React from 'react'
import { MdCheck } from 'react-icons/md'

import styles from '../styles/userList.module.scss'

const UserCard = ({
    users,
    handleSelection,
    isSelected
}) => {
    return (
        <>
            <div className={styles.userList}>
                {
                    users
                        ?
                        users.map((item) => (
                            <div
                                key={item.id}
                                className={styles.card}
                                onClick={() => handleSelection(item.id)}
                            >
                                {
                                    isSelected(item.id)
                                        ?
                                        <MdCheck className={styles.checkIcon} />
                                        : ''
                                }
                                <img src={item.Image} alt={item.id} />
                                <p>{item.name}</p>
                            </div>
                        ))
                        : ''
                }
            </div>
        </>
    )
}

export default UserCard