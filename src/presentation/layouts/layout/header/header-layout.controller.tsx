const HeaderLayoutController = () => {
  const getGreeting = () => {
    const userName = 'Wilvardo'
    return `${userName}`
  }

  const getUserImage = () => {
    const userImage = 'https://randomuser.me/api/portraits/men/1.jpg'
    return userImage
  }

  return {
    getGreeting,
    getUserImage
  }
}

export default HeaderLayoutController
