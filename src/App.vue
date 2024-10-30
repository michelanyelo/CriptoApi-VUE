<script setup>
import { ref } from 'vue';

const monedas = ref([
    { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
    { codigo: 'CLP', texto: 'Peso Chileno' },
    { codigo: 'EUR', texto: 'Euro' },
    { codigo: 'GBP', texto: 'Libra Esterlina' },
])
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
