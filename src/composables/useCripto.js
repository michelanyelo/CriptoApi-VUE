import { ref, onMounted, computed } from 'vue'

export default function useCripto() {

    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
        { codigo: 'CLP', texto: 'Peso Chileno' },
        { codigo: 'EUR', texto: 'Euro' },
        { codigo: 'GBP', texto: 'Libra Esterlina' },
    ])
    const criptomonedas = ref([])
    const cotizacion = ref({})
    const cargando = ref(false)

    onMounted(() => {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
        fetch(url)
            .then(response => response.json())
            .then(({ Data }) => criptomonedas.value = Data)
    })

    const obtenerCotizacion = async (cotizar) => {
        try {
            cargando.value = true
            cotizacion.value = {}
            const { moneda, criptomoneda } = cotizar
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
            const respuesta = await fetch(url)
            const data = await respuesta.json()

            cotizacion.value = data.DISPLAY[criptomoneda][moneda]
        } catch (error) {
            console.error(error);
        } finally {
            cargando.value = false
        }
    }

    const mostrarCotizacion = computed(() => {
        return Object.values(cotizacion.value).length > 0
    })

    return {
        monedas,
        criptomonedas,
        cargando,
        cotizacion,
        obtenerCotizacion,
        mostrarCotizacion
    }

}