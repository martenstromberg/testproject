import {ValidDateFormat, ValidDate} from './DateValidator'

it('has valid date', ()=> {
    let input = "2018-12-31"
    expect(ValidDateFormat(input)).toEqual(true)
})

it('has invalid date', ()=> {
    let input = "2018-13-45"
    expect(ValidDateFormat(input)).toEqual(false)
})

it('has invalid string', () => {
    let input = "wrong format"
    expect(ValidDateFormat(input)).toEqual(false)
})

it('does not accept old date', () => {
    let input = '2018-01-01'
    expect(ValidDate(input)).toEqual(false)
})

it('does accept future date', () => {
    let input = '2019-12-21'
    expect(ValidDate(input)).toEqual(true)
})
