<template>
  <FullscreenMain class="flex-col">
    <Header />

    <DesktopContainer class="p-5 desktop:px-0">
      <slot />
    </DesktopContainer>
  </FullscreenMain>
</template>
