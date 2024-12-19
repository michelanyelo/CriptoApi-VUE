<script setup>
// props cotizacion
defineProps(['cotizacion'])
</script>

<template>
    <div class="contenededor-resultado">
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
</template>
