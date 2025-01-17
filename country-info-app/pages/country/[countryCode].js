import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Card, CardContent, Typography } from '@mui/material'
// Importamos los componentes de Material UI
import {
  CircularProgress,
  Button,
  Container,
  Box,
  Grid,
  Paper,
} from '@mui/material'

// Registramos los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const CountryInfo = () => {
  const router = useRouter()
  const { countryCode } = router.query

  const [country, setCountry] = useState(null)
  const [borderCountries, setBorderCountries] = useState([])
  const [populationData, setPopulationData] = useState([])

  useEffect(() => {
    if (!countryCode) return

    const fetchCountryInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/country-info/${countryCode}`
        )
        setCountry(response.data)
        setBorderCountries(response.data.borders)
        setPopulationData(response.data.populationHistory || []) // Default to empty array if not present
      } catch (error) {
        console.error('Error fetching country info', error)
      }
    }

    fetchCountryInfo()
  }, [countryCode])

  if (!country) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Container>
    )
  }

  let years = Array.isArray(country.populationData)
    ? country.populationData.map((item) => item.year)
    : []
  let population = Array.isArray(country.populationData)
    ? country.populationData.map((item) => item.value)
    : []

  const populationChartData = {
    labels: years,
    datasets: [
      {
        label: 'Population',
        data: population,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  }

  const countryName =
    country?.commonName || country?.officialName || 'Unknown Country'

  return (
    <Container>
      {/* Encabezado con nombre y bandera */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent={'center'}
        sx={{
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          {countryName}
        </Typography>
        <img
          src={country.flagUrl}
          alt={`${countryName} flag`}
          style={{ width: '50px', paddingLeft: '20px', paddingBottom: '9px' }}
        />
      </Box>

      {/* Botón de navegación */}
      <Box mb={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: '50%' }}
          onClick={() => router.push('/')}
          fullWidth
        >
          Go to Home
        </Button>
      </Box>

      {/* Sección de países fronterizos */}
      <Paper elevation={3} style={{ padding: '16px', marginBottom: '32px' }}>
        <Typography
          variant="h6"
          gutterBottom
          style={{ display: 'flex', justifyContent: 'center', fontWeight: 600 }}
        >
          BORDER COUNTRIES
        </Typography>
        <ul
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gridGap: '16px',
            margin: 0, // Eliminar el margen
            padding: 0, // Eliminar el padding
          }}
        >
          {borderCountries.map((border) => (
            <li key={border} style={{ listStyleType: 'none' }}>
              <Link
                style={{ textDecoration: 'none' }}
                href={`/country/${border.countryCode}`}
                passHref
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
                      sx={{
                        color: 'black',
                        textAlign: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {border.commonName}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </Paper>

      {/* Gráfico de población */}
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography
          variant="h6"
          gutterBottom
          style={{ display: 'flex', justifyContent: 'center', fontWeight: 600 }}
        >
          Population Chart
        </Typography>
        <Line data={populationChartData} />
      </Paper>
    </Container>
  )
}

export default CountryInfo
