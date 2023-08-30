<template>
  <FullscreenMain class="flex-col">
    <Header />

    <DesktopContainer>
      <div class="p-5 desktop:px-0">
        <slot />
      </div>
    </DesktopContainer>
  </FullscreenMain>
</template>
