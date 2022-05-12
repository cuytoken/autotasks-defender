**Defender scripts in Rand Network**

<u>Update a current autotask</u>

@param id: id of the autotask to update

```bash
npm run defender -- update=[id]
```

<u>Write the ABI in path file</u>

```bash
npm run defender -- getabi=[smart contract address] path=[path to file]
```

For this to work, `[path to file]` should already exists.

<u>Trigger a web hook operation</u>

```bas
node [path to webhook file]
```

In case the webhook is using typscript:

```bash
npx ts-node [path to webhook file]
```

<u>Make bundle of a autotask</u>

```bash
npm run build -- --environment [autotask name]
```

**Note:** autotask names are defined in `rollup.config.js` under `paths` variable. It must have `input` and `output` fields.
