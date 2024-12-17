<script setup>
import { onMounted, ref, reactive, computed } from 'vue';
import AlertaComp from './components/AlertaComp.vue';
import SpinnerComp from './components/SpinnerComp.vue';

const monedas = ref([
    { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
    { codigo: 'CLP', texto: 'Peso Chileno' },
    { codigo: 'EUR', texto: 'Euro' },
    { codigo: 'GBP', texto: 'Libra Esterlina' },
])

const criptomonedas = ref([])
const error = ref('')

const cotizar = reactive({
    moneda: '',
    criptomoneda: '',
})

const cotizacion = ref({})
const cargando = ref(false)

onMounted(() => {
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
    fetch(url)
        .then(response => response.json())
        .then(({ Data }) => criptomonedas.value = Data)
})

const cotizarCripto = () => {
    if (Object.values(cotizar).includes('')) {
        error.value = "Todos los campos son obligatorios"
        return
    }
    error.value = ''
    obtenerCotizacion()
}

const obtenerCotizacion = async () => {
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
</script>

<template>
    <div class="contenedor">
        <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>

        <div class="contenido">
            <AlertaComp v-if="error"> {{ error }}</AlertaComp>
            <form class="formulario" @submit.prevent="cotizarCripto">
                <!-- Moneda -->
                <div class="campo">
                    <label for="moneda">Moneda:</label>
                    <select id="moneda" v-model="cotizar.moneda">
                        <option value="">-- Selecione --</option>
                        <option v-for="moneda, idx in monedas" :key="idx" :value="moneda.codigo">{{ moneda.texto }}
                        </option>
                    </select>
                </div>
                <!-- Criptomoneda -->
                <div class="campo">
                    <label for="cripto">Criptomoneda:</label>
                    <select id="cripto" v-model="cotizar.criptomoneda">
                        <option value="">-- Selecione --</option>
                        <option v-for="criptomoneda in criptomonedas" :value="criptomoneda.CoinInfo.Name">{{
                            criptomoneda.CoinInfo.FullName }}
                        </option>
                    </select>
                </div>
                <!-- Submit -->
                <input type="submit" value="Cotizar">
            </form>

            <SpinnerComp v-if="cargando" />

            <div class="contenededor-resultado" v-if="mostrarCotizacion">
                <h2>Cotización</h2>

                <div class="resultado">
                    <img :src="'https://cryptocompare.com/' + cotizacion.IMAGEURL" alt="crypto imagen">
                    <div>
                        <p>El precio es de: <span>{{ cotizacion.PRICE }}</span></p>
                        <p>Precio más alto del día: <span>{{ cotizacion.HIGHDAY }}</span></p>
                        <p>Precio más bajo del día: <span>{{ cotizacion.LOWDAY }}</span></p>
                        <p>Varición últimas 24 horas: <span>{{ cotizacion.CHANGEPCT24HOUR }}</span></p>
                        <p>Ultima actualización: <span>{{ cotizacion.LASTUPDATE }}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
