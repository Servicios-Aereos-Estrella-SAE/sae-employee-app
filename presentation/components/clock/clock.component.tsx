import React from 'react'
import { View } from 'react-native'
import { Typography } from '../typography/typography.component'
import { ClockController } from './clock.controller'
import { IClockProps } from './types/clock-props.interface'

/**
 * Reloj
 * @param {IClockProps} props - Propiedades del reloj
 * @returns {React.FC} Reloj
 */
const Clock = React.memo(({ style, hourStyle, dateStyle }: IClockProps) => {
  const controller = ClockController()

  return (
    <View style={style}>
      <Typography variant="h1" style={hourStyle}>{controller.hour}</Typography>
      <Typography variant="body" style={dateStyle}>{controller.date}</Typography>
    </View>
  )
})

export { Clock }
