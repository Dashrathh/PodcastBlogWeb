import React from 'react'

const UserContext = React.createContext()

export const useAuth = () => React.useContext(UserContext);

export default UserContext;