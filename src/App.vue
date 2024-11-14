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
                <!-- Moneda -->
                <div class="campo">
                    <label for="moneda">Moneda:</label>
                    <select id="moneda">
                        <option value="">-- Selecione --</option>
                        <option v-for="moneda, idx in monedas" :key="idx" :value="moneda.codigo">{{ moneda.texto }}
                        </option>
                    </select>
                </div>
                <!-- Criptomoneda -->
                <div class="campo">
                    <label for="cripto">Criptomoneda:</label>
                    <select id="cripto">
                        <option value="">-- Selecione --</option>
                        <option v-for="criptomoneda in criptomonedas" :value="criptomoneda.CoinInfo.Name">{{
                            criptomoneda.CoinInfo.FullName }}
                        </option>
                    </select>
                </div>
                <!-- Submit -->
                <input type="submit" value="Cotizar">
            </form>
        </div>
    </div>
</template>
