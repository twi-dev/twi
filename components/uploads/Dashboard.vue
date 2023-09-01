<script setup lang="ts">
import "@uppy/core/dist/style.css"
import "@uppy/dashboard/dist/style.css"

import {Dashboard} from "@uppy/vue"

import {uppy} from "../../lib/uploads/uppy.js"
</script>

<template>
  <Dashboard :uppy="uppy" />
</template>
