import React from 'react'
import { View } from 'react-native'
import AuthenticatedLayoutStyle from './authenticated-layout.style'
import Layout from '../layout/layout.layout'
import { IAuthenticatedLayoutProps } from './types/authenticated-props.interface'
import { AuthenticatedLayoutController } from './authenticated-layout.controller'

/**
 * Layout autenticado
 * @param {IAuthenticatedLayoutProps} props - Propiedades del layout
 * @returns {React.FC} Layout autenticado
 */
const AuthenticatedLayout: React.FC<IAuthenticatedLayoutProps> = ({ children }) => {
  const styles = AuthenticatedLayoutStyle()
  const controller = AuthenticatedLayoutController({ children })

  if (controller.isValidating) {
    return <View style={styles.container} />
  }

  return (
    <Layout>
      <View style={[styles.container]}>
        {controller.props.children}
      </View>
    </Layout>
  )
}

export default AuthenticatedLayout
