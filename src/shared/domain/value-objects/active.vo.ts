import { InvalidFieldFormatException } from '../exceptions/invalid-field-format.exception'

export class ActiveVO {
  constructor(readonly value: number) {
    if (value !== 1 && value !== 0) {
      throw new InvalidFieldFormatException('active')
    }
  }
}
