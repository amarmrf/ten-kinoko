import Place from '@/services/place'
import Weather from '@/services/weather'

export default ({ $axios }, inject) => {
  // Initialize API factories
  const factories = {
    place: Place($axios),
    weather: Weather($axios),
  }

  // Inject $services
  inject('services', factories)
}
