export const url = process.env.REACT_APP_ENV === 'production'
    ? 'https://api.partyagile.com/api/' : "https://localhost:5001/api/"