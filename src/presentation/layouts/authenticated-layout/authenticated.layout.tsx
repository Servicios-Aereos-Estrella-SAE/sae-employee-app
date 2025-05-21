import React from 'react'
import { View } from 'react-native'
import AuthenticatedLayoutStyle from './authenticated-layout.style'
import Layout from '../layout/layout.layout'

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children
}) => {
  const styles = AuthenticatedLayoutStyle()

  return (
    <Layout>
      <View style={[styles.container]}>{children}</View>
    </Layout>
  )
}

export default AuthenticatedLayout
