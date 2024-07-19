export default function currency(value) {
    return `$${parseFloat(value).toFixed(2)}`
  }