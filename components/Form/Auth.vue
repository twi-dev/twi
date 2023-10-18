<template>
  <form class="flex flex-col gap-8 py-12 px-10 border border-gray-100 dark:border-neutral-600 shadow-2xl dark:shadow-none rounded-lg bg-white dark:bg-neutral-800">
    <div class="text-3xl select-none">
      <slot name="title" />
    </div>

    <div class="flex flex-col gap-2">
      <slot />
    </div>

    <div>
      <slot name="actions">
        <button type="submit" class="btn btn-block btn-primary no-animation">
          <slot name="submit" />
        </button>
      </slot>
    </div>

    <div class="text-sm">
      <slot name="links" />
    </div>
  </form>
</template>
