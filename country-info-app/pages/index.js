import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search' // Importar el ícono de lupa

const CountryList = () => {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/available-countries`
        )
        setCountries(response.data)
      } catch (error) {
        console.error('Error fetching countries', error)
      }
    }

    fetchCountries()
  }, [])

  // Filtrar países basado en el texto de búsqueda
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h3" gutterBottom align="center">
        Country List
      </Typography>

      {/* Campo de búsqueda con la lupa */}
      <TextField
        label="Search by country name"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          marginBottom: '20px',
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block',
          backgroundColor: '#f5f5f5',
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={4}>
        {filteredCountries.map((country) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={country.countryCode}>
            <Link
              href={`/country/${country.countryCode}`}
              passHref
              style={{ textDecoration: 'none' }}
            >
              <Card
                sx={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  boxShadow: 3, // Sombra para la card
                  borderRadius: '8px', // Esquinas redondeadas
                  cursor: 'pointer', // Cambiar el cursor a pointer al pasar sobre la tarjeta
                  transition: 'transform 0.2s', // Animación suave al pasar el cursor
                  '&:hover': {
                    transform: 'scale(1.05)', // Efecto de aumentar el tamaño al pasar el cursor
                    backgroundColor: 'rgba(75,192,192,1)', // Color de fondo al pasar el cursor
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: 'center', color: 'black' }}
                  >
                    {country.name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default CountryList
