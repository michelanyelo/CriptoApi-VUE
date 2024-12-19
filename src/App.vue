<script setup>
import { ref, reactive } from 'vue';
import AlertaComp from './components/AlertaComp.vue';
import SpinnerComp from './components/SpinnerComp.vue';
import useCripto from './composables/useCripto.js';
import ResultadosComp from './components/ResultadosComp.vue'

// Uso de Composable
const { monedas, criptomonedas, cargando, cotizacion, obtenerCotizacion, mostrarCotizacion } = useCripto()


const error = ref('')

const cotizar = reactive({
    moneda: '',
    criptomoneda: '',
})

const cotizarCripto = () => {
    if (Object.values(cotizar).includes('')) {
        error.value = "Todos los campos son obligatorios"
        return
    }
    error.value = ''
    obtenerCotizacion(cotizar)
}
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
            <!-- props cotizacion -->
            <ResultadosComp v-if="mostrarCotizacion" :cotizacion="cotizacion" />
        </div>
    </div>
</template>
