declare module 'nuxt-icon' {
  import { DefineComponent } from 'vue';
  const NuxtIcon: DefineComponent<{ name: string }>;
  export default NuxtIcon;
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    NuxtIcon: typeof import('nuxt-icon').default;
  }
}

declare global {
  const NuxtIcon: typeof import('nuxt-icon').default;
}
