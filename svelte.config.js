import adapter from '@sveltejs/adapter-netlify';

export default {
  kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/components',
      $utils: 'src/utils'
    }
  }
};




