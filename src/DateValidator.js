

export const ValidDateFormat = (input) => {
      let re = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
      let output = re.exec(input)

  if(re.exec(input) != null ) {
          return true
      } else {
          return false
      }
}

export const ValidDate = (dateString) => {
    let date = new Date(dateString)
    let now = new Date()

    if (date > now) {
        return true
    } else {
        return false
    }
}
