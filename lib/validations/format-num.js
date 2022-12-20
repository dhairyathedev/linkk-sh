export default function FormatInt(n){
    const formatter = Intl.NumberFormat('en', {notation: 'compact'})
    const number = formatter.format(n)
    return number
}