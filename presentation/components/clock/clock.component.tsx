import React from 'react'
import { Text, View } from 'react-native'
import { IClockProps } from './types/clock-props.interface'
import { ClockController } from './clock.controller'

/**
 * Reloj
 * @param {IClockProps} props - Propiedades del reloj
 * @returns {React.FC} Reloj
 */
const Clock = React.memo(({ style, hourStyle, dateStyle }: IClockProps) => {
  const controller = ClockController()

  return (
    <View style={style}>
      <Text style={hourStyle}>{controller.hour}</Text>
      <Text style={dateStyle}>{controller.date}</Text>
    </View>
  )
})

export { Clock }
