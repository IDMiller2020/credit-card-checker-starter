// Future tasks:
//   Build this into a web page.

// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// Invalid credit card number with Invalid first digit (company identifier)
const badCompany1 = [7, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5, badCompany1]


// Add your functions below:

// validateCred function takes in an array (credit card number)
// checks to see if if a given credit card number is a valid credit card number
// Returns true or false.
const validateCred = (arr) => {
  let digitsSum = 0
  let alternator = 1
  for(let i = arr.length - 1; i >= 0; i --) {
    let digit = arr[i]
    if (alternator === 1) {
      alternator = 2
      digitsSum += digit
    } else if (alternator === 2) {
      alternator = 1
      let digitDouble = digit * 2
      if (digitDouble > 9) {
        digitDouble -= 9
      }
      digitsSum += digitDouble
    }
  }
  return digitsSum % 10 === 0
}

// findInvalidCards function takes in a nested array of credit card number arrays
// Returns a nested array of invalid card numbers from the given array.
const findInvalidCards = (nestedArr) => {
  let invalidNumArr = []
  nestedArr.forEach(num => {
    if (!validateCred(num)) {
      invalidNumArr.push(num)
    }
  })
  return invalidNumArr
}

// idInvalidCardCompanies function takes in a list of invalid card numbers
// Returns an array of company names without duplicates.
const idInvalidCardCompanies = (invalidCardNumArr) => {
  let companiesArr = []
  invalidCardNumArr.forEach(num => {
    if (num[0] === 3) {
      if (!companiesArr.includes('Amex')) {
        companiesArr.push('Amex')
      }
    } else if (num[0] === 4) {
      if (!companiesArr.includes('Visa')) {
        companiesArr.push('Visa')
      }
    } else if (num[0] === 5) {
      if (!companiesArr.includes('Mastercard')) {
        companiesArr.push('Mastercard')
      }
    } else if (num[0] === 6) {
      if (!companiesArr.includes('Discover')) {
        companiesArr.push('Discover')
      }
    } else {
      console.log(`Company not found for invalid card number: ${convertToString(num)}`)
    }
  })
  return companiesArr
}

// convertToString function takes in an array of numbers.
// Returns a string.
const convertToString = (arr) => {
  let strOut = ''
  let arrString = arr.toString()
  for (let i = 0; i < arrString.length; i++) {
    if (arrString[i] !== ',') {
      strOut += arrString[i]
    }
  }
  return strOut
}

// reportGenerator function takes in a nested array of card numbers (batch).
// console logs a report of valid number, invalid numbers, and invalid numbers with unknown companies.
const reportGenerator = (batch) => {
  let numValid = 0
  let numInvalid = 0
  let invalidList = []
  let companyList = []
  batch.forEach(num => {
    if (validateCred(num)) {
      numValid ++
      console.log(`Credit card number ${convertToString(num)} is a valid number.`)
    } else {
      numInvalid ++
      console.log(`Credit card number ${convertToString(num)} is not a valid number`)
    }
  })
  console.log(`This batch of numbers contains ${numValid} valid card numbers and ${numInvalid} invalid card numbers.`)
  console.log(`The invalid card numbers are listed below:`)
  invalidList = findInvalidCards(batch)
  invalidList.forEach(num => {
    console.log(convertToString(num))
  })
  console.log('The following companies have issued invalid card numbers:')
  companyList = idInvalidCardCompanies(invalidList)
  companyList.forEach(company => {
    console.log(company)
  })
}

// Testing Section

// validateCred function test lines:
// console.log(`validateCred(valid1) result: ${validateCred(valid1)}`)
// console.log(`validateCred(valid2) result: ${validateCred(valid2)}`)
// console.log(`validateCred(valid3) result: ${validateCred(valid3)}`)
// console.log(`validateCred(valid4) result: ${validateCred(valid4)}`)
// console.log(`validateCred(valid5) result: ${validateCred(valid5)}`)
// console.log(`validateCred(invalid1) result: ${validateCred(invalid1)}`)
// console.log(`validateCred(invalid2) result: ${validateCred(invalid2)}`)
// console.log(`validateCred(invalid3) result: ${validateCred(invalid3)}`)
// console.log(`validateCred(invalid4) result: ${validateCred(invalid4)}`)
// console.log(`validateCred(invalid5) result: ${validateCred(invalid5)}`)

// findInvalidCards function test lines:
// console.log('Argument sent to findInvalidCards [valid1, valid2, valid3, invalid1, invalid2, invalid3]')
// console.log('Result should be [[4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5],[5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3],[3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]')
// console.log(`Result: ${findInvalidCards([valid1,valid2,valid3,invalid1,invalid2,invalid3])}`)
// console.log(`invalidNumArr[0]: ${invalidNumArr[0]}`)

// idInvalidCardCompanies function test lines:
// console.log('Test Array: [invalid1, invalid2, invalid3, invalid4, invalid5, [7, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]]')
// console.log(`Result: ${idInvalidCardCompanies([invalid1, invalid2, invalid3, invalid4, invalid5, [7, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]])}`)

// reportGenerator function test lines:
reportGenerator(batch)

// Troubleshooting tests:
// console.log(`valid1 converted to string: ${convertToString(valid1)}`)