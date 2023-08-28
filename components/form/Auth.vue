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
        <Button wide type="submit">
          <slot name="submit" />
        </Button>
      </slot>
    </div>

    <div class="text-sm">
      <slot name="links" />
    </div>
  </form>
</template>
