const fuzzySet = require('fuzzyset.js');

let keywords = [
  'UnitedHealth',
  'Cigna',
  'BlueCross',
  'BlueShield',
  'Blue',
  'Cross',
  'Shield',
  'Aetna',
  'HealthPlan'
];
let isurancePayers = [
  'Blue Cross',
  'Blue Shield',
  'BlueCross',
  'BlueShield',
  'UnitedHealth'
];
let idLabels = [
  'Member Id',
  'ID'
];
let nameLabels = [
  'Member',
  'Name'
];
let allLabels = idLabels.concat(nameLabels);
allLabels.sort((a, b) => {
  return a.length - b.length
})

keywords = keywords.map(val => {
  return val.toLowerCase();
})
let processKeywords = fuzzySet(keywords);
let processInsurancePayer = FuzzySet(isurancePayers)
let text = 'texas\nwashington\nPennsylvania\nw$\nAnjum\n\Blue\nShield\nmember\nid';
text = text.toLowerCase();
let regEx = /^[A-Za-z]{4,}$/;
let arr = text.split('\n').join(' ').split(' ');
let finalArray = [];
arr = removeItem(arr, regEx);
function removeItem(arr, regEx) {
  arr.forEach(el => {
    if (regEx.test(el)) {
      if (allLabels.includes(el)) {
        console.log(`Eliminating because ${el} is not required`);
      } else {
        finalArray.push(el);
      }
    }
    else {
      console.log(`Eliminating because ${el} is not required`);
    }
  })
}
console.log(arr)
console.log(JSON.stringify(finalArray));
let payerName = '';
finalArray.forEach((el, i, arr) => {
  let val = processKeywords.get(el);
  console.log(payerName)
  if (val !== null && val[0][0] > Number(0.5)) {
    if (i === arr.length - 1) {
      payerName += val[0][1];
    } else {
      payerName += `${val[0][1]} `;
    }
  }
})
console.log(payerName);
console.log(JSON.stringify(processKeywords.get(payerName)))
let payer = processInsurancePayer.get(payerName);
if (payer) {
  console.log(payer[0][1])
}
else {
  console.log('payer not found')
}
