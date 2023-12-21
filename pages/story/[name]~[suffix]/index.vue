<script setup lang="ts">
const {params} = useRoute()

interface Params {
  name: string
  suffix: string
}

const {name, suffix} = params as unknown as Params

const story = await useStoryGetBySlug({name, suffix})

useHeadSafe({
  title: story.value.title
})
</script>

<template>
  <div>{{story.title}}</div>
</template>
