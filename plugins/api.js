import Place from '@/services/place'
import Weather from '@/services/weather'

export default ({ $axios, $config }, inject) => {
  // Initialize API factories
  const factories = {
    place: Place($axios, $config),
    weather: Weather($axios, $config),
  }

  // Inject $services
  inject('services', factories)
}
