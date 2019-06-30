

const ValidDateFormat = (input) => {
      console.log("valid date format")

      let re = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/

      let output = re.exec(input)

      console.log(output)
  if(re.exec(input) != null ) {
          return true
      } else {
          return false
      }
}

export default ValidDateFormat
