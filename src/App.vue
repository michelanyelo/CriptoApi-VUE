<script setup>
import { onMounted, ref } from 'vue';

const monedas = ref([
    { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
    { codigo: 'CLP', texto: 'Peso Chileno' },
    { codigo: 'EUR', texto: 'Euro' },
    { codigo: 'GBP', texto: 'Libra Esterlina' },
])

const criptomonedas = ref([])

onMounted(() => {
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
    fetch(url)
        .then(response => response.json())
        .then(({ Data }) => criptomonedas.value = Data)
})
</script>

<template>
    <div class="contenedor">
        <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>

        <div class="contenido">
            <form class="formulario">
                <div class="campo">
                    <label for="moneda">Moneda:</label>
                    <select id="moneda">
                        <option value="">-- Selecione --</option>
                        <option v-for="moneda, idx in monedas" :key="idx" :value="moneda.codigo">{{ moneda.texto }}
                        </option>
                    </select>
                </div>
            </form>
        </div>
    </div>
</template>
