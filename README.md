# Paris CLI

A tiny command-line utility for serving remote components powered by [Paris](https://www.npmjs.com/package/@kennyromanov/paris). It ships with a Vite setup and sensible defaults so you can federate and preview components locally in seconds.

### Here's a simple example:

```ts
// main.ts
import { defineRemoteComponent } from '@kennyromanov/paris';

export default defineRemoteComponent({
  onInject(name, val) {
    if (name === 'someData') store.setSomeData(val);
  },
  async onMount(el) {
    createApp(Component).mount(el);
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import paris from 'paris-vite-plugin';

export default defineConfig({
  plugins: [
    vue(),
    paris({
      name: 'remote',
      exposes: {
        './entry': resolve(__dirname, './src/main.ts'),
      },
    }),
  ],
});
```

Run `paris` and the CLI spins up a **built‑in shell app** that mounts your remote automatically. No extra host setup required.

---

## Installation

1. The project requires Node v18 or higher. Install the packages with **npm**:

```shell
npm i @kennyromanov/paris
npm i -D paris-vite-plugin paris-cli
```

2. Define your **remote components** and pass them to the plugin.

3. Start the dev server:

```shell
paris
```

**You're all set!**

---

## Configuration

`paris-cli` reads options from a `.parisrc.json` file in the project root. Values support templating thanks to [ExJSONa](https://www.npmjs.com/package/exjsona).

```json
{
  "remotes": {
    "dev": {
      "port": 9001,
      "entry": "paris.js",
      "component": "app",
      "url": "{host.url}:{remotes.dev.port}/templates"
    }
  }
}
```

Use CLI flags to override settings:

```shell
paris --port 3000
paris --host http://localhost
paris --remotes '{"dev":{"url":"http://localhost:9001/assets","entry":"paris.js"}}'
```

---

## Tips & Tricks

1. Use `onInject` in your remote component to consume values provided by the built‑in shell.
2. `.parisrc.json` uses [ExJSONa](https://www.npmjs.com/package/exjsona) so you can reference variables like `{host.url}` throughout the file.
3. CLI flags override the config file and any unknown options are passed straight to Vite (e.g. `paris --open`).

---

**Paris CLI**  
by Kenny Romanov
